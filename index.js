var _         = require('underscore');
var https     = require('https');
var constants = require('constants');

var args = [].slice.call(process.argv, 2);
if (args.length < 2) {
    console.log("Usage: export <username> <api_token>");
    console.log("Find your API Token here: http://developers.kippt.com/");
    process.exit(1);
}

var https = require('https');
https.globalAgent.options.secureProtocol = 'SSLv3_method';

var options = {
    hostname: "kippt.com",
    path: "/api",
    port: 443,
    agent: false,
    headers: {
        'X-Kippt-Username': args[0],
        'X-Kippt-API-Token': args[1]
    }
}

function apiRequest(method, url, callback) {
    var requestOptions = _.extend({}, options, {
        'method': method,
        'path': options.path + url
    });

    var req = https.request(requestOptions, callback);
    req.on('error', function(e) {
        console.log('Error: ' + e.message, e);
    });
    req.end();
}

apiRequest('get', '/lists', function(res) {
    res.setEncoding('utf8');
    res.on('data', function(d) {
        process.stdout.write(d);
    });
});
