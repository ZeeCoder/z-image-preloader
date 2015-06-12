# z-image-preloader
[![npm version](https://badge.fury.io/js/z-image-preloader.svg)](http://badge.fury.io/js/z-image-preloader)

Creates a [promise object](https://promisesaplus.com/) which is resolved when all the relevant images are
loaded. [Kriskowal's Q](https://github.com/kriskowal/q) is used as a promise implementation.

Since it's a CommonJS module, it must be used alongside with [Browserify](http://browserify.org/), or
something similar, like [WebPacker](http://webpack.github.io/).

## Example, explanation

```html
<div id="an-element-containing-images">
    <img src="the-src">
    <img src="the-src">
    <img src="the-src">
    <div>
        <img src="the-src">
    </div>
</div>
```

```js
var image_preloader = require('z-image-preloader');

// The `getPromise` method accepts url strings, an array of strings, a jQuery
// object, or an array containing strings and / or jQuery objects.
var promise = image_preloader.getPromise([
    'some url',
    'an other url',
    $('#an-element-containing-images')
]);

// The returned promise will be resolved, when all images are loaded
promise.then(function() {
    // Do something when preloading is done
});
```

## Testing
Tests are in a work-in-progress state.

## License
[MIT](LICENSE)
