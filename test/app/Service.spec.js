/* global afterEach, describe, it, expect, sinon */

'use strict';

var supertest = require('supertest');

var Service = require('../../app/Service');
var LocationAPI = require('../../app/LocationAPI');
var VersionAPI = require('../../app/VersionAPI');

describe('Service', function() {

    var app;

    afterEach(function() {
        if (app) {
            app.close();
        }
    });

    it('should call locationAPI' , function(done) {

        var locationAPI = new LocationAPI();
        var locationAPIGet = sinon.spy(locationAPI, 'get');

        app = new Service(locationAPI).start(1234);

        supertest(app)
            .get('/api/countries/128.1.1.231')
            .expect(function() {
                expect(locationAPIGet).to.have.been.called;
            })
            .end(done);
    });

    it('should call versionAPI at /admin/version endpoint' , function(done) {

        var locationAPI = new LocationAPI();
        var versionAPI = new VersionAPI();
        var versionAPIGet = sinon.spy(versionAPI, 'get');

        app = new Service(locationAPI, versionAPI).start(1234);

        supertest(app)
            .get('/admin/version')
            .expect(function() {
                expect(versionAPIGet).to.have.been.called;
            })
            .end(done);
    });
});


