# image-resizor
This package supports resizing and converting images in browsers.

Supported formats: `jpg`, `jpeg`, `png`, `heic`, `heif`



## How to use

```javascript
import ImageResizor from 'image-resizor';
```

```javascript
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

`new ImageResizor(file[, { ...options }])`



### Options:

| Key        | Type     | Default     | Options                                                     |
| ---------- | -------- | ----------- | ---------------------------------------------------- |
| maxWidth   | `int`    | 2200        |                                                      |
| maxHeight  | `int`    | 2200        |                                                      |
| scale      | `number` | 1           | 0 - 1                                                |
| outputType | `string`   | `"image/png"` | `"image/png"` `"image/jpeg"`                          |
| quality    | `number` | 1           | 0 - 1 <br/>availabe if the `outputType` is `"image/jpeg"` |



## API

### Instance

`toDataURL()` returns the base64 code.

`toBlob()` `async` returns a binary object.




**After `init()` , you can call functions below to modify the options.**

`setMaxSize(maxWidthAndHeight|maxWidth[, maxHeight])`

`resize(widthAndHeight|width[, height])`

`scale(value)`

### Static Methods

`getSupportedTypes()` returns an object with file types and MIME types that are supported by this package.
e.g. 
```json
{
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
}
```
