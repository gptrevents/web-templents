'use client';
import React, { useEffect } from 'react';

export default function TemplatePage() {

  useEffect(() => {
    const overlay = document.querySelector('.si-envelope-overlay') as HTMLElement | null;
    const cta = document.querySelector('.si-envelope__cta');
    const musicBtn = document.querySelector('.si-music-btn');
    const audio = (document.getElementById('bg-music') || document.querySelector('audio')) as HTMLAudioElement | null;

    const openEnvelope = () => {
      if (overlay && !overlay.classList.contains('si-opening')) {
        overlay.classList.add('si-opening');
        setTimeout(() => { overlay.style.display = 'none'; }, 1100);
      }
      if (audio) audio.play().catch((e: any) => console.log('Audio error:', e));
    };

    if (cta) cta.addEventListener('click', openEnvelope);
    if (overlay) overlay.addEventListener('click', (e: any) => {
      if (e.target && (e.target.closest?.('.si-envelope__cta') || e.target === overlay || e.target.classList?.contains('si-envelope-scene'))) {
        openEnvelope();
      }
    });

    if (musicBtn && audio) {
      musicBtn.addEventListener('click', () => {
        if (audio.paused) { audio.play(); }
        else { audio.pause(); }
      });
    }

    const targetDate = new Date('2026-09-17T10:00:00').getTime();
    const daysElem = document.querySelector('.si-countdown__number--days') || document.querySelectorAll('.si-countdown__number')[0];
    const hoursElem = document.querySelector('.si-countdown__number--hours') || document.querySelectorAll('.si-countdown__number')[1];
    const minElem = document.querySelector('.si-countdown__number--minutes') || document.querySelectorAll('.si-countdown__number')[2];
    const secElem = document.querySelector('.si-countdown__number--seconds') || document.querySelectorAll('.si-countdown__number')[3];
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

    const targets = document.querySelectorAll('section, .si-couple__card, .si-event-card, .si-gallery__item');
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
    document.querySelectorAll('.si-gallery__item img').forEach(imgEl => {
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
    <div dangerouslySetInnerHTML={{ __html: `<div hidden=""><!--\$--><!--/\$--></div><!--\$--><!--/\$--><div class="south-indian __variable_62192f __variable_73b8cd __variable_fb7d25 __variable_44ad76 __variable_eaa562"><div aria-hidden="true" class="si-deco"><img alt="" class="si-deco__item si-deco__mandala-right" data-nimg="1" decoding="async" height="737" loading="lazy" sizes="(min-width: 768px) 300px, 220px" src="/images/image.jpg" style="color: transparent;" width="738"/ /><img alt="" class="si-deco__item si-deco__lotus-left" data-nimg="1" decoding="async" height="600" loading="lazy" sizes="(min-width: 768px) 180px, 140px" src="/images/image_5.png" style="color: transparent;" width="600"/ /><img alt="" class="si-deco__item si-deco__mandala-left" data-nimg="1" decoding="async" height="737" loading="lazy" sizes="(min-width: 768px) 260px, 180px" src="/images/image.jpg" style="color: transparent;" width="738"/ /><img alt="" class="si-deco__item si-deco__kalash-right" data-nimg="1" decoding="async" height="300" loading="lazy" sizes="(min-width: 768px) 90px, 70px" src="/images/image_6.png" style="color: transparent;" width="200"/ /></div><div class="si-envelope-overlay"><div aria-hidden="true" class="si-ec__flash"></div><svg aria-hidden="true" class="si-ec__kolam" viewBox="0 0 300 300"><circle class="si-ec__kolam-dot" cx="150" cy="150" r="0" /></circle><circle class="si-ec__kolam-dot" cx="192" cy="108" r="0" /></circle><circle class="si-ec__kolam-dot" cx="192" cy="192" r="0" /></circle><circle class="si-ec__kolam-dot" cx="108" cy="192" r="0" /></circle><circle class="si-ec__kolam-dot" cx="108" cy="108" r="0" /></circle><circle class="si-ec__kolam-dot" cx="150" cy="72" r="0" /></circle><circle class="si-ec__kolam-dot" cx="228" cy="150" r="0" /></circle><circle class="si-ec__kolam-dot" cx="150" cy="228" r="0" /></circle><circle class="si-ec__kolam-dot" cx="72" cy="150" r="0" /></circle><path class="si-ec__kolam-ring" d="M150,132 A18,18 0 1,1 150,168 A18,18 0 1,1 150,132" /></path><path class="si-ec__kolam-petal" d="M150,132 C162,112 162,82 150,72 C138,82 138,112 150,132" /></path><path class="si-ec__kolam-petal" d="M168,150 C188,138 218,138 228,150 C218,162 188,162 168,150" /></path><path class="si-ec__kolam-petal" d="M150,168 C138,188 138,218 150,228 C162,218 162,188 150,168" /></path><path class="si-ec__kolam-petal" d="M132,150 C112,162 82,162 72,150 C82,138 112,138 132,150" /></path><path class="si-ec__kolam-outer" d="M150,72 Q192,108 228,150 Q192,192 150,228 Q108,192 72,150 Q108,108 150,72" /></path></svg><div aria-hidden="true" class="si-ec__mandalas"><img alt="" class="si-ec__mandala si-ec__mandala--top-right" data-nimg="1" decoding="async" height="737" loading="lazy" sizes="(min-width: 768px) 380px, 280px" src="/images/image_2.jpg" style="color: transparent;" width="738"/ /><img alt="" class="si-ec__mandala si-ec__mandala--bottom-left" data-nimg="1" decoding="async" height="737" loading="lazy" sizes="(min-width: 768px) 380px, 280px" src="/images/image_2.jpg" style="color: transparent;" width="738"/ /><img alt="" class="si-ec__mandala si-ec__mandala--bottom-right" data-nimg="1" decoding="async" height="737" loading="lazy" sizes="(min-width: 768px) 380px, 280px" src="/images/image_2.jpg" style="color: transparent;" width="738"/ /></div><div aria-hidden="true" class="si-ec__garland"><img alt="" class="si-ec__garland-img" data-nimg="1" decoding="async" height="150" sizes="100vw" src="/images/image_7.png" style="color: transparent;" width="1080"/ /><img alt="" class="si-ec__garland-img" data-nimg="1" decoding="async" height="150" sizes="100vw" src="/images/image_7.png" style="color: transparent;" width="1080"/ /></div><div class="si-envelope-scene"><div class="si-ec__ganesha"><img alt="Lord Ganesha" class="si-ec__ganesha-img" data-nimg="1" decoding="async" height="1575" sizes="(min-width: 768px) 120px, 96px" src="/images/image_17.png" style="color: transparent;" width="1600"/ /><p class="si-ec__blessing">|| Sri Ganeshaya Namah ||</p></div><div class="si-ec__divider"><img alt="" class="si-ec__divider-img" data-nimg="1" decoding="async" height="16" loading="lazy" src="/images/gold-divider.svg" style="color: transparent;" width="120"/ /></div><div class="si-ec__text"><p class="si-envelope__label">You are invited to the wedding of</p><h2 class="si-envelope__names">Rahul<!-- --> &amp; <!-- -->Harinya</h2></div><button class="si-envelope__cta" type="button">Open Invitation</button></div><div aria-hidden="true" class="si-ec__gopuram-footer"><img alt="" class="si-ec__gopuram-img" data-nimg="1" decoding="async" height="721" loading="lazy" sizes="100vw" src="/images/image_3.png" style="color: transparent;" width="1240"/ /></div></div><section class="si-hero"><div aria-hidden="true" class="si-hero__toran"><img alt="" class="si-hero__toran-element si-hero__toran-element--0" data-nimg="1" decoding="async" height="916" src="/images/image_11.png" style="color: transparent;" width="517"/ /><img alt="" class="si-hero__toran-element si-hero__toran-element--1" data-nimg="1" decoding="async" height="916" src="/images/image_14.png" style="color: transparent;" width="517"/ /><img alt="" class="si-hero__toran-element si-hero__toran-element--2" data-nimg="1" decoding="async" height="916" src="/images/image_11.png" style="color: transparent;" width="517"/ /><img alt="" class="si-hero__toran-element si-hero__toran-element--3" data-nimg="1" decoding="async" height="916" src="/images/image_14.png" style="color: transparent;" width="517"/ /><img alt="" class="si-hero__toran-element si-hero__toran-element--4" data-nimg="1" decoding="async" height="916" src="/images/image_11.png" style="color: transparent;" width="517"/ /><img alt="" class="si-hero__toran-element si-hero__toran-element--5" data-nimg="1" decoding="async" height="916" src="/images/image_14.png" style="color: transparent;" width="517"/ /><img alt="" class="si-hero__toran-element si-hero__toran-element--6" data-nimg="1" decoding="async" height="916" src="/images/image_11.png" style="color: transparent;" width="517"/ /><img alt="" class="si-hero__toran-element si-hero__toran-element--7" data-nimg="1" decoding="async" height="916" src="/images/image_14.png" style="color: transparent;" width="517"/ /></div><div class="si-hero__content"><div class="si-hero__ganesha"><img alt="Lord Ganesha" class="si-hero__ganesha-img" data-nimg="1" decoding="async" height="1575" loading="lazy" sizes="(min-width: 768px) 96px, 80px" src="/images/image_17.png" style="color: transparent;" width="1600"/ /></div><p class="si-hero__blessing">&ldquo;Two hearts united, one beautiful journey begins. Wishing you a lifetime of togetherness.&rdquo;</p><div class="si-hero__ornament"><img alt="" class="si-hero__ornament-img" data-nimg="1" decoding="async" height="32" loading="lazy" src="/images/gold-divider.svg" style="color: transparent;" width="120"/ /></div><p class="si-hero__formal">Together with the blessings of their families</p><div class="si-hero__names"><h1 class="si-hero__name"><span class="si-hero__char">R</span><span class="si-hero__char">a</span><span class="si-hero__char">h</span><span class="si-hero__char">u</span><span class="si-hero__char">l</span></h1><span class="si-hero__ampersand">&amp;</span><h1 class="si-hero__name"><span class="si-hero__char">H</span><span class="si-hero__char">a</span><span class="si-hero__char">r</span><span class="si-hero__char">i</span><span class="si-hero__char">n</span><span class="si-hero__char">y</span><span class="si-hero__char">a</span></h1></div><p class="si-hero__invite-text">cordially invite you to celebrate their wedding</p><div class="si-hero__gold-line si-gold-line"></div><p class="si-hero__date">17 september 2026</p><p class="si-hero__city">Financial District, Hyderabad, Telangana, India</p></div><div aria-hidden="true" class="si-hero__leaf si-hero__leaf--left"><img alt="" class="si-hero__leaf-img" data-nimg="1" decoding="async" height="2752" loading="lazy" sizes="(min-width: 1024px) 180px, (min-width: 768px) 150px, 110px" src="/images/image_21.jpg" style="color: transparent;" width="1536"/ /></div><div aria-hidden="true" class="si-hero__leaf si-hero__leaf--right"><img alt="" class="si-hero__leaf-img" data-nimg="1" decoding="async" height="2752" loading="lazy" sizes="(min-width: 1024px) 180px, (min-width: 768px) 150px, 110px" src="/images/image_15.jpg" style="color: transparent;" width="1536"/ /></div><div aria-hidden="true" class="si-hero__sky-bg"><img alt="" class="si-hero__sky-img" data-nimg="1" decoding="async" height="1080" sizes="100vw" src="/images/image_19.jpg" style="color: transparent;" width="1080"/ /></div><div aria-hidden="true" class="si-hero__temple-backdrop"><img alt="" class="si-hero__gopuram-img" data-nimg="1" decoding="async" fetchpriority="high" height="700" sizes="(min-width: 1024px) 100vw, (min-width: 768px) 120vw, 140vw" src="/images/image_23.png" style="color: transparent;" width="800"/ /></div></section><div aria-hidden="true" class="si-deco-divider"><img alt="" class="si-deco-divider__img" data-nimg="1" decoding="async" height="243" loading="lazy" sizes="(min-width: 768px) 340px, 260px" src="/images/image_12.png" style="color: transparent;" width="478"/ /></div><section class="si-section si-couple"><h2 class="si-couple__heading">About the Couple</h2><div class="si-gold-line"></div><div class="si-couple__cards"><div class="si-couple__card"><div class="si-couple__photo-wrapper"><img alt="" aria-hidden="true" class="si-couple__wreath" data-nimg="1" decoding="async" height="1240" loading="lazy" sizes="(min-width: 768px) 420px, 90vw" src="/images/image_18.png" style="color: transparent;" width="1240"/ /><div class="si-couple__photo-frame"><img alt="Rahul Sipligunj" class="si-couple__photo" data-nimg="1" decoding="async" height="160" loading="lazy" src="/images/image_1.jpg" style="color: transparent;" width="160"/ /></div></div><h3 class="si-couple__name">Rahul Sipligunj</h3><p class="si-couple__parents"><span class="si-couple__parent-label">Son of</span>Shankar Sipligunj &amp; Laxmi Sipligunj</p></div><div class="si-couple__divider"><span class="si-couple__amp">&amp;</span></div><div class="si-couple__card"><div class="si-couple__photo-wrapper"><img alt="" aria-hidden="true" class="si-couple__wreath" data-nimg="1" decoding="async" height="1240" loading="lazy" sizes="(min-width: 768px) 420px, 90vw" src="/images/image_18.png" style="color: transparent;" width="1240"/ /><div class="si-couple__photo-frame"><img alt="Harinya Reddy" class="si-couple__photo" data-nimg="1" decoding="async" height="160" loading="lazy" src="/images/image_10.jpg" style="color: transparent;" width="160"/ /></div></div><h3 class="si-couple__name">Harinya Reddy</h3><p class="si-couple__parents"><span class="si-couple__parent-label">Daughter of</span>Ramesh Reddy &amp; Lakshmi Reddy</p></div></div></section><div aria-hidden="true" class="si-deco-divider"><img alt="" class="si-deco-divider__img si-deco-divider__img--elephants" data-nimg="1" decoding="async" height="599" loading="lazy" sizes="(min-width: 768px) 340px, 260px" src="/images/image_4.png" style="color: transparent;" width="1054"/ /></div><section class="si-section si-events"><h2 class="si-events__heading">Wedding Events</h2><div class="si-gold-line"></div><div class="si-events__grid"><div class="si-event-card"><div class="si-event-card__accent"></div><h3 class="si-event-card__name">Wedding Ceremony</h3><p class="si-event-card__date">Saturday, 12 january</p><p class="si-event-card__time">10:30 AM</p><p class="si-event-card__venue">Kukatpally, Hyderabad.</p><a class="si-event-card__directions" href="https://www.google.com/maps" rel="noopener noreferrer" target="_blank">Get Directions</a></div><div class="si-event-card"><div class="si-event-card__accent"></div><h3 class="si-event-card__name">Haldi ceremony.</h3><p class="si-event-card__date">Tuesday 3 rd march</p><p class="si-event-card__time">12:30 PM</p><p class="si-event-card__venue">Kukatpally, Hyderabad.</p><a class="si-event-card__directions" href="https://maps.app.goo.gl/mBMK1HkkHVTVZ6ET8" rel="noopener noreferrer" target="_blank">Get Directions</a></div><div class="si-event-card"><div class="si-event-card__accent"></div><h3 class="si-event-card__name">Mehendi</h3><p class="si-event-card__date">Wednesday 4th march</p><p class="si-event-card__time">9:00 pm onwards</p><p class="si-event-card__venue">Kukatpally, Hyderabad.</p><a class="si-event-card__directions" href="https://maps.app.goo.gl/mBMK1HkkHVTVZ6ET8" rel="noopener noreferrer" target="_blank">Get Directions</a></div><div class="si-event-card"><div class="si-event-card__accent"></div><h3 class="si-event-card__name">Reception</h3><p class="si-event-card__date">Friday 5th march</p><p class="si-event-card__time">9:00 pm onwards</p><p class="si-event-card__venue">Kukatpally, Hyderabad.</p><a class="si-event-card__directions" href="https://maps.app.goo.gl/mBMK1HkkHVTVZ6ET8" rel="noopener noreferrer" target="_blank">Get Directions</a></div></div></section><section class="si-section si-countdown"><h2 class="si-countdown__heading">Counting Down To</h2><p class="si-countdown__subheading">Our Special Day</p><div class="si-gold-line"></div><div class="si-countdown__timer"><div class="si-countdown__unit"><div class="si-countdown__number">00</div><div class="si-countdown__label">Days</div></div><span class="si-countdown__sep">:</span><div class="si-countdown__unit"><div class="si-countdown__number">00</div><div class="si-countdown__label">Hours</div></div><span class="si-countdown__sep">:</span><div class="si-countdown__unit"><div class="si-countdown__number">00</div><div class="si-countdown__label">Minutes</div></div><span class="si-countdown__sep">:</span><div class="si-countdown__unit"><div class="si-countdown__number">00</div><div class="si-countdown__label">Seconds</div></div></div></section><section class="si-section si-gallery"><h2 class="si-gallery__heading">Captured Moments</h2><div class="si-gold-line"></div><div class="si-gallery__grid" data-count="6"><button aria-label="View photo 1" class="si-gallery__item" type="button"><img alt="Wedding photo 1" class="si-gallery__photo" data-nimg="1" decoding="async" height="400" loading="lazy" src="/images/image_9.jpg" style="color: transparent;" width="400"/ /></button><button aria-label="View photo 2" class="si-gallery__item" type="button"><img alt="Wedding photo 2" class="si-gallery__photo" data-nimg="1" decoding="async" height="400" loading="lazy" src="/images/image_13.jpg" style="color: transparent;" width="400"/ /></button><button aria-label="View photo 3" class="si-gallery__item" type="button"><img alt="Wedding photo 3" class="si-gallery__photo" data-nimg="1" decoding="async" height="400" loading="lazy" src="/images/image_20.jpg" style="color: transparent;" width="400"/ /></button><button aria-label="View photo 4" class="si-gallery__item" type="button"><img alt="Wedding photo 4" class="si-gallery__photo" data-nimg="1" decoding="async" height="400" loading="lazy" src="/images/image_22.jpg" style="color: transparent;" width="400"/ /></button><button aria-label="View photo 5" class="si-gallery__item" type="button"><img alt="Wedding photo 5" class="si-gallery__photo" data-nimg="1" decoding="async" height="400" loading="lazy" src="/images/image_16.jpg" style="color: transparent;" width="400"/ /></button><button aria-label="View photo 6" class="si-gallery__item" type="button"><img alt="Wedding photo 6" class="si-gallery__photo" data-nimg="1" decoding="async" height="400" loading="lazy" src="/images/image_8.jpg" style="color: transparent;" width="400"/ /></button></div></section><div><section class="si-section si-video"><h2 class="si-video__heading">Our Story</h2><div class="si-gold-line"></div><div class="si-video__wrapper"><iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" class="si-video__iframe" loading="lazy" src="https://www.youtube.com/embed/VouPYyg0z2U?rel=0&amp;modestbranding=1&amp;vq=hd1080&amp;hd=1" title="Our Story"></iframe></div></section></div><section class="si-section si-venue"><h2 class="si-venue__heading">When &amp; Where</h2><div class="si-gold-line"></div><div class="si-venue__content"><div class="si-venue__details"><h3 class="si-venue__name">Balaji nagar, Hyderabad.</h3><p class="si-venue__address">Venue Address, City, State</p><a class="si-venue__directions-btn" href="https://maps.app.goo.gl/mBMK1HkkHVTVZ6ET8" rel="noopener noreferrer" target="_blank">Get Directions</a></div><div class="si-venue__map"><iframe allowfullscreen="" class="si-venue__map-iframe" height="300" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Balaji%20nagar%2C%20Hyderabad.%2C%20Venue%20Address%2C%20City%2C%20State&amp;output=embed" style="border: 0;" title="Venue location" width="100%"></iframe></div></div></section><section class="si-section si-rsvp"><h2 class="si-rsvp__heading">Will You Join Us?</h2><div class="si-gold-line"></div><form class="si-rsvp__form"><div class="si-rsvp__field"><label class="si-rsvp__label" htmlFor="rsvp-name">Your Name</label><input class="si-rsvp__input" id="rsvp-name" placeholder="Enter your full name" required="" type="text" value=""/></div><div class="si-rsvp__field"><label class="si-rsvp__label">Will You Attend?</label><div class="si-rsvp__radio-group"><label class="si-rsvp__radio"><input name="attending" type="radio" value="yes"/><span class="si-rsvp__radio-label">Joyfully Accept</span></label><label class="si-rsvp__radio"><input name="attending" type="radio" value="no"/><span class="si-rsvp__radio-label">Respectfully Decline</span></label></div></div><div class="si-rsvp__field"><label class="si-rsvp__label" htmlFor="rsvp-message">Message (optional)</label><textarea class="si-rsvp__input si-rsvp__textarea" id="rsvp-message" placeholder="Send your wishes..." rows="3"></textarea></div><button class="si-rsvp__submit" disabled="" type="submit">Confirm Attendance</button></form></section><div></div><div><div class="si-share"><p class="si-share__label">Share This Invitation</p><div class="si-share__buttons"><button aria-label="Share on WhatsApp" class="si-share__btn si-share__btn--whatsapp" type="button"><svg fill="currentColor" height="18" viewBox="0 0 24 24" width="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></path></svg>WhatsApp</button><button aria-label="Add to calendar" class="si-share__btn si-share__btn--calendar" type="button"><svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18"><rect height="18" rx="2" ry="2" width="18" x="3" y="4"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>Add to Calendar</button><button aria-label="Copy invitation link" class="si-share__btn si-share__btn--copy" type="button"><svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></path></svg>Copy Link</button></div></div></div><footer class="si-footer"><div class="si-footer__scene"><div class="si-footer__text"><p class="si-footer__label">The Wedding of</p><p class="si-footer__couple">Rahul<!-- --> &amp; <!-- -->Harinya</p><div class="si-gold-line"></div><p class="si-footer__credit">Made with love by<!-- --> <a class="si-footer__link" href="https://myshaadhilink.in" rel="noopener noreferrer" target="_blank">MyShaadhiLink</a></p></div><img alt="South Indian temple gopuram" class="si-footer__gopuram-img" data-nimg="1" decoding="async" height="721" loading="lazy" sizes="100vw" src="/images/image_3.png" style="color: transparent;" width="1240"/ /></div><div aria-hidden="true" class="si-footer__toran"><img alt="" class="si-footer__toran-element si-footer__toran-element--0" data-nimg="1" decoding="async" height="916" loading="lazy" src="/images/image_11.png" style="color: transparent;" width="517"/ /><img alt="" class="si-footer__toran-element si-footer__toran-element--1" data-nimg="1" decoding="async" height="916" loading="lazy" src="/images/image_14.png" style="color: transparent;" width="517"/ /><img alt="" class="si-footer__toran-element si-footer__toran-element--2" data-nimg="1" decoding="async" height="916" loading="lazy" src="/images/image_11.png" style="color: transparent;" width="517"/ /><img alt="" class="si-footer__toran-element si-footer__toran-element--3" data-nimg="1" decoding="async" height="916" loading="lazy" src="/images/image_14.png" style="color: transparent;" width="517"/ /><img alt="" class="si-footer__toran-element si-footer__toran-element--4" data-nimg="1" decoding="async" height="916" loading="lazy" src="/images/image_11.png" style="color: transparent;" width="517"/ /><img alt="" class="si-footer__toran-element si-footer__toran-element--5" data-nimg="1" decoding="async" height="916" loading="lazy" src="/images/image_14.png" style="color: transparent;" width="517"/ /><img alt="" class="si-footer__toran-element si-footer__toran-element--6" data-nimg="1" decoding="async" height="916" loading="lazy" src="/images/image_11.png" style="color: transparent;" width="517"/ /><img alt="" class="si-footer__toran-element si-footer__toran-element--7" data-nimg="1" decoding="async" height="916" loading="lazy" src="/images/image_14.png" style="color: transparent;" width="517"/ /></div></footer><button aria-label="Play music" class="si-music-btn" type="button"><svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20"><path d="M11 5L6 9H2v6h4l5 4V5z" /></path><line x1="23" x2="17" y1="9" y2="15"></line><line x1="17" x2="23" y1="9" y2="15"></line></svg></button><a aria-label="Order South Indian template for ₹3,999" class="si-pricing-bar" href="https://wa.me/919553143929?text=Hi%2C%20I'm%20interested%20in%20the%20South%20Indian%20wedding%20invitation%20template%20(%E2%82%B93%2C999).%20I'd%20like%20to%20order%20it." rel="noopener noreferrer" role="complementary" target="_blank"><span class="si-pricing-bar__price">₹3,999</span><span class="si-pricing-bar__divider"></span><span class="si-pricing-bar__label">Order Now</span></a></div><!--\$--><!--/\$-->
<script>
document.addEventListener('DOMContentLoaded', function() {
    // 1. Envelope Open Animation
    var overlay = document.querySelector('.si-envelope-overlay');
    var cta = document.querySelector('.si-envelope__cta');
    var musicBtn = document.querySelector('.si-music-btn');
    var audio = document.getElementById('bg-music') || document.querySelector('audio');

    function openEnvelope() {
        if (overlay && !overlay.classList.contains('si-opening')) {
            overlay.classList.add('si-opening');
            setTimeout(function() {
                overlay.style.display = 'none';
            }, 1100);
        }
        if (audio) {
            audio.play().catch(function(e) { console.log('Audio autoplay:', e); });
        }
    }

    if (cta) cta.addEventListener('click', openEnvelope);
    if (overlay) overlay.addEventListener('click', function(e) {
        if (e.target.closest('.si-envelope__cta') || e.target === overlay || e.target.classList.contains('si-envelope-scene')) {
            openEnvelope();
        }
    });

    if (musicBtn) {
        musicBtn.addEventListener('click', function() {
            if (!audio) return;
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
    var targetDate = new Date('2026-10-26T10:00:00').getTime();
    var numberElems = document.querySelectorAll('.si-countdown__number');
    if (numberElems.length >= 4) {
        function updateCountdown() {
            var now = new Date().getTime();
            var diff = targetDate - now;
            if (diff < 0) diff = 0;

            var days = Math.floor(diff / (1000 * 60 * 60 * 24));
            var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((diff % (1000 * 60)) / 1000);

            numberElems[0].textContent = String(days).padStart(2, '0');
            numberElems[1].textContent = String(hours).padStart(2, '0');
            numberElems[2].textContent = String(minutes).padStart(2, '0');
            numberElems[3].textContent = String(seconds).padStart(2, '0');
        }
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // 3. Staggered Framer Motion Scroll Observer
    var targets = document.querySelectorAll('.si-section, .si-gold-line, .si-gallery__item, .si-countdown__timer, .si-details__item, .si-couple__card, .si-event__card');
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

    document.querySelectorAll('.si-gallery__item img').forEach(function(img) {
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
