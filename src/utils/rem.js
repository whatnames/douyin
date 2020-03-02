(function(doc, win) {
  let docEl = doc.documentElement;
  let resizeEvt =
    "orientationchange" in window ? "orientationchange" : "resize";
  let recalc = function() {
    let clientWidth = docEl.clientWidth;
    let k = 750;
    if (!clientWidth) return;
    docEl.style.fontSize = 100 * (clientWidth / k) + "px";
  };
  if (!doc.addEventListener) return;
  recalc();
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);