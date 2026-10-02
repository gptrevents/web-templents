import re

with open("/tmp/km_chunk_page-6621cfaed3cd6340.js") as f:
    text = f.read()

def dump_range(filename, search_start, search_end):
    p1 = text.find(search_start)
    p2 = text.find(search_end, p1)
    print(f"{filename}: {p1} to {p2}")
    if p1 != -1 and p2 != -1:
        with open(f"/tmp/{filename}", "w") as out:
            out.write(text[p1:p2 + len(search_end)])

dump_range("km_hero_full.js", "function N(e){var n,t,i;let{entryOpen:o}=e", "loop:!0})")
dump_range("km_couple_full.js", 'className:"km-couple', 'className:"km-countdown')
dump_range("km_countdown_full.js", 'className:"km-countdown', 'className:"km-events')
dump_range("km_events_full.js", 'className:"km-events', 'className:"km-gallery')
