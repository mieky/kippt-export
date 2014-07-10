var args = [].slice.call(process.argv, 2);
if (args.length < 2) {
    console.log("Usage: export <username> <api_token>");
    console.log("Find your API Token here: http://developers.kippt.com/");
    process.exit(1);
}

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

var api = require('./api')(options);

api.request('get', '/lists').then(function(res) {
    console.log("res:", res);
});
