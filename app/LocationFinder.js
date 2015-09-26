var geoip = require('geoip-lite');
var countries = require('country-data').countries;

'use strict';

function LocationFinder() {}

LocationFinder.prototype = {
    lookup: function(ip) {

    	var geoData = geoip.lookup(ip);
    	
    	var result = {country: {}};
    	result.country.language = countries[geoData.country].languages[0]; // potential here for multiple languages so limit to first
    	result.country.name = countries[geoData.country].name;
    	result.country.geoname_id = "tbc" // maxmind does provide this just not sure how to access yet from the geo lite library:  http://dev.maxmind.com/geoip/geoip2/geoip2-csv-databases/
    	result.country.iso_code = geoData.country;
    	result.host = ip
			
		return result; 

    }
};

module.exports = LocationFinder;
