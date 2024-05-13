export declare enum ImageType {
    jpg = "image/jpeg",
    jpeg = "image/jpeg",
    png = "image/png",
    heic = "image/heic",
    heif = "image/heif",
    webp = "image/webp"
}
export type OutputImageType = 'image/jpeg' | 'image/png';
export type TBaseOptions = {
    /**
     * Max width of the output image
     * @default 2000
     */
    maxWidth: number;
    /**
     * Max height of the output image
     * @default 2000
     */
    maxHeight: number;
    /**
     * Scale of the output image. `0.1` - `1`
     * @default 1
     */
    scale: number;
    /**
     * Quality `0.1` - `1`
     * @default 1
     */
    quality: number;
    /**
     * Background color for non-alpha outputs
     * @default #ffffff
     */
    backgroundColor: string;
    outputType: 'image/jpeg' | 'image/png';
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
declare class ImageResizor {
    options: TOptions;
    file: Blob | File;
    image: HTMLImageElement | null;
    imageInfo: {
        width: number;
        height: number;
    };
    canvas: HTMLCanvasElement | null;
    canvasContext: CanvasRenderingContext2D | null;
    constructor(file: Blob | File, options?: Partial<TOptions>);
    /**
       * Gets supported types.
       */
    static getSupportedTypes(): typeof ImageType;
    init(): Promise<this>;
    private loadImage;
    private createCanvas;
    private renderImage;
    scale(value?: number): void;
    setMaxSize(maxWidth: number, maxHeight?: number): void;
    resize(width: number, height?: number): void;
    private resizeX;
    private resizeY;
    /**
       * Converts the image into a data URL.
       */
    toDataURL(): string | undefined;
    /**
       * Converts the image into a Blob.
       * @returns
       */
    toBlob(): Promise<Blob | undefined>;
}
export default ImageResizor;
