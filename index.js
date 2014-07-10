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

/*
// Get lists
api.request('get', '/lists').then(function(res) {
    var body = JSON.parse(res.body);
    return body["objects"];
})
// Fetch clips for each list:
// { created: 1372161154,
//   user: { ... },
//   is_private: false,
//   collaborators: { count: 0, data: [] },
//   description: null,
//   title: 'iOS Development',
//   rss_url: 'https://kippt.com/mieky/ios-development/feed',
//   slug: 'ios-development',
//   app_url: '/mieky/ios-development',
//   resource_uri: '/api/lists/412954/',
//   updated: 1372161154,
//   id: 412954 }
.map(function(list) {
    console.log("Fetching clips for " + list.title);
    return api.request('get', '/lists/' + list.id + '/clips');
})
.all(function(clips) {
    console.log("Finished, clips: ", clips);
})
.catch(function(err) {
    console.log("Error", err);
});

*/

//  ->

var Promise = require('bluebird');
var items = [
    api.request('get', '/lists/412954/clips'),
    api.request('get', '/lists/282244/clips')
];
Promise.all(items)
    // Get the contained items in each JSON chunk
    .map(function(responseJSON) {
        return responseJSON["objects"];
    })
    // Flatten and pick interesting properties:
    // [[o1x, o2x, o3x], [p1x, p2x, p3x], [q1x, q2x, q3x]] ->
    // [ o1,  o2,  o3,    p1,  p2,  p3,    q1,  q2,  q3]
    .map(function(objects) {
        return Promise.all(objects).map(function(clip) {
            return {
                url: clip.url,
                title: clip.title,
                created: clip.created,
                list: clip.list
            }
        });
    })
    .then(function(clips) {
        console.log("done, clips:", clips);
    })
    .catch(function(err) {
        console.log("error:", err);
    });
