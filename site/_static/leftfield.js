// check_webp_feature:
//   'feature' can be one of 'lossy', 'lossless', 'alpha' or 'animation'.
//   'callback(feature, isSupported)' will be passed back the detection result (in an asynchronous way!)
function check_webp_feature(feature, callback) {
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

var allSupported = true;

function check_webp() {
    var webp_callback = function (feature, isSupported) {

//        if (!isSupported && allSupported) {
        if (allSupported) {
            allSupported = false;
            const out_div = document.createElement("div");
            out_div.classList.add("bd-header-announcement", "container-fluid", "bd-header-announcement");
//            out_div.textContent = "No webp support";
            const in_div = document.createElement("div");
            in_div.classList.add("bd-header-announcement__content");
//            in_div.textContent = "This site requires webp support to display images.  Please update your browser.";
            in_div.innerHTML = "<b>This site requires webp support to display images.  Please update your browser.</b>"
            out_div.appendChild(in_div);
//            const main_elem = document.getElementById("main-content");
//            main_elem.insertAdjacentElement("afterend", out_div);
            document.body.insertAdjacentElement("afterbegin", out_div);
            //alert("Site requires webp support.")
            //var elem = document.createElement('span');
            //elem.textContent = "Note: this site requires webp support.";
            //document.body.appendChild(elem);
        }
    }
    check_webp_feature('lossy', webp_callback);
    check_webp_feature('lossless', webp_callback);
    check_webp_feature('alpha', webp_callback);
}
check_webp();
