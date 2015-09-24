/* global beforeEach, afterEach, describe, it, assert, expect, sinon */

'use strict';

var LocationFinder = require('../../app/LocationFinder');

var LocationAPI = function() {}

LocationAPI.prototype = {

    locationFinder: new LocationFinder(),

    get: function(request, response) {
        function parse(csv) {
            return csv.split(',');
        }
        response.json(this.locationFinder.lookup(parse(request.params.ip)));
    }
}


describe('LocationAPI', function() {

    var locationAPI,
        locationFinder;

    beforeEach(function() {
        locationFinder = new LocationFinder();
        locationAPI = new LocationAPI();
        locationAPI.locationFinder = locationFinder;
    });

    it('should response locationFinder\'s result in the response', function() {

        var request = {
                params: {
                    ip: ''
                }
            },
            response = {
                json: sinon.spy()
            },
            expectedLocation = {};

        sinon.stub(locationFinder, 'lookup', function() {
            return expectedLocation;
        });

        locationAPI.get(request, response);

        expect(response.json).to.have.been.calledWith(expectedLocation);
    });

    it('should pass an ip to LocationFinder\'s lookup', function() {

        // Arrange
        var request = {
                params: {
                    ip: '24.24.24.24'
                }
            },
            response = {
                json: sinon.spy()
            },
            locationFinderLookup = sinon.spy(locationFinder, 'lookup');

        // Act
        locationAPI.get(request, response);

        // Assert
        expect(locationFinderLookup).to.have.been.calledWith(['24.24.24.24']);
    });

    it('should pass multiple ips to LocationFinder\'s lookup', function() {

        // Arrange
        var request = {
                params: {
                    ip: '24.24.24.24,55.55.55.55'
                }
            },
            response = {
                json: sinon.spy()
            },
            locationFinderLookup = sinon.spy(locationFinder, 'lookup');

        // Act
        locationAPI.get(request, response);

        // Assert
        expect(locationFinderLookup).to.have.been.calledWith(['24.24.24.24', '55.55.55.55']);
    });

});