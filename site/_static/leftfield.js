function check_webp_feature(feature, callback) {
    // Test webp feature.
    //   'feature' can be one of 'lossy', 'lossless', 'alpha' or 'animation'.
    //   'callback(feature, isSupported)' will be passed back the detection result (in an asynchronous way!).
    // Copied from https://developers.google.com/speed/webp/faq#in_your_own_javascript
    const kTestImages = {
            lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
            lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
            alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
            animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
        };
        const img = new Image();
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
    
    const ann = document.createElement("div");
    ann.classList.add("bd-header-announcement", "container-fluid", "bd-header-announcement");
    const innerAnn = document.createElement("div");
    innerAnn.classList.add("bd-header-announcement__content");
    innerAnn.innerHTML = innerHtml;
    ann.appendChild(innerAnn);
    
    return ann;
}

function check_webp() {
    // General check for webp support that adds an announcement if not supported.
    sessionStorage.webpSupport = "true";

    const webp_callback = function (feature, isSupported) {

        if (!isSupported && sessionStorage.webpSupport != "false") {
            sessionStorage.webpSupport = "false";
            document.body.insertAdjacentElement("afterbegin", create_announcement());
        }
    }
    check_webp_feature('lossy', webp_callback);
    check_webp_feature('lossless', webp_callback);
    check_webp_feature('alpha', webp_callback);
}

$(document).ready(function () {
    // Event handler to check for webp support when document is ready
     if (!sessionStorage.webpSupport){
        // Only run the download test once per session
        check_webp();
     } else if (sessionStorage.webpSupport == "false") {
        // Download test has previously failed
        document.body.insertAdjacentElement("afterbegin", create_announcement());
     } /*else {
         document.body.insertAdjacentElement("afterbegin", create_announcement("<b>Webp supported</b>"));
     }*/
});

