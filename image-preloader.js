"use strict";

module.exports = {
    /**
     * @param {String|String[]} data Url string or array of strings.
     * @returns {Promise}
     */
    batchLoad: function(data) {
        // Converting a single element to an array.
        if (Array.isArray(data) === false) {
            data = [data];
        }

        // Promisify!
        data = data.map(
            function(str) {
                // Maybe there's a better solution to implement a "settle" functionality for es6 promises?
                return new Promise(
                    function(resolve) {
                        this.load(str)
                            .then(function(param) {
                                resolve(param);
                            })
                            .catch(function(e) {
                                resolve(e);
                            });
                    }.bind(this)
                );
            }.bind(this)
        );

        return Promise.all(data);
    },

    /**
     * @param {string|HTMLImageElement} img Can be a string representing the
     * image url, or an Image DOM element.
     * @throws Error if the given image was neither a string, nor an HTMLImageElement
     * @returns {Promise}
     */
    load: function(img) {
        return new Promise(function(resolve, reject) {
            if (
                img instanceof HTMLImageElement === false &&
                typeof img !== "string"
            ) {
                throw new Error(
                    "Couldn't load image, as it was neither a string, nor an HTMLImageElement."
                );
            }

            if (typeof img === "string") {
                var imgSrc = img;
                img = document.createElement("img");
            }

            img.onload = function() {
                resolve(img);
            };

            img.onabort = img.onerror = function(err) {
                reject(new Error(err));
            };

            if (typeof imgSrc !== "undefined") {
                img.src = imgSrc;
            }

            // Cached images immediately resolve their promises.
            if (img.complete) {
                resolve(img);
            }
        });
    }
};
