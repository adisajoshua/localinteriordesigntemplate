import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink } from 'lucide-react';

export const StudioLocationSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-white border-t border-fame-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Card */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-fame-terracotta block mb-2">
                Visit Our Showroom
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-fame-dark font-normal">
                Naphtali Interior Home
              </h2>
              <p className="text-sm text-fame-muted mt-2 leading-relaxed">
                Step into our Area 1 showroom in Garki, Abuja to feel our luxury fabric swatches, test motorized track systems, and discuss your window styling project.
              </p>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-fame-soft border border-fame-border flex items-center justify-center text-fame-terracotta shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-fame-dark mb-1">
                    Showroom Address
                  </h4>
                  <p className="text-sm text-fame-muted leading-relaxed">
                    Shop 107, Area 1 Shopping Centre, Area 1, Garki, Abuja 900103, Federal Capital Territory
                  </p>
                  <p className="text-xs text-fame-dark/70 font-medium mt-1">
                    Located in: Area 1 Shopping Plaza (Plus Code: 2FJC+RJ Abuja)
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-fame-soft border border-fame-border flex items-center justify-center text-fame-terracotta shrink-0 mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-fame-dark mb-1">
                    Phone & WhatsApp
                  </h4>
                  <a href="tel:+2348069428617" className="text-sm font-bold text-fame-terracotta hover:underline block">
                    +234 806 942 8617 / 0806 942 8617
                  </a>
                  <a href="tel:+2348059152315" className="text-xs text-fame-muted hover:underline block mt-0.5">
                    +234 805 915 2315
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-fame-soft border border-fame-border flex items-center justify-center text-fame-terracotta shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-fame-dark mb-1">
                    Showroom Hours
                  </h4>
                  <p className="text-sm text-fame-muted">
                    Monday – Saturday: 8:30 AM – 6:30 PM
                  </p>
                  <p className="text-xs text-fame-muted mt-0.5">
                    Sunday: By Prior Appointment
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="https://www.google.com/maps/place/Naphtali+Interior+Home/@9.03211,7.4689758,17z/data=!3m1!4b1!4m6!3m5!1s0x104e0b7b43875081:0x80bd38987ce3707e!8m2!3d9.03211!4d7.4715507!16s%2Fg%2F1tcttpks?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold bg-fame-dark text-white px-6 py-3.5 rounded-full hover:bg-fame-terracotta transition-colors shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions in Abuja</span>
              </a>
              <a
                href="https://wa.me/2348069428617?text=Hello%20Naphtali%20Interior%20Home,%20I%20would%20like%20to%20visit%20your%20Area%201%20Garki%20showroom."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold border border-fame-border text-fame-dark px-6 py-3.5 rounded-full hover:bg-fame-soft transition-colors"
              >
                <span>Book Appointment</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Embed Frame */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden border border-fame-border shadow-xl bg-fame-soft h-[420px] relative">
              <iframe
                title="Naphtali Interior Home Location Map Area 1 Garki Abuja"
                src="https://maps.google.com/maps?q=9.03211,7.4715507&hl=en&z=16&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
