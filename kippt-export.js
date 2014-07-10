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

api.request('get', '/lists')
    // Map each list into an object { title, clips }
    .map(function(list) {
        return Promise.props({
            title: list.title,
            clips: api.request('get', '/lists/' + list.id + '/clips')
        });
    })
    // Preserve format, but pick only some interesting clip properties
    .map(function(list) {
        return Promise.props({
            title: list.title,
            clips: Promise.all(list.clips).map(function(clip) {
                return {
                    url: clip.url,
                    title: clip.title,
                    created: clip.created
                };
            })
        });
    })
    // Pretty-print
    .then(function(clips) {
        console.log(JSON.stringify(clips, null, 2));
    })
    .catch(function(err) {
        console.log("Error:", err.message);
    });
