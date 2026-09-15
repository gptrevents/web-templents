import re
import os
from bs4 import BeautifulSoup

def style_to_object(style_str):
    if not style_str: return "{}"
    styles = []
    for prop in style_str.split(';'):
        if ':' not in prop: continue
        key, val = prop.split(':', 1)
        key = key.strip()
        val = val.strip()
        parts = key.split('-')
        key = parts[0] + ''.join(x.title() for x in parts[1:])
        styles.append(f"{key}: '{val}'")
    return "{{ " + ", ".join(styles) + " }}"

def convert(html_filepath, out_filepath, prefix):
    with open(html_filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    # Extract body content
    body_match = re.search(r'<body[^>]*>(.*?)</body>', html, flags=re.DOTALL | re.IGNORECASE)
    body_html = body_match.group(1) if body_match else html

    soup = BeautifulSoup(body_html, 'html.parser')

    def clean_node(node):
        if hasattr(node, 'attrs'):
            if 'class' in node.attrs:
                node.attrs['className'] = ' '.join(node.attrs['class'])
                del node.attrs['class']
            if 'for' in node.attrs:
                node.attrs['htmlFor'] = node.attrs['for']
                del node.attrs['for']
            if 'style' in node.attrs:
                style_val = node.attrs['style']
                if isinstance(style_val, list): style_val = ' '.join(style_val)
            
            for child in node.children:
                clean_node(child)

    clean_node(soup)
    jsx_str = soup.decode(formatter="html")

    def repl_style(m): return f"style={style_to_object(m.group(1))}"
    jsx_str = re.sub(r'style="([^"]*)"', repl_style, jsx_str)
    
    # Fix SVG attrs
    jsx_str = re.sub(r'stroke-width=', 'strokeWidth=', jsx_str)
    jsx_str = re.sub(r'stroke-linecap=', 'strokeLinecap=', jsx_str)
    jsx_str = re.sub(r'stroke-linejoin=', 'strokeLinejoin=', jsx_str)
    jsx_str = re.sub(r'fill-rule=', 'fillRule=', jsx_str)
    jsx_str = re.sub(r'clip-rule=', 'clipRule=', jsx_str)
    jsx_str = re.sub(r'viewbox=', 'viewBox=', jsx_str)
    
    # Fix self-closing
    jsx_str = re.sub(r'<img([^>]*?)>', r'<img\1 />', jsx_str)
    jsx_str = re.sub(r'<br([^>]*?)>', r'<br\1 />', jsx_str)
    jsx_str = re.sub(r'<hr([^>]*?)>', r'<hr\1 />', jsx_str)
    jsx_str = re.sub(r'<path([^>]*?)>', r'<path\1 />', jsx_str)
    jsx_str = re.sub(r'<circle([^>]*?)>', r'<circle\1 />', jsx_str)
    jsx_str = jsx_str.replace(' />></img />', ' />').replace('></img />', ' />')

    # Fix images
    jsx_str = re.sub(r'src="(image_[a-zA-Z0-9_\-\.]+)"', rf'src="/images/\1"', jsx_str)
    
    # Generate component
    js_effect_trad = """
  useEffect(() => {
    require('@/app/globals.css');
    
    const overlay = document.querySelector('.si-envelope-overlay');
    const cta = document.querySelector('.si-envelope__cta');
    const musicBtn = document.querySelector('.si-music-btn');
    const audio = document.getElementById('bg-music') || document.querySelector('audio');

    const openEnvelope = () => {
      if (overlay && !overlay.classList.contains('si-opening')) {
        overlay.classList.add('si-opening');
        setTimeout(() => { overlay.style.display = 'none'; }, 1100);
      }
      if (audio) audio.play().catch(e => console.log('Audio error:', e));
    };

    if (cta) cta.addEventListener('click', openEnvelope);
    if (overlay) overlay.addEventListener('click', (e) => {
      if (e.target.closest('.si-envelope__cta') || e.target === overlay || e.target.classList.contains('si-envelope-scene')) {
        openEnvelope();
      }
    });

    if (musicBtn && audio) {
      musicBtn.addEventListener('click', () => {
        if (audio.paused) { audio.play(); musicBtn.classList.add('playing'); }
        else { audio.pause(); musicBtn.classList.remove('playing'); }
      });
    }

    const targetDate = new Date('2026-10-26T10:00:00').getTime();
    const numberElems = document.querySelectorAll('.si-countdown__number');
    let timerId;
    if (numberElems.length >= 4) {
      const updateCountdown = () => {
        const now = new Date().getTime();
        let diff = targetDate - now;
        if (diff < 0) diff = 0;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        numberElems[0].textContent = String(days).padStart(2, '0');
        numberElems[1].textContent = String(hours).padStart(2, '0');
        numberElems[2].textContent = String(minutes).padStart(2, '0');
        numberElems[3].textContent = String(seconds).padStart(2, '0');
      };
      updateCountdown();
      timerId = setInterval(updateCountdown, 1000);
    }

    const targets = document.querySelectorAll('.si-section, .si-gold-line, .si-gallery__item, .si-countdown__timer, .si-details__item, .si-couple__card, .si-event__card');
    targets.forEach((el, index) => {
      el.classList.add('fm-motion');
      el.classList.add('fm-delay-' + ((index % 4) + 1));
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('fm-in-view');
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(el => observer.observe(el));

    const lb = document.createElement('div');
    lb.className = 'gptr-lightbox';
    lb.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.88);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity 0.3s ease;padding:20px;';
    lb.innerHTML = '<button style="position:absolute;top:20px;right:24px;color:#fff;font-size:36px;cursor:pointer;background:none;border:none;">&times;</button><img src="" alt="Preview" style="max-width:92vw;max-height:88vh;border-radius:12px;box-shadow:0 24px 48px rgba(0,0,0,0.6);transform:scale(0.92);transition:transform 0.3s ease;">';
    document.body.appendChild(lb);
    const lbImg = lb.querySelector('img');
    lb.addEventListener('click', () => { lb.style.opacity = '0'; lb.style.pointerEvents = 'none'; lbImg.style.transform = 'scale(0.92)'; });
    document.querySelectorAll('.si-gallery__item img').forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        lbImg.src = img.src;
        lb.style.opacity = '1';
        lb.style.pointerEvents = 'auto';
        lbImg.style.transform = 'scale(1)';
      });
    });

    return () => {
      if (timerId) clearInterval(timerId);
      observer.disconnect();
      if(document.body.contains(lb)) document.body.removeChild(lb);
    };
  }, []);
"""

    js_effect_vijay = """
  useEffect(() => {
    require('@/app/globals.css');
    
    const entry = document.querySelector('.km-entry');
    const cta = document.querySelector('.km-entry__cta');
    const bell = document.querySelector('.km-bell');
    const audio = document.getElementById('bg-music') || document.querySelector('audio');

    const openVeil = () => {
      if (entry && !entry.classList.contains('km-closing')) {
        entry.classList.add('km-closing');
        setTimeout(() => { entry.style.display = 'none'; }, 1100);
      }
      if (audio) { audio.play().catch(e => console.log('Audio error:', e)); if (bell) bell.setAttribute('aria-pressed', 'true'); }
    };

    if (cta) cta.addEventListener('click', (e) => { e.stopPropagation(); openVeil(); });
    if (entry) entry.addEventListener('click', openVeil);

    if (bell && audio) {
      bell.addEventListener('click', () => {
        if (audio.paused) { audio.play(); bell.setAttribute('aria-pressed', 'true'); }
        else { audio.pause(); bell.setAttribute('aria-pressed', 'false'); }
      });
    }

    const targetDate = new Date('2026-10-26T10:00:00').getTime();
    const daysElem = document.querySelector('.km-countdown__value--days');
    const hoursElem = document.querySelector('.km-countdown__value--hours');
    const minElem = document.querySelector('.km-countdown__value--minutes');
    const secElem = document.querySelector('.km-countdown__value--seconds');
    let timerId;
    if (daysElem && hoursElem && minElem && secElem) {
      const updateCountdown = () => {
        const now = new Date().getTime();
        let diff = targetDate - now;
        if (diff < 0) diff = 0;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        daysElem.textContent = String(days).padStart(2, '0');
        hoursElem.textContent = String(hours).padStart(2, '0');
        minElem.textContent = String(minutes).padStart(2, '0');
        secElem.textContent = String(seconds).padStart(2, '0');
      };
      updateCountdown();
      timerId = setInterval(updateCountdown, 1000);
    }

    const targets = document.querySelectorAll('section, .km-countdown, .km-gallery__cell, .km-event, .km-parents, .km-hero__content');
    targets.forEach((el, index) => {
      el.classList.add('fm-motion');
      el.classList.add('fm-delay-' + ((index % 4) + 1));
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('fm-in-view');
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(el => observer.observe(el));

    const lb = document.createElement('div');
    lb.className = 'gptr-lightbox';
    lb.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.88);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity 0.3s ease;padding:20px;';
    lb.innerHTML = '<button style="position:absolute;top:20px;right:24px;color:#fff;font-size:36px;cursor:pointer;background:none;border:none;">&times;</button><img src="" alt="Preview" style="max-width:92vw;max-height:88vh;border-radius:12px;box-shadow:0 24px 48px rgba(0,0,0,0.6);transform:scale(0.92);transition:transform 0.3s ease;">';
    document.body.appendChild(lb);
    const lbImg = lb.querySelector('img');
    lb.addEventListener('click', () => { lb.style.opacity = '0'; lb.style.pointerEvents = 'none'; lbImg.style.transform = 'scale(0.92)'; });
    document.querySelectorAll('.km-gallery__cell img').forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        lbImg.src = img.src;
        lb.style.opacity = '1';
        lb.style.pointerEvents = 'auto';
        lbImg.style.transform = 'scale(1)';
      });
    });

    return () => {
      if (timerId) clearInterval(timerId);
      observer.disconnect();
      if(document.body.contains(lb)) document.body.removeChild(lb);
    };
  }, []);
"""

    js_effect = js_effect_trad if prefix == 'traditional-invitation' else js_effect_vijay

    component = f"""'use client';
import React, {{ useEffect }} from 'react';

export default function TemplatePage() {{
{js_effect}
  return (
    <div dangerouslySetInnerHTML={{{{ __html: `{jsx_str.replace('`', '\\`').replace('$', '\\$')}` }}}} />
  );
}}
"""
    os.makedirs(os.path.dirname(out_filepath), exist_ok=True)
    with open(out_filepath, 'w', encoding='utf-8') as f:
        f.write(component)

convert('clean_trad.html', 'src/app/invitation/traditional-invitation/page.tsx', 'traditional-invitation')
convert('clean_vijay.html', 'src/app/invitation/vijay-rashmika-wedding-invitation/page.tsx', 'vijay-rashmika-wedding-invitation')
print("Rebuilt perfectly from clean HTML!")
