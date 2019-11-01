// -*- Mode: ecmascript; indent-tabs-mode: nil; Coding: utf-8 -*-

function f4kc_ToggleCheckBox() {
  var doc = _f4kcGetFocusedWindow().document;

  // ----------------------------------------
  // set id for all checkbox.
  var list = doc.getElementsByTagName('input');
  var allid = new Object;
  for (var i = 0; i < list.length; ++i) {
    if (list[i].type == 'checkbox') {
      list[i].setAttribute('_f4kc_checkbox_id', i);
      allid[i] = true;
    }
  }

  // ----------------------------------------
  // get selection range & collect toggle target.
  var targetid = new Object;
  var targetsize = 0;

  var selection = _f4kcGetSelection();
  for (var idx = 0; idx < selection.rangeCount; ++idx) {
    var selectionRange = selection.getRangeAt(idx);
    var documentFragment = selectionRange.cloneContents();
    var div = (typeof doc.createXULElement === "function") ? doc.createXULElement("div") : doc.createElement("div");
    div.appendChild(documentFragment);
    var list = div.getElementsByTagName('input');

    for (var i = 0; i < list.length; ++i) {
      var id = list[i].getAttribute('_f4kc_checkbox_id');
      if (id != null) {
        targetid[id] = true;
        ++targetsize;
      }
    }
  }
  if (targetsize == 0) {
    targetid = allid;
  }

  // ----------------------------------------
  // toggle checkbox
  var list = _f4kcGetFocusedWindow().document.getElementsByTagName('input');
  for (var i = 0; i < list.length; ++i) {
    var id = list[i].getAttribute('_f4kc_checkbox_id');
    if (id != null && targetid[id]) {
      list[i].checked = ! list[i].checked;
    }
  }
}
