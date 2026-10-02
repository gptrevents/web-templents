import re

with open("/tmp/km_chunk_page-6621cfaed3cd6340.js") as f:
    text = f.read()

def show_section(name, search_str, length=2000):
    pos = text.find(search_str)
    print(f"\n==================== {name} (pos {pos}) ====================")
    if pos != -1:
        print(text[pos - 100:pos + length])

show_section("HERO", 'className:"km-hero km-section"')
show_section("COUPLE", 'className:"km-couple')
show_section("COUNTDOWN", 'className:"km-countdown')
show_section("EVENTS", 'className:"km-events')
show_section("GALLERY", 'className:"km-gallery')
show_section("RSVP", 'className:"km-rsvp')
show_section("FOOTER", 'className:"km-footer')
