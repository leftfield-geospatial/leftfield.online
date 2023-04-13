// check_webp_feature:
//   'feature' can be one of 'lossy', 'lossless', 'alpha' or 'animation'.
//   'callback(feature, isSupported)' will be passed back the detection result (in an asynchronous way!)
function check_webp_feature(feature, callback) {
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
    if (!innerHtml) innerHtml = "<b>This site requires webp support to display images.  Please update your browser.</b>";
    const ann = document.createElement("div");
    ann.classList.add("bd-header-announcement", "container-fluid", "bd-header-announcement");
//            ann.textContent = "No webp support";
    const innerAnn = document.createElement("div");
    innerAnn.classList.add("bd-header-announcement__content");
//            innerAnn.textContent = "This site requires webp support to display images.  Please update your browser.";
    innerAnn.innerHTML = innerHtml;
    ann.appendChild(innerAnn);
    return ann;
}

function check_webp() {
    sessionStorage.webpSupport = "true";

    const webp_callback = function (feature, isSupported) {

        if (!isSupported && sessionStorage.webpSupport != "false") {
//        if (allSupported) {
            sessionStorage.webpSupport = "false";
//            innerAnn.textContent = "This site requires webp support to display images.  Please update your browser.";
//            const main_elem = document.getElementById("main-content");
//            main_elem.insertAdjacentElement("afterend", ann);
            document.body.insertAdjacentElement("afterbegin", create_announcement());
            //document.body.appendChild(elem);
        }
    }
    check_webp_feature('lossy', webp_callback);
    check_webp_feature('lossless', webp_callback);
    check_webp_feature('alpha', webp_callback);
}

$(document).ready(function () {
     if (!sessionStorage.webpSupport){
          check_webp();
     } else if (sessionStorage.webpSupport == "false") {
         document.body.insertAdjacentElement("afterbegin", create_announcement());
     } else {
         document.body.insertAdjacentElement("afterbegin", create_announcement("Webp supported"));
     }
    //$('#version-warning-banner').prependTo($('div.document'))
    // document.body.insertAdjacentElement("afterbegin", create_announcement());
//    check_webp();
});

