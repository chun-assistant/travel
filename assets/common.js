/*
 * Shared runtime entry point.
 *
 * Keep this file intentionally tiny: the existing implementation is temporarily
 * kept in common-legacy.js while its data/rendering responsibilities are split
 * into assets/data and assets/modules.
 *
 * The legacy runtime is always loaded first and synchronously. On the daily page,
 * Daily modules are then loaded in dependency order without changing legacy timing.
 */
(function () {
  var current = document.currentScript;
  var src = current && current.src;
  var base = src ? src.slice(0, src.lastIndexOf("/") + 1) : "";
  var packingDataSrc = base + "data/packing.js";
  var coreDataSrc = base + "data/core.js";
  var printDataSrc = base + "data/print.js";
  var legacySrc = base + "common-legacy.js";
  var isDailyPage = document.body && document.body.getAttribute("data-page") === "days";
  var isStayPage = document.body && document.body.getAttribute("data-page") === "hotels";

  if (document.readyState === "loading" && document.write) {
    document.write('<script src="' + packingDataSrc + '"><\\/script>');
    document.write('<script src="' + coreDataSrc + '"><\\/script>');
    document.write('<script src="' + printDataSrc + '"><\\/script>');
    document.write('<script src="' + legacySrc.replace(/"/g, "&quot;") + '"><\\/script>');
    document.write('<script src="' + base + 'modules/flight-badges.js' + '"><\\/script>');

    if (isDailyPage) {
      document.write('<script src="' + base + 'modules/daily-event-filters.js"><\\/script>');
      document.write('<script src="' + base + 'modules/runtime-utils.js"><\\/script>');
      document.write('<script src="' + base + 'data/apps.js"><\\/script>');
      document.write('<script src="' + base + 'modules/apps-renderer.js"><\\/script>');
      document.write('<script src="' + base + 'modules/apps.js"><\\/script>');
      document.write('<script src="' + base + 'modules/apps-bootstrap.js"><\\/script>');
      document.write('<script src="' + base + 'data/stay.js"><\\/script>');
      document.write('<script src="' + base + 'modules/stay-renderer.js"><\\/script>');
      document.write('<script src="' + base + 'modules/stay.js"><\\/script>');
      document.write('<script src="' + base + 'modules/stay-bootstrap.js"><\\/script>');
    } else if (isStayPage) {
      document.write('<script src="' + base + 'modules/runtime-utils.js"><\\/script>');
      document.write('<script src="' + base + 'data/stay.js"><\\/script>');
      document.write('<script src="' + base + 'modules/stay-renderer.js"><\\/script>');
      document.write('<script src="' + base + 'modules/stay.js"><\\/script>');
      document.write('<script src="' + base + 'modules/stay-bootstrap.js"><\\/script>');
    }
    return;
  }

  var scripts = [packingDataSrc, printDataSrc, coreDataSrc, legacySrc, base + "modules/flight-badges.js"];
  if (isDailyPage) {
    scripts.push(
      base + "modules/daily-event-filters.js",
      base + "modules/runtime-utils.js",
      base + "data/apps.js",
      base + "modules/apps-renderer.js",
      base + "modules/apps.js",
      base + "modules/apps-bootstrap.js",
      base + "data/stay.js",
      base + "modules/stay-renderer.js",
      base + "modules/stay.js",
      base + "modules/stay-bootstrap.js"
    );
  } else if (isStayPage) {
    scripts.push(
      base + "modules/runtime-utils.js",
      base + "data/stay.js",
      base + "modules/stay-renderer.js",
      base + "modules/stay.js",
      base + "modules/stay-bootstrap.js"
    );
  }

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
