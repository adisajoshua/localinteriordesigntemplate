import React, { useState, useEffect } from 'react';
import { useSiteData } from '../context/SiteDataContext';

export const TestimonialsSlider: React.FC = () => {
  const { data } = useSiteData();
  const testimonials = data.testimonials;
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-animate testimonials every 6 seconds
  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;
  const current = testimonials[activeIdx];

  return (
    <section id="testimonials" className="py-24 md:py-36 bg-[#FAF9F6] border-t border-b border-stone-200/60 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        
        {/* Refined Handwritten Script Accent Title (Reference: media_1791976173832.png) */}
        <div className="font-script text-4xl sm:text-5xl md:text-6xl text-[#A2482B] mb-10 transform -rotate-1 select-none">
          Testimonials
        </div>

        {/* Animated Quote Content */}
        <div className="min-h-[220px] sm:min-h-[200px] flex flex-col justify-center transition-all duration-700 ease-in-out">
          <blockquote className="font-serif text-lg sm:text-xl md:text-2xl text-stone-800 leading-relaxed font-light italic max-w-3xl mx-auto">
            “{current.quote}”
          </blockquote>

          <div className="mt-8 space-y-1">
            <div className="font-sans text-xs tracking-[0.24em] uppercase font-bold text-stone-900">
              {current.author}
            </div>
            <div className="font-sans text-xs tracking-wider text-stone-500">
              {current.role} • <span className="text-[#A2482B]">{current.project}</span>
            </div>
          </div>
        </div>

        {/* Tribal / Architectural Arrow Hairline Ornament (Reference: media_1791976173832.png) */}
        <div className="my-10 flex items-center justify-center space-x-2 text-stone-400">
          <span className="text-sm tracking-tighter">❯❯❯</span>
          <div className="w-16 h-[1px] bg-stone-300"></div>
          <span className="text-sm tracking-tighter">❮❮❮</span>
        </div>

        {/* Interactive Dots Pagination */}
        <div className="flex items-center justify-center space-x-3">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              aria-label={`Go to review ${idx + 1}`}
              className={`transition-all duration-300 rounded-full focus:outline-none ${
                idx === activeIdx
                  ? 'w-7 h-2 bg-[#A2482B]'
                  : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
