'use client';
import React, { useEffect } from 'react';

export default function TemplatePage() {

  useEffect(() => {
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

  return (
    <div dangerouslySetInnerHTML={{ __html: `<div hidden=""><!--\$--><!--/\$--></div><!--\$--><!--/\$--><div className="south-indian __variable_62192f __variable_73b8cd __variable_fb7d25 __variable_44ad76 __variable_eaa562"><div aria-hidden="true" className="si-deco"><img alt="" className="si-deco__item si-deco__mandala-right" data-nimg="1" decoding="async" height="737" loading="lazy" sizes="(min-width: 768px) 300px, 220px" src="/images/image.jpg" srcset="image_33.jpg 16w, image_34.jpg 32w, image_30.jpg 48w, image_24.jpg 64w, image_32.jpg 96w, image_40.jpg 128w, image_36.jpg 256w, image_43.jpg 375w, image_26.jpg 384w, image_96.jpg 640w, image_42.jpg 750w, image_44.jpg 828w, image_35.jpg 1080w, image_45.jpg 1200w, image.jpg 1920w" style={{ color: 'transparent' }} width="738"/ /><img alt="" className="si-deco__item si-deco__lotus-left" data-nimg="1" decoding="async" height="600" loading="lazy" sizes="(min-width: 768px) 180px, 140px" src="/images/image_5.png" srcset="image_31.png 16w, image_25.png 32w, image_28.png 48w, image_29.png 64w, image_27.png 96w, image_37.png 128w, image_38.png 256w, image_128.png 375w, image_39.png 384w, image_172.png 640w, image_41.png 750w, image_127.png 828w, image_185.png 1080w, image_190.png 1200w, image_5.png 1920w" style={{ color: 'transparent' }} width="600"/ /><img alt="" className="si-deco__item si-deco__mandala-left" data-nimg="1" decoding="async" height="737" loading="lazy" sizes="(min-width: 768px) 260px, 180px" src="/images/image.jpg" srcset="image_33.jpg 16w, image_34.jpg 32w, image_30.jpg 48w, image_24.jpg 64w, image_32.jpg 96w, image_40.jpg 128w, image_36.jpg 256w, image_43.jpg 375w, image_26.jpg 384w, image_96.jpg 640w, image_42.jpg 750w, image_44.jpg 828w, image_35.jpg 1080w, image_45.jpg 1200w, image.jpg 1920w" style={{ color: 'transparent' }} width="738"/ /><img alt="" className="si-deco__item si-deco__kalash-right" data-nimg="1" decoding="async" height="300" loading="lazy" sizes="(min-width: 768px) 90px, 70px" src="/images/image_6.png" srcset="image_48.png 16w, image_47.png 32w, image_46.png 48w, image_58.png 64w, image_50.png 96w, image_65.png 128w, image_67.png 256w, image_75.png 375w, image_49.png 384w, image_63.png 640w, image_167.png 750w, image_55.png 828w, image_140.png 1080w, image_56.png 1200w, image_6.png 1920w" style={{ color: 'transparent' }} width="200"/ /></div><div className="si-envelope-overlay"><div aria-hidden="true" className="si-ec__flash"></div><svg aria-hidden="true" className="si-ec__kolam" viewBox="0 0 300 300"><circle className="si-ec__kolam-dot" cx="150" cy="150" r="0" /></circle><circle className="si-ec__kolam-dot" cx="192" cy="108" r="0" /></circle><circle className="si-ec__kolam-dot" cx="192" cy="192" r="0" /></circle><circle className="si-ec__kolam-dot" cx="108" cy="192" r="0" /></circle><circle className="si-ec__kolam-dot" cx="108" cy="108" r="0" /></circle><circle className="si-ec__kolam-dot" cx="150" cy="72" r="0" /></circle><circle className="si-ec__kolam-dot" cx="228" cy="150" r="0" /></circle><circle className="si-ec__kolam-dot" cx="150" cy="228" r="0" /></circle><circle className="si-ec__kolam-dot" cx="72" cy="150" r="0" /></circle><path className="si-ec__kolam-ring" d="M150,132 A18,18 0 1,1 150,168 A18,18 0 1,1 150,132" /></path><path className="si-ec__kolam-petal" d="M150,132 C162,112 162,82 150,72 C138,82 138,112 150,132" /></path><path className="si-ec__kolam-petal" d="M168,150 C188,138 218,138 228,150 C218,162 188,162 168,150" /></path><path className="si-ec__kolam-petal" d="M150,168 C138,188 138,218 150,228 C162,218 162,188 150,168" /></path><path className="si-ec__kolam-petal" d="M132,150 C112,162 82,162 72,150 C82,138 112,138 132,150" /></path><path className="si-ec__kolam-outer" d="M150,72 Q192,108 228,150 Q192,192 150,228 Q108,192 72,150 Q108,108 150,72" /></path></svg><div aria-hidden="true" className="si-ec__mandalas"><img alt="" className="si-ec__mandala si-ec__mandala--top-right" data-nimg="1" decoding="async" height="737" loading="lazy" sizes="(min-width: 768px) 380px, 280px" src="/images/image_2.jpg" srcset="image_77.jpg 16w, image_51.jpg 32w, image_53.jpg 48w, image_93.jpg 64w, image_72.jpg 96w, image_52.jpg 128w, image_70.jpg 256w, image_97.jpg 375w, image_61.jpg 384w, image_124.jpg 640w, image_173.jpg 750w, image_143.jpg 828w, image_160.jpg 1080w, image_109.jpg 1200w, image_2.jpg 1920w" style={{ color: 'transparent' }} width="738"/ /><img alt="" className="si-ec__mandala si-ec__mandala--bottom-left" data-nimg="1" decoding="async" height="737" loading="lazy" sizes="(min-width: 768px) 380px, 280px" src="/images/image_2.jpg" srcset="image_77.jpg 16w, image_51.jpg 32w, image_53.jpg 48w, image_93.jpg 64w, image_72.jpg 96w, image_52.jpg 128w, image_70.jpg 256w, image_97.jpg 375w, image_61.jpg 384w, image_124.jpg 640w, image_173.jpg 750w, image_143.jpg 828w, image_160.jpg 1080w, image_109.jpg 1200w, image_2.jpg 1920w" style={{ color: 'transparent' }} width="738"/ /><img alt="" className="si-ec__mandala si-ec__mandala--bottom-right" data-nimg="1" decoding="async" height="737" loading="lazy" sizes="(min-width: 768px) 380px, 280px" src="/images/image_2.jpg" srcset="image_77.jpg 16w, image_51.jpg 32w, image_53.jpg 48w, image_93.jpg 64w, image_72.jpg 96w, image_52.jpg 128w, image_70.jpg 256w, image_97.jpg 375w, image_61.jpg 384w, image_124.jpg 640w, image_173.jpg 750w, image_143.jpg 828w, image_160.jpg 1080w, image_109.jpg 1200w, image_2.jpg 1920w" style={{ color: 'transparent' }} width="738"/ /></div><div aria-hidden="true" className="si-ec__garland"><img alt="" className="si-ec__garland-img" data-nimg="1" decoding="async" height="150" sizes="100vw" src="/images/image_7.png" srcset="image_60.png 375w, image_57.png 384w, image_66.png 640w, image_54.png 750w, image_71.png 828w, image_95.png 1080w, image_73.png 1200w, image_7.png 1920w" style={{ color: 'transparent' }} width="1080"/ /><img alt="" className="si-ec__garland-img" data-nimg="1" decoding="async" height="150" sizes="100vw" src="/images/image_7.png" srcset="image_60.png 375w, image_57.png 384w, image_66.png 640w, image_54.png 750w, image_71.png 828w, image_95.png 1080w, image_73.png 1200w, image_7.png 1920w" style={{ color: 'transparent' }} width="1080"/ /></div><div className="si-envelope-scene"><div className="si-ec__ganesha"><img alt="Lord Ganesha" className="si-ec__ganesha-img" data-nimg="1" decoding="async" height="1575" sizes="(min-width: 768px) 120px, 96px" src="/images/image_17.png" srcset="image_68.png 16w, image_82.png 32w, image_104.png 48w, image_81.png 64w, image_69.png 96w, image_146.png 128w, image_148.png 256w, image_76.png 375w, image_120.png 384w, image_131.png 640w, image_169.png 750w, image_176.png 828w, image_174.png 1080w, image_158.png 1200w, image_17.png 1920w" style={{ color: 'transparent' }} width="1600"/ /><p className="si-ec__blessing">|| Sri Ganeshaya Namah ||</p></div><div className="si-ec__divider"><img alt="" className="si-ec__divider-img" data-nimg="1" decoding="async" height="16" loading="lazy" src="/images/gold-divider.svg" style={{ color: 'transparent' }} width="120"/ /></div><div className="si-ec__text"><p className="si-envelope__label">You are invited to the wedding of</p><h2 className="si-envelope__names">Rahul<!-- --> &amp; <!-- -->Harinya</h2></div><button className="si-envelope__cta" type="button">Open Invitation</button></div><div aria-hidden="true" className="si-ec__gopuram-footer"><img alt="" className="si-ec__gopuram-img" data-nimg="1" decoding="async" height="721" loading="lazy" sizes="100vw" src="/images/image_3.png" srcset="image_59.png 375w, image_64.png 384w, image_154.png 640w, image_191.png 750w, image_153.png 828w, image_193.png 1080w, image_178.png 1200w, image_3.png 1920w" style={{ color: 'transparent' }} width="1240"/ /></div></div><section className="si-hero"><div aria-hidden="true" className="si-hero__toran"><img alt="" className="si-hero__toran-element si-hero__toran-element--0" data-nimg="1" decoding="async" height="916" src="/images/image_11.png" srcset="image_184.png 1x, image_11.png 2x" style={{ color: 'transparent' }} width="517"/ /><img alt="" className="si-hero__toran-element si-hero__toran-element--1" data-nimg="1" decoding="async" height="916" src="/images/image_14.png" srcset="image_177.png 1x, image_14.png 2x" style={{ color: 'transparent' }} width="517"/ /><img alt="" className="si-hero__toran-element si-hero__toran-element--2" data-nimg="1" decoding="async" height="916" src="/images/image_11.png" srcset="image_184.png 1x, image_11.png 2x" style={{ color: 'transparent' }} width="517"/ /><img alt="" className="si-hero__toran-element si-hero__toran-element--3" data-nimg="1" decoding="async" height="916" src="/images/image_14.png" srcset="image_177.png 1x, image_14.png 2x" style={{ color: 'transparent' }} width="517"/ /><img alt="" className="si-hero__toran-element si-hero__toran-element--4" data-nimg="1" decoding="async" height="916" src="/images/image_11.png" srcset="image_184.png 1x, image_11.png 2x" style={{ color: 'transparent' }} width="517"/ /><img alt="" className="si-hero__toran-element si-hero__toran-element--5" data-nimg="1" decoding="async" height="916" src="/images/image_14.png" srcset="image_177.png 1x, image_14.png 2x" style={{ color: 'transparent' }} width="517"/ /><img alt="" className="si-hero__toran-element si-hero__toran-element--6" data-nimg="1" decoding="async" height="916" src="/images/image_11.png" srcset="image_184.png 1x, image_11.png 2x" style={{ color: 'transparent' }} width="517"/ /><img alt="" className="si-hero__toran-element si-hero__toran-element--7" data-nimg="1" decoding="async" height="916" src="/images/image_14.png" srcset="image_177.png 1x, image_14.png 2x" style={{ color: 'transparent' }} width="517"/ /></div><div className="si-hero__content"><div className="si-hero__ganesha"><img alt="Lord Ganesha" className="si-hero__ganesha-img" data-nimg="1" decoding="async" height="1575" loading="lazy" sizes="(min-width: 768px) 96px, 80px" src="/images/image_17.png" srcset="image_68.png 16w, image_82.png 32w, image_104.png 48w, image_81.png 64w, image_69.png 96w, image_146.png 128w, image_148.png 256w, image_76.png 375w, image_120.png 384w, image_131.png 640w, image_169.png 750w, image_176.png 828w, image_174.png 1080w, image_158.png 1200w, image_17.png 1920w" style={{ color: 'transparent' }} width="1600"/ /></div><p className="si-hero__blessing">&ldquo;Two hearts united, one beautiful journey begins. Wishing you a lifetime of togetherness.&rdquo;</p><div className="si-hero__ornament"><img alt="" className="si-hero__ornament-img" data-nimg="1" decoding="async" height="32" loading="lazy" src="/images/gold-divider.svg" style={{ color: 'transparent' }} width="120"/ /></div><p className="si-hero__formal">Together with the blessings of their families</p><div className="si-hero__names"><h1 className="si-hero__name"><span className="si-hero__char">R</span><span className="si-hero__char">a</span><span className="si-hero__char">h</span><span className="si-hero__char">u</span><span className="si-hero__char">l</span></h1><span className="si-hero__ampersand">&amp;</span><h1 className="si-hero__name"><span className="si-hero__char">H</span><span className="si-hero__char">a</span><span className="si-hero__char">r</span><span className="si-hero__char">i</span><span className="si-hero__char">n</span><span className="si-hero__char">y</span><span className="si-hero__char">a</span></h1></div><p className="si-hero__invite-text">cordially invite you to celebrate their wedding</p><div className="si-hero__gold-line si-gold-line"></div><p className="si-hero__date">17 september 2026</p><p className="si-hero__city">Financial District, Hyderabad, Telangana, India</p></div><div aria-hidden="true" className="si-hero__leaf si-hero__leaf--left"><img alt="" className="si-hero__leaf-img" data-nimg="1" decoding="async" height="2752" loading="lazy" sizes="(min-width: 1024px) 180px, (min-width: 768px) 150px, 110px" src="/images/image_21.jpg" srcset="image_147.jpg 16w, image_152.jpg 32w, image_78.jpg 48w, image_62.jpg 64w, image_80.jpg 96w, image_74.jpg 128w, image_87.jpg 256w, image_103.jpg 375w, image_129.jpg 384w, image_110.jpg 640w, image_164.jpg 750w, image_188.jpg 828w, image_132.jpg 1080w, image_155.jpg 1200w, image_21.jpg 1920w" style={{ color: 'transparent' }} width="1536"/ /></div><div aria-hidden="true" className="si-hero__leaf si-hero__leaf--right"><img alt="" className="si-hero__leaf-img" data-nimg="1" decoding="async" height="2752" loading="lazy" sizes="(min-width: 1024px) 180px, (min-width: 768px) 150px, 110px" src="/images/image_15.jpg" srcset="image_83.jpg 16w, image_102.jpg 32w, image_79.jpg 48w, image_89.jpg 64w, image_99.jpg 96w, image_86.jpg 128w, image_134.jpg 256w, image_161.jpg 375w, image_107.jpg 384w, image_182.jpg 640w, image_180.jpg 750w, image_149.jpg 828w, image_183.jpg 1080w, image_135.jpg 1200w, image_15.jpg 1920w" style={{ color: 'transparent' }} width="1536"/ /></div><div aria-hidden="true" className="si-hero__sky-bg"><img alt="" className="si-hero__sky-img" data-nimg="1" decoding="async" height="1080" sizes="100vw" src="/images/image_19.jpg" srcset="image_123.jpg 375w, image_151.jpg 384w, image_144.jpg 640w, image_119.jpg 750w, image_145.jpg 828w, image_159.jpg 1080w, image_165.jpg 1200w, image_19.jpg 1920w" style={{ color: 'transparent' }} width="1080"/ /></div><div aria-hidden="true" className="si-hero__temple-backdrop"><img alt="" className="si-hero__gopuram-img" data-nimg="1" decoding="async" fetchpriority="high" height="700" sizes="(min-width: 1024px) 100vw, (min-width: 768px) 120vw, 140vw" src="/images/image_23.png" srcset="image_138.png 375w, image_116.png 384w, image_108.png 640w, image_189.png 750w, image_194.png 828w, image_187.png 1080w, image_113.png 1200w, image_23.png 1920w" style={{ color: 'transparent' }} width="800"/ /></div></section><div aria-hidden="true" className="si-deco-divider"><img alt="" className="si-deco-divider__img" data-nimg="1" decoding="async" height="243" loading="lazy" sizes="(min-width: 768px) 340px, 260px" src="/images/image_12.png" srcset="image_98.png 16w, image_88.png 32w, image_85.png 48w, image_84.png 64w, image_90.png 96w, image_139.png 128w, image_115.png 256w, image_112.png 375w, image_171.png 384w, image_118.png 640w, image_150.png 750w, image_136.png 828w, image_181.png 1080w, image_137.png 1200w, image_12.png 1920w" style={{ color: 'transparent' }} width="478"/ /></div><section className="si-section si-couple"><h2 className="si-couple__heading">About the Couple</h2><div className="si-gold-line"></div><div className="si-couple__cards"><div className="si-couple__card"><div className="si-couple__photo-wrapper"><img alt="" aria-hidden="true" className="si-couple__wreath" data-nimg="1" decoding="async" height="1240" loading="lazy" sizes="(min-width: 768px) 420px, 90vw" src="/images/image_18.png" srcset="image_156.png 375w, image_162.png 384w, image_94.png 640w, image_157.png 750w, image_168.png 828w, image_163.png 1080w, image_192.png 1200w, image_18.png 1920w" style={{ color: 'transparent' }} width="1240"/ /><div className="si-couple__photo-frame"><img alt="Rahul Sipligunj" className="si-couple__photo" data-nimg="1" decoding="async" height="160" loading="lazy" src="/images/image_1.jpg" srcset="image_117.jpg 1x, image_1.jpg 2x" style={{ color: 'transparent' }} width="160"/ /></div></div><h3 className="si-couple__name">Rahul Sipligunj</h3><p className="si-couple__parents"><span className="si-couple__parent-label">Son of</span>Shankar Sipligunj &amp; Laxmi Sipligunj</p></div><div className="si-couple__divider"><span className="si-couple__amp">&amp;</span></div><div className="si-couple__card"><div className="si-couple__photo-wrapper"><img alt="" aria-hidden="true" className="si-couple__wreath" data-nimg="1" decoding="async" height="1240" loading="lazy" sizes="(min-width: 768px) 420px, 90vw" src="/images/image_18.png" srcset="image_156.png 375w, image_162.png 384w, image_94.png 640w, image_157.png 750w, image_168.png 828w, image_163.png 1080w, image_192.png 1200w, image_18.png 1920w" style={{ color: 'transparent' }} width="1240"/ /><div className="si-couple__photo-frame"><img alt="Harinya Reddy" className="si-couple__photo" data-nimg="1" decoding="async" height="160" loading="lazy" src="/images/image_10.jpg" srcset="image_101.jpg 1x, image_10.jpg 2x" style={{ color: 'transparent' }} width="160"/ /></div></div><h3 className="si-couple__name">Harinya Reddy</h3><p className="si-couple__parents"><span className="si-couple__parent-label">Daughter of</span>Ramesh Reddy &amp; Lakshmi Reddy</p></div></div></section><div aria-hidden="true" className="si-deco-divider"><img alt="" className="si-deco-divider__img si-deco-divider__img--elephants" data-nimg="1" decoding="async" height="599" loading="lazy" sizes="(min-width: 768px) 340px, 260px" src="/images/image_4.png" srcset="image_91.png 16w, image_142.png 32w, image_106.png 48w, image_111.png 64w, image_92.png 96w, image_141.png 128w, image_114.png 256w, image_175.png 375w, image_121.png 384w, image_126.png 640w, image_105.png 750w, image_186.png 828w, image_133.png 1080w, image_179.png 1200w, image_4.png 1920w" style={{ color: 'transparent' }} width="1054"/ /></div><section className="si-section si-events"><h2 className="si-events__heading">Wedding Events</h2><div className="si-gold-line"></div><div className="si-events__grid"><div className="si-event-card"><div className="si-event-card__accent"></div><h3 className="si-event-card__name">Wedding Ceremony</h3><p className="si-event-card__date">Saturday, 12 january</p><p className="si-event-card__time">10:30 AM</p><p className="si-event-card__venue">Kukatpally, Hyderabad.</p><a className="si-event-card__directions" href="https://www.google.com/maps" rel="noopener noreferrer" target="_blank">Get Directions</a></div><div className="si-event-card"><div className="si-event-card__accent"></div><h3 className="si-event-card__name">Haldi ceremony.</h3><p className="si-event-card__date">Tuesday 3 rd march</p><p className="si-event-card__time">12:30 PM</p><p className="si-event-card__venue">Kukatpally, Hyderabad.</p><a className="si-event-card__directions" href="https://maps.app.goo.gl/mBMK1HkkHVTVZ6ET8" rel="noopener noreferrer" target="_blank">Get Directions</a></div><div className="si-event-card"><div className="si-event-card__accent"></div><h3 className="si-event-card__name">Mehendi</h3><p className="si-event-card__date">Wednesday 4th march</p><p className="si-event-card__time">9:00 pm onwards</p><p className="si-event-card__venue">Kukatpally, Hyderabad.</p><a className="si-event-card__directions" href="https://maps.app.goo.gl/mBMK1HkkHVTVZ6ET8" rel="noopener noreferrer" target="_blank">Get Directions</a></div><div className="si-event-card"><div className="si-event-card__accent"></div><h3 className="si-event-card__name">Reception</h3><p className="si-event-card__date">Friday 5th march</p><p className="si-event-card__time">9:00 pm onwards</p><p className="si-event-card__venue">Kukatpally, Hyderabad.</p><a className="si-event-card__directions" href="https://maps.app.goo.gl/mBMK1HkkHVTVZ6ET8" rel="noopener noreferrer" target="_blank">Get Directions</a></div></div></section><section className="si-section si-countdown"><h2 className="si-countdown__heading">Counting Down To</h2><p className="si-countdown__subheading">Our Special Day</p><div className="si-gold-line"></div><div className="si-countdown__timer"><div className="si-countdown__unit"><div className="si-countdown__number">00</div><div className="si-countdown__label">Days</div></div><span className="si-countdown__sep">:</span><div className="si-countdown__unit"><div className="si-countdown__number">00</div><div className="si-countdown__label">Hours</div></div><span className="si-countdown__sep">:</span><div className="si-countdown__unit"><div className="si-countdown__number">00</div><div className="si-countdown__label">Minutes</div></div><span className="si-countdown__sep">:</span><div className="si-countdown__unit"><div className="si-countdown__number">00</div><div className="si-countdown__label">Seconds</div></div></div></section><section className="si-section si-gallery"><h2 className="si-gallery__heading">Captured Moments</h2><div className="si-gold-line"></div><div className="si-gallery__grid" data-count="6"><button aria-label="View photo 1" className="si-gallery__item" type="button"><img alt="Wedding photo 1" className="si-gallery__photo" data-nimg="1" decoding="async" height="400" loading="lazy" src="/images/image_9.jpg" srcset="image_100.jpg 1x, image_9.jpg 2x" style={{ color: 'transparent' }} width="400"/ /></button><button aria-label="View photo 2" className="si-gallery__item" type="button"><img alt="Wedding photo 2" className="si-gallery__photo" data-nimg="1" decoding="async" height="400" loading="lazy" src="/images/image_13.jpg" srcset="image_130.jpg 1x, image_13.jpg 2x" style={{ color: 'transparent' }} width="400"/ /></button><button aria-label="View photo 3" className="si-gallery__item" type="button"><img alt="Wedding photo 3" className="si-gallery__photo" data-nimg="1" decoding="async" height="400" loading="lazy" src="/images/image_20.jpg" srcset="image_122.jpg 1x, image_20.jpg 2x" style={{ color: 'transparent' }} width="400"/ /></button><button aria-label="View photo 4" className="si-gallery__item" type="button"><img alt="Wedding photo 4" className="si-gallery__photo" data-nimg="1" decoding="async" height="400" loading="lazy" src="/images/image_22.jpg" srcset="image_125.jpg 1x, image_22.jpg 2x" style={{ color: 'transparent' }} width="400"/ /></button><button aria-label="View photo 5" className="si-gallery__item" type="button"><img alt="Wedding photo 5" className="si-gallery__photo" data-nimg="1" decoding="async" height="400" loading="lazy" src="/images/image_16.jpg" srcset="image_166.jpg 1x, image_16.jpg 2x" style={{ color: 'transparent' }} width="400"/ /></button><button aria-label="View photo 6" className="si-gallery__item" type="button"><img alt="Wedding photo 6" className="si-gallery__photo" data-nimg="1" decoding="async" height="400" loading="lazy" src="/images/image_8.jpg" srcset="image_170.jpg 1x, image_8.jpg 2x" style={{ color: 'transparent' }} width="400"/ /></button></div></section><div><section className="si-section si-video"><h2 className="si-video__heading">Our Story</h2><div className="si-gold-line"></div><div className="si-video__wrapper"><iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" className="si-video__iframe" loading="lazy" src="https://www.youtube.com/embed/VouPYyg0z2U?rel=0&amp;modestbranding=1&amp;vq=hd1080&amp;hd=1" title="Our Story"></iframe></div></section></div><section className="si-section si-venue"><h2 className="si-venue__heading">When &amp; Where</h2><div className="si-gold-line"></div><div className="si-venue__content"><div className="si-venue__details"><h3 className="si-venue__name">Balaji nagar, Hyderabad.</h3><p className="si-venue__address">Venue Address, City, State</p><a className="si-venue__directions-btn" href="https://maps.app.goo.gl/mBMK1HkkHVTVZ6ET8" rel="noopener noreferrer" target="_blank">Get Directions</a></div><div className="si-venue__map"><iframe allowfullscreen="" className="si-venue__map-iframe" height="300" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Balaji%20nagar%2C%20Hyderabad.%2C%20Venue%20Address%2C%20City%2C%20State&amp;output=embed" style={{ border: '0' }} title="Venue location" width="100%"></iframe></div></div></section><section className="si-section si-rsvp"><h2 className="si-rsvp__heading">Will You Join Us?</h2><div className="si-gold-line"></div><form className="si-rsvp__form"><div className="si-rsvp__field"><label className="si-rsvp__label" htmlFor="rsvp-name">Your Name</label><input className="si-rsvp__input" id="rsvp-name" placeholder="Enter your full name" required="" type="text" value=""/></div><div className="si-rsvp__field"><label className="si-rsvp__label">Will You Attend?</label><div className="si-rsvp__radio-group"><label className="si-rsvp__radio"><input name="attending" type="radio" value="yes"/><span className="si-rsvp__radio-label">Joyfully Accept</span></label><label className="si-rsvp__radio"><input name="attending" type="radio" value="no"/><span className="si-rsvp__radio-label">Respectfully Decline</span></label></div></div><div className="si-rsvp__field"><label className="si-rsvp__label" htmlFor="rsvp-message">Message (optional)</label><textarea className="si-rsvp__input si-rsvp__textarea" id="rsvp-message" placeholder="Send your wishes..." rows="3"></textarea></div><button className="si-rsvp__submit" disabled="" type="submit">Confirm Attendance</button></form></section><div></div><div><div className="si-share"><p className="si-share__label">Share This Invitation</p><div className="si-share__buttons"><button aria-label="Share on WhatsApp" className="si-share__btn si-share__btn--whatsapp" type="button"><svg fill="currentColor" height="18" viewBox="0 0 24 24" width="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></path></svg>WhatsApp</button><button aria-label="Add to calendar" className="si-share__btn si-share__btn--calendar" type="button"><svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18"><rect height="18" rx="2" ry="2" width="18" x="3" y="4"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>Add to Calendar</button><button aria-label="Copy invitation link" className="si-share__btn si-share__btn--copy" type="button"><svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></path></svg>Copy Link</button></div></div></div><footer className="si-footer"><div className="si-footer__scene"><div className="si-footer__text"><p className="si-footer__label">The Wedding of</p><p className="si-footer__couple">Rahul<!-- --> &amp; <!-- -->Harinya</p><div className="si-gold-line"></div><p className="si-footer__credit">Made with love by<!-- --> <a className="si-footer__link" href="https://myshaadhilink.in" rel="noopener noreferrer" target="_blank">MyShaadhiLink</a></p></div><img alt="South Indian temple gopuram" className="si-footer__gopuram-img" data-nimg="1" decoding="async" height="721" loading="lazy" sizes="100vw" src="/images/image_3.png" srcset="image_59.png 375w, image_64.png 384w, image_154.png 640w, image_191.png 750w, image_153.png 828w, image_193.png 1080w, image_178.png 1200w, image_3.png 1920w" style={{ color: 'transparent' }} width="1240"/ /></div><div aria-hidden="true" className="si-footer__toran"><img alt="" className="si-footer__toran-element si-footer__toran-element--0" data-nimg="1" decoding="async" height="916" loading="lazy" src="/images/image_11.png" srcset="image_184.png 1x, image_11.png 2x" style={{ color: 'transparent' }} width="517"/ /><img alt="" className="si-footer__toran-element si-footer__toran-element--1" data-nimg="1" decoding="async" height="916" loading="lazy" src="/images/image_14.png" srcset="image_177.png 1x, image_14.png 2x" style={{ color: 'transparent' }} width="517"/ /><img alt="" className="si-footer__toran-element si-footer__toran-element--2" data-nimg="1" decoding="async" height="916" loading="lazy" src="/images/image_11.png" srcset="image_184.png 1x, image_11.png 2x" style={{ color: 'transparent' }} width="517"/ /><img alt="" className="si-footer__toran-element si-footer__toran-element--3" data-nimg="1" decoding="async" height="916" loading="lazy" src="/images/image_14.png" srcset="image_177.png 1x, image_14.png 2x" style={{ color: 'transparent' }} width="517"/ /><img alt="" className="si-footer__toran-element si-footer__toran-element--4" data-nimg="1" decoding="async" height="916" loading="lazy" src="/images/image_11.png" srcset="image_184.png 1x, image_11.png 2x" style={{ color: 'transparent' }} width="517"/ /><img alt="" className="si-footer__toran-element si-footer__toran-element--5" data-nimg="1" decoding="async" height="916" loading="lazy" src="/images/image_14.png" srcset="image_177.png 1x, image_14.png 2x" style={{ color: 'transparent' }} width="517"/ /><img alt="" className="si-footer__toran-element si-footer__toran-element--6" data-nimg="1" decoding="async" height="916" loading="lazy" src="/images/image_11.png" srcset="image_184.png 1x, image_11.png 2x" style={{ color: 'transparent' }} width="517"/ /><img alt="" className="si-footer__toran-element si-footer__toran-element--7" data-nimg="1" decoding="async" height="916" loading="lazy" src="/images/image_14.png" srcset="image_177.png 1x, image_14.png 2x" style={{ color: 'transparent' }} width="517"/ /></div></footer><button aria-label="Play music" className="si-music-btn" type="button"><svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20"><path d="M11 5L6 9H2v6h4l5 4V5z" /></path><line x1="23" x2="17" y1="9" y2="15"></line><line x1="17" x2="23" y1="9" y2="15"></line></svg></button><a aria-label="Order South Indian template for ₹3,999" className="si-pricing-bar" href="https://wa.me/919553143929?text=Hi%2C%20I'm%20interested%20in%20the%20South%20Indian%20wedding%20invitation%20template%20(%E2%82%B93%2C999).%20I'd%20like%20to%20order%20it." rel="noopener noreferrer" role="complementary" target="_blank"><span className="si-pricing-bar__price">₹3,999</span><span className="si-pricing-bar__divider"></span><span className="si-pricing-bar__label">Order Now</span></a></div><!--\$--><!--/\$-->
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
    lightbox.innerHTML = '<button style={{ position: 'absolute', top: '20px', right: '24px', color: '#fff', fontSize: '36px', cursor: 'pointer', background: 'none', border: 'none' }}>&times;</button><img src="" alt="Preview" style={{ maxWidth: '92vw', maxHeight: '88vh', borderRadius: '12px', boxShadow: '0 24px 48px rgba(0,0,0,0.6)', transform: 'scale(0.92)', transition: 'transform 0.3s ease' }} />';
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
