import React, { useState } from 'react';
import { X, Sparkles, Check, Copy, Share2, Palette, Calendar, MapPin, User, ArrowRight } from 'lucide-react';
import { CustomInvitationData, TemplateId } from '../../types';
import { INVITATION_TEMPLATES } from '../../data/templatesData';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customData: CustomInvitationData;
  onSaveCustomData: (data: CustomInvitationData) => void;
  onLaunchPreview: (templateId: TemplateId) => void;
  lang: 'te' | 'en';
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  customData,
  onSaveCustomData,
  onLaunchPreview,
  lang,
}) => {
  const [formData, setFormData] = useState<CustomInvitationData>(customData);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  if (!isOpen) return null;

  const handleFieldChange = (field: keyof CustomInvitationData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveCustomData(formData);
    onLaunchPreview(formData.templateId);
    onClose();
  };

  const shareableUrl = `${window.location.origin}?template=${formData.templateId}&to=${encodeURIComponent(
    formData.guestName || 'Dear Guest'
  )}`;

  const whatsappMessage = `🌸 *Wedding Invitation (శుభలేఖ)* 🌸\n\nWe cordially invite you to celebrate the wedding of\n❤️ *${formData.groom} & ${formData.bride}* ❤️\n\n📅 Date: ${formData.date}\n📍 Venue: ${formData.venue}, ${formData.city}\n\n✨ View our interactive digital wedding invitation with music & RSVP here:\n👉 ${shareableUrl}\n\nWith warm regards,\nFamily of ${formData.groom} & ${formData.bride}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyWhatsapp = () => {
    navigator.clipboard.writeText(whatsappMessage);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-teal-50 px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white shadow-xs border border-rose-200 flex items-center justify-center text-[#E11D48]">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-playfair text-xl font-bold text-gray-900">
                {lang === 'te' ? 'ఆహ్వాన పత్రిక కస్టమైజర్' : 'Invitation Customizer Studio'}
              </h3>
              <p className="text-xs text-gray-500 font-sans">
                {lang === 'te'
                  ? 'మీ వివరాలు నమోదు చేసి తక్షణమే ప్రత్యక్షంగా ప్రివ్యూ చూడండి'
                  : 'Customize couple details, pick your theme & test live!'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 text-gray-500 flex items-center justify-center shadow-xs border border-gray-200 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleApply} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* 1. Template Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              {lang === 'te' ? '1. టెంప్లేట్ ఎంచుకోండి (Select Template)' : '1. Select Template Theme'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {INVITATION_TEMPLATES.map((tpl) => {
                const isSelected = formData.templateId === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => handleFieldChange('templateId', tpl.id)}
                    className={`p-3 rounded-2xl border-2 text-left transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#E11D48] bg-rose-50/50 shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-playfair font-bold text-xs text-gray-900">
                        {tpl.name}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#E11D48]" />}
                    </div>
                    <span className="text-[10px] text-gray-500 font-sans mt-1 line-clamp-1">
                      {tpl.tagline}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Couple Names */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              {lang === 'te' ? '2. వధూవరుల పేర్లు (Couple Names)' : '2. Couple Names'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-xs text-gray-500 font-medium block mb-1">
                  {lang === 'te' ? 'వరుడి పేరు (Groom)' : "Groom's Name"}
                </span>
                <input
                  type="text"
                  value={formData.groom}
                  onChange={(e) => handleFieldChange('groom', e.target.value)}
                  placeholder="e.g. Arjun / Rahul"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E11D48]/30"
                  required
                />
              </div>

              <div>
                <span className="text-xs text-gray-500 font-medium block mb-1">
                  {lang === 'te' ? 'వధువు పేరు (Bride)' : "Bride's Name"}
                </span>
                <input
                  type="text"
                  value={formData.bride}
                  onChange={(e) => handleFieldChange('bride', e.target.value)}
                  placeholder="e.g. Priya / Harinya"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E11D48]/30"
                  required
                />
              </div>
            </div>
          </div>

          {/* 3. Event Date & Time */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              {lang === 'te' ? '3. వివాహ తేది & ముహూర్తం (Date & Muhurtham)' : '3. Wedding Date & Time'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-xs text-gray-500 font-medium block mb-1">Date</span>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => handleFieldChange('date', e.target.value)}
                  placeholder="e.g. 12 DEC 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E11D48]/30"
                  required
                />
              </div>

              <div>
                <span className="text-xs text-gray-500 font-medium block mb-1">Muhurtham / Time</span>
                <input
                  type="text"
                  value={formData.time}
                  onChange={(e) => handleFieldChange('time', e.target.value)}
                  placeholder="e.g. 09:30 AM (ధనుర్లగ్నం)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E11D48]/30"
                />
              </div>
            </div>
          </div>

          {/* 4. Venue & City */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              {lang === 'te' ? '4. వివాహ వేదిక & నగరం (Venue & City)' : '4. Venue & City'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-xs text-gray-500 font-medium block mb-1">Venue Name</span>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => handleFieldChange('venue', e.target.value)}
                  placeholder="e.g. Sri Convention Hall / The Taj"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E11D48]/30"
                  required
                />
              </div>

              <div>
                <span className="text-xs text-gray-500 font-medium block mb-1">City & State</span>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleFieldChange('city', e.target.value)}
                  placeholder="e.g. Vijayawada, AP / Hyderabad"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E11D48]/30"
                  required
                />
              </div>
            </div>
          </div>

          {/* 5. Personalized Guest Name & WhatsApp Generator */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-amber-700" />
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                {lang === 'te'
                  ? 'వ్యక్తిగత అతిథి ఆహ్వాన లింక్ (Personalized Guest Link)'
                  : 'Personalized Guest Invite Generator'}
              </h4>
            </div>

            <div>
              <span className="text-[11px] text-gray-600 block mb-1">
                {lang === 'te'
                  ? 'అతిథి పేరు టైప్ చేయండి (కార్డులో ఆ పేరుతో ఓపెన్ అవుతుంది):'
                  : "Enter Guest Name (Their card will greet them personally):"}
              </span>
              <input
                type="text"
                value={formData.guestName}
                onChange={(e) => handleFieldChange('guestName', e.target.value)}
                placeholder="e.g. Ramesh Garu / Rohit Kumar"
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Actions for link & whatsapp */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-amber-100 text-gray-800 text-xs font-semibold border border-amber-300 shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied Link!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gray-600" />
                    <span>Copy Invite Link</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCopyWhatsapp}
                className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5B] text-white text-xs font-semibold shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
              >
                {copiedMsg ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied WhatsApp Message!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Copy WhatsApp Invite Text</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Form Submit & Preview Action */}
          <div className="pt-2 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E11D48] to-[#F43F5E] hover:from-[#BE123C] hover:to-[#E11D48] text-white text-xs font-bold shadow-md shadow-pink-500/20 hover:shadow-lg transition flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
              <span>{lang === 'te' ? 'సేవ్ చేసి లైవ్ ప్రివ్యూ చూడండి' : 'Apply & Launch Live Preview'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
