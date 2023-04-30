function test_webp_feature(feature, callback) {
    // Test webp feature.
    //   'feature' can be one of 'lossy', 'lossless', 'alpha' or 'animation'.
    //   'callback(feature, isSupported)' will be passed back the detection result (in an asynchronous way!).
    //    Copied from https://developers.google.com/speed/webp/faq#in_your_own_javascript
    var kTestImages = {
            lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
            lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
            alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
            animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
        };
        var img = new Image();
        img.onload = function () {
            var result = (img.width > 0) && (img.height > 0);
            callback(feature, result);
        };
        img.onerror = function () {
            callback(feature, false);
        };
        img.src = "data:image/webp;base64," + kTestImages[feature];
}

function create_announcement(innerHtml) {
    // Return an announcement element.
    // Format was reverse-engineered from pydata-sphinx-theme v0.13.3 generated index.html with 
    // html_theme_options["announcement"] set in conf.py.
    
    if (!innerHtml) innerHtml = "<b>This site requires webp support to display images.  Please update your browser.</b>";
    
    var ann = document.createElement("div");
    ann.classList.add("bd-header-announcement");
    ann.innerHTML = innerHtml;
    
    return ann;
}

var webpSupport = null;

function test_webp_support() {
    // General test for webp support over features.  Adds an announcement if any feature not 
    // supported.
    webpSupport = true;

    var webp_callback = function (feature, isSupported) {

        if (!isSupported && webpSupport != false) {
            webpSupport = false;
            document.body.insertBefore(create_announcement(), document.body.firstChild);
        }
    }
    var features = ["lossy", "lossless", "alpha"];
    features.forEach(function (feature, index) {
        test_webp_feature(feature, webp_callback);
    });
}


function test_search_support() {
    // Disable search button(s) if search not supported.  
    // Support is tested with a basic check for existence of searchtools.js, doctools.js & 
    //  sphinx_highlight.js modules.
    try {
        // try create Search and dependent modules
        var checkList = [Search, Documentation, SphinxHighlight, _ready]; 

        // var msg = "<b>Search ok.</b>";
        // var searchElems = document.getElementsByClassName("search-button");
        // for (var i = 0; i < searchElems.length; i++) {
        //     searchElems[i].style.backgroundColor = "green";
        // }
        // document.body.insertBefore(create_announcement(msg), document.body.firstChild);
    } 
    catch (ex) {
        // hide search buttons
        var searchElems = document.getElementsByClassName("search-button");
        for (var i = 0; i < searchElems.length; i++) {
            // searchElems[i].style.backgroundColor = "red";
            searchElems[i].style.display = "none";
        }

        // msg = "<b>Search not ok.</b>";
        // document.body.insertBefore(create_announcement(msg), document.body.firstChild);
        console.log("Search not supported: " + String(ex));
        // throw(ex);
    }
}

// Override splitQuery in searchtools.js which specifies a unicode regex not supported by all
// browsers
// var splitQuery = function(query) {
//     // change "/[^\p{Letter}\p{Number}_\p{Emoji_Presentation}]+/gu" to ascii only expression 
//     return query.split(/[^A-Za-z0-9_]+/g).filter(function(term) { return term; });
// }

if (document.readyState !== "loading") {
    test_webp_support();
    test_search_support();    
} else {
    document.addEventListener("DOMContentLoaded", test_webp_support);
    document.addEventListener("DOMContentLoaded", test_search_support);
}

