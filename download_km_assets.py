import urllib.request
import os

assets = [
    ("https://myshaadhilink.in/assets/kalyana-mandapam/hero-procession-bg-v2.mp4", "public/assets/kalyana-mandapam/hero-procession-bg-v2.mp4"),
    ("https://myshaadhilink.in/assets/kalyana-mandapam/hero-poster.jpg", "public/assets/kalyana-mandapam/hero-poster.jpg"),
    ("https://myshaadhilink.in/assets/kalyana-mandapam/entry-card.jpg", "public/assets/kalyana-mandapam/entry-card.jpg"),
    ("https://myshaadhilink.in/assets/south-indian/mandala-gold.webp", "public/assets/south-indian/mandala-gold.webp"),
    ("https://myshaadhilink.in/assets/kalyana-mandapam/temple-scenery.png", "public/assets/kalyana-mandapam/temple-scenery.png"),
    ("https://myshaadhilink.in/assets/kalyana-mandapam/gold-divider.webp", "public/assets/kalyana-mandapam/gold-divider.webp"),
    ("https://myshaadhilink.in/assets/kalyana-mandapam/countdown-wall.webp", "public/assets/kalyana-mandapam/countdown-wall.webp"),
    ("https://myshaadhilink.in/assets/kalyana-mandapam/gallery-parasol.png", "public/assets/kalyana-mandapam/gallery-parasol.png"),
    ("https://myshaadhilink.in/assets/kalyana-mandapam/video-wall.jpg", "public/assets/kalyana-mandapam/video-wall.jpg"),
    ("https://myshaadhilink.in/assets/kalyana-mandapam/footer-card.jpg", "public/assets/kalyana-mandapam/footer-card.jpg"),
    ("https://myshaadhilink.in/assets/kalyana-mandapam/km-audio-on.png", "public/assets/kalyana-mandapam/km-audio-on.png"),
    ("https://myshaadhilink.in/assets/kalyana-mandapam/km-audio-off.png", "public/assets/kalyana-mandapam/km-audio-off.png"),
    ("https://myshaadhilink.in/assets/kalyana-mandapam/peacock-arch.webp", "public/assets/kalyana-mandapam/peacock-arch.webp"),
    ("https://myshaadhilink.in/assets/kalyana-mandapam/events/haldi-bowl.png", "public/assets/kalyana-mandapam/events/haldi-bowl.png"),
    ("https://myshaadhilink.in/assets/kalyana-mandapam/events/mehendi.png", "public/assets/kalyana-mandapam/events/mehendi.png"),
    ("https://myshaadhilink.in/assets/kalyana-mandapam/events/nadaswaram.png", "public/assets/kalyana-mandapam/events/nadaswaram.png"),
    ("https://myshaadhilink.in/assets/kalyana-mandapam/events/reception-sofa.png", "public/assets/kalyana-mandapam/events/reception-sofa.png"),
    ("https://myshaadhilink.in/assets/kalyana-mandapam/events/sangeet-music.png", "public/assets/kalyana-mandapam/events/sangeet-music.png"),
    ("https://myshaadhilink.in/assets/kalyana-mandapam/events/pooja-plate.png", "public/assets/kalyana-mandapam/events/pooja-plate.png"),
    ("https://myshaadhilink.in/assets/kalyana-mandapam/yatra-foot-left.png", "public/assets/kalyana-mandapam/yatra-foot-left.png"),
    ("https://myshaadhilink.in/assets/kalyana-mandapam/yatra-foot-right.png", "public/assets/kalyana-mandapam/yatra-foot-right.png"),
    ("https://p7fosjg9fjbplnvq.public.blob.vercel-storage.com/synced-media/007088038f-ybhogam-lyrical-srinivasa-kalyanam-songs-nithiin-raashi-khanna-128k_DuAm0R5Y.mp3", "public/assets/kalyana-mandapam/kalyana-vaibhogam.mp3")
]

for url, dest in assets:
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    if os.path.exists(dest) and os.path.getsize(dest) > 1000:
        print(f"Skipping existing {dest}")
        continue
    print(f"Downloading {url} to {dest}...")
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as resp, open(dest, "wb") as out:
            out.write(resp.read())
        print(f"Saved {dest} ({os.path.getsize(dest)} bytes)")
    except Exception as e:
        print(f"Error {url}: {e}")

print("All asset downloads completed!")
