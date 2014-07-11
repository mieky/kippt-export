/*
    Convert "base format" into netscape-bookmarks compatible JSON, and then
    further into Netscape bookmarks HTML format.

    From:

    [
        {
            "title": "list1",
            "clips": [ {clip1}, {clip2} ]
            ]
        },
        {
            "title": "list2",
            "clips": [ {clip3}, {clip4}, {clip5}]
        }
    ]

    To JSON:

    {
        "list1": {
            "contents": {
                "clip1.title": {
                    "url": "clip1.url",
                    "add_date": "clip1.add_date"
                },
                "clip2.title": {
                    "url": "clip2.url",
                    "add_date": "clip2.add_date"
                }
            }
        },
        "list2": {
            "contents": {
                "clip3.title": ...,
                "clip4.title": ...,
                "clip5.title": ...
            }
        }
    }

    To HTML:

    <!DOCTYPE NETSCAPE-Bookmark-file-1>
    <!--This is an automatically generated file.
        It will be read and overwritten.
        Do Not Edit! -->
    <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
    <Title>Bookmarks</Title>
    <H1>Bookmarks</H1>
    <DL><p>
      <DT><H3>list1</H3>
      <DL><p>
      <DT><A HREF="clip1.url" ADD_DATE="clip1.add_date">clip1.title</a>
      <DT><A HREF="clip2.url" ADD_DATE="clip2.add_date">clip2.title</a>
      </DL><p>
      <DT><H3>list2</H3>
      <DL><p>
      <DT><A HREF="clip3.url" ADD_DATE="clip3.add_date">clip3.title</a>
      <DT><A HREF="clip4.url" ADD_DATE="clip4.add_date">clip4.title</a>
      <DT><A HREF="clip5.url" ADD_DATE="clip5.add_date">clip5.title</a>
      </DL><p>
    </DL><p>
*/

var netscape = require('netscape-bookmarks');

function reduceLists(newLists, list) {

    function reduceClips(newClips, clip) {
        newClips[clip.title] = {
            "url": clip.url,
            "add_date": clip.created
        };
        return newClips;
    }

    newLists[list.title] = {
        "contents": list.clips.reduce(reduceClips, {})
    }

    return newLists;
}

module.exports = function baseToNetscapeHtml(input) {
    var output = input.reduce(reduceLists, {});
    return netscape(output);
}
