/*
 * Legacy runtime compatibility loader.
 *
 * common-runtime.js consumes extracted modules before it initializes,
 * keeping the core runtime small without changing page timing.
 */
(function () {
  var current = document.currentScript;
  var src = current && current.src;
  var base = src ? src.slice(0, src.lastIndexOf("/") + 1) : "";
  var toolsSrc = base + "modules/common-runtime-tools.js";
  var viewSrc = base + "modules/common-runtime-view.js";
  var initSrc = base + "modules/common-runtime-init.js";
  var infoSrc = base + "modules/common-runtime-info.js";
  var runtimeSrc = base + "common-runtime.js";

  if (document.readyState === "loading" && document.write) {
    document.write('<script src="' + toolsSrc.replace(/"/g, "&quot;") + '"><\/script>');
    document.write('<script src="' + viewSrc.replace(/"/g, "&quot;") + '"><\/script>');
    document.write('<script src="' + initSrc.replace(/"/g, "&quot;") + '"><\/script>');
    document.write('<script src="' + infoSrc.replace(/"/g, "&quot;") + '"><\/script>');
    document.write('<script src="' + runtimeSrc.replace(/"/g, "&quot;") + '"><\/script>');
    return;
  }

  var toolsScript = document.createElement("script");
  toolsScript.src = toolsSrc;
  toolsScript.async = false;
  toolsScript.onload = function () {
    var viewScript = document.createElement("script");
    viewScript.src = viewSrc;
    viewScript.async = false;
    viewScript.onload = function () {
      var initScript = document.createElement("script");
      initScript.src = initSrc;
      initScript.async = false;
      initScript.onload = function () {
        var infoScript = document.createElement("script");
        infoScript.src = infoSrc;
        infoScript.async = false;
        infoScript.onload = function () {
          var runtimeScript = document.createElement("script");
          runtimeScript.src = runtimeSrc;
          runtimeScript.async = false;
          document.head.appendChild(runtimeScript);
        };
        document.head.appendChild(infoScript);
      };
      document.head.appendChild(initScript);
    };
    document.head.appendChild(viewScript);
  };
  document.head.appendChild(toolsScript);
})();
