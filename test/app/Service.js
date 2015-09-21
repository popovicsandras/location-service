/* global beforeEach, afterEach, describe, it, assert, expect, sinon */

'use strict';

var supertest = require('supertest');

var Service = require('../../app/Service');
var LocationFinder = require('../../app/LocationFinder');
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


    describe('get location info', function() {

        it('should return 200' , function(done) {

            supertest(app)
                .get('/locations/128.001.001.231')
                .expect(function(res) {
                    expect(res.statusCode).to.be.equal(200);
                })
                .end(done);
        });

        it('should return the correct json response', function(done) {

            var locationFinderLookupSpy = sinon.stub(LocationFinder.prototype, 'lookup', function() {
                return {
                    host: '128.001.001.231'
                };
            });

            supertest(app)
                .get('/locations/128.001.001.231')
                .expect(function(res) {
                    expect(locationFinderLookupSpy).to.have.been.calledWith('128.001.001.231');
                    expect(res.body.host).to.be.equal('128.001.001.231');
                    locationFinderLookupSpy.restore();
                })
                .end(done);

        });

        it.skip('should return 404 if bad parameters' , function(done) {

            supertest(app)
                .get('/locations/whatever')
                .expect(function(res) {
                    expect(res.statusCode).to.be.equal(404);
                })
                .end(done);
        });

    });

});


