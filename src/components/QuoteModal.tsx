import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const { data } = useSiteData();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    service: 'Full Living Room Fit-Out & POP Ceiling',
    spaceType: 'Residential Duplex / Villa',
    details: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Hello ${data.brand.name}! I would like to request an interior design quote:
• Name: ${formData.name}
• Phone: ${formData.phone}
• Location: ${formData.location || 'Enugu'}
• Primary Service: ${formData.service}
• Property Type: ${formData.spaceType}
• Scope Notes: ${formData.details || 'Standard Architectural Consultation'}`;

    const whatsappUrl = `https://wa.me/${data.brand.phoneClean}?text=${encodeURIComponent(message)}`;

    setSubmitted(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setSubmitted(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in-up">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 sm:p-10 relative shadow-2xl border border-stone-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl text-stone-900">Connecting to WhatsApp...</h3>
            <p className="text-sm text-stone-500 font-sans">
              Redirecting you directly to the {data.brand.name} design consultation desk.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6 space-y-1">
              <span className="text-[10px] uppercase tracking-[0.24em] font-bold text-[#A2482B] bg-[#A2482B]/10 px-3 py-1 rounded-full">
                Enugu & International Projects
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 pt-2 font-light">
                Request a Consultation
              </h3>
              <p className="text-xs text-stone-500 font-sans">
                Tell us about your space. We provide on-site measurements and bespoke proposals.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-800 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chief Anthony Okafor"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded border border-stone-300 text-sm focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-800 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="080... or 090..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded border border-stone-300 text-sm focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-800 mb-1">
                    Location / City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Independence Layout, Enugu"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded border border-stone-300 text-sm focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-800 mb-1">
                  Service Area
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-2.5 rounded border border-stone-300 text-sm focus:outline-none focus:border-stone-900 bg-white"
                >
                  <option value="Full Living Room Fit-Out & POP Ceiling">Full Living Room Fit-Out & POP Ceiling</option>
                  <option value="Modern POP Ceilings & Lighting">Modern POP Ceilings & Lighting</option>
                  <option value="Luxury Kitchen Cabinetry & Island">Luxury Kitchen Cabinetry & Island</option>
                  <option value="Bespoke Fitted Wardrobes & Closets">Bespoke Fitted Wardrobes & Closets</option>
                  <option value="Custom Handcrafted Furniture Suites">Custom Handcrafted Furniture Suites</option>
                  <option value="Commercial Office & Executive Chambers">Commercial Office & Executive Chambers</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-800 mb-1">
                  Project Notes / Space Scope
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your space (e.g. 5-bedroom duplex in GRA requiring false ceilings, kitchen cabinetry, and parlor furniture...)"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-4 py-2.5 rounded border border-stone-300 text-sm focus:outline-none focus:border-stone-900 resize-none font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full text-center text-xs tracking-[0.2em] uppercase font-bold bg-stone-900 text-white py-3.5 rounded hover:bg-[#A2482B] transition-colors shadow-sm mt-2"
              >
                Send Request via WhatsApp
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
