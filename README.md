# image-resizor
This package support resizing images and correcting the image orientation in browsers.

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
  .then(instance => {
    console.log(instance.toDataURL());
  })
  .catch(e => console.error(e));
```



## API

`toDataURL()` returns the base64 code.

`toBlob()` `async` returns a binary object.



After `init()` , you can invoke the functions below to modify the options. 

`setMaxSize(maxWidthAndHeight|maxWidth[, maxHeight])`

`resize(widthAndHeight|width[, height])`

`scale(value)`



## Arguments

`new ImageResizor(file[, { ...options }])`



Options:

| Key        | Type     | Default     | Options                                                     |
| ---------- | -------- | ----------- | ---------------------------------------------------- |
| maxWidth   | `int`    | 2200        |                                                      |
| maxHeight  | `int`    | 2200        |                                                      |
| scale      | `number` | 1           | 0 - 1                                                |
| outputType | `string`   | `"image/png"` | `"image/png"` `"image/jpeg"`                          |
| quality    | `number` | 1           | 0 - 1 <br/>availabe if the `outputType` is `"image/jpeg"` |

