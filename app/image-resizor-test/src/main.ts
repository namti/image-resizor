import './style.scss';
import { setupConverter } from './converter';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

	<div class="d-flex h-100">

		<div class="sidebar border border-end">
			<div class="scrollable p-3">

				<h4>Image Resizor</h4>

				<div class="mb-3">
					<label class="form-label">Image</label>
					<input class="form-control form-control-sm" type="file" id="file-select" accept="image/jpeg, image/png, image/heic, image/heif, image/webp" />
				</div>

				<div class="mb-3">
					<label class="form-label">Output Type</label>
					<select id="option-type" class="form-select form-select-sm">
						<option value="image/jpeg">.jpg (image/jpeg)</option>
						<option value="image/png">.png (image/png)</option>
					</select>
				</div>

				<div class="mb-3">
					<label class="form-label d-flex align-items-center justify-content-between">
						<span>Quality</span>
						<span id="value-quality">-</span>
					</label>
					<input type="range" class="form-range" id="option-quality" min="0.1" max="1" step="0.1">
				</div>

				<div class="mb-3">
					<label class="form-label">Min Width</label>
					<input type="number" class="form-control form-control-sm" id="option-max-width" min="1" step="1">
				</div>

				<div class="mb-3">
					<label class="form-label">Max Height</label>
					<input type="number" class="form-control form-control-sm" id="option-max-height" min="1" step="1">
				</div>

				<div class="mb-3">
					<label class="form-label">Background Color</label>
					<input class="form-control form-control-sm" type="text" id="option-background-color" value="#ff00ff" />
				</div>

				<button id="btn-convert" class="btn btn-primary w-100">Convert</button>

			</div>
		</div>

		<div class="content flex-grow-1">

			<div class="scrollable">

				<img id="img-preview" style="display: none" />

			</div>

		</div>

	
	</div>
`;

setupConverter();
