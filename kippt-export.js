#!/usr/bin/env node
var netscaper = require('./netscaper');

var args = [].slice.call(process.argv, 2);
if (args.length < 2) {
    console.log("Usage: kippt-export <username> <api_token>");
    console.log("Find your API Token here: http://developers.kippt.com/");
    process.exit(1);
}

var httpOptions = {
    hostname: "kippt.com",
    path:     "/api",
    port:     443,
    agent:    false,
    headers: {
        'X-Kippt-Username':  args[0],
        'X-Kippt-API-Token': args[1]
    }
};

var api = require('./api')(httpOptions);

api
    .lists()                 // Get Kippt lists & clips in "base format"
    .then(netscaper)         // Convert into Netscape bookmarks HTML
    .then(function(html) {
        process.stdout.write(html);
    });
