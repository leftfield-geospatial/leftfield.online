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
    // Format was reverse-engineered from pydata-sphinx-theme v0.13.3 generated index.html with 
    // html_theme_options["announcement"] set in conf.py.
    
    if (!innerHtml) innerHtml = "<b>This site requires webp support to display images.  Please update your browser.</b>";
    
    var ann = document.createElement("div");
    ann.classList.add("bd-header-announcement");
    ann.innerHTML = innerHtml;
    
    return ann;
}

var webpSupported = null;

function webpSupport() {
    // General test for webp support over features.  Adds an announcement if any feature not 
    // supported.
    webpSupported = true;

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
    var searchElems = document.getElementsByClassName("search-button");
    for (var i = 0; i < searchElems.length; i++) {
        searchElems[i].style.backgroundColor = "red";
        // searchElems[i].style.display = "none";
    }
    console.log("Search disabled");
}

function disableTheme() {
    var themeElems = document.getElementsByClassName("theme-switch-button");
    for (var i = 0; i < themeElems.length; i++) {
        themeElems[i].style.backgroundColor = "red";
        // searchElems[i].style.display = "none";
    }
    console.log("Themes disabled");
}

function createScript(scriptFile, scriptLoaded) {
    // adapted from https://humanwhocodes.com/blog/2009/06/23/loading-javascript-without-blocking/
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (script.readyState) {  //IE
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                scriptLoaded();
            }
        };
    } else {  //Others
        script.addEventListener("load", scriptLoaded);
    }
    script.src = scriptFile;
    document.body.appendChild(script);
    return script;
}

function searchSupport() {
    
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

    var scriptLoaded = function(event) {
        // Script onload handler.  Tests for existence of (selected) search objects once all 
        // scripts loaded, then disables search button on failure.  
        
        var allLoaded = true;
        console.log("Script loaded:" + event.srcElement.src);
        for (var scriptFile in searchDict) {
            if (event.srcElement.src.indexOf(scriptFile) >= 0) {
                searchDict[scriptFile].loaded = true;
            }
            allLoaded = allLoaded && searchDict[scriptFile].loaded;
        }
        if (allLoaded) {
            // Test search and dependent objects created successfully
            try {
                var testList = [Search, Documentation, SphinxHighlight, _ready]; 
                console.log("Search supported");
            } 
            catch (ex) {
                disableSearch();        
                console.log("Search not supported: " + String(ex));
            }
            // remove test script elements
            for (var scriptFile in searchDict) {
                // IE does not support element.remove();
                searchDict[scriptFile].scriptElement.parentNode.removeChild(searchDict[scriptFile].scriptElement);
                console.log("Script removed:" + searchDict[scriptFile].scriptElement.src);
            }
        }
    }

    // create and append test script elements
    for (var scriptFile in searchDict) {
        var script = createScript(scriptFile, scriptLoaded);
        searchDict[scriptFile].scriptElement = script;
    }
}

function themeSupport() {
    var themeFile = "_static/scripts/pydata-sphinx-theme.js";
    var supported = true;

    var winError = function (event) {
        console.log("Got error: " + String(event.message) + ", " + String(event.filename));
        // console.log("File: " + String(event.filename));
        // console.log(event);
        if (event.filename.indexOf(themeFile) >= 0) {
            disableSearch();
            disableTheme();
            supported = false;
            console.log("Themes not supported.")
        }
    }
    var scriptLoaded = function(event) {
        // Script onload handler that removes script.          
        console.log("Script loaded:" + event.srcElement.src);
        event.srcElement.parentNode.removeChild(event.srcElement);
        console.log("Script removed:" + event.srcElement.src);
        window.removeEventListener("error", winError);
        console.log("window.onerror removed");
        if (supported) console.log("Themes supported.")
    }

    window.addEventListener("error", winError);
    createScript(themeFile, scriptLoaded);
}

function browserSupport() {
    webpSupport();
    searchSupport();
    themeSupport();    
}

if (document.readyState !== "loading") {
    browserSupport();
} else {
    document.addEventListener("DOMContentLoaded", browserSupport);
}

