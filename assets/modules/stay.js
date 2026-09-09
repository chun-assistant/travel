/*
 * Stay module boundary.
 *
 * Stay rendering is owned by the dedicated renderer module. The common runtime
 * remains available for shared utilities, but is no longer a Stay fallback.
 */
(function (root) {
  function copyStayAddress(text) {
    var value = String(text || "");
    function done() {
      var toast = document.querySelector("#toast");
      if (!toast) return;
      toast.textContent = "地址已複製";
      toast.classList.add("show");
      setTimeout(function () { toast.classList.remove("show"); }, 1700);
    }
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      navigator.clipboard.writeText(value).then(done).catch(function () {
        var area = document.createElement("textarea");
        area.value = value;
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        try { document.execCommand("copy"); } catch (e) {}
        area.remove();
        done();
      });
      return;
    }
    var area = document.createElement("textarea");
    area.value = value;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try { document.execCommand("copy"); } catch (e) {}
    area.remove();
    done();
  }

  root.TravelStay = Object.freeze({
    getData: function () {
      return root.TravelStayData && typeof root.TravelStayData.getItems === "function"
        ? root.TravelStayData.getItems()
        : [];
    },
    createRenderer: function () {
      if (!root.TravelStayRenderer) return null;
      return root.TravelStayRenderer.create({
        data: this.getData(),
        escapeHtml: root.escapeHtml,
        statusClass: root.statusClass,
        fmtTwd: root.fmtTwd,
        copyText: copyStayAddress,
        buildDirections: root.buildDirections,
        isAirportPlace: root.isAirportPlace
      });
    },
    render: function () {
      var renderer = this.createRenderer();
      if (renderer) return renderer();
    }
  });
})(window);
