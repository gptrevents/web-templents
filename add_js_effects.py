import re

def add_effects(filepath, template_type):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    js_code_trad = """
  useEffect(() => {
    // 1. Envelope Open Animation
    const overlay = document.querySelector('.si-envelope-overlay');
    const cta = document.querySelector('.si-envelope__cta');
    const musicBtn = document.querySelector('.si-music-btn');
    const audio = document.getElementById('bg-music') || document.querySelector('audio');

    const openEnvelope = () => {
      if (overlay && !overlay.classList.contains('si-opening')) {
        overlay.classList.add('si-opening');
        setTimeout(() => {
          overlay.style.display = 'none';
        }, 1100);
      }
      if (audio) {
        audio.play().catch(e => console.log('Audio error:', e));
      }
    };

    if (cta) cta.addEventListener('click', openEnvelope);
    if (overlay) overlay.addEventListener('click', (e) => {
      if (e.target.closest('.si-envelope__cta') || e.target === overlay || e.target.classList.contains('si-envelope-scene')) {
        openEnvelope();
      }
    });

    if (musicBtn && audio) {
      musicBtn.addEventListener('click', () => {
        if (audio.paused) {
          audio.play();
          musicBtn.classList.add('playing');
        } else {
          audio.pause();
          musicBtn.classList.remove('playing');
        }
      });
    }

    // 2. Real-time Countdown Timer
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

    // 3. Staggered Scroll Observer (Framer Motion Replica Engine)
    const targets = document.querySelectorAll('.si-section, .si-gold-line, .si-gallery__item, .si-countdown__timer, .si-details__item, .si-couple__card, .si-event__card');
    targets.forEach((el, index) => {
      el.classList.add('fm-motion');
      el.classList.add('fm-delay-' + ((index % 4) + 1));
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fm-in-view');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => observer.observe(el));

    // 4. Lightbox
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

    js_code_vijay = """
  useEffect(() => {
    // 1. Grand Entry / Veil Opening Animation
    const entry = document.querySelector('.km-entry');
    const cta = document.querySelector('.km-entry__cta');
    const bell = document.querySelector('.km-bell');
    const audio = document.getElementById('bg-music') || document.querySelector('audio');

    const openVeil = () => {
      if (entry && !entry.classList.contains('km-closing')) {
        entry.classList.add('km-closing');
        setTimeout(() => {
          entry.style.display = 'none';
        }, 1100);
      }
      if (audio) {
        audio.play().catch(e => console.log('Audio error:', e));
        if (bell) bell.setAttribute('aria-pressed', 'true');
      }
    };

    if (cta) cta.addEventListener('click', (e) => { e.stopPropagation(); openVeil(); });
    if (entry) entry.addEventListener('click', openVeil);

    if (bell && audio) {
      bell.addEventListener('click', () => {
        if (audio.paused) {
          audio.play();
          bell.setAttribute('aria-pressed', 'true');
        } else {
          audio.pause();
          bell.setAttribute('aria-pressed', 'false');
        }
      });
    }

    // 2. Real-time Countdown Timer
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

    // 3. Staggered Scroll Observer
    const targets = document.querySelectorAll('section, .km-countdown, .km-gallery__cell, .km-event, .km-parents, .km-hero__content');
    targets.forEach((el, index) => {
      el.classList.add('fm-motion');
      el.classList.add('fm-delay-' + ((index % 4) + 1));
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fm-in-view');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => observer.observe(el));

    // 4. Lightbox
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

    js_code = js_code_trad if template_type == 'trad' else js_code_vijay
    
    # Replace the existing dummy useEffect
    content = re.sub(r'useEffect\(\(\) => \{[^\}]+\}, \[\]\);', js_code, content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

add_effects('src/app/invitation/traditional-invitation/page.tsx', 'trad')
add_effects('src/app/invitation/vijay-rashmika-wedding-invitation/page.tsx', 'vijay')
print("Added JS effects successfully!")
