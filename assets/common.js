/*
 * Shared runtime entry point.
 *
 * Keep the legacy runtime synchronous. The Stay refactor is layered on top of
 * the already-working legacy runtime so APP_DATA and the existing init order
 * are never raced by dynamically injected scripts.
 */
(function () {
  var current = document.currentScript;
  var src = current && current.src;
  var base = src ? src.slice(0, src.lastIndexOf("/") + 1) : "";
  var legacySrc = base + "common-legacy.js";
  var moduleSources = [
    base + "modules/runtime-utils.js?v=20260909-stay1",
    base + "data/stay.js?v=20260909-stay1",
    base + "modules/stay-renderer.js?v=20260909-stay1",
    base + "modules/stay.js?v=20260909-stay1",
    base + "modules/stay-bootstrap.js?v=20260909-stay1"
  ];

  function writeScript(url) {
    document.write('<script src="' + url.replace(/"/g, "&quot;") + '"><\\/script>');
  }

  if (document.readyState === "loading" && document.write) {
    /*
     * Parser-time document.write keeps the legacy script and the new Stay
     * modules in deterministic order:
     * common-legacy -> data/utils -> renderer -> module -> bootstrap.
     */
    writeScript(legacySrc);
    moduleSources.forEach(writeScript);
    return;
  }

  /*
   * Fallback for an unusually late script load. Load each dependency only
   * after the previous script has finished, avoiding the race that caused the
   * Daily/Stay runtime to disappear in the previous attempt.
   */
  var queue = [legacySrc].concat(moduleSources);
  var index = 0;

  function loadNext() {
    if (index >= queue.length) return;
    var script = document.createElement("script");
    script.src = queue[index++];
    script.async = false;
    script.onload = loadNext;
    script.onerror = loadNext;
    document.head.appendChild(script);
  }

  loadNext();
})();
