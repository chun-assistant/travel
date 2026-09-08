/*
 * Shared runtime entry point.
 *
 * Keep this file intentionally tiny: the existing implementation is temporarily
 * kept in common-legacy.js while its data/rendering responsibilities are split
 * into assets/data and assets/modules.
 *
 * This compatibility loader is synchronous so the legacy runtime keeps the exact
 * same initialization order and page behavior during the refactor.
 */
(function () {
  var current = document.currentScript;
  var src = current && current.src;
  var base = src ? src.slice(0, src.lastIndexOf("/") + 1) : "";
  var legacySrc = base + "common-legacy.js";

  if (document.readyState === "loading" && document.write) {
    document.write('<script src="' + legacySrc.replace(/"/g, "&quot;") + '"><\\/script>');
    return;
  }

  var script = document.createElement("script");
  script.src = legacySrc;
  script.async = false;
  document.head.appendChild(script);
})();
