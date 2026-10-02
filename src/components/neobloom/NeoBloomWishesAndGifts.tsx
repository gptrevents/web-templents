import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Heart, Send, Sparkles, QrCode } from 'lucide-react';

export const NeoBloomWishesAndGifts: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      name: 'సురేష్ & కల్యాణి',
      msg: 'అర్జున్ & ప్రియ లకు హృదయపూర్వక శుభాకాంక్షలు! మీ జంట కలకాలం వర్ధిల్లాలి ♡',
      time: 'Just now',
    },
    {
      name: 'డాక్టర్ రవికుమార్ గారు',
      msg: 'May your love grow stronger with each passing day. Hearty congratulations!',
      time: '2 hours ago',
    },
    {
      name: 'అనిత & ఫ్యామిలీ',
      msg: 'రెండు కుటుంబాలకి శుభాభినందనలు. కళ్యాణం ఘనంగా జరగాలని ఆశిస్తున్నాము.',
      time: 'Yesterday',
    },
  ]);

  const [newName, setNewName] = useState('');
  const [newMsg, setNewMsg] = useState('');
  const [showQR, setShowQR] = useState(false);

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newMsg.trim()) return;

    setMessages([
      {
        name: newName.trim(),
        msg: newMsg.trim(),
        time: 'Just now',
      },
      ...messages,
    ]);

    setNewName('');
    setNewMsg('');
  };

  return (
    <section id="wishes" className="relative w-full py-16 px-4 sm:px-6 bg-[#FFF9FA] border-t border-rose-100">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 border border-rose-200 text-rose-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Wishes &amp; Digital Shagun</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            శుభాకాంక్షలు &amp; డిజిటల్ కానుకలు
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto">
            నూతన దంపతులకు మీ ఆశీస్సులను ఇక్కడ నమోదు చేయవచ్చు:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Wishes Registry Left */}
          <div className="bg-white rounded-3xl p-6 border border-rose-200 shadow-sm flex flex-col justify-between">
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500 fill-current" />
              <span>ఆశీస్సుల పుస్తకం (Guestbook)</span>
            </h3>

            {/* Form */}
            <form onSubmit={handleAddWish} className="space-y-3 mb-6">
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="మీ పేరు (Your Name)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <textarea
                rows={2}
                required
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                placeholder="మీ శుభాకాంక్షలను రాయండి..."
                className="w-full px-3.5 py-2 rounded-xl border border-rose-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Send className="w-3 h-3" />
                <span>శుభాకాంక్షలు పోస్ట్ చేయండి</span>
              </button>
            </form>

            {/* Wishes Feed */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-rose-50/60 border border-rose-100 text-left"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-serif font-bold text-xs text-rose-950">
                      {m.name}
                    </span>
                    <span className="text-[10px] text-stone-400">{m.time}</span>
                  </div>
                  <p className="text-xs text-stone-700">{m.msg}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Digital Shagun UPI Card Right */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-rose-200 shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
              <Gift className="w-6 h-6" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
              డిజిటల్ షగున్ (Digital Shagun)
            </span>
            <h3 className="font-serif font-bold text-xl text-stone-900 mb-2">
              మీ ఆశీస్సులు &amp; కానుకలు
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-6 max-w-xs">
              దూరప్రాంతాల్లో ఉండి నేరుగా రాలేకపోయేవారు నూతన దంపతులకు డిజిటల్ షగున్ ద్వారా తమ ప్రేమాభిమానాలను అందించవచ్చు.
            </p>

            {/* UPI QR Code Block */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 mb-4 flex flex-col items-center">
              <div className="w-40 h-40 bg-white p-2 rounded-xl border border-stone-300 shadow-inner flex items-center justify-center mb-2">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=arjunpriyawedding@okhdfcbank&pn=ArjunAndPriyaWedding&cu=INR"
                  alt="UPI QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[11px] font-mono text-stone-600 bg-white px-3 py-1 rounded-md border border-stone-200">
                UPI ID: arjunpriyawedding@okhdfcbank
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 text-stone-500 text-xs">
              <span>GPay • PhonePe • Paytm</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
