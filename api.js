var _       = require('underscore');
var https   = require('https');
var Promise = require('bluebird');

function createApiWithHttpOptions(httpOptions) {
    var request = Promise.method(function(method, url) {
        var requestOptions = _.extend({}, httpOptions, {
            'method': method,
            'path': httpOptions.path + url
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
        request: request
    }
};

module.exports = createApiWithHttpOptions;
