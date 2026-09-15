'use client';
import React, { useEffect } from 'react';

export default function TemplatePage() {

  useEffect(() => {
    const entry = document.querySelector('.km-entry') as HTMLElement | null;
    const cta = document.querySelector('.km-entry__cta');
    const bell = document.querySelector('.km-bell');
    const audio = (document.getElementById('bg-music') || document.querySelector('audio')) as HTMLAudioElement | null;

    const openVeil = () => {
      if (entry && !entry.classList.contains('km-closing')) {
        entry.classList.add('km-closing');
        setTimeout(() => { entry.style.display = 'none'; }, 1100);
      }
      if (audio) { audio.play().catch((e: any) => console.log('Audio error:', e)); if (bell) bell.setAttribute('aria-pressed', 'true'); }
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
    let timerId: any = null;
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
    const lbImg = lb.querySelector('img') as HTMLImageElement | null;
    lb.addEventListener('click', () => { lb.style.opacity = '0'; lb.style.pointerEvents = 'none'; if (lbImg) lbImg.style.transform = 'scale(0.92)'; });
    document.querySelectorAll('.km-gallery__cell img').forEach(imgEl => {
      const img = imgEl as HTMLImageElement;
      img.style.cursor = 'pointer';
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        if (lbImg) {
          lbImg.src = img.src;
          lb.style.opacity = '1';
          lb.style.pointerEvents = 'auto';
          lbImg.style.transform = 'scale(1)';
        }
      });
    });

    return () => {
      if (timerId) clearInterval(timerId);
      observer.disconnect();
      if(document.body.contains(lb)) document.body.removeChild(lb);
    };
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: `<div hidden=""><!--\$--><!--/\$--></div><!--\$--><!--/\$--><div class="kalyana-mandapam __variable_0ccb75 __variable_e9ff3d __variable_a10525 __variable_8d80e8"><section class="km-hero km-section"><div class="km-hero__video" style="position: absolute; inset: 0;"><video aria-hidden="true" disableremoteplayback="" muted="" playsinline="" preload="auto" style="position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none;" webkit-playsinline="true"><source src="/media/hero-procession-bg-hevc.mp4" type='video/mp4; codecs="hvc1"'/><source src="/media/hero-procession-bg-v2.mp4" type="video/mp4"/></video><canvas style="position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; display: block;"></canvas></div><div class="km-hero__scrim"></div><div class="km-hero__content km-container"><p class="km-hero__invocation km-font-serif">|| Shree Ganeshay Namah ||</p><h1 class="km-hero__name km-hero__groom km-font-script"><span class="km-hero__char">V</span><span class="km-hero__char">i</span><span class="km-hero__char">j</span><span class="km-hero__char">a</span><span class="km-hero__char">y</span></h1><p class="km-hero__amp km-font-script">&amp;</p><h1 class="km-hero__name km-hero__bride km-font-script"><span class="km-hero__char">R</span><span class="km-hero__char">a</span><span class="km-hero__char">s</span><span class="km-hero__char">h</span><span class="km-hero__char">m</span><span class="km-hero__char">i</span><span class="km-hero__char">k</span><span class="km-hero__char">a</span></h1><p class="km-hero__date km-font-heading">Monday, October 26, 2026</p><p class="km-hero__venue"><span class="km-hero__venue-at km-font-serif">at</span> <span class="km-font-label">ITC Mementos, Udaipur, Rajasthan, India</span></p></div></section><section class="km-couple km-section"><div aria-hidden="true" class="km-frame"><div class="km-frame-rail km-frame-rail--top"></div><div class="km-frame-rail km-frame-rail--bottom"></div><div class="km-frame-rail km-frame-rail--left"></div><div class="km-frame-rail km-frame-rail--right"></div><div class="km-frame-corner km-frame-corner--tl"></div><div class="km-frame-corner km-frame-corner--tr"></div><div class="km-frame-corner km-frame-corner--bl"></div><div class="km-frame-corner km-frame-corner--br"></div></div><img alt="" aria-hidden="true" class="km-couple__scenery km-couple__scenery--top" decoding="async" loading="lazy" src="/images/temple-scenery.png"/ /><img alt="" aria-hidden="true" class="km-couple__scenery km-couple__scenery--bottom" decoding="async" loading="lazy" src="/images/temple-scenery.png"/ /><svg aria-hidden="true" class="km-couple__bird km-couple__bird--1" viewBox="0 0 20 7"><path d="M1 5.5 Q 5.5 1, 10 5 Q 14.5 1, 19 5.5" fill="none" stroke="#c9ad77" stroke-linecap="round" stroke-width="1.4" /></path></svg><svg aria-hidden="true" class="km-couple__bird km-couple__bird--2" viewBox="0 0 20 7"><path d="M1 5.5 Q 5.5 1, 10 5 Q 14.5 1, 19 5.5" fill="none" stroke="#c9ad77" stroke-linecap="round" stroke-width="1.4" /></path></svg><svg aria-hidden="true" class="km-couple__bird km-couple__bird--3" viewBox="0 0 20 7"><path d="M1 5.5 Q 5.5 1, 10 5 Q 14.5 1, 19 5.5" fill="none" stroke="#c9ad77" stroke-linecap="round" stroke-width="1.4" /></path></svg><div class="km-container km-couple__inner"><h2 class="km-couple__heading km-font-heading">The Couple</h2><p class="km-couple__sub km-font-serif">Two families, many blessings, one<!-- --> <!-- -->timeless<!-- --> celebration.</p><div class="km-couple__unit"><div class="km-couple__card"><div aria-hidden="true" class="km-couple__halo"></div><div class="km-couple__photo-window"><img alt="Vijay Deverakonda" class="km-couple__photo" decoding="async" loading="lazy" src="/images/618dff4e0d-534536433_18324616675238653_1023307852965625301_n.jpg"/ /></div><img alt="" aria-hidden="true" class="km-couple__ornament" decoding="async" loading="lazy" src="/images/peacock-arch.webp"/ /></div><div class="km-couple__meta"><h3 class="km-couple__name km-font-script">Vijay Deverakonda</h3><p class="km-couple__parent-label km-font-label">Son of</p><p class="km-couple__parents km-font-serif">Deverakonda Govardhan Rao &amp; Deverakonda Madhavi</p></div></div><div class="km-couple__unit"><img alt="" aria-hidden="true" class="km-couple__divider" decoding="async" loading="lazy" src="/images/gold-divider.webp"/ /><div class="km-couple__card km-couple__card--mirror"><div aria-hidden="true" class="km-couple__halo"></div><div class="km-couple__photo-window"><img alt="Rashmika Mandanna" class="km-couple__photo" decoding="async" loading="lazy" src="/images/c4cc91ddfb-654209778_18573193186045304_3648194887087051682_n.jpg"/ /></div><img alt="" aria-hidden="true" class="km-couple__ornament" decoding="async" loading="lazy" src="/images/peacock-arch.webp"/ /></div><div class="km-couple__meta"><h3 class="km-couple__name km-font-script">Rashmika Mandanna</h3><p class="km-couple__parent-label km-font-label">Daughter of</p><p class="km-couple__parents km-font-serif">Madan Mandanna &amp; Suman Mandanna</p></div></div></div></section><section class="km-countdown"><div class="km-countdown__stage"><img alt="" aria-hidden="true" class="km-countdown__panel" decoding="async" loading="lazy" src="/images/countdown-wall.webp"/ /><div class="km-countdown__unit" style="left: 16.17%; width: 11.5%; top: 52%; height: 24%;"><span class="km-countdown__value km-countdown__value--days">41</span></div><div class="km-countdown__unit" style="left: 34.68%; width: 11.5%; top: 52%; height: 24%;"><span class="km-countdown__value km-countdown__value--hours">00</span></div><div class="km-countdown__unit" style="left: 53.19%; width: 11.5%; top: 52%; height: 24%;"><span class="km-countdown__value km-countdown__value--minutes">36</span></div><div class="km-countdown__unit" style="left: 71.19%; width: 11.5%; top: 52%; height: 24%;"><span class="km-countdown__value km-countdown__value--seconds">07</span></div></div></section><section class="km-events km-section"><div aria-hidden="true" class="km-events__kolam"></div><div aria-hidden="true" class="km-frame"><div class="km-frame-rail km-frame-rail--top"></div><div class="km-frame-rail km-frame-rail--bottom"></div><div class="km-frame-rail km-frame-rail--left"></div><div class="km-frame-rail km-frame-rail--right"></div><div class="km-frame-corner km-frame-corner--tl"></div><div class="km-frame-corner km-frame-corner--tr"></div><div class="km-frame-corner km-frame-corner--bl"></div><div class="km-frame-corner km-frame-corner--br"></div></div><div class="km-container"><h2 class="km-events__heading km-font-script">The Wedding Journey</h2><p class="km-events__sub km-font-serif">Walk with us, function to function, to the sacred hour.</p></div><div class="km-events__stage" style="aspect-ratio: 400 / 1083;"><svg aria-hidden="true" class="km-events__svg" preserveaspectratio="none" viewBox="0 0 400 1083"><path class="km-events__path" d="M 200 52 C 200 144.5, 118 144.5, 118 237 C 118 362, 282 362, 282 487 C 282 612, 118 612, 118 737 C 118 862, 282 862, 282 987 C 282 1035, 200 1035, 200 1083" fill="none" stroke="none" /></path></svg><div class="km-events__stop km-events__stop--left" style="top: 21.88365650969529%;"><div aria-hidden="true" class="km-events__medallion" style="left: 29.5%;"><img alt="" class="km-events__medallion-art" decoding="async" loading="lazy" src="/images/mehendi.png"/ /></div><div class="km-events__card"><div class="km-events__card-head"><h3 class="km-events__name km-font-heading">Mehendi</h3></div><p class="km-events__when km-font-serif"><span class="km-events__when-date">24th February 2026</span><span aria-hidden="true" class="km-events__when-sep"> &middot; </span><span class="km-events__when-time">5:00&nbsp;PM onwards</span></p><p class="km-events__venue km-font-serif">ITC Mementos, Udaipur</p><a class="km-events__map km-font-label" href="https://maps.app.goo.gl/XaQmk5ifYLZmsPuAA" rel="noopener noreferrer" target="_blank"><svg aria-hidden="true" class="lucide lucide-map-pin" fill="none" height="9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="9" xmlns="http://www.w3.org/2000/svg"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /></path><circle cx="12" cy="10" r="3" /></circle></svg>View Map</a></div></div><div class="km-events__stop km-events__stop--right" style="top: 44.96768236380424%;"><div aria-hidden="true" class="km-events__medallion" style="left: 70.5%;"><img alt="" class="km-events__medallion-art" decoding="async" loading="lazy" src="/images/haldi-bowl.png"/ /></div><div class="km-events__card"><div class="km-events__card-head"><h3 class="km-events__name km-font-heading">Haldi &amp; Sangeet</h3></div><p class="km-events__when km-font-serif"><span class="km-events__when-date">25th February 2026</span><span aria-hidden="true" class="km-events__when-sep"> &middot; </span><span class="km-events__when-time">10:48&nbsp;AM</span></p><p class="km-events__venue km-font-serif">ITC Mementos, Udaipur</p><a class="km-events__map km-font-label" href="https://maps.app.goo.gl/XaQmk5ifYLZmsPuAA" rel="noopener noreferrer" target="_blank"><svg aria-hidden="true" class="lucide lucide-map-pin" fill="none" height="9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="9" xmlns="http://www.w3.org/2000/svg"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /></path><circle cx="12" cy="10" r="3" /></circle></svg>View Map</a></div></div><div class="km-events__stop km-events__stop--left" style="top: 68.05170821791322%;"><div aria-hidden="true" class="km-events__medallion" style="left: 29.5%;"><img alt="" class="km-events__medallion-art" decoding="async" loading="lazy" src="/images/nadaswaram.png"/ /></div><div class="km-events__card"><div class="km-events__card-head"><h3 class="km-events__name km-font-heading">Telugu Wedding</h3></div><p class="km-events__when km-font-serif"><span class="km-events__when-date">26th February 2026</span><span aria-hidden="true" class="km-events__when-sep"> &middot; </span><span class="km-events__when-time">10:00&nbsp;AM onwards</span></p><p class="km-events__venue km-font-serif">ITC Mementos, Udaipur</p><a class="km-events__map km-font-label" href="https://maps.app.goo.gl/XaQmk5ifYLZmsPuAA" rel="noopener noreferrer" target="_blank"><svg aria-hidden="true" class="lucide lucide-map-pin" fill="none" height="9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="9" xmlns="http://www.w3.org/2000/svg"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /></path><circle cx="12" cy="10" r="3" /></circle></svg>View Map</a></div></div><div class="km-events__stop km-events__stop--right" style="top: 91.13573407202216%;"><div aria-hidden="true" class="km-events__medallion" style="left: 70.5%;"><img alt="" class="km-events__medallion-art" decoding="async" loading="lazy" src="/images/nadaswaram.png"/ /></div><div class="km-events__card"><div class="km-events__card-head"><h3 class="km-events__name km-font-heading">Kodava Ceremony</h3></div><p class="km-events__when km-font-serif"><span class="km-events__when-date">26th February 2026 &mdash; Evening</span><span aria-hidden="true" class="km-events__when-sep"> &middot; </span><span class="km-events__when-time">6:30&nbsp;PM onwards</span></p><p class="km-events__venue km-font-serif">ITC Mementos, Udaipur</p><a class="km-events__map km-font-label" href="https://maps.app.goo.gl/XaQmk5ifYLZmsPuAA" rel="noopener noreferrer" target="_blank"><svg aria-hidden="true" class="lucide lucide-map-pin" fill="none" height="9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="9" xmlns="http://www.w3.org/2000/svg"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /></path><circle cx="12" cy="10" r="3" /></circle></svg>View Map</a></div></div></div></section><section class="km-gallery km-section"><div aria-hidden="true" class="km-gallery__toranam"></div><div class="km-container"><h2 class="km-gallery__heading km-font-script">Before the Vows</h2><p class="km-gallery__sub km-font-serif">Little moments from the years that brought us here.</p></div><div aria-hidden="true" class="km-gallery__weave"></div><div aria-hidden="true" class="km-gallery__motes"><span class="km-gallery__mote"></span><span class="km-gallery__mote"></span><span class="km-gallery__mote"></span><span class="km-gallery__mote"></span><span class="km-gallery__mote"></span><span class="km-gallery__mote"></span><span class="km-gallery__mote"></span><span class="km-gallery__mote"></span><span class="km-gallery__mote"></span><span class="km-gallery__mote"></span><span class="km-gallery__mote"></span><span class="km-gallery__mote"></span></div><img alt="" aria-hidden="true" class="km-gallery__parasol" decoding="async" loading="lazy" src="/images/gallery-parasol.png"/ /><div class="km-gallery__stage"><div class="km-gallery__grid"><button aria-label="Open photo 1 of 10" class="km-gallery__cell km-gallery__cell--feature" data-col="0" type="button"><img alt="" class="km-gallery__img" data-nimg="fill" decoding="async" loading="lazy" sizes="(min-width: 640px) 310px, 50vw" src="/images/image_8.jpg" style="position: absolute; height: 100%; width: 100%; left: 0; top: 0; right: 0; bottom: 0; color: transparent;"/ /><span aria-hidden="true" class="km-gallery__frame"></span></button><button aria-label="Open photo 2 of 10" class="km-gallery__cell" data-col="1" type="button"><img alt="" class="km-gallery__img" data-nimg="fill" decoding="async" loading="lazy" sizes="(min-width: 640px) 310px, 50vw" src="/images/image_4.jpg" style="position: absolute; height: 100%; width: 100%; left: 0; top: 0; right: 0; bottom: 0; color: transparent;"/ /><span aria-hidden="true" class="km-gallery__frame"></span></button><button aria-label="Open photo 3 of 10" class="km-gallery__cell" data-col="0" type="button"><img alt="" class="km-gallery__img" data-nimg="fill" decoding="async" loading="lazy" sizes="(min-width: 640px) 310px, 50vw" src="/images/image_5.jpg" style="position: absolute; height: 100%; width: 100%; left: 0; top: 0; right: 0; bottom: 0; color: transparent;"/ /><span aria-hidden="true" class="km-gallery__frame"></span></button><button aria-label="Open photo 4 of 10" class="km-gallery__cell" data-col="1" type="button"><img alt="" class="km-gallery__img" data-nimg="fill" decoding="async" loading="lazy" sizes="(min-width: 640px) 310px, 50vw" src="/images/image_2.jpg" style="position: absolute; height: 100%; width: 100%; left: 0; top: 0; right: 0; bottom: 0; color: transparent;"/ /><span aria-hidden="true" class="km-gallery__frame"></span></button><button aria-label="Open photo 5 of 10" class="km-gallery__cell" data-col="0" type="button"><img alt="" class="km-gallery__img" data-nimg="fill" decoding="async" loading="lazy" sizes="(min-width: 640px) 310px, 50vw" src="/images/image.jpg" style="position: absolute; height: 100%; width: 100%; left: 0; top: 0; right: 0; bottom: 0; color: transparent;"/ /><span aria-hidden="true" class="km-gallery__frame"></span></button><button aria-label="Open photo 6 of 10" class="km-gallery__cell" data-col="1" type="button"><img alt="" class="km-gallery__img" data-nimg="fill" decoding="async" loading="lazy" sizes="(min-width: 640px) 310px, 50vw" src="/images/image_9.jpg" style="position: absolute; height: 100%; width: 100%; left: 0; top: 0; right: 0; bottom: 0; color: transparent;"/ /><span aria-hidden="true" class="km-gallery__frame"></span></button><button aria-label="Open photo 7 of 10" class="km-gallery__cell" data-col="0" type="button"><img alt="" class="km-gallery__img" data-nimg="fill" decoding="async" loading="lazy" sizes="(min-width: 640px) 310px, 50vw" src="/images/image_1.jpg" style="position: absolute; height: 100%; width: 100%; left: 0; top: 0; right: 0; bottom: 0; color: transparent;"/ /><span aria-hidden="true" class="km-gallery__frame"></span></button><button aria-label="Open photo 8 of 10" class="km-gallery__cell" data-col="1" type="button"><img alt="" class="km-gallery__img" data-nimg="fill" decoding="async" loading="lazy" sizes="(min-width: 640px) 310px, 50vw" src="/images/image_7.jpg" style="position: absolute; height: 100%; width: 100%; left: 0; top: 0; right: 0; bottom: 0; color: transparent;"/ /><span aria-hidden="true" class="km-gallery__frame"></span></button><button aria-label="Open photo 9 of 10" class="km-gallery__cell" data-col="0" type="button"><img alt="" class="km-gallery__img" data-nimg="fill" decoding="async" loading="lazy" sizes="(min-width: 640px) 310px, 50vw" src="/images/image_6.jpg" style="position: absolute; height: 100%; width: 100%; left: 0; top: 0; right: 0; bottom: 0; color: transparent;"/ /><span aria-hidden="true" class="km-gallery__frame"></span></button><button aria-label="Open photo 10 of 10" class="km-gallery__cell km-gallery__cell--feature" data-col="0" type="button"><img alt="" class="km-gallery__img" data-nimg="fill" decoding="async" loading="lazy" sizes="(min-width: 640px) 310px, 50vw" src="/images/image_3.jpg" style="position: absolute; height: 100%; width: 100%; left: 0; top: 0; right: 0; bottom: 0; color: transparent;"/ /><span aria-hidden="true" class="km-gallery__frame"></span></button></div></div></section><section aria-label="RSVP" class="km-rsvp km-section"><div aria-hidden="true" class="km-rsvp__silk"></div><div aria-hidden="true" class="km-frame"><div class="km-frame-rail km-frame-rail--top"></div><div class="km-frame-rail km-frame-rail--bottom"></div><div class="km-frame-rail km-frame-rail--left"></div><div class="km-frame-rail km-frame-rail--right"></div><div class="km-frame-corner km-frame-corner--tl"></div><div class="km-frame-corner km-frame-corner--tr"></div><div class="km-frame-corner km-frame-corner--bl"></div><div class="km-frame-corner km-frame-corner--br"></div></div><div class="km-container"><h2 class="km-rsvp__heading km-font-script">Bless Us With Your Presence</h2><p class="km-rsvp__sub km-font-serif">Let us know if you can join us, so we may keep a place for you.</p><div class="km-rsvp__slip"><form novalidate=""><div aria-label="Will you join us?" class="km-rsvp__choices" role="group"><button aria-pressed="false" class="km-rsvp__choice" type="button"><svg aria-hidden="true" class="km-rsvp__marker" viewBox="0 0 16 16"><path d="M8 1 L15 8 L8 15 L1 8 Z" fill="none" stroke="var(--km-gold)" stroke-width="1.2" /></path></svg><span>With joy, we will be there</span></button><button aria-pressed="false" class="km-rsvp__choice" type="button"><svg aria-hidden="true" class="km-rsvp__marker" viewBox="0 0 16 16"><path d="M8 1 L15 8 L8 15 L1 8 Z" fill="none" stroke="var(--km-gold)" stroke-width="1.2" /></path></svg><span>With regret, we cannot</span></button></div><button class="km-rsvp__submit km-font-label" disabled="" type="submit">Send RSVP</button></form></div></div></section><section aria-label="Wedding video" class="km-video km-section"><div class="km-video__wall"><img alt="" aria-hidden="true" class="km-video__wall-img" decoding="async" loading="lazy" src="/images/video-wall.jpg"/ /><div class="km-video__opening"><iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" class="km-video__media" loading="lazy" src="https://www.youtube.com/embed/xJKwD24GJtw?rel=0&amp;modestbranding=1" title="A Special Glimpse"></iframe></div></div></section><footer class="km-footer"><div class="km-footer__card"><img alt="" aria-hidden="true" class="km-footer__art" decoding="async" loading="lazy" src="/images/footer-card.jpg"/ /><div class="km-footer__greeting"><p class="km-footer__greet-lead km-font-serif">We await your gracious presence</p><p class="km-footer__greet-main km-font-script">and your blessings</p><p class="km-footer__greet-mark km-font-serif">శుభమస్తు</p></div><a class="km-footer__credit" href="https://myshaadhilink.in/?utm_source=invitation&amp;utm_medium=footer&amp;utm_campaign=kalyana-mandapam" rel="noopener" target="_blank"><span class="km-footer__credit-lead">This invitation was crafted on<!-- --> <span class="km-footer__credit-brand">MyShaadhi Link</span></span><span class="km-footer__credit-cta">Need one for your wedding? Click here</span></a></div></footer><div class="km-entry"><div class="km-entry__veil"><div class="km-entry__card"><img alt="" aria-hidden="true" class="km-entry__art" decoding="async" fetchpriority="high" src="/images/entry-card.jpg"/ /><div aria-hidden="true" class="km-entry__bloom"></div><img alt="" aria-hidden="true" class="km-entry__mandala" decoding="async" src="/images/mandala-gold.webp"/ /><div class="km-entry__content"><div class="km-entry__group"><p class="km-entry__label km-font-label">The Wedding Of</p><h1 class="km-entry__names km-font-script">Vijay<span aria-hidden="true" class="km-entry__amp km-font-serif">&amp;</span>Rashmika</h1></div><div class="km-entry__group km-entry__meta"><p class="km-entry__date km-font-label">26 October 2026</p><p class="km-entry__city km-font-label">ITC Mementos, Udaipur, Rajasthan, India</p></div><div class="km-entry__group"><button class="km-entry__cta km-font-label" type="button"><span class="km-entry__cta-inner">Open Invitation</span></button></div></div></div></div></div><button aria-label="Play background music" aria-pressed="false" class="km-bell" type="button"><span class="km-bell__disc"><img alt="" aria-hidden="true" class="km-bell__icon" decoding="async" src="/images/km-audio-off.png"/ /></span></button><a aria-label="Order Temple Theme template for ₹3,999" class="demo-cta demo-cta--visible" href="https://wa.me/919553143929?text=Hi%2C%20I'm%20interested%20in%20the%20Temple%20Theme%20wedding%20invitation%20template%20(%E2%82%B93%2C999).%20I'd%20like%20to%20order%20it." rel="noopener noreferrer" role="complementary" target="_blank"><span class="demo-cta__price">₹<!-- -->3,999</span><span class="demo-cta__divider"></span><span class="demo-cta__label">Order Now</span></a></div><!--\$--><!--/\$-->
<script>
document.addEventListener('DOMContentLoaded', function() {
    // 1. Grand Entry / Veil Opening Animation
    var entry = document.querySelector('.km-entry');
    var cta = document.querySelector('.km-entry__cta');
    var bell = document.querySelector('.km-bell');
    var audio = document.getElementById('bg-music') || document.querySelector('audio');

    function openVeil() {
        if (entry && !entry.classList.contains('km-closing')) {
            entry.classList.add('km-closing');
            setTimeout(function() {
                entry.style.display = 'none';
            }, 1100);
        }
        if (audio) {
            audio.play().catch(function(e){ console.log('Audio error:', e); });
            if (bell) bell.setAttribute('aria-pressed', 'true');
        }
    }

    if (cta) cta.addEventListener('click', function(e) {
        e.stopPropagation();
        openVeil();
    });
    if (entry) entry.addEventListener('click', openVeil);

    if (bell) {
        bell.addEventListener('click', function() {
            if (!audio) return;
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
    var targetDate = new Date('2026-10-26T10:00:00').getTime();
    var daysElem = document.querySelector('.km-countdown__value--days');
    var hoursElem = document.querySelector('.km-countdown__value--hours');
    var minElem = document.querySelector('.km-countdown__value--minutes');
    var secElem = document.querySelector('.km-countdown__value--seconds');

    if (daysElem && hoursElem && minElem && secElem) {
        function updateCountdown() {
            var now = new Date().getTime();
            var diff = targetDate - now;
            if (diff < 0) diff = 0;

            var days = Math.floor(diff / (1000 * 60 * 60 * 24));
            var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((diff % (1000 * 60)) / 1000);

            daysElem.textContent = String(days).padStart(2, '0');
            hoursElem.textContent = String(hours).padStart(2, '0');
            minElem.textContent = String(minutes).padStart(2, '0');
            secElem.textContent = String(seconds).padStart(2, '0');
        }
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // 3. Staggered Framer Motion Scroll Observer
    var targets = document.querySelectorAll('section, .km-countdown, .km-gallery__cell, .km-event, .km-parents, .km-hero__content');
    targets.forEach(function(el, index) {
        el.classList.add('fm-motion');
        var delayClass = 'fm-delay-' + ((index % 4) + 1);
        el.classList.add(delayClass);
    });

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('fm-in-view');
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function(el) { observer.observe(el); });

    // 4. Lightbox Photo Preview
    var lightbox = document.createElement('div');
    lightbox.className = 'gptr-lightbox';
    lightbox.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.88);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity 0.3s ease;padding:20px;';
    lightbox.innerHTML = '<button style="position: absolute; top: 20px; right: 24px; color: #fff; font-size: 36px; cursor: pointer; background: none; border: none;">&times;</button><img src="" alt="Preview" style="max-width: 92vw; max-height: 88vh; border-radius: 12px; box-shadow: 0 24px 48px rgba(0; transform: scale(0.92); transition: transform 0.3s ease;" />';
    document.body.appendChild(lightbox);

    var lbImg = lightbox.querySelector('img');
    var lbClose = lightbox.querySelector('button');

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target === lbClose) {
            lightbox.style.opacity = '0';
            lightbox.style.pointerEvents = 'none';
            lbImg.style.transform = 'scale(0.92)';
        }
    });

    document.querySelectorAll('.km-gallery__cell img').forEach(function(img) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            lbImg.src = img.src;
            lightbox.style.opacity = '1';
            lightbox.style.pointerEvents = 'auto';
            lbImg.style.transform = 'scale(1)';
        });
    });
});
</script>
` }} />
  );
}
