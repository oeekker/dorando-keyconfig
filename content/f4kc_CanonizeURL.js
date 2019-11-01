// -*- Mode: ecmascript; indent-tabs-mode: nil; Coding: utf-8 -*-

function f4kc_CanonizeURL(suffix) {
  var url = gURLBar.value;

  if (/^(www|http)|\/\s*$/i.test(url)) {
    return;
  }

  if (suffix == undefined) {
    try {
      suffix = gPrefService.getCharPref("browser.fixup.alternate.suffix");
      if (suffix.charAt(suffix.length - 1) != "/") {
        suffix += "/";
      }
    } catch(ex) {
      suffix = ".com/";
    }
  }

  // trim
  url = url.replace(/^\s+/, "").replace(/\s+$/, "");

  var firstSlash = url.indexOf("/");
  if (firstSlash >= 0) {
    url = "http://www." + url.substring(0, firstSlash) + suffix + url.substring(firstSlash + 1, url.length);
  } else {
    url = "http://www." + url + suffix;
  }

  gURLBar.value = url;
}
