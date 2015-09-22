/* global beforeEach, afterEach, describe, it, assert, expect, sinon */

'use strict';

var LocationFinder = require('../../app/LocationFinder');

function getLocation() {
    var locationFinder = new LocationFinder();
    return locationFinder.lookup();
}

describe('getLocationData', function() {

    it('should invoke LocationFinder\'s lookup', function() {

        var request = {},
            response = {},
            locationFinderLookupStub = sinon.spy(LocationFinder.prototype, 'lookup');

        getLocation(request, response);

        expect(locationFinderLookupStub).to.have.been.called;
        locationFinderLookupStub.restore();
    });

    it('should return locationFinder\'s result', function() {

        var request = {},
            response = {},
            expectedLocation = {},
            locationFinderLookupStub = sinon.stub(LocationFinder.prototype, 'lookup', function() {
                return expectedLocation;
            });

        var location = getLocation(request, response);

        expect(location).to.be.eql(expectedLocation);

        locationFinderLookupStub.restore();
    });
});