import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Phone, Car, Share2 } from 'lucide-react';

export const NeoBloomVenue: React.FC = () => {
  const venueAddress = 'Sri Convention Hall, MG Road, Benz Circle, Vijayawada, Andhra Pradesh 520010';
  const googleMapsUrl = 'https://maps.google.com/?q=' + encodeURIComponent(venueAddress);

  return (
    <section id="venue" className="relative w-full py-16 px-4 sm:px-6 bg-[#FFF9FA] border-t border-rose-100">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-rose-800 text-xs font-semibold mb-2">
            <MapPin className="w-3.5 h-3.5 text-rose-600" />
            <span>Wedding Venue &amp; Location</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            కళ్యాణ వేదిక వివరాలు
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto">
            మీ ప్రయాణం సులభంగా సాగేందుకు వేదిక లొకేషన్ మరియు రూట్ మ్యాప్:
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200/80 shadow-md flex flex-col md:flex-row gap-8 items-center">
          
          {/* Venue Info Left */}
          <div className="flex-1 text-left space-y-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-rose-600 block mb-1">
                ప్రధాన కళ్యాణ మంటపం (Main Mandapam)
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                శ్రీ కన్వెన్షన్ హాల్ (Sri Convention Hall)
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                ఎం.జి. రోడ్, బెంజ్ సర్కిల్ దగ్గర, విజయవాడ, ఆంధ్రప్రదేశ్ - 520010
              </p>
            </div>

            <div className="py-3 border-y border-stone-100 text-xs text-stone-600 space-y-2">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>విశాలమైన కార్ పార్కింగ్ &amp; వాలెట్ సౌకర్యం కలదు.</span>
              </div>
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-rose-600 shrink-0" />
                <span>విజయవాడ రైల్వే స్టేషన్ నుండి 15 నిమిషాల ప్రయాణం.</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>గూగుల్ మ్యాప్స్ లో చూడండి (Get Directions)</span>
              </a>

              <a
                href="tel:+919876543210"
                className="py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition flex items-center gap-2 cursor-pointer border border-stone-200"
              >
                <Phone className="w-3.5 h-3.5 text-stone-600" />
                <span>సమన్వయకర్తకు కాల్ చేయండి</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Visual Right */}
          <div className="w-full md:w-80 h-56 rounded-2xl overflow-hidden bg-stone-100 border-2 border-rose-100 shadow-inner relative group shrink-0">
            <iframe
              title="Venue Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61204.66487847424!2d80.60627725!3d16.50617435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35eff9c381c81f%3A0xb3634024c08479e!2sVijayawada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-full border-0 pointer-events-none group-hover:pointer-events-auto"
              loading="lazy"
            />
            <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-2xl" />
          </div>

        </div>

      </div>
    </section>
  );
};
