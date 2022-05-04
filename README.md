# image-resizor
This package resizes images (jpg, png, heic, heif) and corrects the image orientation.



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



## Methods

`toDataURL()` returs the base64 code.

`toBlob()` `async` returs a binary object.



After `init()` , you can invoke the functions below to modify the options. 

`setMaxSize([maxWidth, maxHeight])`

`resize([width, height])`

`scale(value)`



## Arguments

`constructor(file, [options])`



Options:

| Key        | Type     | Default     |                                                      |
| ---------- | -------- | ----------- | ---------------------------------------------------- |
| maxWidth   | `int`    | 2200        |                                                      |
| maxHeight  | `int`    | 2200        |                                                      |
| scale      | `number` | 1           | 0 - 1                                                |
| outputType | `MIME`   | `image/png` | `image/jpeg` `image/png`                             |
| quality    | `number` | 1           | 0 - 1 (availabe if the `outputType` is `image/jpeg`) |

