'use strict';

var http = require('http');
var express = require('express');
var LocationAPI = require('./LocationAPI');
var HealthcheckAPI = require('./HealthcheckAPI');

function Service(locationAPI, healthcheckAPI) {
    this.locationAPI = locationAPI ? locationAPI: new LocationAPI();
    this.healthcheckAPI = healthcheckAPI ? healthcheckAPI: new HealthcheckAPI();
}

Service.prototype = {

    start: function(port) {
        var app = express(),
            locationAPI = this.locationAPI,
            healthcheckAPI = this.healthcheckAPI;

        app.get('/api/countries/:ip', function(request, response) {
            locationAPI.get(request, response);
        });

        app.get('/admin/healthcheck', function(request, response) {
            healthcheckAPI.get(request, response);
        });

        var server = http.createServer(app);
        server.listen(port, function() {
            console.log('Service started on port ' + port);
        });

        return server;
    }
};

module.exports = Service;