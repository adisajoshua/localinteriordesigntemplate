import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, ArrowUpRight } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

interface ContactSectionProps {
  onOpenQuote: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenQuote }) => {
  const { data } = useSiteData();
  const { brand } = data;
  const showMap = data.sectionToggles?.showInteractiveMap !== false;

  return (
    <section id="contact" className="py-24 md:py-36 bg-[#FAFAF8] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-16 pb-6 border-b border-stone-300">
          <span className="text-[11px] tracking-[0.28em] uppercase font-bold text-brand block mb-3">
            Commissions & Appointments
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-900 font-light tracking-tight">
            Consult With Our Studio
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 max-w-xl font-sans">
            Whether embarking on a full residential false ceiling fit-out, bespoke cabinetry, or commercial interior styling, our design practice welcomes your inquiries.
          </p>
        </div>

        {/* Split Layout (Taylor Howes Reference) */}
        <div className={`grid grid-cols-1 ${showMap ? 'lg:grid-cols-12' : 'lg:grid-cols-8'} gap-12 lg:gap-16 items-start`}>
          
          {/* Left Details Column */}
          <div className={`${showMap ? 'lg:col-span-5' : 'lg:col-span-8'} space-y-8`}>
            
            {/* Address */}
            <div className="border-t border-stone-200 pt-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-brand shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-stone-900 mb-1">
                    Studio Location
                  </h4>
                  <p className="text-sm text-stone-600 leading-relaxed font-sans">
                    {brand.address}
                  </p>
                  <p className="text-xs text-stone-400 mt-1">
                    Plus Code: {brand.plusCode}
                  </p>
                </div>
              </div>
            </div>

            {/* Telephone & WhatsApp */}
            <div className="border-t border-stone-200 pt-6">
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-brand shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-stone-900 mb-1">
                    Telephone & WhatsApp
                  </h4>
                  <a
                    href={`tel:+${brand.phoneClean}`}
                    className="text-sm font-semibold text-stone-800 hover:text-brand transition-colors block"
                  >
                    {brand.phone}
                  </a>
                  <a
                    href={`tel:+${brand.phoneClean}`}
                    className="text-xs text-stone-500 hover:text-stone-800 transition-colors block mt-0.5"
                  >
                    Direct Consultation: {brand.phoneSecondary}
                  </a>
                </div>
              </div>
            </div>

            {/* Email Contact */}
            <div className="border-t border-stone-200 pt-6">
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-brand shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-stone-900 mb-1">
                    Email Inquiries
                  </h4>
                  <a
                    href={`mailto:${brand.email}`}
                    className="text-sm font-semibold text-stone-800 hover:text-brand transition-colors block"
                  >
                    {brand.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="border-t border-stone-200 pt-6">
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-brand shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-stone-900 mb-1">
                    Studio Hours
                  </h4>
                  <p className="text-sm text-stone-600 font-sans">
                    Monday – Friday: 8:30 AM – 6:00 PM
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Saturday: By Appointment Only
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase font-bold bg-stone-900 text-white px-7 py-3.5 rounded-full hover:bg-brand transition-all duration-300 shadow-sm"
              >
                <span>Request a Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={`https://maps.google.com/?q=${brand.coords.lat},${brand.coords.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase font-semibold text-stone-700 hover:text-stone-900 border border-stone-300 px-6 py-3.5 rounded-full transition-colors"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

          {/* Right Map & Architectural Card (Taylor Howes Style) */}
          {showMap && (
            <div className="lg:col-span-7">
              <div className="rounded-lg overflow-hidden border border-stone-200 shadow-lg bg-stone-100 h-[440px] relative">
                <iframe
                  title={`${brand.name} Studio Location Map`}
                  src={`https://maps.google.com/maps?q=${brand.coords.lat},${brand.coords.lng}&hl=en&z=16&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Inset Studio Card */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-3.5 rounded border border-stone-200 shadow-lg flex items-center space-x-3 max-w-xs">
                  <div className="w-12 h-12 rounded overflow-hidden shrink-0 bg-stone-200">
                    <img
                      src="./assets/images/about_studio.jpg"
                      alt={`${brand.name} Studio`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest font-bold text-brand">
                      Studio & Workshop
                    </div>
                    <div className="text-xs font-semibold text-stone-800 mt-0.5">
                      {brand.city}, {brand.state}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
