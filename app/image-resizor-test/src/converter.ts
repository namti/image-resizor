/* eslint-disable @typescript-eslint/no-explicit-any */
import ImageResizor from 'image-resizor';
import { TOptions } from '../../../dist/imageResizor';

type InputEvent = Event & { target: HTMLInputElement };
type InputFocusEvent = FocusEvent & { target: HTMLInputElement };
type SelectEvent = Event & { target: HTMLSelectElement };

const defaultOptions: TOptions = {
  maxWidth: 2000,
  maxHeight: 2000,
  scale: .5,
  quality: .5,
  backgroundColor: '#ffffff',
  outputType: 'image/jpeg',
};

export function setupConverter() {

  let options: TOptions = { ...defaultOptions };

  const handleTypeChange = (e: SelectEvent) => {
    const value = e.target.value;

    (options as any).outputType = value;

    let disabled: boolean = false;

    if(value === 'image/jpeg'){
      disabled = false;
    }else{
      disabled = true;
    }

    elOptionQuality.disabled = disabled;
    elOptionBackgroundColor.disabled = disabled;
  };

  const handleQualityChange = (e: InputEvent) => {
    const value = e.target.value;
    (options as any).quality = parseFloat(value);
    elValueQuality.innerText = value;
  };

  const handleMaxWidthChange = (e: InputFocusEvent) => {
    options.maxWidth = Math.round(parseInt(e.target.value));
    syncOptions();
  };

  const handleMaxHeightChange = (e: InputFocusEvent) => {
    options.maxHeight = Math.round(parseInt(e.target.value));
    syncOptions();
  };

  const handleBackgroundColorChange = (e: InputEvent) => {
    (options as any).backgroundColor = e.target.value;
  };

  const handleConvert = () => {

    console.log('options', options);

    if(!elImageFile.files?.length) {
      alert('No file is selected');
      return;
    }

    setConverting(true);

    const file = elImageFile.files[0];

    if(!file) return;

    new ImageResizor(file, options)
      .init()
      .then(instance => {

        instance.toBlob()
          .then(blob => {
            if(blob){
              console.log('Converted', blob, 'Size', `${blob.size}bytes`);
              blob.size;
            }
          });

        const dataUrl = instance.toDataURL();

        if(dataUrl){
          console.log(instance.toDataURL());

          elConvertedImage.style.display = '';
          elConvertedImage.src = dataUrl;
        }
      })
      .catch((e: Error) => {
        alert('Failed to convert. ' + e.message);
        console.error('failed', e);
      })
      .finally(() => {
        setConverting(false);
      });
  };

  const handleReset = () => {
    elImageFile.value = '';
    resetConvertedResult();

    options = { ...defaultOptions };
    syncOptions();
  };

  const resetConvertedResult = () => {
    elConvertedImage.removeAttribute('src');
    elConvertedImage.style.display = 'none';
  };

  const elConvertedImage: HTMLImageElement = document.querySelector('#img-preview')!;

  const elImageFile: HTMLInputElement = document.querySelector('#file-select')!;
  const elOptionType: HTMLSelectElement = document.querySelector('#option-type')!;
  const elOptionQuality: HTMLInputElement = document.querySelector('#option-quality')!;
  const elValueQuality: HTMLInputElement = document.querySelector('#value-quality')!;
  const elOptionMaxWidth: HTMLInputElement = document.querySelector('#option-max-width')!;
  const elOptionMaxHeight: HTMLInputElement = document.querySelector('#option-max-height')!;
  const elOptionBackgroundColor: HTMLInputElement = document.querySelector('#option-background-color')!;
  const elBtnConvert: HTMLButtonElement = document.querySelector('#btn-convert')!;
  const elBtnReset: HTMLButtonElement = document.querySelector('#btn-reset')!;

  elImageFile.addEventListener('change', () => resetConvertedResult());
  elOptionType.addEventListener('change', e => handleTypeChange(e as SelectEvent));
  elOptionQuality.addEventListener('change', e => handleQualityChange(e as InputEvent));
  elOptionMaxWidth.addEventListener('blur', e => handleMaxWidthChange(e as InputFocusEvent));
  elOptionMaxHeight.addEventListener('blur', e => handleMaxHeightChange(e as InputFocusEvent));
  elOptionBackgroundColor.addEventListener('change', e => handleBackgroundColorChange(e as InputEvent));

  elBtnConvert.addEventListener('click', () => handleConvert());
  elBtnReset.addEventListener('click', () => handleReset());

  const syncOptions = () => {
    const typeIndex = Array.from(elOptionType.options)
      .findIndex(option => option.value === options.outputType);
    elOptionType.selectedIndex = typeIndex;

    elOptionQuality.value = (options as any)?.quality?.toString();
    elOptionBackgroundColor.value = (options as any).backgroundColor;
    elOptionMaxWidth.value = options.maxWidth.toString();
    elOptionMaxHeight.value = options.maxHeight.toString();
    elValueQuality.innerText = options.quality.toString();
  };

  const setConverting = (isConverting: boolean) => {
    if(isConverting){
      elBtnConvert.innerHTML = `<div class="spinner-border spinner-border-sm"></div>`;
      elBtnConvert.disabled = true;
      elBtnReset.disabled = true;
    }else{
      elBtnConvert.innerHTML = 'Convert';
      elBtnConvert.disabled = false;
      elBtnReset.disabled = false;
    }
  };

  syncOptions();
}
