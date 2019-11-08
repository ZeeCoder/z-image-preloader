# CHANGELOG

## 3.0.1 (2019-11-08)

-   Reads `image.complete` after the src has been set. (Otherwise this could
    stop a preloading request firing at all.)

## 3.0.0 (2018-05-17)

-   No longer falling back on an empty string, but throwing an exception instead

## 2.0.0 (2017-01-23)

Features:

-   Dropped bluebird as a dependency
-   Promises reject with an Error object

Api changes:

-   load => batchLoad
-   getPromise => load
