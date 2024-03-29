var netscaper = require('./netscaper');

var source = [
    {
        "title": "iOS Development",
        "clips": [
            {
                "url": "http://www.git-tower.com/blog/xcode-cheat-sheet-detail/",
                "title": "Xcode Cheat Sheet",
                "created": 1384517308
            },
            {
                "url": "http://stuartkhall.com/posts/an-app-store-experiment",
                "title": "An App Store Experiment",
                "created": 1376849383
            },
            {
                "url": "http://www.davemark.com/?p=1829",
                "title": "Resources for Mac and iOS Developers… | Dave Mark's Blog",
                "created": 1372161155
            }
        ]
    },
    {
        "title": "Do want",
        "clips": [
            {
                "url": "http://www.hardgraft.com/collections/all/products/flatpack-heritage",
                "title": "hard graft leather messenger bag for iPad, MacBook Air 11\", MacBook Pro 13\", MacBook Pro 15\" | hard graft",
                "created": 1381052908
            },
            {
                "url": "http://www.knomobags.com/eu/bungo-messenger-leather-brown-15-laptop-bag.html",
                "title": "Bungo 15\" Brown Leather Messenger Bag from KNOMO: Official Store | Men's Brown Leather Messenger Bag | Stylish 15\" Laptop Bag | Messenger Laptop Bags | Designed by KNOMO London",
                "created": 1381051534
            }
        ]
    }
];

var html = netscaper(source);
console.log(html);
