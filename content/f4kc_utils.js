// -*- Mode: ecmascript; indent-tabs-mode: nil; Coding: utf-8 -*-

function _f4kcGetTopFrameWindow() {
  return gBrowser.contentWindow;
}


function _f4kcGetFocusedWindow() {
  var focused = document.commandDispatcher.focusedWindow;
  if (focused == null) {
    return _f4kcGetTopFrameWindow();
  } else {
    return focused;
  }
}


function _f4kcGetSelection() {
  var focusedWindow = _f4kcGetFocusedWindow();
  if (focusedWindow == window) {
    focusedWindow = content;
  }
  var selection = focusedWindow.getSelection();
  return selection;
}

// porting from prototype.js
var _f4kcTry = {
  these: function() {
    for (var i = 0; i < arguments.length; i++) {
      var lambda = arguments[i];
      try {
        eval(lambda);
        return;
      } catch(ex) { }
    }
  }
};
