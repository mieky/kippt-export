var _       = require('underscore');
var https   = require('https');
var Promise = require('bluebird');

// Inputs httpOptions, outputs an object with "request" method
function createApiWithHttpOptions(httpOptions) {
    var request = Promise.method(function(method, url) {
        var requestOptions = _.extend({}, httpOptions, {
            'method': method,
            'path': httpOptions.path + url
        });

        // Wrap Node's non-standard https.request in a convenient Promise
        return new Promise(requestResolver);

        function requestResolver(resolve, reject) {
            var request = https.request(requestOptions, function(response) {

                var responseText = '';
                response.on('data', function(chunk) {
                    responseText += chunk;
                });

                response.on('end', function() {
                    // Naively assumes both:
                    // - that the response is parseable JSON; and
                    // - that it contains a property "objects"
                    var responseObj = JSON.parse(responseText);
                    resolve(responseObj.objects);
                });
            });

            request.on('error', function(error) {
                console.log('Problem with request:', error.message);
                reject(error);
            });

            request.end();
        }
    });

    return {
        request: request
    };
}

module.exports = createApiWithHttpOptions;
