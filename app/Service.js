'use strict';

var http = require('http');
var express = require('express');
var swaggerUiMiddleware = require('swagger-ui-middleware');

var Service = {

    create: function(logger, config) {
        var app = express();

        app.use(logger);
        swaggerUiMiddleware.hostUI(app, {overrides: __dirname + '/../swagger-ui/'});

        app.get('/', function(req, res) {
            res.status(200)
                .send('Hello world');
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