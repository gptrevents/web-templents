import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  Calendar,
  MapPin,
  Clock,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Send,
  Copy,
  Check,
  MessageSquare,
  Home,
  Users,
  Camera,
  Compass,
  Gift,
  MailOpen,
  ChevronDown,
  ArrowUp,
  Instagram,
  QrCode,
  Sparkles,
  Info,
  CreditCard,
  Phone,
  BookmarkCheck,
} from 'lucide-react';
import { CustomInvitationData } from '../../types';
import { weddingAudio } from '../../utils/audio';

interface UlemsViewProps {
  customData: CustomInvitationData;
}

interface GuestWishItem {
  id: string;
  name: string;
  status: 'హాజరవుతాం' | 'సందేహం' | 'రాలేకపోతున్నాం';
  message: string;
  timeAgo: string;
  likes: number;
  liked?: boolean;
}

export const UlemsView: React.FC<UlemsViewProps> = ({ customData }) => {
  // Invitation cover reveal state
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);

  // Audio playing state
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Dark/Light theme toggle
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Active section for bottom nav highlight
  const [activeNav, setActiveNav] = useState<'home' | 'bride' | 'wedding-date' | 'gallery' | 'comment'>('home');

  // Copy states for bank, upi, address
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Story expanded state
  const [showStoryDetail, setShowStoryDetail] = useState(true);

  // Gallery modal preview
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 142,
    hours: 18,
    minutes: 24,
    seconds: 35,
  });

  // Guest wishes state
  const [wishes, setWishes] = useState<GuestWishItem[]>([
    {
      id: '1',
      name: 'సురేష్ & సుజాత గారు',
      status: 'హాజరవుతాం',
      message: 'రాహుల్ & హరిణ్యలకు మనస్ఫూర్తిగా వివాహ శుభాకాంక్షలు! మీ దాంపత్య జీవితం నిండు నూరేళ్లు సుఖసంతోషాలతో వర్ధిల్లాలని కోరుకుంటున్నాము.',
      timeAgo: '10 నిమిషాల క్రితం',
      likes: 12,
    },
    {
      id: '2',
      name: 'కిరణ్ కుమార్ (ఫ్రెండ్)',
      status: 'హాజరవుతాం',
      message: 'కంగ్రాట్స్ రాహుల్ బావా & హరిణ్య! పెళ్లి సందడి మొదలైంది.. డిసెంబర్ 12న కళ్యాణ మండపంలో రచ్చ రంబోలా చేద్దాం!',
      timeAgo: '45 నిమిషాల క్రితం',
      likes: 18,
    },
    {
      id: '3',
      name: 'శ్రీనివాసరావు & కుటుంబం',
      status: 'హాజరవుతాం',
      message: 'శ్రీ లక్ష్మీనారాయణుల ఆశీస్సులు మీకు ఎల్లప్పుడూ ఉండాలని మనసారా దీవిస్తున్నాము. శుభం భూయాత్!',
      timeAgo: '2 గంటల క్రితం',
      likes: 9,
    },
  ]);

  // Form input state
  const [senderName, setSenderName] = useState(customData.guestName || '');
  const [senderPresence, setSenderPresence] = useState<'హాజరవుతాం' | 'సందేహం' | 'రాలేకపోతున్నాం'>('హాజరవుతాం');
  const [senderComment, setSenderComment] = useState('');
  const [wishNotice, setWishNotice] = useState(false);

  // Audio synchronization
  useEffect(() => {
    const unsub = weddingAudio.subscribe((playing) => {
      setIsPlayingMusic(playing);
    });
    return () => unsub();
  }, []);

  // Countdown timer calculation
  useEffect(() => {
    const weddingTimestamp = new Date('2026-12-12T09:30:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = weddingTimestamp - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll listener to update active navbar icon
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'bride', 'wedding-date', 'gallery', 'comment'] as const;
      const scrollY = window.scrollY + 200;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveNav(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Open Invitation Handler
  const handleOpenInvitation = async () => {
    setIsInvitationOpened(true);
    try {
      await weddingAudio.play();
    } catch {
      // Autoplay might require user interaction which this click fulfills
    }
  };

  // Toggle Audio
  const handleToggleAudio = () => {
    weddingAudio.toggle();
  };

  // Scroll smoothly to section
  const scrollTo = (id: string, nav: typeof activeNav) => {
    setActiveNav(nav);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Copy text helper
  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  // Handle new comment submission
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderComment.trim()) return;

    const newWish: GuestWishItem = {
      id: Date.now().toString(),
      name: senderName.trim(),
      status: senderPresence,
      message: senderComment.trim(),
      timeAgo: 'ఇప్పుడే (Just now)',
      likes: 1,
      liked: true,
    };

    setWishes([newWish, ...wishes]);
    setSenderComment('');
    setWishNotice(true);
    setTimeout(() => setWishNotice(false), 4000);
  };

  // Like comment
  const handleLike = (id: string) => {
    setWishes((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const isLiked = !w.liked;
          return {
            ...w,
            liked: isLiked,
            likes: isLiked ? w.likes + 1 : w.likes - 1,
          };
        }
        return w;
      })
    );
  };

  // Theme color palette (Pure Ulems specs)
  // Light: bg-light-dark is #f8f9fa, bg-white-black is #ffffff, card is #ffffff with border #dee2e6
  // Dark: bg-light-dark is #212529, bg-white-black is #000000, card is #1a1e21 with border #343a40
  const bgLightDark = isDarkMode ? 'bg-[#212529] text-[#f8f9fa]' : 'bg-[#f8f9fa] text-[#212529]';
  const bgWhiteBlack = isDarkMode ? 'bg-[#000000] text-[#f8f9fa]' : 'bg-[#ffffff] text-[#212529]';
  const bgCardAuto = isDarkMode ? 'bg-[#1a1e21] border-[#343a40] text-[#f8f9fa]' : 'bg-white border-[#dee2e6] text-[#212529]';
  const textMuted = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const svgColorTheme = isDarkMode ? '#212529' : '#f8f9fa';
  const svgColorWhiteBlack = isDarkMode ? '#000000' : '#ffffff';

  return (
    <div className={`w-full min-h-screen font-josefin antialiased transition-colors duration-300 relative select-none ${isDarkMode ? 'dark bg-black text-white' : 'bg-[#f8f9fa] text-[#212529]'}`}>

      {/* ========================================================= */}
      {/* 1. THE WELCOME COVER OVERLAY ("Open Invitation" Gate)    */}
      {/* ========================================================= */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-700 ${
          isInvitationOpened ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 pointer-events-auto scale-100'
        }`}
        style={{
          background: isDarkMode
            ? 'linear-gradient(rgba(0, 0, 0, 0.88), rgba(0, 0, 0, 0.95)), url("https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80") center/cover no-repeat'
            : 'linear-gradient(rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.94)), url("https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80") center/cover no-repeat',
        }}
      >
        <div className="w-full max-w-sm px-6 text-center flex flex-col items-center">
          
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-gray-400 mb-2">
            The Wedding Of
          </p>

          <h2 className="font-esthetic text-5xl sm:text-6xl text-amber-600 dark:text-amber-400 mb-1 leading-tight">
            Rahul &amp; Harinya
          </h2>

          <p className="font-telugu text-lg font-semibold tracking-wide text-gray-800 dark:text-gray-100 mb-6">
            రాహుల్ &amp; హరిణ్య
          </p>

          {/* Round Avatar Circle (13rem / 208px circle) */}
          <div className="w-48 h-48 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl mb-6 mx-auto">
            <img
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80"
              alt="Rahul & Harinya"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Guest Card Box */}
          <div className={`w-full py-3.5 px-5 rounded-2xl border shadow-sm mb-6 ${bgCardAuto}`}>
            <p className={`text-xs ${textMuted} font-light mb-1`}>
              ఆత్మీయులైన గౌరవనీయులు (Kepada Yth)
            </p>
            <p className="text-base font-bold tracking-wide">
              {customData.guestName || 'బంధుమిత్రులు (Guest)'}
            </p>
          </div>

          {/* Open Invitation CTA */}
          <button
            type="button"
            onClick={handleOpenInvitation}
            className="w-full py-3 px-6 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <MailOpen className="w-4 h-4 animate-bounce" />
            <span>ఆహ్వానాన్ని తెరవండి (Open Invitation)</span>
          </button>

          <p className="text-[11px] text-gray-400 mt-6 tracking-wider">
            12 DEC 2026 • HYDERABAD
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. SPLIT LAYOUT CONTAINER (Desktop Left + Mobile Right)  */}
      {/* ========================================================= */}
      <div className="flex flex-col lg:flex-row w-full min-h-screen">

        {/* --------------------------------------------------------- */}
        {/* DESKTOP SHOWCASE COLUMN (Visible on large screens)       */}
        {/* --------------------------------------------------------- */}
        <div className="hidden lg:flex lg:w-7/12 xl:w-2/3 sticky top-0 h-screen overflow-hidden flex-col justify-between p-12 relative">
          
          {/* Background Image Slideshow */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85"
              alt="Background"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-[0.65]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Top Pill Tag */}
          <div className="relative z-10 text-white">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-300 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-300/30">
              Ulems Wedding Edition
            </span>
          </div>

          {/* Center Glass Card (Wahyu & Riski style) */}
          <div className="relative z-10 max-w-xl text-white">
            <p className="font-esthetic text-4xl text-amber-300 mb-1">
              The Wedding Of
            </p>
            <h1 className="font-esthetic text-7xl xl:text-8xl font-normal leading-tight drop-shadow-md mb-2">
              Rahul &amp; Harinya
            </h1>
            <p className="font-telugu text-2xl text-white/95 font-semibold mb-4">
              రాహుల్ &amp; హరిణ్య
            </p>
            <p className="text-white/85 text-base tracking-widest uppercase font-light">
              శనివారం, 12 డిసెంబర్ 2026 • హైదరాబాద్
            </p>
          </div>

          {/* Bottom Traditional Verse */}
          <div className="relative z-10 max-w-md text-white/80 text-xs italic bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            "మంగళం భగవాన్ విష్ణుః మంగళం గరుడధ్వజః | మంగళం పుండరీకాక్షో మంగళాయ తనో హరిః ||"
          </div>
        </div>

        {/* --------------------------------------------------------- */}
        {/* MOBILE CARD INVITATION (Right Column or Full on mobile)   */}
        {/* --------------------------------------------------------- */}
        <div className="w-full lg:w-5/12 xl:w-1/3 min-h-screen relative shadow-2xl flex flex-col pb-20">

          {/* ======================================================= */}
          {/* FLOATING ACTION BUTTONS (Music & Dark/Light Mode)       */}
          {/* Placed neatly at top-right below preview bar so they NEVER cover text */}
          {/* ======================================================= */}
          <div className="fixed top-14 right-3 z-40 flex items-center gap-2">
            {/* Music Spinning Disc Button */}
            <button
              type="button"
              onClick={handleToggleAudio}
              className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md border cursor-pointer transition-all transform hover:scale-105 active:scale-95 ${
                isPlayingMusic
                  ? 'bg-amber-600 text-white border-amber-500 animate-ulems-spin'
                  : isDarkMode
                  ? 'bg-stone-900/90 text-stone-300 border-stone-700'
                  : 'bg-white/95 text-stone-700 border-stone-300'
              }`}
              title={isPlayingMusic ? 'సంగీతం పాజ్ చేయండి' : 'సంగీతం ప్లే చేయండి'}
            >
              {isPlayingMusic ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Dark / Light Toggle */}
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md border cursor-pointer transition-all transform hover:scale-105 active:scale-95 ${
                isDarkMode
                  ? 'bg-stone-900/90 text-amber-400 border-stone-700'
                  : 'bg-white/95 text-stone-700 border-stone-300'
              }`}
              title={isDarkMode ? 'లైట్ మోడ్' : 'డార్క్ మోడ్'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* ======================================================= */}
          {/* SECTION 1: HOME (Hero with Circle & Scroll Animation)  */}
          {/* ======================================================= */}
          <section id="home" className={`${bgLightDark} pt-12 pb-8 px-6 text-center relative overflow-hidden`}>
            {/* Background watermark */}
            <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
              <Sparkles className="w-96 h-96 text-amber-500" />
            </div>

            <div className="relative z-10 max-w-sm mx-auto flex flex-col items-center">
              
              <h1 className="font-esthetic text-4xl sm:text-5xl font-normal text-amber-600 dark:text-amber-400 mb-2">
                Wedding Invitation
              </h1>
              <p className="text-xs uppercase tracking-[0.25em] font-semibold text-gray-500 dark:text-gray-400 mb-6">
                వివాహ ఆహ్వాన పత్రిక
              </p>

              {/* Central Crop Circle Avatar (13rem / 208px) */}
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl my-2 mx-auto ring-4 ring-amber-500/20">
                <img
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80"
                  alt="Couple"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Names in Sacramento + Telugu */}
              <h2 className="font-esthetic text-5xl font-normal text-gray-900 dark:text-white mt-5 mb-1.5 leading-tight">
                Rahul &amp; Harinya
              </h2>
              <p className="font-telugu text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                రాహుల్ &amp; హరిణ్య
              </p>

              <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 mb-6 tracking-wide">
                శనివారం, 12 డిసెంబర్ 2026 • హైదరాబాద్
              </p>

              {/* Save Google Calendar Button */}
              <a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Rahul+%26+Harinya+Wedding&dates=20261212T040000Z/20261212T080000Z&details=Wedding+ceremony+of+Rahul+and+Harinya+at+Sri+Convention+Hall&location=Sri+Convention+Hall,+Hyderabad"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-amber-500/40 text-xs font-semibold shadow-xs hover:bg-amber-600 hover:text-white hover:border-amber-600 transition-all cursor-pointer mb-8"
              >
                <BookmarkCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover:text-white" />
                <span>Google Calendar లో సేవ్ చేయండి</span>
              </a>

              {/* Animated Mouse Scroll Indicator */}
              <div
                onClick={() => scrollTo('bride', 'bride')}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="w-5 h-8 rounded-full border-2 border-gray-400 dark:border-gray-600 flex justify-center pt-1 mb-1.5 opacity-70 group-hover:opacity-100 transition">
                  <div className="w-1.5 h-2.5 rounded-full bg-amber-600 dark:bg-amber-400 animate-ulems-scroll" />
                </div>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">స్క్రోల్ చేయండి (Scroll)</span>
              </div>
            </div>
          </section>

          {/* WAVE SEPARATOR 1: LightDark to WhiteBlack */}
          <div className="w-full overflow-hidden leading-none -mt-1" style={{ color: svgColorTheme, backgroundColor: svgColorWhiteBlack }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 180" className="w-full h-10 block" fill="currentColor">
              <path d="M0,96L48,90.7C96,85,192,75,288,85.3C384,96,480,128,576,133.3C672,139,768,117,864,96C960,75,1056,53,1152,58.7C1248,64,1344,96,1392,112L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
            </svg>
          </div>

          {/* ======================================================= */}
          {/* SECTION 2: BRIDE & GROOM (The Couple)                    */}
          {/* ======================================================= */}
          <section id="bride" className={`${bgWhiteBlack} py-10 px-6 text-center relative`}>
            <div className="max-w-sm mx-auto">
              
              {/* Traditional Sanskrit/Telugu Header */}
              <p className="font-telugu text-xs font-bold text-amber-600 dark:text-amber-400 tracking-wider mb-1">
                ఓం శ్రీ లక్ష్మీనారాయణాభ్యాం నమః
              </p>
              <h2 className="font-esthetic text-4xl text-gray-900 dark:text-white mb-2">
                వధూవరుల పరిచయం
              </h2>
              <p className="text-xs uppercase tracking-widest font-semibold text-amber-600 dark:text-amber-400 mb-3">
                The Bride &amp; The Groom
              </p>
              <p className={`text-xs ${textMuted} leading-relaxed mb-8 px-2`}>
                పెద్దల ఆశీస్సులతో, బంధుమిత్రుల సమక్షంలో పవిత్రమైన ఏడడుగుల వివాహ బంధంలో అడుగుపెడుతున్న మా శుభకార్యానికి మిమ్మల్ని సాదరంగా ఆహ్వానిస్తున్నాము.
              </p>

              {/* Groom Profile */}
              <div className="relative py-2 flex flex-col items-center">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl mb-4 mx-auto ring-2 ring-amber-500/30">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                    alt="Rahul"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-esthetic text-4xl text-gray-900 dark:text-white mb-0.5">
                  Rahul Gandreti
                </h3>
                <p className="font-telugu text-base font-bold text-amber-600 dark:text-amber-400 mb-1.5">
                  రాహుల్ (పెళ్లికుమారుడు)
                </p>
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  శ్రీ రామిరెడ్డి &amp; శ్రీమతి లక్ష్మి గారి సుపుత్రుడు
                </p>
                <p className={`text-[11px] ${textMuted} mt-0.5 mb-3`}>హైదరాబాద్</p>

                {/* Instagram Button */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-gray-300 dark:border-gray-700 text-[11px] font-semibold hover:border-pink-500 hover:text-pink-500 transition"
                >
                  <Instagram className="w-3 h-3 text-pink-600" />
                  <span>@rahul_gandreti</span>
                </a>
              </div>

              {/* Romantic Ampersand */}
              <div className="my-5">
                <span className="font-esthetic text-5xl text-amber-600 dark:text-amber-400">
                  &amp;
                </span>
              </div>

              {/* Bride Profile */}
              <div className="relative py-2 flex flex-col items-center">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl mb-4 mx-auto ring-2 ring-rose-500/30">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
                    alt="Harinya"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-esthetic text-4xl text-gray-900 dark:text-white mb-0.5">
                  Harinya Varma
                </h3>
                <p className="font-telugu text-base font-bold text-rose-600 dark:text-rose-400 mb-1.5">
                  హరిణ్య (పెళ్లికూతురు)
                </p>
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  శ్రీ వెంకటేశ్వరరావు &amp; శ్రీమతి సునీత గారి కుమార్తె
                </p>
                <p className={`text-[11px] ${textMuted} mt-0.5 mb-3`}>విజయవాడ</p>

                {/* Instagram Button */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-gray-300 dark:border-gray-700 text-[11px] font-semibold hover:border-pink-500 hover:text-pink-500 transition"
                >
                  <Instagram className="w-3 h-3 text-pink-600" />
                  <span>@harinya_varma</span>
                </a>
              </div>
            </div>
          </section>

          {/* WAVE SEPARATOR 2: WhiteBlack to LightDark */}
          <div className="w-full overflow-hidden leading-none -mt-1" style={{ color: svgColorWhiteBlack, backgroundColor: svgColorTheme }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 180" className="w-full h-12 block" fill="currentColor">
              <path d="M0,96L48,90.7C96,85,192,75,288,85.3C384,96,480,128,576,133.3C672,139,768,117,864,96C960,75,1056,53,1152,58.7C1248,64,1344,96,1392,112L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
            </svg>
          </div>

          {/* ======================================================= */}
          {/* SECTION 3: SACRED VERSE & KISAH CINTA (Love Story)      */}
          {/* ======================================================= */}
          <section className={`${bgLightDark} py-10 px-6 text-center`}>
            <div className="max-w-sm mx-auto">
              
              {/* Sacred Verse Card */}
              <div className={`p-6 rounded-3xl border shadow-sm mb-8 ${bgCardAuto}`}>
                <p className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2">
                  సప్తపది పవిత్ర వాక్కు
                </p>
                <p className="font-telugu text-sm leading-relaxed font-semibold italic text-gray-800 dark:text-gray-200 mb-2">
                  "ధర్మేచ అర్థేచ కామేచ నాతిచరామి... జీవితాంతం ఒకరికొకరు నీడై తోడై నిలవాలని దైవసాక్షిగా ప్రతిజ్ఞ."
                </p>
                <p className={`text-[11px] ${textMuted}`}>
                  — పవిత్ర సప్తపది ఆశీర్వచనం
                </p>
              </div>

              {/* Love Story Container */}
              <div className={`p-6 rounded-3xl border shadow-sm text-left ${bgCardAuto}`}>
                <h2 className="font-esthetic text-center text-3xl text-gray-900 dark:text-white mb-1">
                  Our Love Story
                </h2>
                <p className="text-center text-xs font-semibold text-amber-600 dark:text-amber-400 mb-6 uppercase tracking-wider">
                  మన ప్రేమ ప్రయాణం
                </p>

                {/* Timeline Items */}
                <div className="space-y-6 relative border-l-2 border-amber-500/30 ml-3 pl-5">
                  {/* Step 1 */}
                  <div className="relative">
                    <span className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">
                      1
                    </span>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-1.5">
                      <span>💼 మొదటి పరిచయం</span>
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">(2024)</span>
                    </h4>
                    <p className={`text-xs ${textMuted} leading-relaxed`}>
                      కాలేజ్ క్యాంపస్ ప్రాజెక్ట్ సమయంలో ప్రారంభమైన స్నేహం. ఒకరి ఆలోచనలు మరొకరికి నచ్చిన ఆ మధుర క్షణం.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="relative">
                    <span className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">
                      2
                    </span>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-1.5">
                      <span>☕ స్నేహం నుండి ప్రేమకు</span>
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">(2025)</span>
                    </h4>
                    <p className={`text-xs ${textMuted} leading-relaxed`}>
                      స్నేహంలోంచి పుట్టిన అవగాహన, జీవితాంతం ఒకరికొకరు తోడుగా ఉండాలని మనసుల్లో తీసుకున్న నిర్ణయం.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <span className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">
                      3
                    </span>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-1.5">
                      <span>💍 నిశ్చితార్థం &amp; శుభ ముహూర్తం</span>
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">(2026)</span>
                    </h4>
                    <p className={`text-xs ${textMuted} leading-relaxed`}>
                      రెండు కుటుంబాల పెద్దల ఆశీస్సులతో తాంబూలాలు మార్చుకొని, డిసెంబర్ 12న కళ్యాణ ముహూర్తం ఖరారు చేసుకున్నాం.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* WAVE SEPARATOR 3: LightDark to WhiteBlack */}
          <div className="w-full overflow-hidden leading-none -mt-1" style={{ color: svgColorTheme, backgroundColor: svgColorWhiteBlack }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 180" className="w-full h-10 block" fill="currentColor">
              <path d="M0,96L48,90.7C96,85,192,75,288,85.3C384,96,480,128,576,133.3C672,139,768,117,864,96C960,75,1056,53,1152,58.7C1248,64,1344,96,1392,112L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
            </svg>
          </div>

          {/* ======================================================= */}
          {/* SECTION 4: WEDDING DATE & COUNTDOWN (Wedding Events)    */}
          {/* ======================================================= */}
          <section id="wedding-date" className={`${bgWhiteBlack} py-10 px-6 text-center`}>
            <div className="max-w-sm mx-auto">
              
              <h2 className="font-esthetic text-4xl text-gray-900 dark:text-white mb-1">
                Save The Date
              </h2>
              <p className="text-xs uppercase tracking-widest font-semibold text-amber-600 dark:text-amber-400 mb-5">
                శుభ ముహూర్తం &amp; వేడుకల వివరాలు
              </p>

              {/* Ulems Signature Clean Countdown Bar */}
              <div className={`border border-amber-500/30 rounded-2xl shadow-sm py-3 px-3 mb-8 bg-amber-500/5 ${bgCardAuto}`}>
                <div className="grid grid-cols-4 divide-x divide-amber-500/20 text-center">
                  <div className="px-1">
                    <span className="text-xl font-bold text-amber-600 dark:text-amber-400 block font-mono">{timeLeft.days}</span>
                    <span className="text-[10px] uppercase font-semibold text-gray-600 dark:text-gray-400 block mt-0.5">రోజులు</span>
                  </div>
                  <div className="px-1">
                    <span className="text-xl font-bold text-amber-600 dark:text-amber-400 block font-mono">{timeLeft.hours}</span>
                    <span className="text-[10px] uppercase font-semibold text-gray-600 dark:text-gray-400 block mt-0.5">గంటలు</span>
                  </div>
                  <div className="px-1">
                    <span className="text-xl font-bold text-amber-600 dark:text-amber-400 block font-mono">{timeLeft.minutes}</span>
                    <span className="text-[10px] uppercase font-semibold text-gray-600 dark:text-gray-400 block mt-0.5">నిమిషాలు</span>
                  </div>
                  <div className="px-1">
                    <span className="text-xl font-bold text-amber-600 dark:text-amber-400 block font-mono">{timeLeft.seconds}</span>
                    <span className="text-[10px] uppercase font-semibold text-gray-600 dark:text-gray-400 block mt-0.5">సెకన్లు</span>
                  </div>
                </div>
              </div>

              {/* Event 1: Kalyanam / Wedding Ceremony */}
              <div className={`p-6 rounded-3xl border shadow-sm mb-6 text-center ${bgCardAuto}`}>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ముఖ్య వేడుక</span>
                </div>

                <h3 className="font-esthetic text-3xl text-gray-900 dark:text-white mb-1">
                  కళ్యాణ మహోత్సవం
                </h3>
                <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-4">
                  శుభ ముహూర్తం: ఉదయం 09:30 గంటలకు
                </p>

                <div className="space-y-2 text-xs text-gray-700 dark:text-gray-300 mb-6 bg-stone-500/5 p-3 rounded-2xl border border-stone-200/40 dark:border-stone-700/40">
                  <p className="flex items-center justify-center gap-2 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>శనివారం, 12 డిసెంబర్ 2026</span>
                  </p>
                  <p className="flex items-center justify-center gap-2 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>శ్రీ కన్వెన్షన్ హాల్, ఎం.జి. రోడ్, హైదరాబాద్</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Rahul+%26+Harinya+Wedding&dates=20261212T040000Z/20261212T080000Z&location=Sri+Convention+Hall,+Hyderabad"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl border border-amber-600/40 text-xs font-semibold hover:bg-amber-600 hover:text-white transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>క్యాలెండర్ సేవ్</span>
                  </a>
                  <a
                    href="https://maps.google.com/?q=Sri+Convention+Hall+Hyderabad"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>గూగుల్ మ్యాప్స్</span>
                  </a>
                </div>
              </div>

              {/* Event 2: Reception */}
              <div className={`p-6 rounded-3xl border shadow-sm mb-6 text-center ${bgCardAuto}`}>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[11px] font-bold uppercase tracking-wider mb-2">
                  <Heart className="w-3.5 h-3.5" />
                  <span>స్నేహ విందు</span>
                </div>

                <h3 className="font-esthetic text-3xl text-gray-900 dark:text-white mb-1">
                  ఆశీర్వచనం &amp; విందు
                </h3>
                <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 mb-4">
                  సమయం: సాయంత్రం 07:00 గంటల నుండి
                </p>

                <div className="space-y-2 text-xs text-gray-700 dark:text-gray-300 mb-6 bg-stone-500/5 p-3 rounded-2xl border border-stone-200/40 dark:border-stone-700/40">
                  <p className="flex items-center justify-center gap-2 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>శనివారం, 12 డిసెంబర్ 2026</span>
                  </p>
                  <p className="flex items-center justify-center gap-2 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>రాయల్ గ్రాండ్ బాంక్వెట్స్, జూబ్లీ హిల్స్, హైదరాబాద్</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Rahul+%26+Harinya+Reception&dates=20261212T133000Z/20261212T170000Z&location=Royal+Palace+Hyderabad"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl border border-rose-600/40 text-xs font-semibold hover:bg-rose-600 hover:text-white transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>క్యాలెండర్ సేవ్</span>
                  </a>
                  <a
                    href="https://maps.google.com/?q=Royal+Palace+Hyderabad"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>గూగుల్ మ్యాప్స్</span>
                  </a>
                </div>
              </div>

              {/* Clean Dress Code Guide */}
              <div className={`p-5 rounded-3xl border shadow-sm ${bgCardAuto}`}>
                <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
                  డ్రెస్ కోడ్ సూచనలు (Dress Code)
                </p>
                <div className="flex justify-center items-center gap-3 my-3">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-700 shadow-sm bg-[#F5E6C8]" />
                    <span className="text-[10px] text-gray-500 mt-1">బంగారు కాంతి</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-700 shadow-sm bg-[#8B1A1A]" />
                    <span className="text-[10px] text-gray-500 mt-1">రాయల్ మెరూన్</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-700 shadow-sm bg-[#1E3A2B]" />
                    <span className="text-[10px] text-gray-500 mt-1">ఆకుపచ్చ</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                  సాంప్రదాయ పట్టు వస్త్రాలు / Traditional Indian Festive Wear
                </p>
              </div>

            </div>
          </section>

          {/* WAVE SEPARATOR 4: WhiteBlack to LightDark */}
          <div className="w-full overflow-hidden leading-none -mt-1" style={{ color: svgColorWhiteBlack, backgroundColor: svgColorTheme }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 180" className="w-full h-10 block" fill="currentColor">
              <path d="M0,96L48,90.7C96,85,192,75,288,85.3C384,96,480,128,576,133.3C672,139,768,117,864,96C960,75,1056,53,1152,58.7C1248,64,1344,96,1392,112L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
            </svg>
          </div>

          {/* ======================================================= */}
          {/* SECTION 5: GALLERY (Memories)                            */}
          {/* ======================================================= */}
          <section id="gallery" className={`${bgLightDark} py-10 px-6 text-center`}>
            <div className="max-w-sm mx-auto">
              <h2 className="font-esthetic text-4xl text-gray-900 dark:text-white mb-1">
                Photo Gallery
              </h2>
              <p className="text-xs uppercase tracking-widest font-semibold text-amber-600 dark:text-amber-400 mb-6">
                మధుర జ్ఞాపకాలు (Memories)
              </p>

              {/* Photo Grid with Zoom & Lightbox */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
                  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
                  'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
                  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
                  'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80',
                  'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
                ].map((imgUrl, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveModalImage(imgUrl)}
                    className={`rounded-2xl overflow-hidden shadow-xs group cursor-pointer relative aspect-[4/5] ${
                      i === 0 ? 'col-span-2 aspect-[16/10]' : ''
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Gallery ${i + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <Camera className="w-6 h-6 text-white drop-shadow" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WAVE SEPARATOR 5: LightDark to WhiteBlack */}
          <div className="w-full overflow-hidden leading-none -mt-1" style={{ color: svgColorTheme, backgroundColor: svgColorWhiteBlack }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 180" className="w-full h-10 block" fill="currentColor">
              <path d="M0,96L48,90.7C96,85,192,75,288,85.3C384,96,480,128,576,133.3C672,139,768,117,864,96C960,75,1056,53,1152,58.7C1248,64,1344,96,1392,112L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
            </svg>
          </div>

          {/* ======================================================= */}
          {/* SECTION 6: LOVE GIFT (డిజిటల్ తాంబూలం & కానుకలు)       */}
          {/* ======================================================= */}
          <section className={`${bgWhiteBlack} py-10 px-6 text-center`}>
            <div className="max-w-sm mx-auto">
              
              <h2 className="font-esthetic text-4xl text-gray-900 dark:text-white mb-1">
                Love Gift
              </h2>
              <p className="text-xs uppercase tracking-widest font-semibold text-amber-600 dark:text-amber-400 mb-2">
                డిజిటల్ తాంబూలం &amp; కానుకలు
              </p>
              <p className={`text-xs ${textMuted} leading-relaxed mb-6 px-2`}>
                మీ సమక్షం మరియు ఆశీస్సులే మాకు అమూల్యమైన కానుక. ఎవరైనా డిజిటల్ రూపంలో కానుక సమర్పించాలనుకుంటే క్రింది వివరాలు ఉపయోగించవచ్చు:
              </p>

              {/* Card 1: Bank Transfer */}
              <div className={`p-5 rounded-3xl border shadow-sm mb-4 text-left ${bgCardAuto}`}>
                <div className="flex items-center gap-2 mb-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase">
                  <CreditCard className="w-4 h-4" />
                  <span>బ్యాంక్ ఖాతా వివరాలు (HDFC Bank)</span>
                </div>
                <div className="space-y-1 text-xs text-gray-700 dark:text-gray-300 mb-3 bg-stone-500/5 p-3 rounded-xl border border-stone-200/40 dark:border-stone-700/40">
                  <p><strong>ఖాతాదారు:</strong> RAHUL GANDRETI</p>
                  <p><strong>ఖాతా నెంబర్:</strong> 50100234891234</p>
                  <p><strong>IFSC Code:</strong> HDFC0001234</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('50100234891234', 'bank')}
                  className="w-full py-2 px-3 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-amber-600 hover:text-white hover:border-amber-600 transition cursor-pointer"
                >
                  {copiedField === 'bank' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>ఖాతా నెంబర్ కాపీ అయింది!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>ఖాతా నెంబర్ కాపీ చేయండి</span>
                    </>
                  )}
                </button>
              </div>

              {/* Card 2: UPI / PhonePe / GPay */}
              <div className={`p-5 rounded-3xl border shadow-sm mb-4 text-left ${bgCardAuto}`}>
                <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase">
                  <QrCode className="w-4 h-4" />
                  <span>Google Pay / PhonePe / UPI</span>
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300 mb-3 bg-stone-500/5 p-3 rounded-xl border border-stone-200/40 dark:border-stone-700/40">
                  <p className="text-[11px] text-gray-500 mb-0.5">UPI ID:</p>
                  <p className="font-mono text-sm font-bold text-gray-900 dark:text-white">
                    rahul.wedding@okaxis
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('rahul.wedding@okaxis', 'upi')}
                  className="w-full py-2 px-3 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition cursor-pointer"
                >
                  {copiedField === 'upi' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>UPI ID కాపీ అయింది!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>UPI ID కాపీ చేయండి</span>
                    </>
                  )}
                </button>
              </div>

              {/* Card 3: Gift Address */}
              <div className={`p-5 rounded-3xl border shadow-sm text-left ${bgCardAuto}`}>
                <div className="flex items-center gap-2 mb-2 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase">
                  <Gift className="w-4 h-4" />
                  <span>పార్శిల్‌ కానుకల చిరునామా (Address)</span>
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300 mb-3 bg-stone-500/5 p-3 rounded-xl border border-stone-200/40 dark:border-stone-700/40">
                  <p className="leading-relaxed">
                    ప్లాట్ నెం. 402, శ్రీ నిలయం, రోడ్ నెం. 10, బంజారా హిల్స్, హైదరాబాద్ - 500034.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('Plot No. 402, Sri Nilayam, Road No. 10, Banjara Hills, Hyderabad - 500034', 'addr')}
                  className="w-full py-2 px-3 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition cursor-pointer"
                >
                  {copiedField === 'addr' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>చిరునామా కాపీ అయింది!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>చిరునామా కాపీ చేయండి</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </section>

          {/* WAVE SEPARATOR 6: WhiteBlack to LightDark */}
          <div className="w-full overflow-hidden leading-none -mt-1" style={{ color: svgColorWhiteBlack, backgroundColor: svgColorTheme }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 180" className="w-full h-10 block" fill="currentColor">
              <path d="M0,96L48,90.7C96,85,192,75,288,85.3C384,96,480,128,576,133.3C672,139,768,117,864,96C960,75,1056,53,1152,58.7C1248,64,1344,96,1392,112L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
            </svg>
          </div>

          {/* ======================================================= */}
          {/* SECTION 7: WISHES & RSVP (ఆశీస్సులు & శుభాకాంక్షలు)     */}
          {/* ======================================================= */}
          <section id="comment" className={`${bgLightDark} py-10 px-6 text-center`}>
            <div className="max-w-sm mx-auto">
              
              <h2 className="font-esthetic text-4xl text-gray-900 dark:text-white mb-1">
                Wishes &amp; Blessings
              </h2>
              <p className="text-xs uppercase tracking-widest font-semibold text-amber-600 dark:text-amber-400 mb-6">
                ఆశీస్సులు &amp; శుభాకాంక్షలు (RSVP)
              </p>

              {/* Form Container */}
              <form onSubmit={handleSubmitComment} className={`p-6 rounded-3xl border shadow-sm text-left mb-8 ${bgCardAuto}`}>
                
                {/* Name */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    మీ పేరు (Your Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="ఉదా: రాఘవ &amp; కుటుంబం"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* RSVP Attendance */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    హాజరు కాగలరా? (Attendance Confirmation)
                  </label>
                  <select
                    value={senderPresence}
                    onChange={(e) => setSenderPresence(e.target.value as typeof senderPresence)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="హాజరవుతాం">✅ తప్పకుండా హాజరవుతాం (Attending)</option>
                    <option value="సందేహం">❓ ప్రయత్నిస్తాం / సందేహం (Tentative)</option>
                    <option value="రాలేకపోతున్నాం">❌ రాలేకపోతున్నాం, ఆశీస్సులు (Regrets)</option>
                  </select>
                </div>

                {/* Message */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    వధూవరులకు మీ ఆశీస్సులు (Your Blessings) *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={senderComment}
                    onChange={(e) => setSenderComment(e.target.value)}
                    placeholder="వధూవరులకు మీ హృదయపూర్వక ఆశీస్సులు రాయండి..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>శుభాకాంక్షలు పంపండి (Send Wishes)</span>
                </button>

                {wishNotice && (
                  <p className="mt-2.5 text-center text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                    ✓ మీ శుభాకాంక్షలు విజయవంతంగా చేరాయి!
                  </p>
                )}
              </form>

              {/* Comments Feed */}
              <div className="space-y-3 text-left">
                {wishes.map((item) => (
                  <div key={item.id} className={`p-4 rounded-2xl border shadow-xs ${bgCardAuto}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-amber-600/15 text-amber-700 dark:text-amber-300 font-bold text-[10px] flex items-center justify-center">
                          {item.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-bold text-xs text-gray-900 dark:text-white">
                          {item.name}
                        </span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        item.status === 'హాజరవుతాం'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-2.5 pl-8">
                      {item.message}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-gray-400 pl-8">
                      <span>{item.timeAgo}</span>
                      <button
                        type="button"
                        onClick={() => handleLike(item.id)}
                        className="flex items-center gap-1 hover:text-rose-500 transition cursor-pointer"
                      >
                        <Heart className={`w-3.5 h-3.5 ${item.liked ? 'text-rose-500 fill-rose-500' : ''}`} />
                        <span>{item.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* WAVE SEPARATOR 7: LightDark to WhiteBlack */}
          <div className="w-full overflow-hidden leading-none -mt-1" style={{ color: svgColorTheme, backgroundColor: svgColorWhiteBlack }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 180" className="w-full h-10 block" fill="currentColor">
              <path d="M0,96L48,90.7C96,85,192,75,288,85.3C384,96,480,128,576,133.3C672,139,768,117,864,96C960,75,1056,53,1152,58.7C1248,64,1344,96,1392,112L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
            </svg>
          </div>

          {/* ======================================================= */}
          {/* CLOSING FOOTER (ధన్యవాదాలు)                             */}
          {/* ======================================================= */}
          <footer className={`${bgWhiteBlack} pt-10 pb-28 px-6 text-center border-t border-gray-200 dark:border-gray-800`}>
            <div className="max-w-xs mx-auto">
              <h2 className="font-esthetic text-4xl text-amber-600 dark:text-amber-400 mb-1">
                ధన్యవాదాలు
              </h2>
              <p className="text-sm font-bold text-gray-900 dark:text-white mb-2">
                Rahul &amp; Harinya
              </p>
              <p className={`text-xs ${textMuted} leading-relaxed mb-6`}>
                మా వివాహ ఆహ్వానాన్ని మన్నించి విచ్చేసి మమ్మల్ని ఆశీర్వదించగలరని మనస్ఫూర్తిగా కోరుకుంటున్నాము.
              </p>

              <button
                type="button"
                onClick={() => scrollTo('home', 'home')}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-700 text-xs font-semibold hover:border-amber-500 hover:text-amber-500 transition cursor-pointer"
              >
                <ArrowUp className="w-3 h-3" />
                <span>పైకి స్క్రోల్ చేయండి (Top)</span>
              </button>
            </div>
          </footer>

          {/* ======================================================= */}
          {/* BOTTOM STICKY NAVBAR                                    */}
          {/* ======================================================= */}
          <nav className="fixed bottom-0 left-0 right-0 lg:left-auto lg:w-5/12 xl:w-1/3 z-40 bg-white/95 dark:bg-[#1a1e21]/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 py-2 px-2 flex items-center justify-around shadow-2xl rounded-t-2xl">
            
            {/* 1. Home */}
            <button
              type="button"
              onClick={() => scrollTo('home', 'home')}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl cursor-pointer transition ${
                activeNav === 'home' ? 'text-amber-600 dark:text-amber-400 font-bold scale-105' : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <Home className="w-4 h-4 mb-0.5" />
              <span className="text-[10px]">హోమ్</span>
            </button>

            {/* 2. Couple */}
            <button
              type="button"
              onClick={() => scrollTo('bride', 'bride')}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl cursor-pointer transition ${
                activeNav === 'bride' ? 'text-amber-600 dark:text-amber-400 font-bold scale-105' : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <Users className="w-4 h-4 mb-0.5" />
              <span className="text-[10px]">జంట</span>
            </button>

            {/* 3. Date & Venue */}
            <button
              type="button"
              onClick={() => scrollTo('wedding-date', 'wedding-date')}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl cursor-pointer transition ${
                activeNav === 'wedding-date' ? 'text-amber-600 dark:text-amber-400 font-bold scale-105' : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <Calendar className="w-4 h-4 mb-0.5" />
              <span className="text-[10px]">ముహూర్తం</span>
            </button>

            {/* 4. Gallery */}
            <button
              type="button"
              onClick={() => scrollTo('gallery', 'gallery')}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl cursor-pointer transition ${
                activeNav === 'gallery' ? 'text-amber-600 dark:text-amber-400 font-bold scale-105' : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <Camera className="w-4 h-4 mb-0.5" />
              <span className="text-[10px]">గ్యాలరీ</span>
            </button>

            {/* 5. Wishes */}
            <button
              type="button"
              onClick={() => scrollTo('comment', 'comment')}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl cursor-pointer transition ${
                activeNav === 'comment' ? 'text-amber-600 dark:text-amber-400 font-bold scale-105' : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <MessageSquare className="w-4 h-4 mb-0.5" />
              <span className="text-[10px]">ఆశీస్సులు</span>
            </button>
          </nav>

        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. IMAGE LIGHTBOX MODAL                                   */}
      {/* ========================================================= */}
      {activeModalImage && (
        <div
          onClick={() => setActiveModalImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <img
            src={activeModalImage}
            alt="Expanded view"
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}

    </div>
  );
};
