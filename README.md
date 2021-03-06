# z-image-preloader

[![npm version](https://badge.fury.io/js/z-image-preloader.svg)](http://badge.fury.io/js/z-image-preloader)

Creates a [promise object](https://promisesaplus.com/) which is resolved when
all images are loaded.

Note: The module depends on the global `Promise` object to be available.

Since it's a CommonJS module, you must use a build tool to use it, like
[Browserify](http://browserify.org/), or [webpack](http://webpack.github.io/).

## Example, explanation

```js
const preloader = require("z-image-preloader");

// load single image
preloader
    .load("http://some-url/some-image.png")
    .then(img => {
        // done loading
    })
    .catch(e => {
        // failed to load
    });

// The `batchLoad` method accepts an array of url strings. (Or a single url.)
// The returned promise will be resolved, when all images are loaded (or failed to load)
preloader
    .batchLoad([
        "http://some-url/some-image.png",
        "http://some-other-url/some-other-image.jpg",
        "non-existent-image"
    ])
    .then((img1, img2, err) => {
        // Do something when preloading is done.
        // The arguments here will contain the loaded image objects created by `document.createElement('img')` and possible Error objects.
        // The above call for example will return with two `HTMLImageElement` and an `Error`.
    });
```

## LICENSE

[MIT](LICENSE)
