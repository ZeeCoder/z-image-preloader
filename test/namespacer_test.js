var assert = require('assert');
var clone = require('clone');
var Namespacer = require('../Namespacer');

describe('Namespacer.js', function () {
    beforeEach(function() {
        this.Namespacer = new Namespacer('ns');
    });

    describe('#get', function () {
        it('should return namespaced string', function() {
            assert.deepEqual('event.ns', this.Namespacer.get('event'));
        });

        it('should return namespaced string for multiple events', function() {
            assert.deepEqual('event1.ns event2.ns', this.Namespacer.get('event1 event2'));
        });
    });
});
