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
                var result = {
                    'httpVersion': response.httpVersion,
                    'httpStatusCode': response.statusCode,
                    'headers': response.headers,
                    'body': '',
                    'trailers': response.trailers,
                 };

                response.on('data', function(chunk) {
                    result.body += chunk;
                });

                response.on('end', function() {
                    resolve(result);
                });

                resolve(result);
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
