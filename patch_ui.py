from pathlib import Path

p = Path("index.html")
s = p.read_text()

# Keep the top notice cards hidden.
s = s.replace(
    '.notice-stack { display: grid; gap: 9px; margin: 0 0 14px; }',
    '.notice-stack { display: none !important; }',
    1,
)

# Day pills use the same country color as the timeline; active pills keep their country color.
s = s.replace(
    '.day-chip.active, .filter-chip.active, .segment.active { color: #fff; background: var(--navy); border-color: var(--navy); box-shadow: 0 8px 18px rgba(16,45,62,.18); }',
    '.filter-chip.active, .segment.active { color: #fff; background: var(--navy); border-color: var(--navy); box-shadow: 0 8px 18px rgba(16,45,62,.18); }',
    1,
)

# If the active selector was already narrowed, keep the patch idempotent.
if '.day-chip.active, .filter-chip.active, .segment.active {' in s:
    raise SystemExit('unexpected active selector remained')

p.write_text(s)
