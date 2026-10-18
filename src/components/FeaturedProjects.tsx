import React, { useState } from 'react';
import { ArrowRight, MapPin, X, Calendar, Layers, CheckCircle2 } from 'lucide-react';

interface Project {
  id: string;
  tag: string;
  title: string;
  location: string;
  narrative: string;
  image: string;
  type: 'standard-left' | 'tall-left' | 'terracotta-card' | 'black-card' | 'standard-right';
  year: string;
  scope: string;
  details?: string[];
}

interface FeaturedProjectsProps {
  onOpenQuote: () => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onOpenQuote }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'p1',
      tag: 'RESIDENTIAL LIVING',
      title: 'Asokoro Luxury Villa Living Room',
      location: 'Asokoro, Abuja, FCT',
      narrative: 'A grand contemporary living room featuring floor-to-ceiling motorized sheer drapes, textured acoustic wall cladding, and custom plush sectional seating creating a serene ambiance.',
      image: './assets/images/project_1_gra.jpg',
      type: 'standard-left',
      year: '2024',
      scope: 'Motorized Wave Curtains, Custom Upholstery, Accent Lighting',
      details: [
        'Floor-to-ceiling motorized double-track drapery system',
        'Custom velvet and textured linen upholstery',
        'Warm ambient cove lighting integration',
        'Integrated acoustic fluted wall panels'
      ]
    },
    {
      id: 'p2',
      tag: 'PRIVATE RESIDENCE',
      title: 'Maitama Diplomatic Residence',
      location: 'Maitama District, Abuja',
      narrative: 'An executive private home featuring high-ceiling wave drapery, curated leather lounge furniture, fluted sideboards, and natural sunlight filtering through luxury semi-sheer fabrics.',
      image: './assets/images/project_2_peterodili.jpg',
      type: 'tall-left',
      year: '2024',
      scope: 'Full Window Treatments, Custom Furnishing, Decor Accents',
      details: [
        'Custom-measured drapery for double-volume windows',
        'Imported blackout and thermal lining for sun control',
        'Artisan crafted console and living room accessories',
        'Spatial layout tailored for family comfort and hosting'
      ]
    },
    {
      id: 'p3',
      tag: 'PENTHOUSE FURNISHING',
      title: 'Guzape Hilltop Suite – Bespoke Setup',
      location: 'Guzape, Abuja, Rivers of Capital Hills',
      narrative: 'We transformed this hilltop penthouse into an airy, elegant haven with minimalist custom curtains, warm oak shelving, and comfortable contemporary furniture.',
      image: './assets/images/project_3_oldgra.jpg',
      type: 'terracotta-card',
      year: '2024',
      scope: 'Complete Home Furnishing, Bespoke Drapery, Wall Styling',
      details: [
        'Textured linen blackout curtains in bedrooms',
        'Minimalist wave sheer drapery in main living areas',
        'Bespoke shelving and TV media unit integration',
        'On-site installation and steam dressing by Naphtali experts'
      ]
    },
    {
      id: 'p4',
      tag: 'CORPORATE SUITE',
      title: 'Central Business District Executive HQ',
      location: 'Central Area, Abuja',
      narrative: 'Sophisticated executive boardroom and lounge styling with high-performance acoustic motorized blinds, ambient pendant lighting, and contemporary reception finishes.',
      image: './assets/images/project_4_transamadi.jpg',
      type: 'black-card',
      year: '2024',
      scope: 'Executive Blinds, Boardroom Drapery, Ambient Lighting',
      details: [
        'Commercial grade motorized roller and vertical blinds',
        'Anti-glare thermal fabric for executive boardrooms',
        'Reception lounge luxury seating and drapery accents',
        'Completed on schedule without business interruption'
      ]
    },
    {
      id: 'p5',
      tag: 'FAMILY DUPLEX',
      title: 'Garki 2 Contemporary Family Duplex',
      location: 'Garki 2, Abuja',
      narrative: 'Complete room-by-room furnishing featuring luxury velvet curtains, custom headboards, bespoke throw cushions, and tasteful decorative mirrors.',
      image: './assets/images/project_5_woji.jpg',
      type: 'standard-right',
      year: '2024',
      scope: 'Full Curtains, Beddings, Living Room Styling',
      details: [
        'Master bedroom blackout drapes with matching pelmet',
        'Kids room vibrant custom curtains and soft cushions',
        'Living and dining room coordinated fabric palettes',
        'End-to-end delivery, steaming, and precise installation'
      ]
    }
  ];

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 pb-6 border-b border-fame-border">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-fame-terracotta block mb-2">
              Featured Spaces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-fame-dark font-normal">
              Curated Residential & Corporate Projects
            </h2>
          </div>
          <p className="text-sm text-fame-muted max-w-md mt-4 md:mt-0 leading-relaxed">
            Every project is custom-tailored to the client lifestyle and architecture, using imported luxury fabrics and precise fitting.
          </p>
        </div>

        {/* Alternating Project Layouts */}
        <div className="space-y-24 md:space-y-36">
          {projects.map((project) => {
            if (project.type === 'standard-left') {
              return (
                <div key={project.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  <div className="lg:col-span-5 space-y-6">
                    <span className="text-[11px] uppercase tracking-widest font-bold text-fame-muted">
                      {project.tag}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-fame-dark leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-fame-muted leading-relaxed">
                      {project.narrative}
                    </p>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-fame-dark hover:text-fame-terracotta pt-2 transition-colors group"
                    >
                      <span>VIEW PROJECT DETAILS</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                  <div className="lg:col-span-7">
                    <div
                      onClick={() => setSelectedProject(project)}
                      className="cursor-pointer overflow-hidden rounded-2xl bg-fame-card aspect-[16/10] shadow-xl group"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              );
            }

            if (project.type === 'tall-left') {
              return (
                <div key={project.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  <div className="lg:col-span-7 order-2 lg:order-1">
                    <div
                      onClick={() => setSelectedProject(project)}
                      className="cursor-pointer overflow-hidden rounded-2xl bg-fame-card aspect-[4/3] sm:aspect-[16/11] shadow-xl group"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
                    <span className="text-[11px] uppercase tracking-widest font-bold text-fame-muted">
                      {project.tag}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-fame-dark leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-fame-muted leading-relaxed">
                      {project.narrative}
                    </p>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-fame-dark hover:text-fame-terracotta pt-2 transition-colors group"
                    >
                      <span>VIEW PROJECT DETAILS</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              );
            }

            if (project.type === 'terracotta-card') {
              return (
                <div key={project.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                  <div className="lg:col-span-5 bg-fame-terracotta text-white p-8 sm:p-12 rounded-2xl flex flex-col justify-between shadow-xl">
                    <div className="space-y-4">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-white/80 bg-black/20 px-3 py-1 rounded-full">
                        {project.tag}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-white leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm text-white/90 leading-relaxed">
                        {project.narrative}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-white hover:text-white/80 pt-6 transition-colors group self-start"
                    >
                      <span>EXPLORE THIS RESIDENCE</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                  <div className="lg:col-span-7">
                    <div
                      onClick={() => setSelectedProject(project)}
                      className="cursor-pointer overflow-hidden rounded-2xl bg-fame-card h-full min-h-[300px] shadow-xl group"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              );
            }

            if (project.type === 'black-card') {
              return (
                <div key={project.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                  <div className="lg:col-span-7 order-2 lg:order-1">
                    <div
                      onClick={() => setSelectedProject(project)}
                      className="cursor-pointer overflow-hidden rounded-2xl bg-fame-card h-full min-h-[300px] shadow-xl group"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-5 order-1 lg:order-2 bg-fame-dark text-white p-8 sm:p-12 rounded-2xl flex flex-col justify-between shadow-xl">
                    <div className="space-y-4">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-white/80 bg-white/10 px-3 py-1 rounded-full">
                        {project.tag}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-white leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm text-white/80 leading-relaxed">
                        {project.narrative}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-white hover:text-fame-terracotta pt-6 transition-colors group self-start"
                    >
                      <span>EXPLORE FIT-OUT</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              );
            }

            // standard-right
            return (
              <div key={project.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                <div className="lg:col-span-5 space-y-6">
                  <span className="text-[11px] uppercase tracking-widest font-bold text-fame-muted">
                    {project.tag}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-fame-dark leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-fame-muted leading-relaxed">
                    {project.narrative}
                  </p>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-fame-dark hover:text-fame-terracotta pt-2 transition-colors group"
                  >
                    <span>VIEW PROJECT DETAILS</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
                <div className="lg:col-span-7">
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="cursor-pointer overflow-hidden rounded-2xl bg-fame-card aspect-[16/10] shadow-xl group"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative shadow-2xl">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-fame-soft hover:bg-fame-border text-fame-dark transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <span className="text-[11px] uppercase tracking-widest font-bold text-fame-terracotta bg-fame-terracotta/10 px-3 py-1 rounded-full">
                {selectedProject.tag}
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl text-fame-dark">
                {selectedProject.title}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-fame-muted border-y border-fame-border py-3">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-fame-terracotta" />
                  <span>{selectedProject.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-fame-terracotta" />
                  <span>Completed: {selectedProject.year}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Layers className="w-4 h-4 text-fame-terracotta" />
                  <span>{selectedProject.scope}</span>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden aspect-[16/10] bg-fame-card">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-sm sm:text-base text-fame-muted leading-relaxed">
                {selectedProject.narrative}
              </p>

              {selectedProject.details && (
                <div className="bg-fame-soft p-6 rounded-xl border border-fame-border space-y-3">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-fame-dark">
                    Key Features Delivered:
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs text-fame-muted">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    onOpenQuote();
                  }}
                  className="text-xs uppercase tracking-widest font-bold bg-fame-dark text-white px-8 py-3.5 rounded-full hover:bg-fame-terracotta transition-colors shadow"
                >
                  Request Quote for Similar Space
                </button>
                <a
                  href={`https://wa.me/2348069428617?text=Hello%20Naphtali%20Interior%20Home,%20I%20am%20interested%20in%20a%20project%20similar%20to%20${encodeURIComponent(selectedProject.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-widest font-bold border border-fame-border text-fame-dark px-7 py-3.5 rounded-full hover:bg-fame-soft transition-colors"
                >
                  Discuss on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
