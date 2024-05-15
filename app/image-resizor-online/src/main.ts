import './style.scss';
import { setupConverter } from './converter';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

	<div class="d-flex h-100">

		<div class="sidebar border border-end">
			<div class="scrollable p-3">

				<div class="mb-4">
					<h4>Image Resizor Online</h4>
					<div class="text-secondary lh-sm"><small>Convert, resize, and compress images (jpg, png, heic, heif, webp) into optimized png and jpg formats.</small></div>
				</div>

				<div class="mb-4">

					<div class="mb-3 d-flex align-items-center justify-content-between" style="gap: 1rem;">
						<small class="form-label my-0">Image</small>
						<input class="form-control form-control-sm w-auto" type="file" id="file-select" accept="image/jpeg, image/png, image/heic, image/heif, image/webp" />
					</div>

					<div class="mb-3 d-flex align-items-center justify-content-between" style="gap: 1rem;">
						<small class="form-label my-0 flex-shrink-0">Output Type</small>
						<select id="option-type" class="form-select form-select-sm d-inline-block w-auto">
							<option value="image/jpeg">jpeg (image/jpeg)</option>
							<option value="image/png">png (image/png)</option>
						</select>
					</div>

					<div class="mb-3 d-flex align-items-center justify-content-between">

						<small class="form-label my-0">Quality</small>

						<div class="d-flex align-items-center justify-content-end" style="gap: 1rem;">
							<code id="value-quality" class="text-muted">-</code>
							<input type="range" class="form-range" id="option-quality" min="0.1" max="1" step="0.1">
						</div>
					</div>

					<div class="mb-3 d-flex align-items-center justify-content-between">
						<small class="form-label my-0">Max Width</small>
						<input type="number" class="form-control form-control-sm w-auto" id="option-max-width" min="1" step="1">
					</div>

					<div class="mb-3 d-flex align-items-center justify-content-between">
						<small class="form-label my-0">Max Height</small>
						<input type="number" class="form-control form-control-sm w-auto" id="option-max-height" min="1" step="1">
					</div>

					<div class="mb-3 d-flex align-items-center justify-content-between">
						<small class="form-label my-0">Background Color</small>
						<input class="form-control form-control-sm p-1 w-auto" style="min-width: 2rem;" type="color" id="option-background-color" value="#ff00ff" />
					</div>

					<div class="d-flex align-items-center" style="gap: 1rem;">

					<button id="btn-convert" class="btn btn-primary flex-grow-1">Convert</button>

					<button id="btn-reset" class="btn btn-outline-secondary">Reset</button>

					</div>

				</div>

				<div class="text-center">
					<a href="https://www.npmjs.com/package/image-resizor" target="_blank">ImageResizor npm package</a>
				</div>

			</div>
		</div>

		<div class="content flex-grow-1">

			<div class="scrollable">

				<img id="img-preview" style="display: none" />

			</div>

			<code id="img-size" class="position-absolute bg-white text-muted rounded-3 py-0 px-1 border shadow-sm" style="right: .5rem; bottom: .5rem; display: none;"></code>

		</div>

	
	</div>
`;

setupConverter();
