/* global beforeEach, afterEach, describe, it, assert */

'use strict';

var supertest = require('supertest');

var Service = require('../../app/Service');
var config = require('config');

describe('Service', function() {

    var app;

    beforeEach(function() {
        var logger = function(req, res, next) {
            next();
        };

        app = Service.create(logger, config);
    });

    afterEach(function() {
        app.close();
    });

    it('should return a "Hello world" plain text response', function(done) {

        supertest(app)
            .get('/')
            .set('Accept', 'text/plain')
            .expect(function(res) {
                assert.equal('Hello world', res.text);
            })
            .end(done);
    });
});
