import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export const HeroSlideshow: React.FC = () => {
  const { data } = useSiteData();
  const slides = data.heroSlides;
  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto-dissolve timer every 5.5 seconds
  useEffect(() => {
    if (!slides || slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % slides.length);
  };

  if (!slides || slides.length === 0) return null;
  const currentSlide = slides[currentIdx];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-stone-950">
      
      {/* Slides with Cross-Fade Dissolve Transition */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIdx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            loading={idx === 0 ? "eager" : "lazy"}
            fetchPriority={idx === 0 ? "high" : "auto"}
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[7000ms] ease-out"
          />
          {/* Subtle Ambient Film Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
        </div>
      ))}

      {/* Left and Right Hairline Navigation Arrows */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-all duration-300 p-3 group focus:outline-none"
      >
        <ArrowLeft className="w-8 h-8 md:w-10 md:h-10 stroke-[1.25] transform group-hover:-translate-x-1 transition-transform" />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-all duration-300 p-3 group focus:outline-none"
      >
        <ArrowRight className="w-8 h-8 md:w-10 md:h-10 stroke-[1.25] transform group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Bottom-Left Minimal Title (Single line, no see more button, no second subtitle line) */}
      <div className="absolute bottom-10 md:bottom-14 left-6 md:left-12 z-20 max-w-lg text-white">
        <div className="animate-fade-in-up key={currentSlide.id}">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-light tracking-tight leading-snug">
            {currentSlide.title}
          </h2>
        </div>
      </div>

      {/* Bottom-Right Luxury Slide Pagination Dots */}
      <div className="absolute bottom-10 md:bottom-14 right-6 md:right-12 z-20 flex items-center space-x-2.5">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIdx(idx)}
            aria-label={`Jump to slide ${idx + 1}`}
            className={`transition-all duration-500 rounded-full focus:outline-none ${
              idx === currentIdx
                ? 'w-7 sm:w-8 h-1.5 bg-white shadow-md'
                : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

    </section>
  );
};
