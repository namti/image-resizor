import ImageResizor from 'image-resizor';

type FileInputEvent = Event & { target: HTMLInputElement };
type SelectEvent = Event & { target: HTMLSelectElement };
type ImageType = 'image/jpeg' | 'image/png';

export function setupConverter() {
  let type: ImageType = 'image/jpeg';

  const handleImageSelect = (e: FileInputEvent) => {

    if(!e.target.files?.length) return;

    const file = e.target.files[0];

    if(!file) return;

    new ImageResizor(file, {
      maxWidth: 300,
      maxHeight: 300,
      outputType: type,
      quality: .8,
    })
      .init()
      .then(instance => {

        instance.toBlob()
          .then(blob => {
            if(blob){
              console.log('converted to blob', blob);
            }
          });

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

  const handleTypeChange = (e: SelectEvent) => {
    type = e.target.value as ImageType;
  };

  const elConvertedImage: HTMLImageElement | null = document.querySelector('#img-converted');
  const elPreviewContainer: HTMLDivElement | null = document.querySelector('#preview');

  const elSelectType = document.querySelector('#select-type');

  if(elSelectType){
    elSelectType?.addEventListener('change', e => handleTypeChange(e as SelectEvent));
  }

  const elFile = document.querySelector('#file-select');

  if(elFile){
    elFile?.addEventListener('change', e => handleImageSelect(e as FileInputEvent));
  }
}
