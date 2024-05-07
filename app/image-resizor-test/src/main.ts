import './style.css'
import { setupConverter } from './converter'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Image Resizor Test</h1>

    <p>Choose an image to convert</p>

    <p>
      <input type="file" id="file-select" accept="image/jpeg, image/png, image/heic, image/heif, image/webp" />
    </p>

    <div id="preview" style="display: none;">
      <img id="img-converted" />
    </div>
        
  </div>
`

setupConverter();
