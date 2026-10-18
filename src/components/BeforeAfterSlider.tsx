import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles, MapPin, ArrowUpRight, MoveHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

interface BeforeAfterSliderProps {
  onOpenQuote: () => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onOpenQuote }) => {
  const { data } = useSiteData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter only active Before & After transformations
  const activeItems = (data.beforeAfterList || []).filter((item) => item.isActive !== false);

  // Guard: If all are hidden or none exist
  if (activeItems.length === 0) {
    return null;
  }

  // Ensure currentIndex is in bounds
  const currentItem = activeItems[currentIndex] || activeItems[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : activeItems.length - 1));
    setSliderPosition(50);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < activeItems.length - 1 ? prev + 1 : 0));
    setSliderPosition(50);
  };

  return (
    <section id="transformation" className="py-24 md:py-36 bg-[#FAFAF8] border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header with Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-stone-300">
          <div>
            <div className="flex items-center space-x-2 text-[11px] tracking-[0.28em] uppercase font-bold text-[#A2482B] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Architectural Transformation</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-900 font-light tracking-tight">
              Before & After
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center justify-between sm:justify-end space-x-6">
            <p className="hidden sm:block text-xs sm:text-sm text-stone-600 max-w-sm font-sans">
              Slide horizontally to reveal the architectural craft.
            </p>

            {/* Pagination Controls */}
            {activeItems.length > 1 && (
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono font-medium text-stone-500 tracking-widest">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(activeItems.length).padStart(2, '0')}
                </span>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous Transformation"
                    className="p-2.5 rounded-full bg-white border border-stone-300 text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors shadow-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next Transformation"
                    className="p-2.5 rounded-full bg-white border border-stone-300 text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors shadow-sm"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Split-Slider Frame */}
        <div className="relative rounded-sm overflow-hidden bg-stone-900 shadow-xl border border-stone-300 select-none aspect-[16/10] sm:aspect-[16/9] max-h-[640px] group">
          <div
            ref={containerRef}
            className="relative w-full h-full cursor-ew-resize overflow-hidden"
            onMouseDown={(e) => {
              setIsDragging(true);
              handleMove(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsDragging(true);
              handleMove(e.touches[0].clientX);
            }}
          >
            {/* After Image (Full background layer) */}
            <img
              src={currentItem.afterImage}
              alt={currentItem.title}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-300"
              draggable={false}
            />

            {/* Before Image (Clipped overlay layer) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={currentItem.beforeImage}
                alt="Raw Site Progress"
                className="absolute inset-0 w-full h-full object-cover object-center max-w-none transition-opacity duration-300"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                  height: '100%'
                }}
                draggable={false}
              />
            </div>

            {/* Badges on Top */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 pointer-events-none">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] font-semibold bg-black/80 text-white/95 backdrop-blur-md px-3.5 py-1.5 rounded shadow">
                Raw Site / Progress
              </span>
            </div>
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 pointer-events-none">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] font-semibold bg-[#A2482B]/95 text-white backdrop-blur-md px-3.5 py-1.5 rounded shadow">
                Completed Design
              </span>
            </div>

            {/* Vertical Split Divider Line with Luxury Circular Handle */}
            <div
              className="absolute top-0 bottom-0 z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute inset-y-0 -left-[1px] w-[2px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.8)]" />
              
              {/* Central Drag Handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-stone-900 border-2 border-[#A2482B] shadow-2xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 pointer-events-auto cursor-ew-resize">
                <MoveHorizontal className="w-5 h-5 text-[#A2482B]" />
              </div>
            </div>

            {/* Floating Left & Right Arrows on the Image itself */}
            {activeItems.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  aria-label="Previous Transformation"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all sm:opacity-0 group-hover:opacity-100 shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="Next Transformation"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all sm:opacity-0 group-hover:opacity-100 shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Project Meta Card Below Slider */}
        <div className="mt-8 bg-white p-6 sm:p-8 rounded-sm border border-stone-200/90 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-xs text-stone-500 mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#A2482B]" />
              <span className="tracking-wide uppercase font-medium">{currentItem.location}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal">
              {currentItem.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed font-sans">
              {currentItem.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-mono uppercase tracking-wider text-stone-500">
              <span className="bg-stone-100 px-3 py-1 rounded">Scope:</span>
              <span className="text-stone-800 font-medium">{currentItem.scope}</span>
            </div>
          </div>

          <div className="shrink-0">
            <button
              onClick={onOpenQuote}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 text-xs tracking-[0.2em] uppercase font-bold bg-[#A2482B] hover:bg-[#8e3e24] text-white px-7 py-3.5 rounded-full transition-all duration-300 shadow hover:shadow-md"
            >
              <span>Inquire For Your Space</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
