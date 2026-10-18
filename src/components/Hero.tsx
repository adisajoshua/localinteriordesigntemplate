import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Narrative Headline & CTAs with Ease-In Animation */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 md:space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] font-bold text-fame-terracotta bg-fame-terracotta/10 px-3.5 py-1.5 rounded-full w-fit">
              <MapPin className="w-3.5 h-3.5" />
              <span>Area 1, Garki • Abuja • Federal Capital Territory</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-fame-dark font-normal tracking-tight leading-[1.14]">
              Your space styled for <span className="italic font-normal">elegance</span> and <span className="font-bold">comfort</span>.
            </h1>

            <p className="text-base sm:text-lg text-fame-muted font-normal leading-relaxed max-w-xl">
              From luxury motorized wave curtains and premium drapery to complete living room furnishings, we craft vibrant, personalized spaces for homeowners, apartments, and corporate offices across Abuja.
            </p>

            {/* Split Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://wa.me/2348069428617?text=Hello%20Naphtali%20Interior%20Home,%20I%20would%20like%20to%20consult%20on%20curtains%20and%20interior%20furnishing%20in%20Abuja."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-xs uppercase tracking-widest font-bold bg-fame-dark text-white px-8 py-4 rounded-full hover:bg-fame-terracotta transition-all duration-300 shadow-sm"
              >
                Speak to Us
              </a>

              <button
                onClick={onOpenQuote}
                className="inline-flex items-center justify-center space-x-2 text-xs uppercase tracking-widest font-bold border border-fame-border text-fame-dark px-7 py-4 rounded-full hover:border-fame-dark hover:bg-fame-soft transition-all duration-300 group"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Micro Social Proof */}
            <div className="pt-6 border-t border-fame-border/60 flex items-center space-x-6 text-xs text-fame-muted">
              <div>
                <span className="font-bold text-fame-dark">5.0 ★</span> Google Verified
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-fame-border"></span>
              <div>
                <span className="font-bold text-fame-dark">150+</span> Spaces Furnished
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-fame-border"></span>
              <div>
                <span className="font-bold text-fame-dark">100%</span> Custom Fit
              </div>
            </div>
          </div>

          {/* Right Column: Full Bleed Living & Curtain Visual with Inset Showroom Badge */}
          <div className="lg:col-span-6 relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-fame-card aspect-[4/3] sm:aspect-[4/3] md:aspect-[16/12]">
              <img
                src="./assets/images/project_1_gra.jpg"
                alt="Luxury living space and window drapery by Naphtali Interior Home Abuja"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70"></div>
              
              {/* Badge overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white text-xs bg-black/50 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20">
                <span className="font-medium tracking-wide">Custom Wave Curtains & Living Fit-out</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-fame-terracotta bg-white px-2.5 py-1 rounded-full">
                  Abuja, FCT
                </span>
              </div>
            </div>

            {/* Floating Inset Badge: Area 1 Garki Showroom */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-fame-border shadow-xl items-center space-x-3 max-w-xs">
              <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-fame-border">
                <img
                  src="./assets/images/dfluxe-showroom.jpg"
                  alt="Naphtali Interior Home Showroom, Area 1 Garki Abuja"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pr-2">
                <div className="text-[10px] uppercase tracking-widest font-bold text-fame-terracotta">
                  Abuja Showroom
                </div>
                <div className="text-xs font-bold text-fame-dark leading-tight mt-0.5">
                  Shop 107, Area 1 Plaza, Garki
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
