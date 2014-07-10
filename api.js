var _       = require('underscore');
var https   = require('https');
var Promise = require('bluebird');

module.exports = function(options) {
    var apiPromise = Promise.method(function(method, url) {
        var requestOptions = _.extend({}, options, {
            'method': method,
            'path': options.path + url
        });

        return new Promise(function(resolve, reject) {
            var request = https.request(requestOptions, function(response) {

                var responseText = '';
                response.on('data', function(chunk) {
                    responseText += chunk;
                });

                response.on('end', function() {
                    var responseObj = JSON.parse(responseText);
                    resolve(responseObj.objects);
                });
            });

            request.on('error', function(error) {
                console.log('Problem with request:', error.message);
                reject(error);
            });

            request.end();
        });
    });

    return {
        request: apiPromise
    }
};
