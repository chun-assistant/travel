/*
 * Checklist module boundary.
 *
 * Keep persistence and rendering behavior delegated to the existing runtime
 * until the checklist dependencies are extracted together.
 */
(function (root) {
  root.TravelChecklist = Object.freeze({
    render: function () {
      if (typeof renderChecklist === "function") renderChecklist();
    },
    reset: function () {
      if (typeof resetChecks === "function") resetChecks();
    }
  });
})(window);
