import React, { useState, useEffect } from 'react';
import { X, MapPin, ArrowUpRight } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { ProjectItem } from '../data/siteData';
import { useScrollReveal, revealDelay } from '../utils/useScrollReveal';

type CategoryFilter = 'All' | 'Kitchen' | 'Furnitures' | 'POP' | 'Wardrobe' | 'Lighting' | 'Living room';

const categories: CategoryFilter[] = [
  'All',
  'Kitchen',
  'Furnitures',
  'POP',
  'Wardrobe',
  'Lighting',
  'Living room'
];

interface ProjectsGalleryProps {
  onOpenQuote: () => void;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ onOpenQuote }) => {
  const { data } = useSiteData();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [hasFiltered, setHasFiltered] = useState(false);
  const { ref, isVisible } = useScrollReveal(0.01);

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const filteredProjects = activeCategory === 'All'
    ? data.projects
    : data.projects.filter((p) => p.category === activeCategory);

  return (
    <section
      ref={ref}
      id="projects"
      className={`py-24 md:py-36 bg-white ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-12 pb-6 relative">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-900 font-light tracking-tight reveal-mask">
            <span className="reveal-line" style={revealDelay(0)}>
              Featured Projects
            </span>
          </h2>
          <div
            className="absolute bottom-0 left-0 right-0 h-px bg-stone-200 reveal-rule"
            style={revealDelay(140)}
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-16 overflow-x-auto pb-2">
          {categories.map((cat, idx) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  setHasFiltered(true);
                  setActiveCategory(cat);
                }}
                style={revealDelay(160 + idx * 45)}
                className={`reveal-fade-up text-xs tracking-[0.18em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 font-semibold border ${
                  isActive
                    ? 'bg-stone-900 text-white border-stone-900 shadow-sm hover:bg-stone-800'
                    : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {cat === 'POP' ? 'POP Ceilings' : cat}
              </button>
            );
          })}
        </div>

        {/* 3-Column Portrait Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={`${activeCategory}-${project.id}`}
              onClick={() => setSelectedProject(project)}
              style={revealDelay(hasFiltered ? (idx % 6) * 75 : 220 + (idx % 6) * 90)}
              className={`${
                hasFiltered ? 'card-filter-reveal' : 'reveal-media'
              } group relative cursor-pointer overflow-hidden rounded-sm aspect-[3/4] bg-stone-100 transition-all duration-500`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 border-0 group-hover:border-[10px] sm:group-hover:border-[14px] border-[#2A1810]/90 transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

      </div>

      {/* High-Resolution Project Modal Lightbox */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md animate-fade-in-up"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-4xl w-full p-6 sm:p-10 relative shadow-2xl max-h-[92vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-900 transition-colors"
              aria-label="Close Project View"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-[10px] tracking-[0.28em] uppercase font-bold text-brand bg-brand/10 px-3 py-1 rounded-full">
                {selectedProject.category}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 mt-2 font-normal">
                {selectedProject.title}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-stone-500 mt-1">
                <MapPin className="w-3.5 h-3.5 text-brand" />
                <span>{selectedProject.location}</span>
              </div>
            </div>

            <div className="my-6 rounded-sm overflow-hidden aspect-[16/10] bg-stone-100 border border-stone-200">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-6 font-sans">
              {selectedProject.description}
            </p>

            <div className="p-4 rounded bg-stone-50 border border-stone-200/80 mb-6 text-xs text-stone-600">
              <span className="font-bold text-stone-900 uppercase tracking-wider block mb-1">
                Scope of Commission:
              </span>
              {selectedProject.scope}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <button
                type="button"
                onClick={() => {
                  setSelectedProject(null);
                  onOpenQuote();
                }}
                className="inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase font-bold bg-stone-900 text-white px-6 py-3 rounded-full hover:bg-brand transition-colors"
              >
                <span>Inquire About Similar Design</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="text-xs uppercase tracking-widest font-semibold text-stone-500 hover:text-stone-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
