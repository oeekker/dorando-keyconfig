// -*- Mode: ecmascript; indent-tabs-mode: nil; -*-

function f4kc_UpperDirectory() {
  var uri = window._content.location.href;

  if (uri == null) {
    return;
  }

  // cut URI parameter
  if (uri.match(/^(.+?)\?/) != null) {
    uri = RegExp.$1;
  }

  // chop last '/' if exist.
  if (uri.match(/^(.+?)\/$/) != null) {
    uri = RegExp.$1;
  }

  if (uri.match(/^(.+:\/\/.+\/)[^\/]+$/)) {
    var parenturi = RegExp.$1;
    loadURI(parenturi, null, null);
  }
}
