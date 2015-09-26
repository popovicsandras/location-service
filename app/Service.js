'use strict';

var http = require('http');
var express = require('express');
var LocationAPI = require('./LocationAPI');

function Service(locationAPI) {
    this.locationAPI = locationAPI ? locationAPI: new LocationAPI();
}

Service.prototype = {

    start: function(port) {
        var app = express(),
            locationAPI = this.locationAPI;

        // ****old code before fetch****
        // app.get('/', function(req, res) {
        //     res.status(200)
        //         .send('Hello world');
        // });

        // app.get('/locations/:ip', function(req, res) {

        //     var locationFinder = new LocationFinder();
          
        //     res.status(200).json(locationFinder.lookup(req.params.ip));

        // });


        // app.use(function(req, res) {
        //     res.status(404)
        //         .send('File not found!');

        app.get('/api/countries/:ip', function(request, response) {
            locationAPI.get(request, response);
        });

        var server = http.createServer(app);
        server.listen(port, function() {
            console.log('Service started on port ' + port);
        });

        return server;
    }
};

module.exports = Service;