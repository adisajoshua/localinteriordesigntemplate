import React, { useState, useEffect } from 'react';
import { Instagram, ArrowUpRight, Menu, X, Phone } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

interface NavigationProps {
  onOpenQuote: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenQuote }) => {
  const { data } = useSiteData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-4 border-b border-black/5 text-stone-900'
          : 'bg-gradient-to-b from-black/60 via-black/25 to-transparent py-6 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand Logo / Name on the Left */}
        <a
          href="#"
          className="flex items-center space-x-3 transition-opacity hover:opacity-80 shrink-0"
        >
          {data.brand.logoUrl ? (
            <img
              src={data.brand.logoUrl}
              alt={data.brand.name}
              className="h-8 sm:h-10 w-auto object-contain max-w-[180px]"
            />
          ) : (
            <span className="font-serif tracking-[0.22em] text-xl md:text-2xl font-light uppercase">
              {data.brand.name}
            </span>
          )}
        </a>

        {/* Right Nav Hierarchy: Instagram, Underlined Phone, Projects, Request A Quote CTA */}
        <div className="hidden md:flex items-center space-x-5 lg:space-x-8 shrink-0">
          
          {/* Instagram Icon */}
          <a
            href={data.brand.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
            className="transition-transform hover:scale-110 opacity-90 hover:opacity-100 shrink-0"
          >
            <Instagram className="w-4 h-4" />
          </a>

          {/* Underlined Phone Number */}
          <a
            href={`tel:+${data.brand.phoneClean}`}
            className="text-xs tracking-[0.14em] uppercase font-medium underline underline-offset-4 hover:opacity-75 transition-opacity whitespace-nowrap shrink-0"
          >
            {data.brand.phone}
          </a>

          {/* Projects Link */}
          <a
            href="#projects"
            className="text-xs tracking-[0.18em] uppercase font-medium hover:opacity-75 transition-opacity whitespace-nowrap"
          >
            Projects
          </a>

          {/* Before & After Link */}
          {data.sectionToggles?.showBeforeAfter !== false && (
            <a
              href="#transformation"
              className="text-xs tracking-[0.18em] uppercase font-medium hover:opacity-75 transition-opacity whitespace-nowrap"
            >
              Before & After
            </a>
          )}

          {/* Contact Link */}
          <a
            href="#contact"
            className="text-xs tracking-[0.18em] uppercase font-medium hover:opacity-75 transition-opacity whitespace-nowrap"
          >
            Contact
          </a>

          {/* High-Hierarchy Primary CTA Button: REQUEST A QUOTE (Never breaks into two lines) */}
          <button
            onClick={onOpenQuote}
            className={`inline-flex items-center space-x-2 text-[0.7rem] lg:text-[0.72rem] tracking-[0.2em] uppercase font-bold px-5 lg:px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm whitespace-nowrap shrink-0 ${
              isScrolled
                ? 'bg-stone-900 text-white hover:bg-stone-800'
                : 'bg-white text-stone-900 hover:bg-stone-100'
            }`}
          >
            <span>Request a Quote</span>
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 focus:outline-none text-current"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-900 text-white px-6 py-8 border-t border-stone-800 shadow-2xl animate-fade-in-up">
          <nav className="flex flex-col space-y-5 text-sm tracking-[0.2em] uppercase">
            <a
              href="#studio"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-stone-300 border-b border-stone-800 pb-2"
            >
              The Studio
            </a>
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-stone-300 border-b border-stone-800 pb-2"
            >
              Selected Projects
            </a>
            {data.sectionToggles?.showBeforeAfter !== false && (
              <a
                href="#transformation"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-stone-300 border-b border-stone-800 pb-2"
              >
                Before & After
              </a>
            )}
            {data.sectionToggles?.showTestimonials !== false && (
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-stone-300 border-b border-stone-800 pb-2"
              >
                Testimonials
              </a>
            )}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-stone-300 border-b border-stone-800 pb-2"
            >
              Contact & Location
            </a>
            
            <div className="pt-2 flex flex-col space-y-4">
              <a
                href={`tel:+${data.brand.phoneClean}`}
                className="flex items-center space-x-2 text-xs text-stone-300 underline underline-offset-4"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{data.brand.phone}</span>
              </a>

              <a
                href={data.brand.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-xs text-stone-300"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram Profile</span>
              </a>

              {/* High-Hierarchy Quote CTA Button Inside Mobile Drawer */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full text-center text-xs tracking-widest uppercase font-bold bg-white text-stone-900 py-3.5 rounded-full mt-2 shadow-md hover:bg-stone-100 transition-colors"
              >
                Request a Quote
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
