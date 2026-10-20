import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, Phone } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

interface NavigationProps {
  onOpenQuote: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenQuote }) => {
  const { data } = useSiteData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scrolling when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const socialLinks = [
    { label: 'Instagram', url: data.brand.instagram },
    { label: 'Facebook', url: data.brand.facebook },
    { label: 'X / Twitter', url: data.brand.twitter },
    { label: 'LinkedIn', url: data.brand.linkedin },
    { label: 'TikTok', url: data.brand.tiktok }
  ].filter(s => !!s.url && s.url.trim() !== '');

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-4 border-b border-black/5 text-stone-900'
            : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-6 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* 1. Brand Logo / Name on Left */}
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

          {/* 2. Right Action Cluster: Projects + Request a Quote + Hamburger */}
          <div className="flex items-center space-x-4 sm:space-x-6 shrink-0">
            
            {/* Projects Text Link (Visible on desktop/tablet md:, hidden on mobile) */}
            <a
              href="#projects"
              className="hidden md:inline-block text-xs tracking-[0.2em] uppercase font-medium hover:opacity-75 transition-opacity whitespace-nowrap"
            >
              Projects
            </a>

            {/* Request a Quote CTA Button (Visible on desktop/tablet md:, hidden on mobile) */}
            <button
              onClick={onOpenQuote}
              className={`hidden md:inline-flex items-center space-x-2 text-[0.7rem] lg:text-[0.72rem] tracking-[0.2em] uppercase font-bold px-5 lg:px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm whitespace-nowrap shrink-0 ${
                isScrolled
                  ? 'bg-stone-900 text-white hover:bg-stone-800'
                  : 'bg-white text-stone-900 hover:bg-stone-100'
              }`}
            >
              <span>Request a Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </button>

            {/* Universal Hamburger Menu Button (Visible on both desktop & mobile) */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center focus:outline-none ${
                isScrolled
                  ? 'hover:bg-stone-100 text-stone-900'
                  : 'hover:bg-white/10 text-white'
              }`}
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

          </div>

        </div>
      </header>

      {/* Universal Luxury Slide-out Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          
          {/* Backdrop Blur Overlay */}
          <div
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 animate-fade-in"
          />

          {/* Slide-out Drawer Panel */}
          <div className="relative w-full sm:w-[460px] h-full bg-stone-950 text-white z-10 p-8 sm:p-12 flex flex-col justify-between shadow-2xl overflow-y-auto border-l border-stone-800/80 animate-slide-in-right">
            
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-6 mb-8">
                <span className="font-serif tracking-[0.22em] text-lg uppercase font-light text-stone-200">
                  {data.brand.name}
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Main Navigation Links */}
              <nav className="flex flex-col space-y-5">
                <a
                  href="#projects"
                  onClick={() => setDrawerOpen(false)}
                  className="font-serif text-2xl sm:text-3xl text-stone-200 hover:text-white hover:translate-x-1.5 transition-all duration-300 font-light flex items-center justify-between group"
                >
                  <span>Selected Projects</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-[#A2482B] transition-opacity" />
                </a>

                {data.sectionToggles?.showBeforeAfter !== false && (
                  <a
                    href="#transformation"
                    onClick={() => setDrawerOpen(false)}
                    className="font-serif text-2xl sm:text-3xl text-stone-200 hover:text-white hover:translate-x-1.5 transition-all duration-300 font-light flex items-center justify-between group"
                  >
                    <span>Before & After</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-[#A2482B] transition-opacity" />
                  </a>
                )}

                <a
                  href="#studio"
                  onClick={() => setDrawerOpen(false)}
                  className="font-serif text-2xl sm:text-3xl text-stone-200 hover:text-white hover:translate-x-1.5 transition-all duration-300 font-light flex items-center justify-between group"
                >
                  <span>The Studio</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-[#A2482B] transition-opacity" />
                </a>

                <a
                  href="#services"
                  onClick={() => setDrawerOpen(false)}
                  className="font-serif text-2xl sm:text-3xl text-stone-200 hover:text-white hover:translate-x-1.5 transition-all duration-300 font-light flex items-center justify-between group"
                >
                  <span>Bespoke Services</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-[#A2482B] transition-opacity" />
                </a>

                {data.sectionToggles?.showTestimonials !== false && (
                  <a
                    href="#testimonials"
                    onClick={() => setDrawerOpen(false)}
                    className="font-serif text-2xl sm:text-3xl text-stone-200 hover:text-white hover:translate-x-1.5 transition-all duration-300 font-light flex items-center justify-between group"
                  >
                    <span>Client Reviews</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-[#A2482B] transition-opacity" />
                  </a>
                )}

                <a
                  href="#contact"
                  onClick={() => setDrawerOpen(false)}
                  className="font-serif text-2xl sm:text-3xl text-stone-200 hover:text-white hover:translate-x-1.5 transition-all duration-300 font-light flex items-center justify-between group"
                >
                  <span>Contact & Studio</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-[#A2482B] transition-opacity" />
                </a>
              </nav>

              {/* Action Button inside Drawer */}
              <div className="pt-8">
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenQuote();
                  }}
                  className="w-full text-center text-xs tracking-[0.2em] uppercase font-bold bg-[#A2482B] hover:bg-[#8e3e24] text-white py-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Request a Quote</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Direct Phone Link */}
              <div className="pt-4 text-center sm:text-left">
                <a
                  href={`tel:+${data.brand.phoneClean}`}
                  className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-stone-400 hover:text-white underline underline-offset-4 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#A2482B]" />
                  <span>{data.brand.phone}</span>
                </a>
              </div>
            </div>

            {/* Drawer Footer: Text-based Social Links */}
            <div className="border-t border-stone-800/80 pt-6 mt-8">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-stone-500 block mb-3">
                Social & Editorial
              </span>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-[0.16em] text-stone-400 hover:text-white transition-colors underline-offset-4 hover:underline"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
              <p className="text-[10px] text-stone-600 mt-5 font-mono">
                {data.brand.city}, {data.brand.state} • Architectural Space Design
              </p>
            </div>

          </div>

        </div>
      )}
    </>
  );
};
