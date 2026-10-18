import React from 'react';
import { Layers, ShieldCheck, Sparkles, Sliders, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onOpenQuote: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenQuote }) => {
  const services = [
    {
      icon: Layers,
      title: 'Luxury Curtains & Motorized Drapes',
      tag: 'Window Styling',
      desc: 'Double-wave curtains, blackout drapes, sheer voile, and smart motorized tracks custom-crafted to your room height and fabric preference.',
      points: ['Motorized & manual track options', 'Imported thermal & blackout fabrics', 'S-fold wave and pinch pleat designs']
    },
    {
      icon: Sparkles,
      title: 'Complete Living Room Furnishing',
      tag: 'Full Home Setup',
      desc: 'Bespoke sectional couches, accent armchairs, designer coffee tables, custom rugs, and acoustic wall panels that make your home welcoming.',
      points: ['Tailored color palettes and textures', 'High-density foam & durable fabric', 'Integrated room styling & accessories']
    },
    {
      icon: Sliders,
      title: 'Bespoke Bedding & Master Suites',
      tag: 'Bedroom Comfort',
      desc: 'Custom-upholstered headboards, tailored duvet sets, luxury bed runners, and coordinated bedroom curtains for supreme restorative sleep.',
      points: ['Custom height & tufted headboards', 'Hypoallergenic luxury linens', 'Coordinated sheer & blackout curtains']
    },
    {
      icon: ShieldCheck,
      title: 'Corporate Blinds & Office Drapery',
      tag: 'Commercial Spaces',
      desc: 'High-performance solar screen roller blinds, vertical blinds, and executive boardroom drapery for businesses and organizations across Abuja.',
      points: ['Anti-glare & heat rejection fabrics', 'Clean architectural lines', 'Fast turnaround for offices & clinics']
    }
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-fame-soft border-t border-fame-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-fame-terracotta">
            Our Core Specialization
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-fame-dark font-normal">
            Everything Your Space Needs to Feel Complete
          </h2>
          <p className="text-sm sm:text-base text-fame-muted leading-relaxed">
            From free on-site measurements across Abuja to professional steaming and hanging, our experienced team ensures your curtains and furniture fit effortlessly.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-fame-border rounded-2xl p-8 sm:p-10 shadow-sm hover:shadow-xl hover:border-fame-terracotta/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-fame-soft border border-fame-border flex items-center justify-center text-fame-terracotta group-hover:bg-fame-terracotta group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-fame-muted bg-fame-soft px-3 py-1 rounded-full border border-fame-border">
                      {srv.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-fame-dark mb-3">
                    {srv.title}
                  </h3>

                  <p className="text-sm text-fame-muted leading-relaxed mb-6">
                    {srv.desc}
                  </p>

                  <ul className="space-y-2 mb-8">
                    {srv.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-center space-x-2 text-xs text-fame-dark/80 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onOpenQuote}
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-fame-dark group-hover:text-fame-terracotta transition-colors pt-4 border-t border-fame-border"
                >
                  <span>Request Measurement & Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
