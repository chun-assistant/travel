/* Shared runtime core. Daily view and preparation tools live in modules. */
const COUNTRY_STAGES = window.TravelCoreData.getCountryStages();
const PACKING_GROUPS = window.TravelPackingData.getGroups();
const PRINT_GROUPS = window.TravelPrintData.getGroups();
const APP_DATA = window.TravelCoreData.getAppData();
const COMMON_UTILS = window.TravelCommonUtils;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHtml = COMMON_UTILS.escapeHtml;
const fmtTwd = COMMON_UTILS.fmtTwd;
const fmtCost = COMMON_UTILS.fmtCost;
const dateLabel = COMMON_UTILS.dateLabel;
const currentTripDay = COMMON_UTILS.currentTripDay;
const statusClass = COMMON_UTILS.statusClass;
const eventKind = COMMON_UTILS.eventKind;
const filterKind = COMMON_UTILS.filterKind;
const buildDirections = COMMON_UTILS.buildDirections;
const isAirportPlace = COMMON_UTILS.isAirportPlace;
const mapIcon = COMMON_UTILS.mapIcon;
const pinIcon = COMMON_UTILS.pinIcon;
const copyIcon = COMMON_UTILS.copyIcon;
const stored = COMMON_UTILS.stored;
const save = COMMON_UTILS.save;
const toast = COMMON_UTILS.toast;
const copyText = COMMON_UTILS.copyText;
const renderCountdown = COMMON_UTILS.renderCountdown;
const renderNetwork = COMMON_UTILS.renderNetwork;
const bindSegments = COMMON_UTILS.bindSegments;
const bindGuideImages = COMMON_UTILS.bindGuideImages;
const renderPractical = () => window.TravelCommonRuntimeInfo.renderPractical(APP_DATA);
const renderMeals = () => window.TravelCommonRuntimeInfo.renderMeals(APP_DATA);

const state = {
  day: Number(stored("aurora-day")) || 1,
  eventFilter: "全部",
  eventSearch: "",
  transportFilter: "全部",
  checks: stored("aurora-checks") || {},
};

const view = window.TravelCommonRuntimeView.setup({
  $, $$, APP_DATA, COUNTRY_STAGES, state, save, escapeHtml,
  dateLabel, fmtTwd, fmtCost, statusClass, eventKind, filterKind,
  buildDirections, isAirportPlace, mapIcon, pinIcon, copyIcon, copyText
});

const renderNotices = view.renderNotices;
const renderDayView = view.renderDayView;
const renderDayScroller = view.renderDayScroller;
const renderCountryTrack = view.renderCountryTrack;
const enableHorizontalDrag = view.enableHorizontalDrag;
const renderEventFilters = view.renderEventFilters;
const renderEvents = view.renderEvents;
const eventCard = view.eventCard;
const isHotelPlace = view.isHotelPlace;
const isNavigableEvent = view.isNavigableEvent;

const tools = window.TravelCommonRuntimeTools.setup({
  $, $$, APP_DATA, PACKING_GROUPS, PRINT_GROUPS, state, save,
  escapeHtml, fmtTwd, dateLabel, statusClass
});

const initChecks = tools.initChecks;
const renderChecklist = tools.renderChecklist;
const renderBookings = tools.renderBookings;
const renderTax = tools.renderTax;
const renderBudget = tools.renderBudget;
const renderFood = tools.renderFood;

window.TravelDailyRuntime = Object.freeze({
  $: $, $$: $$, escapeHtml: escapeHtml, dateLabel: dateLabel, state: state,
  save: save, renderDayView: renderDayView, renderEvents: renderEvents,
  renderEventFilters: renderEventFilters, copyText: copyText,
  enableHorizontalDrag: enableHorizontalDrag
});

const runtimeInit = window.TravelCommonRuntimeInit.setup({
  $, state, save, currentTripDay, toast, renderCountdown, renderNetwork,
  renderNotices, renderDayView, renderChecklist, renderPractical,
  renderBookings, renderTax, renderBudget, renderFood, renderMeals,
  bindGuideImages, renderEvents, bindSegments
});

runtimeInit.init();
