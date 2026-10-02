import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Coffee, Compass, Users, Gem, Flame } from 'lucide-react';

export const NeoBloomStory: React.FC = () => {
  const milestones = [
    {
      year: '2020',
      title: 'మొదటి చూపు (First Met)',
      subtitle: 'A simple coffee turned into hours of endless talks',
      description: 'బెంగళూరులోని ఒక చిన్న కేఫ్‌లో మొదటి కలయిక. అపరిచితులుగా మొదలైన పరిచయం, కొన్ని గంటల్లోనే జీవితాంతం కలిసి నడవాల్సిన స్నేహంగా మారింది.',
      icon: Coffee,
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80',
    },
    {
      year: '2022',
      title: 'ప్రేమ అంగీకారం (The Confession)',
      subtitle: 'Under a million stars at Vizag Beach',
      description: 'సముద్రపు అలల సవ్వడి, వెన్నెల రాత్రి సాక్షిగా.. ఇద్దరి మనసులు ఒకటయ్యాయి. "నువ్వు లేకుండా నా జీవితం అసంపూర్ణం" అని పంచుకున్న క్షణం.',
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80',
    },
    {
      year: '2024',
      title: 'రెండు కుటుంబాలు, ఒక్కటైన హృదయం',
      subtitle: 'Two Families, One Big Celebration',
      description: 'పెద్దల సమక్షంలో పరిచయాలు, విందులు మరియు ఆనందాల కలయిక. ఇరు కుటుంబాల ఆశీస్సులతో మా బంధం మరింత బలపడింది.',
      icon: Users,
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    },
    {
      year: '2025',
      title: 'ప్రపోజల్ (The Sunset Proposal)',
      subtitle: 'She said YES on a hot air balloon!',
      description: 'జైపూర్ సూర్యాస్తమయ వేళ.. గాల్లో తేలుతూ ఉంగరం తొడిగి "నా సగభాగం అవుతావా?" అని అడిగినప్పుడు, ఆనందభాష్పాలతో "అవును" అన్న మధుర ఘట్టం.',
      icon: Gem,
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
    },
    {
      year: '2026',
      title: 'ఏడడుగుల బంధం (The Sacred Step)',
      subtitle: 'Walking together into forever',
      description: 'ఈ డిసెంబర్ 12న.. వేద మంత్రాల సాక్షిగా, అగ్నిహోత్రం చుట్టూ ఏడడుగులు వేస్తూ ఒక్కటవుతున్నాము.',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section id="story" className="relative w-full py-16 sm:py-20 px-4 sm:px-6 bg-white border-t border-rose-100">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold mb-2">
            <Heart className="w-3 h-3 fill-current text-rose-500" />
            <span>Our Love Story</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            మా ప్రేమ ప్రయాణం (2020 - 2026)
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-lg mx-auto">
            చిన్న స్నేహం నుండి మొదలై పవిత్ర బంధం వైపు సాగిన మా అందమైన మజిలీలు ♡
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-rose-200/80 ml-4 sm:ml-32 space-y-10 sm:space-y-12">
          {milestones.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative pl-6 sm:pl-8 group"
              >
                {/* Year Label (Positioned left on desktop) */}
                <div className="sm:absolute sm:-left-32 sm:top-1 text-left sm:text-right sm:w-24 mb-1 sm:mb-0">
                  <span className="font-serif font-bold text-lg text-rose-700 block">
                    {item.year}
                  </span>
                </div>

                {/* Timeline Node Bullet */}
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 text-white flex items-center justify-center shadow-md border-2 border-white group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Content Card */}
                <div className="bg-[#FFFDFD] rounded-2xl p-5 sm:p-6 border border-rose-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row gap-5 items-start">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 mb-1">
                        {item.title}
                      </h3>
                      <span className="text-xs font-medium text-rose-600 mb-2 block">
                        {item.subtitle}
                      </span>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Milestone Image */}
                    <div className="w-full md:w-40 h-28 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-rose-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
