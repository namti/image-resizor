import heic2any from "heic2any";

class ImageResizor{
	constructor(file, options = {}){
		this.options = { ...defaultOptions, ...options };
		this.file = file;
		this.image = null;
		this.imageInfo = {};
		this.canvas = null;
		this.canvasContext = null;
	}

	init(){
		return new Promise((resolve, reject) => {
			this.loadImage(this.file)
				.then(result => {
					if(window._dev){
						console.log(this);
					}
					this.imageInfo = {
						width: this.image.width,
						height: this.image.height,
					}
					this.createCanvas();
					resolve(this);
				})
				.catch(err => reject(err));
		});
	}

	loadImage(file){
		return new Promise(async (resolve, reject) => {
			if(!Object.entries(imageBitmapTypes).map(entry => entry[1])?.includes(file?.type)){
				reject(new Error(`The input is not a valid bitmap image file. Supported file types: ${Object.keys(imageBitmapTypes).join(', ')}`));
			}

			try{
				const readFile = new Promise((resolve,reject) => {

					const read = (blob) => {
						let reader = new FileReader();
						reader.readAsDataURL(blob);
						reader.onload = e => resolveReader(e?.target?.result);
						reader.onerror = err => reject(err);
					};

					const resolveReader = (result) => {
						this.image = document.createElement('img');
						this.image.src = result;
						this.image.onload = e => resolve(result);
					};

					if(file?.type === imageBitmapTypes.heic || file?.type === imageBitmapTypes.heif){
						heic2any({
							blob: file,
							toType: 'image/png',
						})
							.then(res => read(res))
							.catch(e => reject(e));
					}else{
						read(file);
					}
				});

				readFile.then(results => resolve(results))
					.catch(e => reject(e));

			}catch(e){
				reject(e);
			}
		});
	}

	createCanvas(){
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.imageInfo.width;
		this.canvas.height = this.imageInfo.height;
		this.canvasContext = this.canvas.getContext("2d");

		this.scale(this.options.scale);
		this.setMaxSize(this.options.maxWidth, this.options.maxHeight);
	}

	renderImage(){
		this.canvasContext.drawImage(this.image, 0, 0, this.imageInfo.width, this.imageInfo.height);
	}

	scale(value = 1){
		this.imageInfo = {
			...this.imageInfo,
			width: this.imageInfo.width * value,
			height: this.imageInfo.height * value,
		};

		this.resize(this.imageInfo.width, this.imageInfo.height);
	}

	setMaxSize(){
		let { maxWidth, maxHeight } = ( () => {
			return {
				maxWidth: arguments[0],
				maxHeight: arguments[1] || arguments[0],
			};
		})();

		if(this.imageInfo.width > maxWidth || this.imageInfo.height > maxHeight){
			if(this.imageInfo.width > this.imageInfo.height){
				let ratio = maxWidth / this.imageInfo.width;
				this.imageInfo = {
					...this.imageInfo,
					width: maxWidth,
					height: this.imageInfo.height * ratio,
				};
			}else{
				let ratio = maxHeight / this.imageInfo.height;
				this.imageInfo = {
					...this.imageInfo,
					width: this.imageInfo.width * ratio,
					height: maxHeight,
				};
			}
			this.resize(this.imageInfo.width, this.imageInfo.height);
		}
	}

	resize(){
		this.resizeX(arguments[0]);
		this.resizeY(arguments[1] || arguments[0]);
	}

	resizeX(width = defaultCanvas.width){
		this.imageInfo = {
			...this.imageInfo,
			width: width,
		};
		this.canvas.width = width;
	}

	resizeY(height = defaultCanvas.height){
		this.imageInfo = {
			...this.imageInfo,
			height: height,
		};
		this.canvas.height = height;
	}

	toDataURL(){
		this.renderImage();
		return this.canvas.toDataURL(this.options.outputType, this.options.quality);
	}

	async toBlob(){
		return new Promise((resolve) => {
			const setBlob = (res) => {
				resolve(res);
			};

			this.renderImage();
			this.canvas.toBlob(setBlob, this.options.outputType, this.options.quality);

		});
	}
}

const imageBitmapTypes = {
	'jpg': 'image/jpeg',
	'jpeg': 'image/jpeg',
	'png': 'image/png',
	'heic': 'image/heic',
	'heif': 'image/heif',
	'webp': 'image/webp',
};

const defaultCanvas = {
	width: 300,
	height: 100,
};

const defaultOptions = {
	maxWidth: 2200,
	maxHeight: 2200,
	scale: 1,
	quality: 1, // available if `outputType` is `image/jpeg`
	outputType: imageBitmapTypes.png,
};

export default ImageResizor;
