'use strict';

var http = require('http');
var express = require('express');
var swaggerUiMiddleware = require('swagger-ui-middleware');
var LocationFinder = require('./LocationFinder');

var Service = {

    create: function(logger, config) {
        var app = express();

        app.use(logger);
        swaggerUiMiddleware.hostUI(app, {overrides: __dirname + '/../swagger-ui/'});

        app.get('/', function(req, res) {
            res.status(200)
                .send('Hello world');
        });

        app.get('/locations/:ip', function(req, res) {

            var locationFinder = new LocationFinder();
          
            res.status(200).json(locationFinder.lookup(req.params.ip));

        });


        app.use(function(req, res) {
            res.status(404)
                .send('File not found!');
        });

        var server = http.createServer(app);
        server.listen(config.get('port'), function() {
            console.log('Service started on port ' + config.get('port'));
        });

        return server;
    }
};

module.exports = Service;