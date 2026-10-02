import re

with open("/tmp/km_chunk_page-6621cfaed3cd6340.js") as f:
    js = f.read()

sections = [
    ("entry", 582000, 584500),
    ("hero", 517000, 523000),
    ("couple", 524000, 532000),
    ("countdown", 532000, 536000),
    ("events", 536000, 544000),
    ("gallery", 544000, 549000),
    ("video", 549000, 554000),
    ("rsvp", 554000, 565000),
    ("footer", 579000, 582000),
    ("bell", 585000, 588000),
]

for name, start, end in sections:
    with open(f"/tmp/km_raw_{name}.js", "w") as out:
        out.write(js[start:end])
    print(f"Wrote {name} ({end - start} chars)")
