# 🏛️ Premium Web Templates & MyShaadhi Master Archive
**Date Archived:** 08 October 2026  
**Status:** Paused for Basic Templates Launch (App Final Stage / MVP Focus)  
**Synced Git Commits:** `502ca35` on both GitHub (`origin/main`) & GitLab (`gitlab/main`)

---

## 1. వ్యూహాత్మక నిర్ణయం (Strategic Rationale)
- **కారణం:** ప్రీమియం టెంప్లేట్లు (హై-ఎండ్ 3D/వీడియో/ఇంటరాక్టివ్ ఎఫెక్ట్స్, సినిమాటిక్ కర్టెన్లు, గోపురం యానిమేషన్స్) పూర్తిగా సిద్ధం చేయడానికి కొన్ని నెలల సమయం పడుతుంది.
- **లక్ష్యం:** మన యాప్ లాంచ్ చివరి దశకు (Final Stage) చేరుకుంది. ఎలాంటి రిస్క్ లేకుండా వెంటనే వేగంగా మార్కెట్లోకి వెళ్ళడానికి మొదట **బేసిక్ వెబ్ టెంప్లేట్లను (Basic Templates)** కంప్లీట్ చేసి విడుదల చేయాలని నిర్ణయించాం.
- **తర్వాత ప్రణాళిక:** బేసిక్ టెంప్లేట్లు సక్సెస్ అయి యాప్ లైవ్ అయ్యాక, భవిష్యత్తులో ఈ డాక్యుమెంట్ ఆధారంగా ప్రీమియం టెంప్లేట్లను తిరిగి రీ-ఓపెన్ చేసి మరింత గ్రాండ్‌గా డెవలప్ చేస్తాం.

---

## 2. ప్రీమియం టెంప్లేట్ల వివరాలు (Premium Templates Catalog)

### 1) Kalyana Mandapam (కళ్యాణ మండపం - విజయ్ & రష్మిక థీమ్)
- **ID:** `kalyana-mandapam`
- **లొకేషన్:** `src/components/kalyanaMandapam/`
- **ప్రధాన కాంపోనెంట్లు:**
  - `KalyanaMandapamView.tsx` — మెయిన్ కంటైనర్ & స్క్రోల్ ఆర్కెస్ట్రేషన్
  - `KmEntry.tsx` — గోల్డెన్ దేవాలయ తలుపులు ఓపెనింగ్ యానిమేషన్ & లగ్న పత్రిక కవర్ రివీల్
  - `KmHero.tsx` — వినాయక ప్రార్థన, దంపతుల పేర్లు, మంగళ వాయిద్యాల ఆడియో ప్లేయర్
  - `KmCouple.tsx` — వరుడు & వధువు పరిచయం, తల్లిదండ్రుల ఆశీస్సులు
  - `KmEvents.tsx` — వివాహ వేడుకలు (హల్దీ, మెహందీ, కళ్యాణం, రిసెప్షన్)
  - `KmCountdown.tsx` — ప్రాచీన రాతి గోడ కౌంట్‌డౌన్ టైమర్
  - `KmTalambralu.tsx` — ఇంటరాక్టివ్ తలంబ్రాల వర్షం (Interactive sacred rice shower)
  - `KmDigitalShagun.tsx` — UPI డిజిటల్ చదువులు (Digital Gifting / Shagun)
  - `KmFloatingDock.tsx` — నావిగేషన్ డాక్ & మ్యూజిక్ కంట్రోల్
  - `KmRsvp.tsx` — రాయల్ RSVP ఫారమ్ & వాట్సాప్ షేరింగ్

### 2) South Indian Traditional / MyShaadhi Practice Template
- **ID:** `myshaadhi-traditional` & `practice-myshaadhi/`
- **లొకేషన్:** `practice-myshaadhi/index.html` మరియు `public/practice-myshaadhi/index.html`
- **కీలక అసెట్స్ & ఆర్కిటెక్చర్:**
  - `assets/gopuram v 2.webp` — హై-రిజల్యూషన్ దక్షిణ భారత టెంపుల్ గోపురం
  - **సూర్యకాంతి మేఘాలు (Sunlit Golden Clouds):** `practice-clouds-wrap` (`z-index: 4`) లో స్వచ్ఛమైన తెల్లటి అంచులు, కింద ఉదయపు సూర్యకాంతి గోల్డెన్ అంబర్ షేడ్ (`#FFF6E6` → `#FDE4BE` → `#E8BB80`) మరియు మృదువైన వార్మ్ షాడో (`rgba(184, 134, 11, 0.42)`).
  - **సింపుల్ పక్షుల ఫ్లైట్ (Simple Silhouette Birds):** `practice-simple-bird` ట్విన్-వింగ్ క్లాసిక్ కర్వ్డ్ రెక్కల విహంగాల లూప్.
  - తోరణాలు (`toran-type-1.png`, `toran-type-2.png`), అరటి ఆకులు (`banana-leaf-left.webp`, `banana-leaf-right.webp`), బరాత్ మరియు ఏనుగుల క్లీన్ డివైడర్లు.
  - `practice-myshaadhi/css/` లో 18 కంపైల్డ్ CSS మోడ్యూల్స్ భద్రపరచబడ్డాయి.

### 3) Teatro (థియేట్రో - రెడ్ వెల్వెట్ కర్టెన్స్ & స్క్రాచ్ కార్డ్)
- **ID:** `teatro`
- **లొకేషన్:** `src/components/teatro/`
- **ఫీచర్స్:** రెడ్ వెల్వెట్ కర్టెన్స్ సినిమాటిక్ వీడియో ఓపెనింగ్, 3 గోల్డ్ స్క్రాచ్ వలయాలు (Scratch-to-Reveal Date), ఇటాలియన్ విల్లా లైన్ ఆర్ట్, స్కాలోప్ ఎడ్జ్ కార్డ్.

### 4) Royal Traditional (రాజరిక సాంప్రదాయ లగ్న పత్రిక)
- **ID:** `royal-traditional`
- **ఫీచర్స్:** రాయల్ తాంబూల కవరు ఓపెనింగ్, సన్నాయి మంగళ వాయిద్యాలు, శుభ ముహూర్తం కౌంట్‌డౌన్, వేదిక మ్యాప్.

### 5) NeoBloom Modern (నియో బ్లూమ్ రోమాంటిక్ వెబ్‌సైట్)
- **ID:** `neobloom`
- **ఫీచర్స్:** రోజ్ పెటల్ కన్ఫెట్టి, లవ్ స్టోరీ టైమ్‌లైన్, రోజ్ & ఎమరాల్డ్ కలర్ పాలెట్.

### 6) Ulems Edition (ఉలేమ్స్ స్ప్లిట్ స్క్రీన్ ఎడిషన్)
- **ID:** `ulems`
- **ఫీచర్స్:** డెస్క్‌టాప్ స్ప్లిట్ స్క్రీన్, రొటేటింగ్ మ్యూజిక్ డిస్క్, బాటమ్ నావిగేషన్, శుభాకాంక్షల వాల్.

---

## 3. రిపోజిటరీ & బ్యాకప్ స్టేటస్ (Git Repositories)
- **GitHub Repo:** `https://github.com/gptrevents/web-templents.git`
- **GitLab Repo:** `https://gitlab.com/gptr1/web-templents.git`
- **Current Commit:** `502ca35`
- **Status:** All working tree clean, synced to both remotes!

---

## 4. భవిష్యత్తులో ప్రీమియం టెంప్లేట్లను పునఃప్రారంభించే విధానం (How to Resume)
1. `src/App.tsx` లోని కేటగిరీ ట్యాబ్‌లో `setSelectedCategory('premium')` ను యాక్టివ్ చేయవచ్చు.
2. `practice-myshaadhi/index.html` లోని కస్టమ్ స్టైల్స్ మరియు గోపురం వెంట్స్ ను నేరుగా రియాక్ట్ `KmEntry.tsx` మరియు `SouthIndianOpeningView` లోకి ఇంపోర్ట్ చేసుకోవచ్చు.
3. లైవ్ ప్రివ్యూ కోసం `npm run dev` రన్ చేసి `http://localhost:3000/practice-myshaadhi/index.html` లేదా `http://localhost:3000/?template=kalyana-mandapam&view=preview` చూడవచ్చు.
