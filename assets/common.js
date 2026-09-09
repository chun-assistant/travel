/*
 * Shared runtime entry point.
 *
 * The monolithic implementation now lives in common-runtime.js. Data files are
 * loaded first so the runtime keeps the same global data boundaries as before.
 * Stay has its own page modules; Daily remains on the legacy runtime path here.
 */
(function () {
  var current = document.currentScript;
  var src = current && current.src;
  var base = src ? src.slice(0, src.lastIndexOf("/") + 1) : "";
  var packingDataSrc = base + "data/packing.js";
  var coreDataSrc = base + "data/core.js";
  var printDataSrc = base + "data/print.js";
  var legacySrc = base + "common-legacy.js";

  if (document.readyState === "loading" && document.write) {
    document.write('<script src="' + packingDataSrc + '"><\/script>');
    document.write('<script src="' + coreDataSrc + '"><\/script>');
    document.write('<script src="' + printDataSrc + '"><\/script>');
    document.write('<script src="' + legacySrc.replace(/"/g, "&quot;") + '"><\/script>');
    return;
  }

  var scripts = [packingDataSrc, printDataSrc, coreDataSrc, legacySrc];
  var index = 0;
  function loadNext() {
    if (index >= scripts.length) return;
    var script = document.createElement("script");
    script.src = scripts[index++];
    script.async = false;
    script.onload = loadNext;
    document.head.appendChild(script);
  }
  loadNext();
})();
