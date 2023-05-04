function webpFeatureSupport(feature, callback) {
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

function createAnnouncement(innerHtml) {
    // Return an announcement element.
    if (!innerHtml) innerHtml = "<b>This site requires webp support to display images.  Please update your browser.</b>";

    var ann = document.createElement("div");
    ann.classList.add("bd-header-announcement");
    ann.innerHTML = innerHtml;

    return ann;
}

function webpSupport() {
    // General test for webp support over required features.  Adds an announcement if any feature 
    // not supported.
    var webpSupported = true;

    var webp_callback = function (feature, isSupported) {

        if (!isSupported && webpSupported != false) {
            webpSupported = false;
            document.body.insertBefore(createAnnouncement(), document.body.firstChild);
        }
    }
    var features = ["lossy", "lossless", "alpha"];
    features.forEach(function (feature, index) {
        webpFeatureSupport(feature, webp_callback);
    });
}

function disableSearch() {
    // Disable search buttons
    var searchElems = document.getElementsByClassName("search-button");
    for (var i = 0; i < searchElems.length; i++) {
        searchElems[i].style.backgroundColor = "red";
        // searchElems[i].style.display = "none";
    }
}

function disableTheme() {
    // Disable theme buttons
    var themeElems = document.getElementsByClassName("theme-switch-button");
    for (var i = 0; i < themeElems.length; i++) {
        themeElems[i].style.backgroundColor = "red";
        // searchElems[i].style.display = "none";
    }
}

function createScript(scriptFile, scriptLoaded) {
    // Returns a script element
    // adapted from https://humanwhocodes.com/blog/2009/06/23/loading-javascript-without-blocking/
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (script.readyState) {  //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                scriptLoaded();
            }
        };
    } else {  //Others
        script.addEventListener("load", scriptLoaded);
    }
    script.src = scriptFile;
    return script;
}

function searchSupport(urlRoot) {
    // Disable search buttons if search backend is not supported.

    // dictionary of scripts that need to successfully load for search to be supported
    var searchDict = {
        "_static/searchtools.js": {
            scriptElement: null,
            loaded: false,
        },
        // TODO: include these last 2, or assume sphinx has included them?
        // "_static/doctools.js": {
        //     scriptElement: null,
        //     loaded: false,
        // },
        // "_static/sphinx_highlight.js": {
        //     scriptElement: null,
        //     loaded: false,
        // },
    };

    var scriptLoaded = function (event) {
        // Script loaded event handler.  When all scripts are loaded, the search functionality is 
        // tested.  Disables search button on failure.  

        var allLoaded = true;
        console.log("Script loaded:" + event.currentTarget.src);

        for (var scriptFile in searchDict) {
            if (event.currentTarget.src.indexOf(scriptFile) >= 0) {
                searchDict[scriptFile].loaded = true;
            }
            allLoaded = allLoaded && searchDict[scriptFile].loaded;
        }
        if (allLoaded) {
            // Test search and dependent objects created successfully
            try {
                var testList = [Search, Documentation, SphinxHighlight, _ready];
                console.log("Search backend supported");
            }
            catch (ex) {
                disableSearch();
                console.log("Search backend not supported: " + String(ex));
            }
            // remove test script elements
            for (var scriptFile in searchDict) {
                // IE does not support element.remove();
                searchDict[scriptFile].scriptElement.parentNode.removeChild(searchDict[scriptFile].scriptElement);
            }
        }
    }

    // Create and load script(s)
    for (var scriptFile in searchDict) {
        var script = createScript(urlRoot + scriptFile, scriptLoaded);
        searchDict[scriptFile].scriptElement = script;
        document.body.appendChild(script);
    }
}

function themeSupport(urlRoot) {
    // Disable theme and search buttons if theme and/or search form is not supported.

    var themeFile = "_static/scripts/pydata-sphinx-theme.js";
    var enabled = true;

    var winError = function (event) {
        // Global error event listener - disables search and theme buttons if themeFile raises
        // an error.

        // avoid using event `filename` and `message` properties which are not supported in 
        // all browsers
        if (enabled && (!("filename" in event) || event.filename.indexOf(themeFile) >= 0)) {
            disableSearch();
            disableTheme();
            enabled = false;
        }
    }
    var scriptLoaded = function (event) {
        // Script loaded event handler - removes test script from document.
        event.currentTarget.parentNode.removeChild(event.currentTarget);
        window.removeEventListener("error", winError);
        console.log("Script loaded:" + event.currentTarget.src);
        enabled ? console.log("Themes & search form supported.") : 
            console.log("Themes & search form not supported.");
    }

    // listen for errors while loading script
    window.addEventListener("error", winError);
    var script = createScript(urlRoot + themeFile, scriptLoaded);
    document.body.appendChild(script);
}

// function logEventHandlers() {
//     var searchBtns = document.querySelectorAll(".search-button__button")
//     for (var i = 0; i < searchBtns.length; i++) {
//         console.log("searchBtn(" + String(i) + ") onclick: " + String(searchBtns[i].onclick))
//     }

//     // Add the search button overlay event callback
//     var overlay = document.querySelector(".search-button__overlay");
//     if (overlay) {
//         console.log("overlay onclick: " + String(overlay.onclick))
//     }
// }

// Override splitQuery in searchtools.js which specifies a unicode regex not supported by all
// browsers
// TODO: this does not seem to override the searchtools.js version in e.g. firefox v75
// var splitQuery = function(query) {
//     // change "/[^\p{Letter}\p{Number}_\p{Emoji_Presentation}]+/gu" to ascii only expression 
//     return query.split(/[^A-Za-z0-9_]+/g).filter(function(term) { return term; });
// }

function flexGapSupport() {
    // create flex container with row-gap set
    var flex = document.createElement("div");
    flex.style.display = "flex";
    flex.style.flexDirection = "column";
    flex.style.rowGap = "1px";
  
    // create two, elements inside it
    flex.appendChild(document.createElement("div"));
    flex.appendChild(document.createElement("div"));
  
    // append to the DOM (needed to obtain scrollHeight)
    document.body.appendChild(flex);
    var isSupported = flex.scrollHeight === 1; // flex container should be 1px high from the row-gap
    flex.parentNode.removeChild(flex);
  
    return isSupported;
  }
  

function browserSupport() {
    var urlRoot = document.getElementById("documentation_options").getAttribute('data-url_root');
    webpSupport();
    searchSupport(urlRoot);
    themeSupport(urlRoot);
}


if (document.readyState !== "loading") {
    browserSupport();
} else {
    document.addEventListener("DOMContentLoaded", browserSupport);
}

