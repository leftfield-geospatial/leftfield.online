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
    ann.classList.add("bd-header-announcement");
    ann.innerHTML = innerHtml;
    
    return ann;
}

var webpSupport = null;

function check_webp() {
    // General check for webp support over features.  Adds an announcement if any feature not supported.
    webpSupport = true;

    const webp_callback = function (feature, isSupported) {

        if (!isSupported && webpSupport != false) {
            webpSupport = false;
            document.body.insertBefore(create_announcement(), document.body.firstChild);
        }
    }
    const features = ["lossy", "lossless", "alpha"]
    features.forEach(function (feature, index) {
        check_webp_feature(feature, webp_callback);
    });
}

check_webp();
