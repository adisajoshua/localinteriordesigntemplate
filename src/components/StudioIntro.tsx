import React from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { useScrollReveal, revealDelay } from '../utils/useScrollReveal';

export const StudioIntro: React.FC = () => {
  const { data } = useSiteData();
  const intro = data.studioIntro;
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section
      ref={ref}
      id="studio"
      className={`py-24 md:py-36 bg-[#FAF9F6] border-b border-stone-200/60 ${
        isVisible ? 'is-visible' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Masked Editorial Terracotta Serif Heading (Sims Hilditch Style) */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand tracking-tight leading-[1.1] font-normal uppercase">
              <span className="reveal-mask block">
                <span className="reveal-line" style={revealDelay(0)}>
                  {intro.headingLine1}
                </span>
              </span>
              <span className="reveal-mask block">
                <span className="reveal-line" style={revealDelay(130)}>
                  {intro.headingLine2}
                </span>
              </span>
            </h2>

            {/* Subtle Metadata Metrics */}
            {data.sectionToggles?.showStats !== false && (
              <div className="mt-12 pt-8 relative grid grid-cols-3 gap-6">
                <div
                  className="absolute top-0 left-0 right-0 h-px bg-stone-300/80 reveal-rule"
                  style={revealDelay(220)}
                />
                <div className="reveal-fade-up" style={revealDelay(300)}>
                  <div className="font-serif text-2xl md:text-3xl text-stone-900 font-light">
                    {intro.foundedYear}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mt-1">
                    Established
                  </div>
                </div>
                <div className="reveal-fade-up" style={revealDelay(400)}>
                  <div className="font-serif text-2xl md:text-3xl text-stone-900 font-light">
                    {intro.completedProjects}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mt-1">
                    Commissions
                  </div>
                </div>
                <div className="reveal-fade-up" style={revealDelay(500)}>
                  <div className="font-serif text-2xl md:text-3xl text-stone-900 font-light">
                    {intro.clientSatisfaction}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mt-1">
                    Bespoke Fit
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sequenced Editorial Narrative Copy */}
          <div className="lg:col-span-7 space-y-6 text-stone-700 font-sans text-base sm:text-lg leading-relaxed pt-2">
            <p className="reveal-fade-up" style={revealDelay(200)}>
              {intro.paragraph1}
            </p>
            <p className="text-stone-600 reveal-fade-up" style={revealDelay(320)}>
              {intro.paragraph2}
            </p>
            
            <div className="pt-6 reveal-fade-up" style={revealDelay(420)}>
              <a
                href="#projects"
                className="inline-flex items-center space-x-2 text-xs tracking-[0.24em] uppercase font-bold text-stone-900 hover:text-brand transition-colors underline underline-offset-8"
              >
                <span>Explore Selected Projects</span>
                <span>→</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
