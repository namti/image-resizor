# image-resizor

Effortlessly convert, resize, and compress images (jpg, png, heic, heif, webp) into optimized png and jpg formats, all within the browser environment.

## Demo

[https://namti.github.io/image-resizor](https://namti.github.io/image-resizor)


## Usage

```typescript
import ImageResizor from 'image-resizor';
```
```html
<script src="https://cdn.jsdelivr.net/npm/image-resizor/dist/image-resizor.iife.js"></script>
```

```typescript
new ImageResizor(file, {
  maxWidth: 300,
  maxHeight: 300,
  outputType: 'image/jpeg',
  quality: .8,
})
  .init()
  .then(instance => console.log(instance.toDataURL()))
  .catch(e => console.error(e));
```


## Arguments

```typescript
new ImageResizor(file[, { ...options }])
```

### file

```typescript
File | Blob
```


### options

| Key | Type | Default | Options |
| --- | --- | --- | --- |
| maxWidth | number | 2000 | |
| maxHeight | number | 2000 | |
| scale | number | 1 | 0.1~1 |
| outputType | string | image/png | "image/png" \| "image/jpeg" |
| backgroundColor | string | #ffffff | Background fill for converting images with alpha channel to "image/jpeg" |
| quality | number | 0.9 | 0.1~1 Available if the `outputType` is "image/jpeg" |



## Methods

### toDataURL()
Converts the image into a data URL.

```typescript
instance.toDataURL(): string | undefined
```

### toBlob()
Converts the image into a Blob.

```typescript
instance.toBlob(): Promise<Blob>
```

### getSupportedTypes()

```typescript
enum ImageType {
  jpg = 'image/jpeg',
  jpeg = 'image/jpeg',
  png = 'image/png',
  heic = 'image/heic',
  heif = 'image/heif',
  webp = 'image/webp',
}
static getSupportedTypes(): typeof ImageType 
```