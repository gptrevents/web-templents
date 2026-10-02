import re

with open("/tmp/km_chunk_page-6621cfaed3cd6340.js") as f:
    js = f.read()

# Let us find the component functions inside
# Search for "kalyana-mandapam" or "km-hero"
matches = [m.start() for m in re.finditer(r'kalyana-mandapam', js)]
print("Occurrences of kalyana-mandapam:", len(matches))

for i, pos in enumerate(matches[:5]):
    start = max(0, pos - 200)
    end = min(len(js), pos + 1000)
    print(f"\n--- MATCH {i} ---")
    print(js[start:end])

# Search for component definitions or exports related to kalyana
km_sections = ["km-entry", "km-hero", "km-couple", "km-events", "km-countdown", "km-gallery", "km-video", "km-rsvp", "km-footer", "km-bell"]
for sec in km_sections:
    pos = js.find(sec)
    print(f"Section {sec} at {pos}")
