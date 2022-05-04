"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _exifreader = _interopRequireDefault(require("exifreader"));

var _heic2any = _interopRequireDefault(require("heic2any"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ImageResizor = /*#__PURE__*/function () {
  function ImageResizor(file) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ImageResizor);

    this.options = _objectSpread(_objectSpread({}, defaultOptions), options);
    this.exif = {};
    this.file = file;
    this.image = null;
    this.imageInfo = {};
    this.canvas = null;
    this.canvasContext = null;
  }

  _createClass(ImageResizor, [{
    key: "init",
    value: function init() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.loadImage(_this.file).then(function (result) {
          var _this$exif, _this$exif$ImageWidt, _this$exif2, _this$exif2$ImageWidt, _this$exif3, _this$exif3$PixelXDim, _this$exif4, _this$exif4$ImageHei, _this$exif5, _this$exif5$ImageLeng, _this$exif6, _this$exif6$PixelYDim, _this$imageInfo;

          _this.imageInfo = (_this$imageInfo = {}, _defineProperty(_this$imageInfo, _this.isRotated() ? 'height' : 'width', ((_this$exif = _this.exif) === null || _this$exif === void 0 ? void 0 : (_this$exif$ImageWidt = _this$exif['Image Width']) === null || _this$exif$ImageWidt === void 0 ? void 0 : _this$exif$ImageWidt.value) || ((_this$exif2 = _this.exif) === null || _this$exif2 === void 0 ? void 0 : (_this$exif2$ImageWidt = _this$exif2['ImageWidth']) === null || _this$exif2$ImageWidt === void 0 ? void 0 : _this$exif2$ImageWidt.value) || ((_this$exif3 = _this.exif) === null || _this$exif3 === void 0 ? void 0 : (_this$exif3$PixelXDim = _this$exif3['PixelXDimension']) === null || _this$exif3$PixelXDim === void 0 ? void 0 : _this$exif3$PixelXDim.value) || defaultCanvas.width), _defineProperty(_this$imageInfo, _this.isRotated() ? 'width' : 'height', ((_this$exif4 = _this.exif) === null || _this$exif4 === void 0 ? void 0 : (_this$exif4$ImageHei = _this$exif4['Image Height']) === null || _this$exif4$ImageHei === void 0 ? void 0 : _this$exif4$ImageHei.value) || ((_this$exif5 = _this.exif) === null || _this$exif5 === void 0 ? void 0 : (_this$exif5$ImageLeng = _this$exif5['ImageLength']) === null || _this$exif5$ImageLeng === void 0 ? void 0 : _this$exif5$ImageLeng.value) || ((_this$exif6 = _this.exif) === null || _this$exif6 === void 0 ? void 0 : (_this$exif6$PixelYDim = _this$exif6['PixelYDimension']) === null || _this$exif6$PixelYDim === void 0 ? void 0 : _this$exif6$PixelYDim.value) || defaultCanvas.height), _this$imageInfo);

          _this.createCanvas();

          resolve(_this);
        })["catch"](function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: "isRotated",
    value: function isRotated() {
      var _this$exif7, _this$exif7$Orientati, _this$exif8, _this$exif8$Orientati, _this$exif9, _this$exif9$Orientati, _this$exif10, _this$exif10$Orientat;

      return ((_this$exif7 = this.exif) === null || _this$exif7 === void 0 ? void 0 : (_this$exif7$Orientati = _this$exif7.Orientation) === null || _this$exif7$Orientati === void 0 ? void 0 : _this$exif7$Orientati.value) == 5 || ((_this$exif8 = this.exif) === null || _this$exif8 === void 0 ? void 0 : (_this$exif8$Orientati = _this$exif8.Orientation) === null || _this$exif8$Orientati === void 0 ? void 0 : _this$exif8$Orientati.value) == 6 || ((_this$exif9 = this.exif) === null || _this$exif9 === void 0 ? void 0 : (_this$exif9$Orientati = _this$exif9.Orientation) === null || _this$exif9$Orientati === void 0 ? void 0 : _this$exif9$Orientati.value) == 7 || ((_this$exif10 = this.exif) === null || _this$exif10 === void 0 ? void 0 : (_this$exif10$Orientat = _this$exif10.Orientation) === null || _this$exif10$Orientat === void 0 ? void 0 : _this$exif10$Orientat.value) == 8;
    }
  }, {
    key: "loadImage",
    value: function loadImage(file) {
      var _this2 = this;

      return new Promise( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
          var _Object$entries$map;

          var loadExif, readFile, promises;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!((_Object$entries$map = Object.entries(imageBitmapTypes).map(function (entry) {
                    return entry[1];
                  })) !== null && _Object$entries$map !== void 0 && _Object$entries$map.includes(file === null || file === void 0 ? void 0 : file.type))) {
                    reject(new Error("The input is not a valid bitmap image file. Supported file types: ".concat(Object.keys(imageBitmapTypes).join(', '))));
                  }

                  try {
                    loadExif = new Promise(function (resolve, reject) {
                      _exifreader["default"].load(file).then(function (exif) {
                        _this2.exif = exif;
                        resolve(exif);
                      })["catch"](function (err) {
                        return reject(err);
                      });
                    });
                    readFile = new Promise(function (resolve, reject) {
                      var read = function read(blob) {
                        var reader = new FileReader();
                        reader.readAsDataURL(blob);

                        reader.onload = function (e) {
                          var _e$target;

                          return resolveReader(e === null || e === void 0 ? void 0 : (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.result);
                        };

                        reader.onerror = function (err) {
                          return reject(err);
                        };
                      };

                      var resolveReader = function resolveReader(result) {
                        _this2.image = document.createElement('img');
                        _this2.image.src = result;
                        resolve(result);
                      };

                      if ((file === null || file === void 0 ? void 0 : file.type) === imageBitmapTypes.heic || (file === null || file === void 0 ? void 0 : file.type) === imageBitmapTypes.heif) {
                        (0, _heic2any["default"])({
                          blob: file,
                          toType: 'image/png'
                        }).then(function (res) {
                          return read(res);
                        })["catch"](function (e) {
                          return reject(e);
                        });
                      } else {
                        read(file);
                      }
                    });
                    promises = [loadExif, readFile];
                    Promise.all(promises).then(function (results) {
                      return resolve(results);
                    })["catch"](function (e) {
                      return reject(e);
                    });
                  } catch (e) {
                    reject(e);
                  }

                case 2:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "createCanvas",
    value: function createCanvas() {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'imageProcessCanvas';
      this.canvas.width = this.imageInfo.width;
      this.canvas.height = this.imageInfo.height;
      this.canvasContext = this.canvas.getContext("2d");
      this.scale(this.options.scale);
      this.setMaxSize(this.options.maxWidth, this.options.maxHeight);
    }
  }, {
    key: "renderImage",
    value: function renderImage() {
      this.canvasContext.drawImage(this.image, 0, 0, this.imageInfo.width, this.imageInfo.height);
    }
  }, {
    key: "scale",
    value: function scale() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.imageInfo = _objectSpread(_objectSpread({}, this.imageInfo), {}, {
        width: this.imageInfo.width * value,
        height: this.imageInfo.height * value
      });
      this.resize(this.imageInfo.width, this.imageInfo.height);
    }
  }, {
    key: "setMaxSize",
    value: function setMaxSize() {
      var _arguments = arguments;

      var _ref2 = function () {
        return {
          maxWidth: _arguments[0],
          maxHeight: _arguments[1] || _arguments[0]
        };
      }(),
          maxWidth = _ref2.maxWidth,
          maxHeight = _ref2.maxHeight;

      if (this.imageInfo.width > maxWidth || this.imageInfo.height > maxHeight) {
        if (this.imageInfo.width > this.imageInfo.height) {
          var ratio = maxWidth / this.imageInfo.width;
          this.imageInfo = _objectSpread(_objectSpread({}, this.imageInfo), {}, {
            width: maxWidth,
            height: this.imageInfo.height * ratio
          });
        } else {
          var _ratio = maxHeight / this.imageInfo.height;

          this.imageInfo = _objectSpread(_objectSpread({}, this.imageInfo), {}, {
            width: this.imageInfo.width * _ratio,
            height: maxHeight
          });
        }

        this.resize(this.imageInfo.width, this.imageInfo.height);
      }
    }
  }, {
    key: "resize",
    value: function resize() {
      this.resizeX(arguments[0]);
      this.resizeY(arguments[1] || arguments[0]);
    }
  }, {
    key: "resizeX",
    value: function resizeX() {
      var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultCanvas.width;
      this.imageInfo = _objectSpread(_objectSpread({}, this.imageInfo), {}, {
        width: width
      });
      this.canvas.width = width;
    }
  }, {
    key: "resizeY",
    value: function resizeY() {
      var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultCanvas.height;
      this.imageInfo = _objectSpread(_objectSpread({}, this.imageInfo), {}, {
        height: height
      });
      this.canvas.height = height;
    }
  }, {
    key: "toDataURL",
    value: function toDataURL() {
      this.renderImage();
      return this.canvas.toDataURL(this.options.outputType, this.options.quality);
    }
  }, {
    key: "toBlob",
    value: function () {
      var _toBlob = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this3 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", new Promise(function (resolve) {
                  var setBlob = function setBlob(res) {
                    resolve(res);
                  };

                  _this3.renderImage();

                  _this3.canvas.toBlob(setBlob, _this3.options.outputType, _this3.options.quality);
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function toBlob() {
        return _toBlob.apply(this, arguments);
      }

      return toBlob;
    }()
  }]);

  return ImageResizor;
}();

var imageBitmapTypes = {
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'png': 'image/png',
  'heic': 'image/heic',
  'heif': 'image/heif'
};
var defaultCanvas = {
  width: 300,
  height: 100
};
var defaultOptions = {
  maxWidth: 2200,
  maxHeight: 2200,
  scale: 1,
  quality: 1,
  // available if `outputType` is `image/jpeg`
  outputType: imageBitmapTypes.png
};
var _default = ImageResizor;
exports["default"] = _default;