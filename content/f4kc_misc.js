// -*- Mode: ecmascript; indent-tabs-mode: nil; -*-

function _f4kc_get_tabControl() {
  if (window.gBrowser) {
    return window.gBrowser.mTabContainer;
  }

  var elem_PageInfo = document.getElementById("tabbox");
  if (elem_PageInfo) {
    return elem_PageInfo._tabs;
  }

  return null;
}

function f4kc_NextTab() {
  var tabControl = _f4kc_get_tabControl();
  if (tabControl != null) {
    tabControl.advanceSelectedTab(1, true);
  }
}

function f4kc_PrevTab() {
  var tabControl = _f4kc_get_tabControl();
  if (tabControl != null) {
    tabControl.advanceSelectedTab(-1, true);
  }
}

function f4kc_OpenHomepageNewTab() {
  delayedOpenTab(gHomeButton.getHomePage());
}

function f4kc_Find() {
  _f4kcTry.these("onFindCmd()",
                 "gFindBar.onFindCmd()");
}

function f4kc_FindNext() {
  // call findNext() instead of onFindAgainCmd() to prevent vexatious open FindBar when search word not found.
  // (onFindAgainCmd() open FindBar when search word not found).
  _f4kcTry.these("findNext()",
                 "gFindBar.findNext()");
}

function f4kc_FindPrevious() {
  // call findPrevious() instead of onFindPreviousCmd() to prevent vexatious open FindBar when search word not found.
  // (onFindPreviousCmd() open FindBar when search word not found).
  _f4kcTry.these("findPrevious()",
                 "gFindBar.findPrevious()");
}

function f4kc_ScrollLineUp() {
  goDoCommand('cmd_scrollLineUp');
}

function f4kc_ScrollLineDown() {
  goDoCommand('cmd_scrollLineDown');
}

function f4kc_ScrollRight() {
  goDoCommand('cmd_scrollRight');
}

function f4kc_ScrollLeft() {
  goDoCommand('cmd_scrollLeft');
}

function f4kc_ScrollPageUp() {
  goDoCommand('cmd_scrollPageUp');
}

function f4kc_ScrollPageDown() {
  goDoCommand('cmd_scrollPageDown');
}

function f4kc_ScrollTop() {
  goDoCommand('cmd_scrollTop');
}

function f4kc_ScrollBottom() {
  goDoCommand('cmd_scrollBottom');
}

function _f4kc_CopyClipboard(text) {
  var gClipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
  gClipboardHelper.copyString(text);
}

function f4kc_CopyCurrentURI() {
  _f4kc_CopyClipboard(window._content.location.href);
}

function f4kc_CopyCurrentTitle() {
  _f4kc_CopyClipboard(window._content.document.title);
}

function f4kc_LoadSubScript(jsfilename) {
  var subScriptLoader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"].getService(Components.interfaces.mozIJSSubScriptLoader);
  subScriptLoader.loadSubScript(jsfilename);
}

function f4kc_PageInfo() {
  BrowserPageInfo();
}

function f4kc_JavaScriptConsole() {
  toJavaScriptConsole();
}

function f4kc_JavaScriptConsoleWithTab() {
  delayedOpenTab('chrome://global/content/console.xul');
}

function f4kc_ClearHTTPAuth() {
  var httpAuthManager = Components.classes['@mozilla.org/network/http-auth-manager;1'].getService(Components.interfaces.nsIHttpAuthManager);
  httpAuthManager.clearAll();
}

function f4kc_ReloadFocusedFrame(forceget /* = false */) {
  if (forceget == undefined) {
    forceget = false;
  }

  var focused = _f4kcGetFocusedWindow();
  focused.location.reload(forceget);
}

function f4kc_ReloadFocusedFrameOverrideCache() {
  f4kc_ReloadFocusedFrame(true);
}

function f4kc_ViewSelectedRegionSource() {
  var selection = _f4kcGetSelection();

  if (selection.rangeCount == 0) {
    goDoCommand('cmd_selectAll');
    selection = _f4kcGetSelection();
    setTimeout("_f4kcGetSelection().removeAllRanges()", 1000);
  }

  var docUrl = null;
  var docCharset = null;
  window.openDialog("chrome://global/content/viewPartialSource.xul",
                    "_blank", "scrollbars,resizable,chrome,dialog=no",
                    docUrl, docCharset, selection, 'selection');
}

function f4kc_ClearJSConsole() {
  // clearConsole for window
  var windowMediator = Components.classes['@mozilla.org/appshell/window-mediator;1'].getService(Components.interfaces.nsIWindowMediator);
  var listWindow = windowMediator.getEnumerator('global:console');
  while (listWindow.hasMoreElements()) {
    var w = listWindow.getNext();
    try {
      w.gConsole.clearConsole();
    } catch(ex) { }
  }

  // clearConsole for tab
  var consoleService = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
  consoleService.logStringMessage(null);
}

function f4kc_Back() {
  BrowserBack();
}

function f4kc_Forward() {
  BrowserForward();
}

function f4kc_Stop() {
  BrowserStop();
}

function f4kc_Reload(force) {
  if (force) {
    BrowserReloadSkipCache();
  } else {
    BrowserReload();
  }
}

function f4kc_BookmarkThisPage() {
  addBookmarkAs(document.getElementById('content'), false);
}

function f4kc_FocusURLBar() {
  openLocation();
}

function f4kc_ViewHistorySidebar() {
  toggleSidebar('viewHistorySidebar');
}

function f4kc_WebSearch() {
  BrowserSearch.webSearch();
}
