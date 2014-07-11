# kippt-export

Using the [Kippt API](http://developers.kippt.com/), exports your Kippt Lists into [Netscape Bookmarks](https://github.com/bahamas10/node-netscape-bookmarks) HTML format which, you can import into your web browser – maybe even into another bookmarking service!

## Usage

Requirements:
- Node v0.10+.
- Kippt username (comes with an [API key](developers.kippt.com))

**Install**: `npm install -g kippt-export`

**Run**: `kippt-export <username> <api_key>`

Outputs something like:

```
$ kippt-export mieky 4d76dcf1feef00db9d834d76dcf1fe3ef4d76dcf
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!--This is an automatically generated file.
    It will be read and overwritten.
    Do Not Edit! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<Title>Bookmarks</Title>
<H1>Bookmarks</H1>
<DL><p>
  <DT><H3>iOS Development</H3>
  <DL><p>
  <DT><A HREF="http://www.git-tower.com/blog/xcode-cheat-sheet-detail/" ADD_DATE="1384517308">Xcode Cheat Sheet</a>
  <DT><A HREF="http://stuartkhall.com/posts/an-app-store-experiment" ADD_DATE="1376849383">An App Store Experiment</a>
  <DT><A HREF="http://www.davemark.com/?p=1829" ADD_DATE="1372161155">Resources for Mac and iOS Developers… | Dave Mark's Blog</a>
  </DL><p>
  <DT><H3>Do want</H3>
  <DL><p>
  <DT><A HREF="http://www.hardgraft.com/collections/all/products/flatpack-heritage" ADD_DATE="1381052908">hard graft leather messenger bag for iPad, MacBook Air 11", MacBook Pro 13", MacBook Pro 15" | hard graft</a>
  <DT><A HREF="http://www.knomobags.com/eu/bungo-messenger-leather-brown-15-laptop-bag.html" ADD_DATE="1381051534">Bungo 15" Brown Leather Messenger Bag from KNOMO: Official Store | Men's Brown Leather Messenger Bag | Stylish 15" Laptop Bag | Messenger Laptop Bags | Designed by KNOMO London</a>
  </DL><p>
</DL><p>

```

## Version history

**0.0.2** - Support global install and running directly with "kippt-export".

**0.0.1** – First release, exports bookmarks in Netscape HTML format.

## License

MIT.
