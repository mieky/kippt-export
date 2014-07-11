var Promise = require('bluebird');

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

api.lists()
    .then(function(clips) {
        console.log(JSON.stringify(clips, null, 2));
    })
    .catch(function(err) {
        console.log("Error:", err.message);
    });
