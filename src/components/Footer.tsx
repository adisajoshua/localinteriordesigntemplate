import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

interface FooterProps {
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuote }) => {
  const { data } = useSiteData();
  const brand = data.brand;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-white pt-20 pb-12 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="font-serif tracking-[0.22em] text-2xl font-light uppercase block">
              {brand.name}
            </a>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed font-sans">
              Architectural interior design practice creating bespoke spaces, false ceilings, artisan furniture, and high-performance lighting across Enugu, Nigeria, and internationally.
            </p>
            <p className="text-xs text-stone-500 font-mono">
              {brand.address}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-stone-300 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-sans">
              <li>
                <a href="#studio" className="hover:text-white transition-colors">
                  The Studio
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact & Map
                </a>
              </li>
            </ul>
          </div>

          {/* Consultation Box */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-stone-300 mb-4">
              Direct Contact
            </h4>
            <div className="text-xs text-stone-400 space-y-1 font-sans">
              <a
                href={`tel:+${brand.phoneClean}`}
                className="hover:text-white block font-semibold text-stone-200"
              >
                {brand.phone}
              </a>
              <span className="block text-stone-500">
                Secondary: {brand.phoneSecondary}
              </span>
            </div>
            
            <button
              onClick={onOpenQuote}
              className="text-xs tracking-[0.2em] uppercase font-bold bg-white text-stone-900 px-6 py-3 rounded-full hover:bg-stone-200 transition-colors shadow-sm block w-full text-center mt-4"
            >
              Request a Quote
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4 font-sans">
          <div>
            &copy; {new Date().getFullYear()} {brand.name}. All rights reserved. Enugu, Nigeria.
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {[
              { label: 'Instagram', url: brand.instagram },
              { label: 'Facebook', url: brand.facebook },
              { label: 'X / Twitter', url: brand.twitter },
              { label: 'LinkedIn', url: brand.linkedin },
              { label: 'TikTok', url: brand.tiktok }
            ].filter(s => !!s.url && s.url.trim() !== '').map(s => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors uppercase tracking-wider text-[11px]"
              >
                {s.label}
              </a>
            ))}

            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 hover:text-white transition-colors group ml-2"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 transform group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
