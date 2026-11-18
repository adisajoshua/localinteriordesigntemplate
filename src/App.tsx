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
import { AdminLoginModal } from './components/Admin/AdminLoginModal';

export const AppContent: React.FC = () => {
  const { data } = useSiteData();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(() =>
    typeof window !== 'undefined' ? sessionStorage.getItem('kenry_admin_token') : null
  );

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

  // Instant scroll to top when entering /#admin
  useEffect(() => {
    if (isAdminView) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [isAdminView]);

  // Verify existing session token against server when opening admin
  useEffect(() => {
    if (!isAdminView || !adminToken) return;
    let active = true;
    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ action: 'verify' }),
    })
      .then((res) => {
        if (active && res.status === 401) {
          sessionStorage.removeItem('kenry_admin_token');
          setAdminToken(null);
        }
      })
      .catch(() => {
        // Keep session in offline local preview
      });
    return () => {
      active = false;
    };
  }, [isAdminView, adminToken]);

  const handleBackToSite = () => {
    if (window.location.pathname.includes('/admin')) {
      window.history.pushState(null, '', '/');
    }
    window.location.hash = '';
    setIsAdminView(false);
  };

  const handleSessionExpired = () => {
    sessionStorage.removeItem('kenry_admin_token');
    setAdminToken(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('kenry_admin_token');
    setAdminToken(null);
    handleBackToSite();
  };

  if (isAdminView) {
    if (!adminToken) {
      return (
        <AdminLoginModal
          onSuccess={(token) => setAdminToken(token)}
          onBackToSite={handleBackToSite}
        />
      );
    }

    return (
      <AdminDashboard
        onBackToSite={handleBackToSite}
        onLogout={handleLogout}
        onSessionExpired={handleSessionExpired}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col selection:bg-brand selection:text-white">
      <Navigation onOpenQuote={() => setIsQuoteOpen(true)} />

      <main className="flex-grow">
        <HeroSlideshow />
        <StudioIntro />
        <ProjectsGallery onOpenQuote={() => setIsQuoteOpen(true)} />
        {data.sectionToggles?.showBeforeAfter !== false && (
          <BeforeAfterSlider onOpenQuote={() => setIsQuoteOpen(true)} />
        )}
        {data.sectionToggles?.showTestimonials !== false && (
          <TestimonialsSlider />
        )}
        <ContactSection onOpenQuote={() => setIsQuoteOpen(true)} />
      </main>

      <Footer onOpenQuote={() => setIsQuoteOpen(true)} />
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
