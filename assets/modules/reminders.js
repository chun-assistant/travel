/*
 * Reminder / checklist module boundary.
 *
 * Phase 1 keeps the existing runtime as the source of truth. This module only
 * provides a stable home for reminder-related logic before extraction.
 */
(function (root) {
  root.TravelReminders = Object.freeze({
    reset: function () {
      if (typeof resetChecks === "function") resetChecks();
    },
    render: function () {
      if (typeof renderChecklist === "function") renderChecklist();
    }
  });
})(window);
