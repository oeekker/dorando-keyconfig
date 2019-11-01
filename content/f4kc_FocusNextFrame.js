// -*- Mode: ecmascript; indent-tabs-mode: nil; Coding: utf-8 -*-

var g_f4kcStyle = "margin-left: 3px; z-index: 500; font-size: 40px; font-family: sans-serif; border-color: grey; border-width: 1px; border-style: solid; padding: 0px 3px 0px 3px; color: red; background-color: white; -moz-opacity: 0.2; position: fixed; top: 10px; left: 10px;";
var g_f4kcSpanId = '_f4kc_focused';

function _f4kcIsFramesetWindow(frameWindow) {
  if (frameWindow == null) {
    return false;
  }

  var listElem = frameWindow.document.documentElement.getElementsByTagName('frameset');
  if (listElem != null && listElem.length > 0) {
    return true;
  } else {
    return false;
  }
}

function _f4kcGetListFrameWindowExceptIframe(baseWindow) {
  var listFrameWindow = [];

  if (_f4kcIsFramesetWindow(baseWindow)) {
    var frameWindows = baseWindow.frames;

    for (var i = 0; i < frameWindows.length; ++i) {
      if (_f4kcIsFramesetWindow(frameWindows[i])) {
        var childWindows = _f4kcGetListFrameWindowExceptIframe(frameWindows[i]);
        listFrameWindow = listFrameWindow.concat(childWindows);
      } else {
        listFrameWindow.push(frameWindows[i]);
      }
    }
  }

  return listFrameWindow;
}

function _f4kcClearFocusedSpan() {
  var topFrameWindow = _f4kcGetTopFrameWindow();
  var frameWindows = _f4kcGetListFrameWindowExceptIframe(topFrameWindow);

  for (var i = 0; i < frameWindows.length; ++i) {
    var elem = frameWindows[i].document.getElementById(g_f4kcSpanId);
    if (elem != null) {
      elem.style.display = 'none';
    }
  }
}

function _f4kcSetFocusedSpan(document) {
  var body = document.body;

  var span = document.getElementById(g_f4kcSpanId);
  if (span == null) {
    span = (typeof document.createXULElement === "function") ? document.createXULElement("span") : document.createElement("span");
    body.insertBefore(span, body.firstChild);
    span.innerHTML = "focused";
    span.style.cssText = g_f4kcStyle;
    span.setAttribute('id', g_f4kcSpanId);
  }
  span.style.display = 'inline';
}

function _f4kcSetFocus(window, displayFocusedTextFlag) {
  if (window != null) {
    window.focus();
    if (displayFocusedTextFlag) {
      _f4kcClearFocusedSpan();
      _f4kcSetFocusedSpan(window.document);
    }
  }
}

function _f4kcSetFocus1stFrame() {
  var topFrameWindow = _f4kcGetTopFrameWindow();
  var frameWindows = _f4kcGetListFrameWindowExceptIframe(topFrameWindow);

  var focusWindow = null;
  if (frameWindows[0] != null) {
    _f4kcSetFocus(frameWindows[0], true);
  } else {
    _f4kcSetFocus(topFrameWindow, false);
  }
}

function f4kc_FocusNextFrame() {
  var focused = _f4kcGetFocusedWindow();
  var topFrameWindow = _f4kcGetTopFrameWindow();

  if (focused == null || focused == topFrameWindow) {
    _f4kcSetFocus1stFrame();
    return;
  }

  // get focused frame
  var currentframeindex = -1;
  var frameWindows = _f4kcGetListFrameWindowExceptIframe(topFrameWindow);
  for (var i = 0; i < frameWindows.length; ++i) {
    if (frameWindows[i] == focused) {
      currentframeindex = i;
      break;
    }
  }

  // set focus next frame
  if (currentframeindex > -1) {
    var nextFrameWindow = frameWindows[currentframeindex + 1];
    if (nextFrameWindow != null) {
      _f4kcSetFocus(nextFrameWindow, true);
      return;
    }
  }
  _f4kcSetFocus1stFrame();
}
