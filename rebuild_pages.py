from pathlib import Path
import re, subprocess

SOURCE = "35f04d3474eccbb7e298b30baace5ade99579df9"
original = subprocess.check_output(["git", "show", f"{SOURCE}:index.html"], text=True)
style = re.search(r"<style>(.*?)</style>", original, re.S).group(1)
scripts = re.findall(r"<script(?:\s[^>]*)?>(.*?)</script>", original, re.S)
js = "\n\n".join(scripts)

new_init = '''function init() {
      if ($("#countdown")) renderCountdown();
      if ($("#networkBadge")) renderNetwork();
      if ($("#globalNotices")) renderNotices();
      if ($("#dayScroller")) renderDayView();
      if ($("#transportList")) renderTransport();
      if ($("#hotelList")) renderHotels();
      if ($("#ticketAppList")) renderTicketApps();
      if ($("#checklistList")) renderChecklist();
      if ($("#practicalList")) renderPractical();
      if ($("#bookingList")) renderBookings();
      if ($("#taxList")) renderTax();
      if ($("#budgetList")) renderBudget();
      if ($("#foodList")) renderFood();
      if ($("#mealList")) renderMeals();
      if ($("#imageModal")) bindGuideImages();
      const initialTab = document.querySelector(".tab-panel")?.id?.replace(/^tab-/, "") || state.tab;
      showTab(initialTab, false);
      $$(".nav-btn").forEach(btn=>{ if (btn.tagName === "A") return; btn.addEventListener("click",()=>showTab(btn.dataset.tab)); });
      const jump = $("#jumpToday");
      if (jump) jump.addEventListener("click",()=>{state.day=currentTripDay();save("aurora-day",state.day);renderDayView();toast(`已切換 Day ${state.day}`);});
      const search = $("#eventSearch");
      if (search) search.addEventListener("input",e=>{state.eventSearch=e.target.value;renderEvents();});
      const clear = $("#clearSearch");
      if (clear) clear.addEventListener("click",()=>{$("#eventSearch").value="";state.eventSearch="";renderEvents();});
      if ($("#luggageSegments")) bindSegmented("#luggageSegments", "#luggageSub", "luggage");
      if ($("#budgetSegments")) bindSegmented("#budgetSegments", "#budgetSub", "budget");
      const reset = $("#resetChecks");
      if (reset) reset.addEventListener("click",()=>{state.checks={};save("aurora-checks",state.checks);if($("#bookingList"))renderBookings();if($("#checklistList"))renderChecklist();toast("已重設勾選");});
    }
    init();'''
js = re.sub(r"function init\(\) \{.*?\n    \}\n    init\(\);", new_init, js, flags=re.S)

body = re.search(r"<body>(.*?)</body>", original, re.S).group(1)
body = re.sub(r"<script(?:\s[^>]*)?>.*?</script>", "", body, flags=re.S)
header = re.search(r"(<header\b.*?</header>)", body, re.S).group(1)
main_inner = re.search(r"<main>(.*?)</main>", body, re.S).group(1)
starts = list(re.finditer(r'<section class="tab-panel(?: active)?" id="tab-([^"]+)"', main_inner))
if len(starts) != 5:
    raise SystemExit(f"Expected 5 top-level panels, found {len(starts)}")
section_map = {}
for i, m in enumerate(starts):
    end = starts[i+1].start() if i+1 < len(starts) else len(main_inner)
    section_map[m.group(1)] = main_inner[m.start():end].strip()
nav = re.search(r'(<nav class="bottom-nav".*?</nav>)', body, re.S).group(1)
head = re.search(r"<head>(.*?)</head>", original, re.S).group(1)
head = re.sub(r"<style>.*?</style>", '<link rel="stylesheet" href="{css}">', head, flags=re.S)
head = re.sub(r"<script(?:\s[^>]*)?>.*?</script>", "", head, flags=re.S)

nav_routes = {
    'data-tab="days"':'href="../daily/" data-tab="days"',
    'data-tab="transport"':'href="../transport/" data-tab="transport"',
    'data-tab="hotels"':'href="../stay/" data-tab="hotels"',
    'data-tab="luggage"':'href="../prep-tools/" data-tab="luggage"',
    'data-tab="budget"':'href="../budget/" data-tab="budget"',
}
for key, folder in [("days","daily"),("transport","transport"),("hotels","stay"),("luggage","prep-tools"),("budget","budget")]:
    n = nav
    for a,b in nav_routes.items(): n = n.replace(a,b)
    n = n.replace('<button class="nav-btn"','<a class="nav-btn"').replace('</button>','</a>')
    Path(folder).mkdir(exist_ok=True)
    page = f'''<!doctype html>
<html lang="zh-Hant-TW">
<head>{head.replace("{css}","../assets/common.css")}</head>
<body>
<div class="app-shell">{header}<main>{section_map[key]}</main>{n}</div>
<script src="../assets/common.js"></script>
</body>
</html>
'''
    Path(folder,"index.html").write_text(page, encoding="utf-8")

Path("assets/common.css").write_text(style.strip()+"\n", encoding="utf-8")
Path("assets/common.js").write_text(js.strip()+"\n", encoding="utf-8")
Path("index.html").write_text('''<!doctype html>
<html lang="zh-Hant-TW">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>2026 歐洲極光之旅｜18天行程 App</title>
<meta http-equiv="refresh" content="0; url=daily/">
<script>location.replace("daily/");</script>
</head>
<body><p>正在開啟每日行程…</p></body>
</html>
''', encoding="utf-8")
