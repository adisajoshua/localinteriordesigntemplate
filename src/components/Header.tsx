import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';

interface HeaderProps {
  onOpenQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'SERVICES', href: '#services' },
    { name: 'PORTFOLIO', href: '#portfolio' },
    { name: 'SHOWROOM', href: '#gallery' },
    { name: 'CONTACT US', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-4 border-b border-fame-border'
          : 'bg-white py-5 border-b border-fame-border/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Two-Line Typographic Wordmark Logo: NAPHTALI (Bold top) / INTERIOR (Lighter second line) */}
        <a href="#" className="flex flex-col group leading-none shrink-0 py-0.5">
          <span className="font-display font-black text-xl md:text-2xl tracking-[0.24em] text-fame-dark uppercase group-hover:text-fame-terracotta transition-colors">
            NAPHTALI
          </span>
          <span className="text-[10px] md:text-[11px] tracking-[0.42em] text-fame-dark/60 font-light uppercase mt-1">
            INTERIOR
          </span>
        </a>

        {/* Clean Desktop Navigation (Only essential links, strictly single line) */}
        <nav className="hidden md:flex items-center space-x-7 lg:space-x-9">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[0.72rem] uppercase tracking-[0.22em] font-semibold text-fame-dark/80 hover:text-fame-terracotta transition-colors whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Call & CTA Buttons */}
        <div className="hidden sm:flex items-center space-x-4">
          <a
            href="tel:+2348069428617"
            className="text-xs font-bold text-fame-dark/80 hover:text-fame-terracotta flex items-center space-x-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-fame-terracotta" />
            <span>0806 942 8617</span>
          </a>

          <button
            onClick={onOpenQuote}
            className="inline-flex items-center space-x-2 text-[0.72rem] uppercase tracking-widest font-bold bg-fame-dark text-white px-5 py-2.5 rounded-full hover:bg-fame-terracotta transition-all duration-300 shadow-sm hover:shadow"
          >
            <span>GET A QUOTE</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={onOpenQuote}
            className="text-[10px] uppercase tracking-wider font-bold bg-fame-dark text-white px-3 py-1.5 rounded-full"
          >
            Quote
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-fame-dark hover:text-fame-terracotta transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-fame-border px-6 py-6 shadow-xl animate-fade-in-up">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-widest font-bold text-fame-dark hover:text-fame-terracotta transition-colors py-1 border-b border-fame-border/40"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col space-y-3">
              <a
                href="tel:+2348069428617"
                className="text-xs font-bold text-fame-terracotta flex items-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>+234 806 942 8617</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full text-center text-xs uppercase tracking-widest font-bold bg-fame-dark text-white py-3 rounded-full hover:bg-fame-terracotta transition-colors shadow"
              >
                Request Free Quote
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
