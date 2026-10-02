import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Sparkles, Shirt } from 'lucide-react';

export const NeoBloomEvents: React.FC = () => {
  const events = [
    {
      title: 'హల్దీ వేడుక (Haldi & Phoolon Ki Holi)',
      teluguDesc: 'పసుపు వన్నెలతో, పూల వానతో మొదలయ్యే మంగళప్రదమైన వేడుక.',
      date: 'గురువారం, 10 డిసెంబర్ 2026',
      time: 'ఉదయం 09:00 గంటలకు',
      venue: 'హోటల్ సన్షైన్ లాన్స్, విజయవాడ',
      dressCode: 'ఎల్లో & గోల్డ్ సంప్రదాయ వస్త్రాలు (Yellow / Pastel Festive)',
      themeColor: 'from-amber-400 to-yellow-500',
      badge: 'హల్దీ & సంగీత్',
    },
    {
      title: 'మెహందీ & సంగీత్ నైట్ (Mehendi & Sangeet)',
      teluguDesc: 'గోరింటాకు ముచ్చట్లు, సంగీతం, డ్యాన్సులు మరియు ధూంధాం వేడుక.',
      date: 'శుక్రవారం, 11 డిసెంబర్ 2026',
      time: 'సాయంత్రం 06:30 గంటలకు',
      venue: 'రోజ్ గార్డెన్ రిసార్ట్, విజయవాడ',
      dressCode: 'షైనింగ్ ఎమరాల్డ్ & పింక్ లెహంగాస్ / కుర్తాస్ (Teal / Festive Bling)',
      themeColor: 'from-emerald-500 to-teal-600',
      badge: 'సంగీత్ & డ్యాన్స్',
    },
    {
      title: 'శుభ వివాహ ముహూర్తం (Holy Vivaha Muhurtham)',
      teluguDesc: 'వేద మంత్రోచ్ఛారణల మధ్య, పవిత్ర మాంగల్య ధారణ మరియు ఏడడుగుల శుభ ఘట్టం.',
      date: 'శనివారం, 12 డిసెంబర్ 2026',
      time: 'ఉదయం 09:30 గంటలకు (ధనూ లగ్నం)',
      venue: 'శ్రీ కన్వెన్షన్ హాల్, ఎం.జి. రోడ్, విజయవాడ',
      dressCode: 'సాంప్రదాయ పట్టు చీరలు & ధోవతులు (Silk & Traditional Pattu)',
      themeColor: 'from-rose-600 to-red-600',
      badge: 'ప్రధాన ముహూర్తం',
      highlight: true,
    },
    {
      title: 'గ్రాండ్ రిసెప్షన్ (Grand Reception)',
      teluguDesc: 'నూతన దంపతులను ఆశీర్వదించే సంగీత విభావరి & విందు భోజనం.',
      date: 'శనివారం, 12 డిసెంబర్ 2026',
      time: 'సాయంత్రం 07:00 గంటల నుండి',
      venue: 'గ్రాండ్ రాయల్ బాల్‌రూమ్, విజయవాడ',
      dressCode: 'ఇండో-వెస్ట్రన్ / సూట్స్ & ఈవెనింగ్ గౌన్స్ (Indo-Western Glam)',
      themeColor: 'from-indigo-600 to-purple-600',
      badge: 'రిసెప్షన్ & డిన్నర్',
    },
  ];

  return (
    <section id="events" className="relative w-full py-16 sm:py-20 px-4 sm:px-6 bg-[#FFF9FA] border-t border-rose-100">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/70 border border-rose-200 text-rose-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3 h-3 text-rose-500" />
            <span>Celebrations &amp; Itinerary</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            వివాహ వేడుకల వివరాలు
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-lg mx-auto">
            ప్రతి క్షణాన్ని మీతో పంచుకోవడానికి ఎదురుచూస్తున్నాము. మా అన్ని వేడుకలకు సకుటుంబంగా ఆహ్వానం!
          </p>
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {events.map((evt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between ${
                evt.highlight
                  ? 'border-rose-300 ring-2 ring-rose-200/60 shadow-md'
                  : 'border-stone-200/80'
              }`}
            >
              <div>
                {/* Event Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200/60">
                    {evt.badge}
                  </span>
                  {evt.highlight && (
                    <span className="text-xs text-amber-700 font-bold flex items-center gap-1 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      ★ ప్రధాన శుభకార్యం
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-2">
                  {evt.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mb-5 leading-relaxed">
                  {evt.teluguDesc}
                </p>

                {/* Event Details */}
                <div className="space-y-2.5 text-xs sm:text-sm text-stone-700 font-medium mb-6">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{evt.date}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{evt.time}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{evt.venue}</span>
                  </div>

                  <div className="flex items-center gap-2.5 pt-1 text-stone-500">
                    <Shirt className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs">{evt.dressCode}</span>
                  </div>
                </div>
              </div>

              {/* Add to Google Calendar Action */}
              <a
                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(evt.title)}&dates=20261212T040000Z/20261212T080000Z&details=${encodeURIComponent(evt.teluguDesc)}&location=${encodeURIComponent(evt.venue)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-stone-50 hover:bg-rose-50 text-stone-700 hover:text-rose-700 border border-stone-200/80 hover:border-rose-300 text-xs font-semibold text-center transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>క్యాలెండర్‌కు జోడించు (Add to Calendar)</span>
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
