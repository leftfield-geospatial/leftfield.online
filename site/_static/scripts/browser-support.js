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

function dispatchEvent(type) {
    // Cross browser event dispatch, adapted from 
    // https://stackoverflow.com/questions/26596123/internet-explorer-9-10-11-event-constructor-doesnt-work
    var event;
    if (typeof(Event) === 'function') {
        event = new Event(type);
    } else {
        event = document.createEvent('Event');
        event.initEvent(type, true, true);
    }
    document.dispatchEvent(event);
}

function webpSupport() {
    // General test for webp support over required features.  Adds an announcement if any feature 
    // not supported.
    var webpSupported = true;

    var webpCallback = function (feature, isSupported) {

        if (!isSupported && webpSupported != false) {
            webpSupported = false;
            document.body.insertBefore(createAnnouncement(), document.body.firstChild);
            // trigger a resize event in case there is a sticky footer that needs to
            // be repositioned - see stickyFoter()
            dispatchEvent("resize");
            // window.resizeBy(0, 0);
        }
    }
    var features = ["lossy", "lossless", "alpha"];
    features.forEach(function (feature, index) {
        webpFeatureSupport(feature, webpCallback);
    });
}

function disableSearch() {
    // Disable search buttons
    var searchElems = document.getElementsByClassName("search-button");
    for (var i = 0; i < searchElems.length; i++) {
        // searchElems[i].style.backgroundColor = "red";
        searchElems[i].style.display = "none";
    }
}

function disableTheme() {
    // Disable theme buttons
    var themeElems = document.getElementsByClassName("theme-switch-button");
    for (var i = 0; i < themeElems.length; i++) {
        // themeElems[i].style.backgroundColor = "red";
        themeElems[i].style.display = "none";
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

function getUrlRoot() {
    if (DOCUMENTATION_OPTIONS && ("URL_ROOT" in DOCUMENTATION_OPTIONS)) {
        return DOCUMENTATION_OPTIONS.URL_ROOT;
    } else {
        return document.getElementById("documentation_options").getAttribute('data-url_root');
    }
}

function searchSupport() {
    // Disable search buttons if search backend is not supported.

    var urlRoot = getUrlRoot();

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

function themeSupport() {
    // Disable theme and search buttons if theme and/or search form is not supported.

    var urlRoot = getUrlRoot();
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

function stickyHeader() {
    // Make the header sticky if `position: sticky` is not supported.
    // Adapted from: https://www.w3schools.com/howto/howto_js_sticky_header.asp.

    // test if `position: sticky` is supported
    var elem = document.createElement('div');
    elem.style.position = "sticky";

    // return if supported
    if (elem.style.position == "sticky"){ 
        console.log("`position: sticky` supported: " + elem.style.position);
        return;
    }

    // get the header & offset
    var header = document.getElementsByClassName("bd-header");
    if (header.length == 0) return;
    header = header[0];
    var headerOffset = null;

    // add the sticky class to the header when you reach its scroll position. 
    // remove "sticky" when you leave the scroll position.
    function onWindowScroll () {
        // header offset is affected by webp announcement which may not have been added yet,
        // so leave getting its value until a scroll event.
        if (!headerOffset) headerOffset = header.offsetTop;

        if (window.pageYOffset > headerOffset) {
            header.classList.add("sticky-header");
        } else {
            header.classList.remove("sticky-header");
        }
    }
    window.onscroll = onWindowScroll;
    console.log("`position: sticky` not supported");
}

function stickyFooter() {
    // Make the footer sticky if the main container is not in flex mode with `flex-grow: 1`
    // (`flex-grow: 1`is what pushes the footer to the bottom of the window).

    // return if main container is in flex mode with `flex-grow: 1` style
    var content = document.getElementsByClassName("bd-container");
    if (content.length > 0) {
        var mainStyle = getComputedStyle(content[0]);
        if (mainStyle.display == "flex" && "flexGrow" in mainStyle && mainStyle.flexGrow == 1) {
            console.log("Main content has `flex-grow: 1` style");
            return;
        }
    } else return;
     
    // get the footer element
    var footer = document.getElementsByClassName("bd-footer");
    if (footer.length == 0) return;
    footer = footer[0];
    content = content[0];

    function onWindowResize () {
        // y co-ord of bottom of main content
        var contentBottom = content.offsetTop + content.offsetHeight;
        // y co-ord of top of footer if it was positioned at bottom of view port
        var footerTop = window.innerHeight - footer.offsetHeight;
        // var footerTop = document.documentElement.clientHeight - footer.offsetHeight;
        // console.log("contentBottom: " + String(contentBottom));
        // console.log("footerTop: " + String(footerTop));

        // if footer fits in view port, fix it to the bottom, else leave it in normal flow, 
        // positioned after the main content. 
        if (footer.style.position != "fixed" && contentBottom < footerTop) {
            footer.style.position = "fixed";
            footer.style.bottom = 0;
            // console.log("onWindowResize - fixed");
        } else if (footer.style.position != "static" && contentBottom >= footerTop) {
            footer.style.position = "static";
            // console.log("onWindowResize - static");
        }
    }
    window.onresize = onWindowResize;

    // initialise footer when all content (incl images etc) is finished loading
    if (document.readyState == "complete") {
        onWindowResize();
    } else {
        window.addEventListener("load", onWindowResize, false);
        // also initialise now to prevent it jumping on "load" where content < view height
        onWindowResize();  
    }
    console.log("Main content has no `flex-grow: 1` style");
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

function _documentReady(callback) {
    // ... document.body != null is a work around for an IE 10 issue where 
    // document.readyState == "interactive" but there are no elements in the body
    if (document.readyState != "loading" & document.body != null) {
        callback();
    } else {
        document.addEventListener("DOMContentLoaded", callback, false);
    }
}

// run each support fn in parallel in it's own handler
_documentReady(webpSupport);
_documentReady(searchSupport);
_documentReady(themeSupport);
_documentReady(stickyHeader);
_documentReady(stickyFooter);
