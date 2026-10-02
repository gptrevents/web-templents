import urllib.request
import re
import json

with open("/tmp/vijay_rashmika.html") as f:
    html = f.read()

km_classes = sorted(list(set(re.findall(r"km-[a-zA-Z0-9_-]+", html))))
print("Total km classes:", len(km_classes))
for c in km_classes:
    print(" ", c)

media = sorted(list(set(re.findall(r"(?:https?://|/assets/)[^\s\"\'<>]+\.(?:mp4|webm|mp3|wav|png|jpg|jpeg|webp|svg)", html))))
print("\nTotal media:", len(media))
for m in media:
    print(" ", m)

# Find CSS links to inspect styles
css_urls = re.findall(r'href="([^"]+\.css[^"]*)"', html)
print("\nCSS URLs:", css_urls)
