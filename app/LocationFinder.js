'use strict';

var geoip = require('geoip-lite');
var countries = require('country-data').countries;

function LocationFinder() {}

LocationFinder.prototype = {
    lookup: function(ip) {

        function getIPdata(single_ip) {

            var geoData = geoip.lookup(single_ip);
        
            var entry = {country: {}};
            entry.country.language = countries[geoData.country].languages[0]; // potential here for multiple languages so limit to first
            entry.country.name = countries[geoData.country].name;
            entry.country.geoname_id = 'tbc'; // maxmind does provide this just not sure how to access yet from the geo lite library:  http://dev.maxmind.com/geoip/geoip2/geoip2-csv-databases/
            entry.country.iso_code = geoData.country;
            entry.host = single_ip;
                
            return entry; 

        }

        var result = [];

        var index;
        for (index = 0; index < ip.length; index++) {
           result.push(getIPdata(ip[index]));
        }

        return result;

    }
};

module.exports = LocationFinder;
