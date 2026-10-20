import React, { useState, useEffect } from 'react';
import { SiteDataProvider, useSiteData } from './context/SiteDataContext';
import { getThemeColors } from './data/siteData';
import { Navigation } from './components/Navigation';
import { HeroSlideshow } from './components/HeroSlideshow';
import { StudioIntro } from './components/StudioIntro';
import { ProjectsGallery } from './components/ProjectsGallery';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { TestimonialsSlider } from './components/TestimonialsSlider';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { AdminDashboard } from './components/Admin/AdminDashboard';

export const AppContent: React.FC = () => {
  const { data } = useSiteData();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);

  // Apply luxury theme palette to CSS custom properties
  useEffect(() => {
    const theme = getThemeColors(data.brand?.themePreset);
    document.documentElement.style.setProperty('--brand-primary', theme.hex);
    document.documentElement.style.setProperty('--brand-hover', theme.hoverHex);
  }, [data.brand?.themePreset]);

  useEffect(() => {
    const checkAdminRoute = () => {
      const isHashAdmin = window.location.hash === '#admin';
      const isPathAdmin = window.location.pathname.replace(/\/$/, '') === '/admin';
      setIsAdminView(isHashAdmin || isPathAdmin);
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);
    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
    };
  }, []);

  if (isAdminView) {
    return (
      <AdminDashboard
        onBackToSite={() => {
          if (window.location.pathname.includes('/admin')) {
            window.history.pushState(null, '', '/');
          }
          window.location.hash = '';
          setIsAdminView(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col selection:bg-brand selection:text-white">
      {/* Floating Luxury Top Nav with Logo / Brand support */}
      <Navigation onOpenQuote={() => setIsQuoteOpen(true)} />

      {/* Main Architectural One-Pager Content */}
      <main className="flex-grow">
        {/* Section 1: Hero Slideshow with Cross-fading Slides & Controls */}
        <HeroSlideshow />

        {/* Section 2: Studio Introduction & Founder Statement */}
        <StudioIntro />

        {/* Section 3: Filtered Projects Gallery with Lightbox Modal */}
        <ProjectsGallery onOpenQuote={() => setIsQuoteOpen(true)} />

        {/* Section 4: Interactive Before & After Transformation Slider */}
        {data.sectionToggles?.showBeforeAfter !== false && (
          <BeforeAfterSlider onOpenQuote={() => setIsQuoteOpen(true)} />
        )}

        {/* Section 5: Auto-Animated Testimonial Slider */}
        {data.sectionToggles?.showTestimonials !== false && (
          <TestimonialsSlider />
        )}

        {/* Section 6: Split Contact, Consultation Questionnaire & Location Map */}
        <ContactSection onOpenQuote={() => setIsQuoteOpen(true)} />
      </main>

      {/* Luxury Editorial Footer */}
      <Footer onOpenQuote={() => setIsQuoteOpen(true)} />

      {/* Automated WhatsApp Consultation Modal */}
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <SiteDataProvider>
      <AppContent />
    </SiteDataProvider>
  );
};

export default App;
