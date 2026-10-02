import React from 'react';
import { motion } from 'motion/react';
import { Users, Heart } from 'lucide-react';

export const NeoBloomFamilies: React.FC = () => {
  return (
    <section id="families" className="relative w-full py-16 px-4 sm:px-6 bg-white border-t border-rose-100">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5 text-rose-500" />
            <span>Our Families</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            ఇరు కుటుంబాల సాదర ఆహ్వానం
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto">
            మా పిల్లల నూతన దాంపత్య జీవితానికి మీ అమూల్యమైన ఆశీస్సులు అందించాలని కోరుకుంటున్నాము.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Groom's Family */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#FFFDFD] rounded-3xl p-7 border border-rose-200/80 shadow-xs flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-rose-100 border-2 border-rose-300 flex items-center justify-center text-rose-700 font-serif font-bold text-2xl mb-4 shadow-inner">
              👨‍👩‍👦
            </div>
            <span className="text-xs uppercase tracking-wider font-bold text-rose-600 mb-1">
              వరుడి తరపున (Groom&apos;s Family)
            </span>
            <h3 className="font-serif font-bold text-xl text-stone-900 mb-2">
              శ్రీ &amp; శ్రీమతి వెంకటేశ్వరరావు గార్లు
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              శ్రీమతి సుమతి &amp; శ్రీ వెంకటేశ్వరరావు గార్ల కుమారుడు <strong>అర్జున్ (Arjun)</strong>
            </p>
            <div className="text-[11px] text-stone-500 italic bg-rose-50/50 py-1.5 px-3 rounded-full">
              ఆశీస్సులతో: తాతయ్య, అమ్మమ్మలు &amp; సోదర బృందం
            </div>
          </motion.div>

          {/* Bride's Family */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#FFFDFD] rounded-3xl p-7 border border-rose-200/80 shadow-xs flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-amber-800 font-serif font-bold text-2xl mb-4 shadow-inner">
              👨‍👩‍👧
            </div>
            <span className="text-xs uppercase tracking-wider font-bold text-amber-700 mb-1">
              వధువు తరపున (Bride&apos;s Family)
            </span>
            <h3 className="font-serif font-bold text-xl text-stone-900 mb-2">
              శ్రీ &amp; శ్రీమతి శ్రీనివాసరావు గార్లు
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              శ్రీమతి లక్ష్మి &amp; శ్రీ శ్రీనివాసరావు గార్ల కుమార్తె <strong>ప్రియ (Priya)</strong>
            </p>
            <div className="text-[11px] text-stone-500 italic bg-amber-50/50 py-1.5 px-3 rounded-full">
              ఆశీస్సులతో: పెదనాన్నలు, పినతండ్రులు &amp; బంధువర్గం
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
