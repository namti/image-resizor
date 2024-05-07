import ImageResizor from 'image-resizor';

type FileInputEvent = Event & { target: HTMLInputElement };

export function setupConverter() {

  // const image = new ImageResizor();

  const handleImageSelect = (e: FileInputEvent) => {

    if(!e.target.files?.length) return;

    const file = e.target.files[0];

    if(!file) return;

    new ImageResizor(file, {
      // maxWidth: 300,
      // maxHeight: 300,
      outputType: ImageResizor.getSupportedTypes().jpg,
      quality: .8,
    })
      .init()
      .then((instance: ImageResizor) => {
        const dataUrl = instance.toDataURL();

        if(dataUrl){

          console.log(instance.toDataURL());

          if(elConvertedImage && elPreviewContainer){
            elPreviewContainer.style.display = '';

            elConvertedImage.src = dataUrl;
          }
        }
      })
      .catch(e => console.error('failed', e));
  };

  const elConvertedImage: HTMLImageElement | null = document.querySelector('#img-converted');
  const elPreviewContainer: HTMLDivElement | null = document.querySelector('#preview');

  const elFile = document.querySelector('#file-select');
  if(elFile){
    elFile?.addEventListener('change', e => handleImageSelect(e as FileInputEvent));
  }
}
