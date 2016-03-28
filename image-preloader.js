'use strict';

var Promise = require('bluebird');

module.exports = {
    /**
     * @param {String|Array} data Url string or array of strings.
     * @returns {Promise}
     */
    load: function(data) {
        // Converting a single element to an array.
        if (Array.isArray(data) === false) {
            data = [data];
        }

        // Promisify!
        data = data.map(function(str) {
            // Maybe there's a better solution to implement a "settle" functionality for es6 promises?
            return new Promise(function(resolve) {
                this.getPromise(str)
                    .then(function(param) { resolve(param); })
                    .catch(function(param) { resolve(param); });
            }.bind(this));
        }.bind(this));

        return Promise.all(data);
    },

    /**
     * @param {string|HTMLImageElement} img Can be a string representing the
     * image url, or an Image DOM element.
     * @returns {Promise}
     */
    getPromise: function(img) {
        return new Promise(function(resolve, reject) {
            if (
                img instanceof HTMLImageElement === false &&
                typeof img !== 'string'
            ) {
                console.warn('The provided `img` was not a string or an HTMLImageElement object. Using an empty string instead.');
                img = '';
            }

            if (typeof img === 'string') {
                var imgSrc = img;
                img = document.createElement('img');
            }

            img.onload = function() {
                resolve(img);
            };

            img.onabort = img.onerror = function(err) {
                reject(err);
            };

            if (typeof imgSrc !== 'undefined') {
                img.src = imgSrc;
            }

            // Cached images immediately resolve their promises.
            if (img.complete) {
                resolve(img);
            }
        });
    }
};
