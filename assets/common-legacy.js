/*
 * Legacy runtime compatibility loader.
 *
 * The former monolithic implementation now lives in common-runtime.js so this
 * entry stays small while the runtime is progressively split into modules.
 */
(function () {
  var current = document.currentScript;
  var src = current && current.src;
  var base = src ? src.slice(0, src.lastIndexOf("/") + 1) : "";
  var runtimeSrc = base + "common-runtime.js";

  if (document.readyState === "loading" && document.write) {
    document.write('<script src="' + runtimeSrc.replace(/"/g, "&quot;") + '"><\/script>');
    return;
  }

  var script = document.createElement("script");
  script.src = runtimeSrc;
  script.async = false;
  document.head.appendChild(script);
})();