from pathlib import Path

p = Path("index.html")
s = p.read_text()

s = s.replace(
    '<div class="country-scroll"><div class="country-track" id="countryTrack"></div></div>',
    '<div class="country-scroll" id="countryScroll"><div class="country-track" id="countryTrack"></div></div>',
    1,
)
s = s.replace(
    'grid-template-columns: repeat(18, 126px); column-gap: 8px; width: calc(18 * 126px + 17 * 8px + 4px); min-width: calc(18 * 126px + 17 * 8px + 4px);',
    'grid-template-columns: repeat(19, 126px); column-gap: 8px; width: calc(19 * 126px + 18 * 8px + 4px); min-width: calc(19 * 126px + 18 * 8px + 4px);',
)
s = s.replace(
    'grid-column: var(--stage-start) / var(--stage-end); width: auto; min-width: 0;',
    'grid-column: var(--stage-start) / var(--stage-end); grid-row: 1; width: auto; min-width: 0;',
)
s = s.replace(
    'const code={"奧地利":"AT","芬蘭":"FI","挪威":"NO","荷蘭":"NL"}[stage.country]||stage.country;',
    'const code={"奧地利":"奧地利 (Austria)","芬蘭":"芬蘭 (Finland)","挪威":"挪威 (Norway)","荷蘭":"荷蘭 (Netherlands)"}[stage.country]||stage.country;',
)
s = s.replace('el.setPointerCapture?.(e.pointerId);', '')

# Remove the four-item global notice block from the Days view without affecting other notice-style content elsewhere.
s = s.replace(
    '.notice-stack { display: grid; gap: 9px; margin: 0 0 14px; }',
    '.notice-stack { display: none !important; }',
    1,
)

# Match Day 1–18 pills to the country timeline palette. Day 1 and Day 18 are travel/arrival days and stay neutral.
s = s.replace(
    '.day-chip { text-align: left; min-width: 126px; }',
    '.day-chip { text-align: left; min-width: 126px; border-color: color-mix(in srgb, var(--day-color, var(--line)) 38%, var(--line)); background: color-mix(in srgb, var(--day-color, #fff) 13%, #fff); color: color-mix(in srgb, var(--day-color, var(--ink)) 88%, var(--ink)); }\n    .day-chip.active { color: #fff; background: var(--day-color, var(--navy)); border-color: var(--day-color, var(--navy)); box-shadow: 0 8px 18px color-mix(in srgb, var(--day-color, var(--navy)) 25%, transparent); }\n    .day-chip.active small, .day-chip.active .day-place { color: rgba(255,255,255,.82); }',
    1,
)

# Render day pills with the same colors as the corresponding country timeline stages.
old_render = '$("#dayScroller").innerHTML = APP_DATA.overview.map(d => `<button class="day-chip ${d.day===state.day?"active":""}" data-day="${d.day}"><b>Day ${d.day}</b><small>${escapeHtml(dateLabel(d.date))}</small><small class="day-place">${escapeHtml(d.city)}</small></button>`).join("");'
new_render = '''$("#dayScroller").innerHTML = APP_DATA.overview.map(d => {
        const dayStage = d.day >= 2 && d.day <= 3 ? COUNTRY_STAGES[0]
          : d.day >= 4 && d.day <= 8 ? COUNTRY_STAGES[1]
          : d.day >= 9 && d.day <= 14 ? COUNTRY_STAGES[2]
          : d.day >= 15 && d.day <= 17 ? COUNTRY_STAGES[3]
          : null;
        const dayColor = dayStage?.color || "#dbe6e3";
        return `<button class="day-chip ${d.day===state.day?"active":""}" data-day="${d.day}" style="--day-color:${dayColor}"><b>Day ${d.day}</b><small>${escapeHtml(dateLabel(d.date))}</small><small class="day-place">${escapeHtml(d.city)}</small></button>`;
      }).join("");'''
if old_render in s:
    s = s.replace(old_render, new_render, 1)
else:
    raise SystemExit("day scroller render line not found")

start_marker = '      if (dayScroller && countryScroll && !dayScroller.dataset.syncReady) {'
end_marker = '      const d = APP_DATA.overview.find'
start = s.find(start_marker)
end = s.find(end_marker, start)
if start < 0 or end < 0:
    raise SystemExit("timeline sync block not found")

block = '''      if (dayScroller && countryScroll && !dayScroller.dataset.syncReady) {
        dayScroller.dataset.syncReady = "1";
        countryScroll.dataset.syncReady = "1";
        let syncingScroll = false;
        const syncScroll = (source, target) => {
          if (syncingScroll) return;
          const sourceMax = Math.max(1, source.scrollWidth - source.clientWidth);
          const targetMax = Math.max(0, target.scrollWidth - target.clientWidth);
          const progress = Math.max(0, Math.min(1, source.scrollLeft / sourceMax));
          syncingScroll = true;
          target.scrollLeft = progress * targetMax;
          requestAnimationFrame(() => { syncingScroll = false; });
        };
        const syncCountryActive = () => {
          const dayCount = APP_DATA.overview.length;
          const step = 126 + 8;
          const day = Math.max(1, Math.min(dayCount, Math.round(dayScroller.scrollLeft / step) + 1));
          $$(".country-stage", countryScroll).forEach(btn => {
            const startDay = Number(btn.style.getPropertyValue("--stage-start"));
            const endDay = Number(btn.style.getPropertyValue("--stage-end")) - 1;
            btn.classList.toggle("active", day >= startDay && day <= endDay);
          });
        };
        dayScroller.addEventListener("scroll", () => {
          syncScroll(dayScroller, countryScroll);
          syncCountryActive();
        }, {passive:true});
        countryScroll.addEventListener("scroll", () => syncScroll(countryScroll, dayScroller), {passive:true});
        syncCountryActive();
      }
'''
s = s[:start] + block + s[end:]
p.write_text(s)
