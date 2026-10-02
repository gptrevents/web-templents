import urllib.request
import re
import os

base = "https://myshaadhilink.in"

# Extract all css
with open("/tmp/vijay_rashmika.html") as f:
    html = f.read()

css_links = re.findall(r'<link[^>]+rel=[\"\x27]stylesheet[\"\x27][^>]+href=[\"\x27]([^\"]+)[\"\x27]', html)
print("Downloading CSS files...")
all_km_css = []
for link in css_links:
    url = base + link if link.startswith("/") else link
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        content = urllib.request.urlopen(req).read().decode("utf-8")
        if "kalyana-mandapam" in content or "km-" in content:
            print(f"Found KM CSS in {link} (len {len(content)})")
            all_km_css.append(content)
    except Exception as e:
        print(f"Failed {link}: {e}")

with open("src/styles/kalyanaMandapam.css", "w") as f:
    f.write("\n\n".join(all_km_css))
print(f"Saved src/styles/kalyanaMandapam.css, total len: {sum(len(c) for c in all_km_css)}")

# Let us find JS chunks that contain KalyanaMandapam component logic
js_scripts = re.findall(r'<script[^>]+src=[\"\x27]([^\"]+)[\"\x27]', html)
print("Scanning JS chunks for kalyana-mandapam...")
km_js_chunks = []
for s in js_scripts:
    url = base + s if s.startswith("/") else s
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        code = urllib.request.urlopen(req).read().decode("utf-8")
        if "kalyana-mandapam" in code or "km-hero" in code:
            print(f"Found KM JS in {s} (len {len(code)})")
            with open(f"/tmp/km_chunk_{os.path.basename(s.split('?')[0])}", "w") as out:
                out.write(code)
    except Exception as e:
        print(f"Failed {s}: {e}")
