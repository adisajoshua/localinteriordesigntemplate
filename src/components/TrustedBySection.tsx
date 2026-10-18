import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export const TrustedBySection: React.FC = () => {
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  const reviews = [
    {
      author: 'Alh. Farouk Ibrahim',
      initials: 'FI',
      role: 'Homeowner, Maitama, Abuja',
      rating: 5,
      date: 'Google Verified Review',
      quote: 'Naphtali Interior Home installed the double-wave curtains and motorized tracks for our Maitama residence. The measurement was exact, the fabric texture is exceptional, and their team was remarkably professional throughout.',
      project: 'Full Residential Wave Curtains & Lounge Upholstery'
    },
    {
      author: 'Mrs. Ngozi Okoye',
      initials: 'NO',
      role: 'Client, Asokoro, Abuja',
      rating: 5,
      date: 'Google Verified Review',
      quote: 'The finest curtain and home styling team in Abuja! They visited our duplex with fabric swatches, advised us on the right blackout linings, and steamed every single drape during installation. Truly five-star work.',
      project: '5-Bedroom Duplex Drapery & Beddings'
    },
    {
      author: 'Engr. Bello Mohammed',
      initials: 'BM',
      role: 'Managing Director, Wuse 2, Abuja',
      rating: 5,
      date: 'Google Verified Review',
      quote: 'Reliable and punctual. We contracted Naphtali to fit-out our executive boardroom and executive offices with acoustic blinds. Clean work, fair pricing, and delivered on schedule without interrupting business operations.',
      project: 'Corporate Executive Blinds & Boardroom Styling'
    }
  ];

  const corporatePartners = [
    { name: 'NNPC', label: 'NNPC Towers Abuja', code: 'Towers HQ' },
    { name: 'Zenith', label: 'Zenith Bank Abuja', code: 'Central Area' },
    { name: 'Hilton', label: 'Prestige Hospitality', code: 'Abuja Residences' },
    { name: 'Access', label: 'Access Bank Capital', code: 'Wuse 2 Zone' },
    { name: 'FIRS', label: 'Public Sector Suites', code: 'FCT Offices' },
    { name: 'Stanbic', label: 'Stanbic IBTC Bank', code: 'Garki Branch' },
  ];

  const currentReview = reviews[activeReviewIdx];

  return (
    <section className="py-20 md:py-28 bg-white border-t border-fame-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="text-center mb-16 space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl text-fame-dark font-normal">
            Trusted by Homeowners & Corporate Clients
          </h2>
          <p className="text-xs sm:text-sm uppercase tracking-widest text-fame-muted font-bold">
            Delivering quality interiors, custom curtains, and comfort across Abuja
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Partner Badges */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
            {corporatePartners.map((partner, idx) => (
              <div
                key={idx}
                className="bg-fame-soft border border-fame-border p-6 rounded-xl flex flex-col items-center justify-center text-center hover:border-fame-terracotta/40 hover:shadow-md transition-all h-28"
              >
                <span className="font-display font-black text-xl tracking-wider text-fame-dark/80">
                  {partner.name}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-fame-muted mt-1">
                  {partner.code}
                </span>
              </div>
            ))}
          </div>

          {/* Right: Verified Client Review Card */}
          <div className="lg:col-span-6 bg-fame-soft border border-fame-border rounded-2xl p-8 sm:p-10 shadow-lg relative flex flex-col justify-between min-h-[340px]">
            <div>
              <div className="text-fame-terracotta mb-4">
                <Quote className="w-10 h-10 transform scale-x-[-1] opacity-80" />
              </div>

              <div className="flex items-center space-x-1 mb-4">
                {[...Array(currentReview.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-fame-dark ml-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                  <span>{currentReview.date}</span>
                </span>
              </div>

              <blockquote className="font-serif text-lg sm:text-xl text-fame-dark leading-relaxed italic">
                “{currentReview.quote}”
              </blockquote>
            </div>

            <div className="pt-6 mt-6 border-t border-fame-border flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-fame-terracotta text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-sm shrink-0">
                  {currentReview.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-fame-dark">{currentReview.author}</div>
                  <div className="text-xs text-fame-muted">{currentReview.role}</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveReviewIdx((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))}
                  className="w-9 h-9 rounded-full border border-fame-border flex items-center justify-center text-fame-dark hover:bg-fame-dark hover:text-white transition-colors"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveReviewIdx((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))}
                  className="w-9 h-9 rounded-full border border-fame-border flex items-center justify-center text-fame-dark hover:bg-fame-dark hover:text-white transition-colors"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
