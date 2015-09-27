'use strict';

var http = require('http');
var express = require('express');
var LocationAPI = require('./LocationAPI');
var VersionAPI = require('./VersionAPI');

function Service(locationAPI, versionAPI) {
    this.locationAPI = locationAPI ? locationAPI: new LocationAPI();
    this.versionAPI  = versionAPI ? versionAPI : new VersionAPI();
}

Service.prototype = {

    start: function(port) {
        var app = express(),
            locationAPI = this.locationAPI,
            versionAPI = this.versionAPI;

        app.get('/api/countries/:ip', function(request, response) {
            locationAPI.get(request, response);
        });

        app.get('/admin/version', function(request, response) {
            versionAPI.get(request, response);
        });

        var server = http.createServer(app);
        server.listen(port, function() {
            console.log('Service started on port ' + port);
        });

        return server;
    }
};

module.exports = Service;