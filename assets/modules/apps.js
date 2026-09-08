/*
 * Ticket-app module boundary.
 *
 * Rendering remains in common.js for now. The wrapper gives the app section a
 * stable module API without changing the existing page behavior.
 */
(function (root) {
  root.TravelApps = Object.freeze({
    getData: function () {
      return typeof TICKET_APPS !== "undefined" ? TICKET_APPS : [];
    },
    render: function () {
      if (typeof renderTicketApps === "function") renderTicketApps();
    }
  });
})(window);
