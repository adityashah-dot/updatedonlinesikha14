import React, { useState } from 'react';
import { X, PhoneCall, CheckCircle } from 'lucide-react';

interface CounselorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CounselorModal: React.FC<CounselorModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#111c2e] rounded-t-3xl md:rounded-2xl max-w-full md:max-w-md w-full shadow-2xl border-t md:border border-[#e7eeff] dark:border-slate-800 overflow-hidden relative max-h-[85vh] md:max-h-none overflow-y-auto transition-transform duration-300 animate-in slide-in-from-bottom-5 md:slide-in-from-bottom-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Pull Handle */}
        <div className="pt-3 pb-1 flex justify-center md:hidden" aria-hidden="true">
          <div className="w-12 h-1.5 rounded-full bg-[#c4c6ce] dark:bg-slate-600" />
        </div>

        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-5 border-b border-[#e7eeff] dark:border-slate-800 flex items-center justify-between bg-[#f0f3ff] dark:bg-slate-900/60 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs shrink-0">
              <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#000f22] dark:text-white font-sans">
                Request Counselor Callback
              </h3>
              <p className="text-[11px] sm:text-xs text-[#43474d] dark:text-slate-300">
                Get expert guidance on courses, fees & admissions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#74777e] hover:text-[#000f22] dark:hover:text-white rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#000f22] mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#d5e3ff] text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#000f22] mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#d5e3ff] text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-amber-500 text-white rounded-xl text-sm font-bold hover:bg-amber-600 active:scale-[0.98] transition-all shadow"
              >
                Request Callback
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
              <h4 className="text-lg font-bold text-[#000f22]">Callback Requested!</h4>
              <p className="text-sm text-[#43474d]">
                Our counselor will call you within 30 minutes during working hours.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 bg-[#115eaf] text-white rounded-xl text-sm font-semibold hover:bg-[#004689] transition-all"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
