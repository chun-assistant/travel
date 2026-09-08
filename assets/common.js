/*
 * Shared runtime entry point.
 *
 * Keep this file intentionally tiny: the existing implementation remains in
 * common-legacy.js while page-specific responsibilities move into modules.
 *
 * The Stay page is the first live takeover: load the legacy runtime first,
 * then the extracted Stay modules, and finally let the bootstrap replace only
 * the Stay DOM output. Other pages keep the legacy runtime path unchanged.
 */
(function () {
  var current = document.currentScript;
  var src = current && current.src;
  var base = src ? src.slice(0, src.lastIndexOf("/") + 1) : "";
  var scripts = [base + "common-legacy.js"];
  var isStayPage = /\/stay(?:\/|\/index\.html$)/i.test(window.location.pathname || "");

  if (isStayPage) {
    scripts.push(
      base + "modules/runtime-utils.js",
      base + "data/stay.js",
      base + "modules/stay-renderer.js",
      base + "modules/stay.js",
      base + "modules/stay-bootstrap.js"
    );
  }

  function loadNext(index) {
    if (index >= scripts.length) return;
    var script = document.createElement("script");
    script.src = scripts[index];
    script.async = false;
    script.onload = function () { loadNext(index + 1); };
    document.head.appendChild(script);
  }

  if (document.readyState === "loading" && document.write) {
    scripts.forEach(function (script) {
      document.write('<script src="' + script.replace(/"/g, "&quot;") + '"><\\/script>');
    });
    return;
  }

  loadNext(0);
})();
