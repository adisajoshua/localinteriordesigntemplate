import React from 'react';
import { Sparkles, MapPin } from 'lucide-react';

interface MarqueeItem {
  src: string;
  title: string;
  category: string;
  location: string;
}

export const MarqueeGallery: React.FC = () => {
  const rowOneItems: MarqueeItem[] = [
    { src: './assets/images/project_1_gra.jpg', title: 'Luxury Living Room and Motorized Drapes', category: 'Curtains and Living', location: 'Asokoro, Abuja' },
    { src: './assets/images/dfluxe-wall.jpg', title: 'Premium Double-Wave Sheer and Blackout Drapes', category: 'Window Styling', location: 'Maitama, Abuja' },
    { src: './assets/images/project_2_peterodili.jpg', title: 'Sunlit Private Lounge and Bespoke Upholstery', category: 'Residential Design', location: 'Guzape, Abuja' },
    { src: './assets/images/lekays_project_10.jpg', title: 'Illuminated Arched Dining and Window Finishes', category: 'Dining and Lighting', location: 'Wuse 2, Abuja' },
    { src: './assets/images/dfluxe-showroom.jpg', title: 'Naphtali Showroom Fabric and Curtain Collection', category: 'Showroom Gallery', location: 'Area 1, Garki, Abuja' },
    { src: './assets/images/project_3_oldgra.jpg', title: 'Modern Minimalist Villa Furnishing', category: 'Full Home Setup', location: 'Jabi, Abuja' },
    { src: './assets/images/lekays_project_12.jpg', title: 'Master Bedroom Bedding and Velvet Headboard', category: 'Bedroom Comfort', location: 'Gwarinpa, Abuja' },
    { src: './assets/images/gphoto_1.jpg', title: 'Custom Joinery and Wooden Partition', category: 'Artisan Woodcraft', location: 'Central Business District' }
  ];

  const rowTwoItems: MarqueeItem[] = [
    { src: './assets/images/dfluxe-living.jpg', title: 'Contemporary Sectional Sofa and Accents', category: 'Living Space', location: 'Katampe Extension, Abuja' },
    { src: './assets/images/project_5_woji.jpg', title: 'Curated Family Lounge and Decorative Cushions', category: 'Soft Furnishings', location: 'Apo, Abuja' },
    { src: './assets/images/gphoto_5.jpg', title: 'Sculptural Art Accents and Interior Vases', category: 'Accessories and Decor', location: 'Garki 2, Abuja' },
    { src: './assets/images/lekays_project_03.jpg', title: 'Executive Residence Lounge and Track Curtains', category: 'Living Room', location: 'Central Area, Abuja' },
    { src: './assets/images/dfluxe-wall.jpg', title: 'Fluted Acoustic Paneling and Wave Drapes', category: 'Wall Architecture', location: 'Wuse Zone 4, Abuja' },
    { src: './assets/images/project_1_gra.jpg', title: 'Bespoke Window Dressing and Modern Seating', category: 'Luxury Interiors', location: 'Life Camp, Abuja' },
    { src: './assets/images/dfluxe-lighting.jpg', title: 'Modern Fluted Media Unit and Console Finish', category: 'Custom Joinery', location: 'Mabushi, Abuja' },
    { src: './assets/images/project_4_transamadi.jpg', title: 'Private Residential Estate Furnishing', category: 'Exterior and Living', location: 'Asokoro Hills, Abuja' }
  ];

  // Duplicate for seamless 100% loop
  const rowOneCombined = [...rowOneItems, ...rowOneItems];
  const rowTwoCombined = [...rowTwoItems, ...rowTwoItems];

  return (
    <section id="gallery" className="py-20 md:py-28 bg-fame-soft border-t border-fame-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] font-bold text-fame-terracotta bg-fame-terracotta/10 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3 h-3" />
            <span>Showroom and Project Showcase</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-fame-dark font-normal">
            Recent Work Across Abuja
          </h2>
          <p className="text-sm text-fame-muted max-w-xl mt-2">
            Browse custom-tailored luxury curtains, drapery installations, and contemporary residential furnishings delivered by <span className="font-semibold text-fame-dark">Naphtali Interior Home</span>.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs text-fame-muted">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="font-medium">Hover or tap to pause showcase</span>
        </div>
      </div>

      <div className="space-y-6 marquee-container">
        {/* Row 1: Sliding Left */}
        <div className="relative w-full overflow-hidden">
          <div className="flex space-x-5 animate-marquee-left w-max marquee-row cursor-grab active:cursor-grabbing">
            {rowOneCombined.map((item, idx) => (
              <div key={`r1-${idx}`} className="w-[280px] sm:w-[360px] md:w-[420px] aspect-[16/11] shrink-0 rounded-2xl overflow-hidden bg-fame-card border border-fame-border/80 shadow-md group relative">
                <img src={item.src} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                  <span className="inline-block text-[10px] uppercase tracking-wider font-bold text-fame-terracotta bg-white px-2 py-0.5 rounded-full mb-1.5">{item.category}</span>
                  <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">{item.title}</h3>
                  <div className="flex items-center space-x-1.5 text-[11px] text-white/80 mt-1">
                    <MapPin className="w-3 h-3 text-fame-terracotta shrink-0" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Sliding Right */}
        <div className="relative w-full overflow-hidden">
          <div className="flex space-x-5 animate-marquee-right w-max marquee-row cursor-grab active:cursor-grabbing">
            {rowTwoCombined.map((item, idx) => (
              <div key={`r2-${idx}`} className="w-[280px] sm:w-[360px] md:w-[420px] aspect-[16/11] shrink-0 rounded-2xl overflow-hidden bg-fame-card border border-fame-border/80 shadow-md group relative">
                <img src={item.src} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                  <span className="inline-block text-[10px] uppercase tracking-wider font-bold text-fame-terracotta bg-white px-2 py-0.5 rounded-full mb-1.5">{item.category}</span>
                  <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">{item.title}</h3>
                  <div className="flex items-center space-x-1.5 text-[11px] text-white/80 mt-1">
                    <MapPin className="w-3 h-3 text-fame-terracotta shrink-0" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
