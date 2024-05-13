import heic2any from 'heic2any';

export enum ImageType {
	jpg = 'image/jpeg',
	// eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
	jpeg = 'image/jpeg',
	png = 'image/png',
	heic = 'image/heic',
	heif = 'image/heif',
	webp = 'image/webp',
}

export type OutputImageType = 'image/jpeg' | 'image/png';

export type TBaseOptions = {
	/**
	 * Max width of the output image
	 * @default 2000
	 */
	maxWidth: number,
	/**
	 * Max height of the output image
	 * @default 2000
	 */
	maxHeight: number,
	/**
	 * Scale of the output image. `0.1` - `1`
	 * @default 1
	 */
	scale: number,
	/**
	 * Quality `0.1` - `1`
	 * @default 1
	 */
	quality: number,
	/**
	 * Background color for non-alpha outputs
	 * @default #ffffff
	 */
	backgroundColor: string,
	outputType: 'image/jpeg' | 'image/png',
};

export type TJpegOptions = TBaseOptions & {
	/**
	 * Output type
	 */
	outputType: 'image/jpeg';
	/**
	 * JPEG quality. `0.1` - `1`
	 * @default `1`
	 */
	quality: number;
};

export type TOtherFormatOptions = TBaseOptions & {
	outputType: 'image/png';
};

export type TOptions = TJpegOptions | TOtherFormatOptions;


class ImageResizor {

  options: TOptions;
  file: Blob | File;
  image: HTMLImageElement | null;
  imageInfo: {
		width: number,
		height: number,
	};
  canvas: HTMLCanvasElement | null;
  canvasContext: CanvasRenderingContext2D | null;

  constructor(file: Blob | File, options?: Partial<TOptions>) {
    this.options = { ...defaultOptions, ...options };
    this.file = file;
    this.image = null;
    this.imageInfo = { width: 0, height: 0 };
    this.canvas = null;
    this.canvasContext = null;
  }

  /**
	 * Gets supported types.
	 */
  static getSupportedTypes(): typeof ImageType {
    return ImageType;
  }

  init(): Promise<this> {
    return new Promise((resolve, reject) => {
      this.loadImage(this.file)
        .then(() => {
          if (this.image) {

            this.imageInfo = {
              width: this.image.width,
              height: this.image.height,
            };

            this.createCanvas();

            resolve(this);

          } else {
            reject(new Error('The image is null'));
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  private loadImage(file: Blob): Promise<string> {
    return new Promise(async (resolve, reject) => {
      if (!file) {
        reject(new Error('No file is provided.'));
        return;
      }

      let fileType = file.type;

      if (!fileType && file instanceof File) {
        const fileExtension = file.name.split('.')
          .pop()
          ?.toLocaleLowerCase();

        if (fileExtension === 'heic' || fileExtension === 'heif') {
          fileType = ImageType[fileExtension];
        }
      }

      if (!Object.entries(ImageType)
        .map(entry => entry[1])
        ?.includes(fileType as ImageType)) {
        reject(new Error(`The input is not a valid bitmap. Supported file types: ${Object.keys(ImageType)
          .join(', ')}`));
      }

      try {
        const readFile = new Promise<string>((resolve, reject) => {

          const read = (blob: Blob) => {
            const reader = new FileReader();

            reader.readAsDataURL(blob);

            reader.onload = e => {
              if (e.target?.result) {
                resolveReader(e.target.result as string);
              } else {
                reject(new Error('Failed to read the image.'));
              }
            };

            reader.onerror = err => reject(err);
          };

          const resolveReader = (result: string): void => {
            this.image = document.createElement('img');
            this.image.src = result;
            this.image.onload = () => resolve(result);
          };

          if (fileType === ImageType.heic || fileType === ImageType.heif) {
            heic2any({
              blob: file,
              toType: 'image/png',
            })
              .then(res => read(res as Blob))
              .catch(e => reject(e));
          } else {
            read(file);
          }
        });

        readFile
          .then(res => {
            resolve(res);
          })
          .catch(e => reject(e));

      } catch (e) {
        reject(e);
      }
    });
  }

  private createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.imageInfo.width;
    this.canvas.height = this.imageInfo.height;
    this.canvasContext = this.canvas.getContext('2d');

    this.scale(this.options.scale);
    this.setMaxSize(this.options.maxWidth, this.options.maxHeight);
  }

  private renderImage() {
    if (this.canvasContext && this.image) {

      if (
        this.canvas &&
				this.options.outputType !== 'image/png'
      ) {
        this.canvasContext.fillStyle = this.options.backgroundColor;
        this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
      }

      this.canvasContext.drawImage(this.image, 0, 0, this.imageInfo.width, this.imageInfo.height);
    }
  }

  scale(value = 1) {
    this.imageInfo = {
      ...this.imageInfo,
      width: this.imageInfo.width * value,
      height: this.imageInfo.height * value,
    };

    this.resize(this.imageInfo.width, this.imageInfo.height);
  }

  setMaxSize(maxWidth: number, maxHeight?: number) {
    if (!maxHeight) {
      maxHeight = maxWidth;
    }

    const adjustWidth = () => {
      const ratio = maxWidth / this.imageInfo.width;
      this.imageInfo = {
        ...this.imageInfo,
        width: maxWidth,
        height: this.imageInfo.height * ratio,
      };
    };

    const adjustHeight = () => {
      const ratio = maxHeight / this.imageInfo.height;
      this.imageInfo = {
        ...this.imageInfo,
        width: this.imageInfo.width * ratio,
        height: maxHeight,
      };
    };

    // if width is greater than or equal to height
    if (this.imageInfo.width >= this.imageInfo.height) {
      if (this.imageInfo.width > maxWidth) {
        adjustWidth();
      }

      if (this.imageInfo.height > maxHeight) {
        adjustHeight();
      }

    } else {
      // if height is greater than width
      if (this.imageInfo.height > maxHeight) {
        adjustHeight();
      }

      // if width is greater than height
      if (this.imageInfo.width > maxWidth) {
        adjustWidth();
      }
    }

    this.resize(this.imageInfo.width, this.imageInfo.height);
  }

  resize(width: number, height?: number) {
    if (!height) height = width;

    this.resizeX(width);
    this.resizeY(height);
  }

  private resizeX(width: number = defaultCanvas.width) {
    this.imageInfo = {
      ...this.imageInfo,
      width: width,
    };

    if (this.canvas) this.canvas.width = width;
  }

  private resizeY(height = defaultCanvas.height) {
    this.imageInfo = {
      ...this.imageInfo,
      height: height,
    };

    if (this.canvas) this.canvas.height = height;
  }

  /**
	 * Converts the image into a data URL.
	 */
  toDataURL(): string | undefined {
    this.renderImage();

    if (!this.canvas) return;

    return this.canvas.toDataURL(this.options.outputType, this.options.quality);

  }

  /**
	 * Converts the image into a Blob.
	 * @returns
	 */
  toBlob(): Promise<Blob | undefined> {
    return new Promise(resolve => {
      const setBlob = (blob: Blob | null) => {
        if (blob) resolve(blob);
        else resolve(undefined);
      };

      this.renderImage();

      if (!this.canvas) {
        resolve(undefined);
        return;
      }

      this.canvas.toBlob(setBlob, this.options.outputType, this.options.quality);
    });
  }
}

const defaultCanvas = {
  width: 300,
  height: 100,
};

const defaultOptions: TOptions = {
  maxWidth: 2000,
  maxHeight: 2000,
  scale: 1,
  quality: 1,
  backgroundColor: '#ffffff',
  outputType: 'image/jpeg',
};

export default ImageResizor;