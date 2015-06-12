'use strict';
var $ = require('jquery');
var q = require('q');

module.exports = {
    /**
     * string|jQuery|Array data Url string or strings, or a jQuery object
     * containing `img` elements.
     */
    getPromise: function(data) {
        var self = this;

        // Converting a single element to an array for consistency.
        if (Array.isArray(data) === false) {
            data = [data];
        }

        var imgPromises = [];

        var dataLength = data.length;
        var $images = null;
        var img = null;
        for (var i = dataLength - 1; i >= 0; i--) {
            if (data[i] instanceof $) {
                if (data[i].is('img')) {
                    imgPromises.push(this.createPromiseForImg(data[i][0]));
                } else {
                    $images = data[i].find('img');
                    $images.each(function() {
                        imgPromises.push(self.createPromiseForImg(this));
                    });
                }
            } else if (typeof data[i] === 'string') {
                imgPromises.push(self.createPromiseForImg(data[i]));
            }
        }

        return q.all(imgPromises);
    },

    /**
     * string|DOMElement img Can be a string representing the image url, or an
     * Image DOM element.
     */
    createPromiseForImg: function(img) {
        if (typeof img === 'string') {
            var imgSrc = img;
            img = new Image();
        }

        var d = q.defer();
        img.onload = function () {
            d.resolve(img);
        };

        img.onabort = function (e) {
            d.reject(e);
        };

        img.onerror = function (e) {
            d.reject(e);
        };

        if (typeof imgSrc !== 'undefined') {
            img.src = imgSrc;
        }

        // Cached images immediately resolve their promises.
        if (img.complete) {
            d.resolve(img);
        }

        return d.promise;
    }
};
