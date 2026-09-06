(function(){
  if (document.body?.dataset.page !== "luggage") return;
  const ids = [
    "globalNotices","dayScroller","countryTrack","countryScroll","daySummary",
    "eventFilters","eventTimeline","transportFilters","transportList","hotelList",
    "practicalList","budgetSummary","budgetList","foodList","mealList","toast",
    "jumpToday","eventSearch","clearSearch","resetChecks","imageModal","imageModalContent",
    "imageModalCaption","imageModalClose"
  ];
  const tagMap = {
    eventSearch:"input", clearSearch:"button", jumpToday:"button", resetChecks:"button",
    imageModal:"div", imageModalContent:"img", imageModalCaption:"div", imageModalClose:"button",
    toast:"div"
  };
  ids.forEach(id=>{
    if (document.getElementById(id)) return;
    const el=document.createElement(tagMap[id]||"div");
    el.id=id;
    el.hidden=true;
    el.setAttribute("aria-hidden","true");
    document.body.appendChild(el);
  });
})();
