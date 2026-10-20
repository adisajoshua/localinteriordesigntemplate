import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Download,
  Upload,
  RotateCcw,
  Check,
  Save,
  Loader2,
  Menu,
  X
} from 'lucide-react';
import { ProjectItem, TestimonialItem, THEME_PRESETS, ThemePreset } from '../../data/siteData';
import { compressImage } from '../../utils/imageCompression';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const { data, updateData, resetToDefault, isSyncing } = useSiteData();
  const tabs = [
    { id: 'brand', label: 'Brand & Logo', shortLabel: 'Brand' },
    { id: 'toggles', label: 'Section Toggles', shortLabel: 'Toggles' },
    { id: 'beforeAfter', label: 'Before & After', shortLabel: 'Before/After' },
    { id: 'hero', label: 'Hero Slideshow (7)', shortLabel: 'Hero' },
    { id: 'studio', label: 'Studio Narrative', shortLabel: 'Studio' },
    { id: 'projects', label: 'Projects Archive', shortLabel: 'Projects' },
    { id: 'testimonials', label: 'Testimonials', shortLabel: 'Reviews' },
  ];

  const [activeTab, setActiveTab] = useState<
    'brand' | 'toggles' | 'beforeAfter' | 'hero' | 'studio' | 'projects' | 'testimonials'
  >('brand');
  const [formData, setFormData] = useState(data);
  const [saveNotice, setSaveNotice] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Keep formData in sync if data changes
  React.useEffect(() => {
    setFormData(data);
  }, [data]);

  // Sync state if context updates
  const handleSave = async (customData?: typeof formData) => {
    const dataToSave = customData || formData;
    await updateData(dataToSave);
    setSaveNotice(true);
    setTimeout(() => setSaveNotice(false), 3000);
  };

  // Helper to handle image file upload directly from device with automatic canvas WebP compression
  const handleImageUpload = async (file: File, callback: (compressedUrl: string) => void) => {
    if (!file) return;
    setIsCompressing(true);
    try {
      const compressedWebP = await compressImage(file, 1600, 0.82);
      callback(compressedWebP);
    } catch (err) {
      console.error('Image compression failed, falling back to raw read:', err);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          callback(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interiors_cms_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        setFormData(parsed);
        await updateData(parsed);
        alert('Site data imported and published successfully!');
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans pb-28">
      
      {/* Admin Header */}
      <header className="bg-stone-900 text-white px-3 sm:px-6 py-3 flex items-center justify-between shadow-md sticky top-0 z-50">
        <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
          <button
            onClick={onBackToSite}
            className="flex items-center space-x-1 text-xs uppercase tracking-wider bg-stone-800 hover:bg-stone-700 px-2.5 sm:px-3.5 py-2 rounded transition-colors shrink-0"
            title="Return to public site"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live Site</span>
          </button>
          
          <h1 className="font-serif text-sm sm:text-lg tracking-wider uppercase font-normal truncate">
            {formData.brand.name || 'STUDIO'}{' '}
            <span className="hidden md:inline text-xs text-stone-400 font-sans">| Client Admin CMS</span>
          </h1>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          {isCompressing && (
            <span className="hidden sm:flex items-center space-x-1 text-xs text-amber-400 font-medium">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Optimizing...</span>
            </span>
          )}

          {isSyncing && (
            <span className="hidden sm:flex items-center space-x-1 text-xs text-stone-300">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Syncing...</span>
            </span>
          )}

          {saveNotice && (
            <span className="hidden sm:flex items-center space-x-1 text-xs text-emerald-400 font-bold animate-fade-in-up">
              <Check className="w-3.5 h-3.5" />
              <span>Live!</span>
            </span>
          )}

          {/* Header Publish Button */}
          <button
            onClick={() => handleSave()}
            disabled={isCompressing}
            className="flex items-center space-x-1.5 text-xs uppercase tracking-wider font-bold bg-brand hover:bg-brand-hover text-white px-3.5 sm:px-5 py-2 rounded shadow transition-colors disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Publish</span>
          </button>

          {/* Mobile Hamburger Drawer Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded bg-stone-800 text-stone-200 hover:text-white"
            aria-label="Toggle Navigation Drawer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Swipeable Tab Bar (Scrollable horizontally with touch, no wrapping into 4 rows) */}
      <div className="sm:hidden bg-stone-900 border-t border-stone-800 px-3 py-2 overflow-x-auto scrollbar-none flex items-center space-x-1.5 shrink-0 select-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              setMobileMenuOpen(false);
            }}
            className={`text-[11px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-full shrink-0 whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-brand text-white shadow-sm'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            {tab.shortLabel}
          </button>
        ))}
      </div>

      {/* Mobile Full Navigation Drawer Modal */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm pt-14 p-4 animate-fade-in-up">
          <div className="bg-stone-900 text-white rounded-xl p-5 border border-stone-800 shadow-2xl max-h-[80vh] overflow-y-auto space-y-2">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-2">
              <span className="text-xs font-mono uppercase tracking-widest text-stone-400 font-bold">
                Admin Navigation Menu
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded bg-stone-800 text-stone-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-lg text-left text-xs uppercase tracking-wider font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'bg-brand text-white shadow'
                    : 'bg-stone-800/60 text-stone-300 hover:bg-stone-800'
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-4 sm:py-8">
        
        {/* Desktop Navigation Tabs (Hidden on mobile) */}
        <div className="hidden sm:flex flex-wrap gap-2 border-b border-stone-300 pb-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`text-xs uppercase tracking-wider font-semibold px-4 py-2.5 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-white text-stone-600 hover:bg-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Brand, Logo & Theme */}
        {activeTab === 'brand' && (
          <div className="bg-white rounded-xl p-4 sm:p-8 shadow-sm border border-stone-200 space-y-8 max-w-3xl">
            <h2 className="font-serif text-xl text-stone-900 font-normal border-b pb-3">
              Brand Profile & Logo
            </h2>

            {/* Direct Device Logo Upload */}
            <div className="p-5 rounded-lg bg-stone-50 border border-stone-200 space-y-3">
              <label className="block text-xs uppercase font-bold text-stone-700">
                Studio Logo (Upload from Phone or Computer)
              </label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {formData.brand.logoUrl ? (
                  <div className="relative p-2 bg-stone-900 rounded border border-stone-300 w-fit">
                    <img
                      src={formData.brand.logoUrl}
                      alt="Brand Logo Preview"
                      className="h-10 w-auto object-contain"
                    />
                    <button
                      onClick={() => setFormData({
                        ...formData,
                        brand: { ...formData.brand, logoUrl: '' }
                      })}
                      className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full text-xs hover:bg-red-700 shadow"
                      title="Remove Logo"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="h-10 px-4 rounded border border-dashed border-stone-300 flex items-center text-xs text-stone-500 font-serif">
                    Using Serif Text Logo: {formData.brand.name}
                  </div>
                )}

                <label className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold bg-white border border-stone-300 px-4 py-2.5 rounded shadow-sm hover:bg-stone-100 cursor-pointer text-stone-700 w-fit">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Logo from Device</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(file, (url) => {
                          setFormData({
                            ...formData,
                            brand: { ...formData.brand, logoUrl: url }
                          });
                        });
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-[11px] text-stone-500">
                Recommended: Transparent PNG or SVG logo. Automatically converted to WebP.
              </p>
            </div>

            {/* 5 One-Click Studio Accent Color Presets */}
            <div className="p-5 rounded-lg bg-stone-50 border border-stone-200 space-y-3">
              <div>
                <label className="block text-xs uppercase font-bold text-stone-700">
                  Studio Accent & CTA Color Palette (5 Luxury Presets)
                </label>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Select a preset matching your logo. Instantly updates all buttons, before/after handles, and accents.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                {THEME_PRESETS.map((preset) => {
                  const isSelected = (formData.brand.themePreset || 'terracotta') === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        brand: { ...formData.brand, themePreset: preset.id }
                      })}
                      className={`flex items-center space-x-3 p-3 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'bg-white border-stone-900 shadow-md ring-2 ring-stone-900/10'
                          : 'bg-white/80 border-stone-200 hover:border-stone-300 hover:bg-white'
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-full shrink-0 shadow-inner flex items-center justify-center text-white"
                        style={{ backgroundColor: preset.hex }}
                      >
                        {isSelected && <Check className="w-4 h-4 drop-shadow" />}
                      </div>
                      <div className="min-w-0">
                        <span className="block text-xs font-bold text-stone-900 truncate">
                          {preset.name}
                        </span>
                        <span className="block text-[10px] text-stone-500 font-mono">
                          {preset.tagline}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Identity Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase font-bold text-stone-700 mb-1">Brand Name</label>
                <input
                  type="text"
                  value={formData.brand.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    brand: { ...formData.brand, name: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded border border-stone-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-stone-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={formData.brand.tagline}
                  onChange={(e) => setFormData({
                    ...formData,
                    brand: { ...formData.brand, tagline: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded border border-stone-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-stone-700 mb-1">
                  Primary Phone (Displayed)
                </label>
                <input
                  type="text"
                  value={formData.brand.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    brand: { ...formData.brand, phone: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded border border-stone-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-stone-700 mb-1">
                  WhatsApp Number (with Country Code)
                </label>
                <input
                  type="text"
                  placeholder="2348160758197"
                  value={formData.brand.phoneClean}
                  onChange={(e) => setFormData({
                    ...formData,
                    brand: { ...formData.brand, phoneClean: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded border border-stone-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-stone-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.brand.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    brand: { ...formData.brand, email: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded border border-stone-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-stone-700 mb-1">Instagram Link</label>
                <input
                  type="text"
                  placeholder="https://instagram.com/yourstudio"
                  value={formData.brand.instagram || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    brand: { ...formData.brand, instagram: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded border border-stone-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-stone-700 mb-1">Facebook Page Link</label>
                <input
                  type="text"
                  placeholder="https://facebook.com/yourstudio"
                  value={formData.brand.facebook || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    brand: { ...formData.brand, facebook: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded border border-stone-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-stone-700 mb-1">X / Twitter Link</label>
                <input
                  type="text"
                  placeholder="https://twitter.com/yourstudio"
                  value={formData.brand.twitter || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    brand: { ...formData.brand, twitter: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded border border-stone-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-stone-700 mb-1">LinkedIn Profile Link</label>
                <input
                  type="text"
                  placeholder="https://linkedin.com/company/yourstudio"
                  value={formData.brand.linkedin || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    brand: { ...formData.brand, linkedin: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded border border-stone-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-stone-700 mb-1">TikTok Profile Link</label>
                <input
                  type="text"
                  placeholder="https://tiktok.com/@yourstudio"
                  value={formData.brand.tiktok || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    brand: { ...formData.brand, tiktok: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded border border-stone-300 text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs uppercase font-bold text-stone-700 mb-1">Physical Address</label>
                <input
                  type="text"
                  value={formData.brand.address}
                  onChange={(e) => setFormData({
                    ...formData,
                    brand: { ...formData.brand, address: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded border border-stone-300 text-sm"
                />
              </div>
            </div>

            {/* Data Backup & Factory Reset */}
            <div className="p-5 rounded-lg bg-stone-50 border border-stone-200 space-y-3">
              <div>
                <label className="block text-xs uppercase font-bold text-stone-700">
                  Data Backup & Factory Reset
                </label>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Download an offline JSON copy of your site data, restore from a backup, or reset content.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-bold bg-stone-900 hover:bg-stone-800 text-white px-4 py-2.5 rounded shadow-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Backup (JSON)</span>
                </button>

                <label className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-bold bg-white hover:bg-stone-100 text-stone-800 px-4 py-2.5 rounded cursor-pointer border border-stone-300 shadow-sm transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Restore from Backup</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJson}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all content back to factory defaults?')) {
                      resetToDefault();
                      setFormData(data);
                      alert('Content reset to default.');
                    }
                  }}
                  className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-bold text-red-600 hover:text-red-700 px-3 py-2 rounded border border-red-200 hover:bg-red-50 ml-auto transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset to Default</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Section Visibility Toggles */}
        {activeTab === 'toggles' && (
          <div className="bg-white rounded-xl p-4 sm:p-8 shadow-sm border border-stone-200 space-y-6 max-w-2xl">
            <div>
              <h2 className="font-serif text-xl text-stone-900 font-normal border-b pb-3">
                Section Visibility Toggles
              </h2>
              <p className="text-xs text-stone-600 mt-2">
                Turn sections on or off depending on your studio stage. If you do not have client reviews or progress photos yet, simply toggle them off.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {[
                {
                  key: 'showBeforeAfter',
                  title: 'Before & After Transformation Slider',
                  desc: 'Displays the interactive split comparison slider right after the projects gallery.'
                },
                {
                  key: 'showTestimonials',
                  title: 'Client Testimonials Slider',
                  desc: 'Shows the client review quotes carousel with author names and project locations.'
                },
                {
                  key: 'showStats',
                  title: 'Studio Statistics Strip',
                  desc: 'Shows the 3 numerical metrics in the studio section (Founded Year, Completed Projects, Satisfaction Rate).'
                },
                {
                  key: 'showInteractiveMap',
                  title: 'Studio Location Map',
                  desc: 'Displays the interactive Google Maps embed at the bottom contact section.'
                }
              ].map((toggle) => {
                const isChecked = (formData.sectionToggles as any)?.[toggle.key] !== false;
                return (
                  <label
                    key={toggle.key}
                    className="flex items-start space-x-3.5 p-4 rounded-lg border border-stone-200 hover:bg-stone-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          sectionToggles: {
                            ...formData.sectionToggles,
                            [toggle.key]: e.target.checked
                          }
                        });
                      }}
                      className="mt-1 w-4 h-4 text-brand rounded border-stone-300 focus:ring-brand"
                    />
                    <div>
                      <span className="block text-sm font-semibold text-stone-900">
                        {toggle.title}
                      </span>
                      <span className="block text-xs text-stone-500 mt-0.5">
                        {toggle.desc}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Before & After Transformation */}
        {activeTab === 'beforeAfter' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
              <div>
                <h2 className="font-serif text-xl text-stone-900 font-normal">
                  Before & After Transformations ({formData.beforeAfterList?.length || 0})
                </h2>
                <p className="text-xs text-stone-600 mt-1">
                  Upload raw site progress photos and matching completed interior photos. Visitors can slide between them using left/right arrows on the live site.
                </p>
              </div>
              <button
                onClick={() => {
                  const newItem = {
                    id: `ba_${Date.now()}`,
                    title: 'New Space Transformation',
                    subtitle: 'Full Structural Renovation',
                    location: 'Enugu, Nigeria',
                    description: 'Transforming a raw concrete space into an ambient luxury interior.',
                    showDescription: false,
                    beforeImage: './assets/images/before_transformation_1.jpg',
                    afterImage: './assets/images/hero_slide_3.jpg',
                    isActive: true
                  };
                  setFormData({
                    ...formData,
                    beforeAfterList: [...(formData.beforeAfterList || []), newItem]
                  });
                }}
                className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-bold bg-stone-900 hover:bg-stone-800 text-white px-4 py-2.5 rounded-lg shadow shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Transformation</span>
              </button>
            </div>

            <div className="space-y-6">
              {(formData.beforeAfterList || []).map((item, idx) => (
                <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 space-y-6">
                  
                  {/* Item Header with Active Toggle and Delete */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-mono font-bold text-stone-500 uppercase tracking-widest">
                        Transformation #{idx + 1}
                      </span>
                      <label className="flex items-center space-x-2 text-xs font-semibold text-stone-800 cursor-pointer bg-stone-100 px-3 py-1 rounded-full">
                        <input
                          type="checkbox"
                          checked={item.isActive !== false}
                          onChange={(e) => {
                            const updated = [...formData.beforeAfterList];
                            updated[idx].isActive = e.target.checked;
                            setFormData({ ...formData, beforeAfterList: updated });
                          }}
                          className="w-3.5 h-3.5 text-brand rounded border-stone-300 focus:ring-brand"
                        />
                        <span>{item.isActive !== false ? 'Active on Website' : 'Hidden from Website'}</span>
                      </label>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`Delete transformation "${item.title}"?`)) {
                          const updated = formData.beforeAfterList.filter((_, i) => i !== idx);
                          setFormData({ ...formData, beforeAfterList: updated });
                        }
                      }}
                      className="text-red-600 hover:text-red-700 text-xs flex items-center space-x-1 font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>

                  {/* Photos Upload Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Before Photo */}
                    <div className="p-4 rounded-lg border border-stone-200 bg-stone-50 space-y-3">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-stone-600 block">
                        1. Before Photo
                      </span>
                      <div className="aspect-[16/10] rounded overflow-hidden bg-stone-200 border border-stone-300">
                        <img
                          src={item.beforeImage}
                          alt="Before site"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <label className="block text-center text-xs uppercase tracking-wider font-semibold bg-white border border-stone-300 px-3 py-2 rounded shadow-sm hover:bg-stone-100 cursor-pointer text-stone-800">
                        <span>Upload Before Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(file, (url) => {
                                const updated = [...formData.beforeAfterList];
                                updated[idx].beforeImage = url;
                                setFormData({ ...formData, beforeAfterList: updated });
                              });
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* After Photo */}
                    <div className="p-4 rounded-lg border border-stone-200 bg-stone-50 space-y-3">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-brand block">
                        2. After Photo
                      </span>
                      <div className="aspect-[16/10] rounded overflow-hidden bg-stone-200 border border-stone-300">
                        <img
                          src={item.afterImage}
                          alt="After site"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <label className="block text-center text-xs uppercase tracking-wider font-semibold bg-brand text-white px-3 py-2 rounded shadow-sm hover:bg-brand-hover cursor-pointer transition-colors">
                        <span>Upload After Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(file, (url) => {
                                const updated = [...formData.beforeAfterList];
                                updated[idx].afterImage = url;
                                setFormData({ ...formData, beforeAfterList: updated });
                              });
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Description Fields */}
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs uppercase font-bold text-stone-700 mb-1">Project Headline</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...formData.beforeAfterList];
                          updated[idx].title = e.target.value;
                          setFormData({ ...formData, beforeAfterList: updated });
                        }}
                        className="w-full px-3.5 py-2 rounded border border-stone-300 text-sm font-serif"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-bold text-stone-700 mb-1">Subtitle</label>
                        <input
                          type="text"
                          value={item.subtitle}
                          onChange={(e) => {
                            const updated = [...formData.beforeAfterList];
                            updated[idx].subtitle = e.target.value;
                            setFormData({ ...formData, beforeAfterList: updated });
                          }}
                          className="w-full px-3.5 py-2 rounded border border-stone-300 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase font-bold text-stone-700 mb-1">Location</label>
                        <input
                          type="text"
                          value={item.location}
                          onChange={(e) => {
                            const updated = [...formData.beforeAfterList];
                            updated[idx].location = e.target.value;
                            setFormData({ ...formData, beforeAfterList: updated });
                          }}
                          className="w-full px-3.5 py-2 rounded border border-stone-300 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <label className="text-xs uppercase font-bold text-stone-700">Transformation Description</label>
                        <label className="flex items-center space-x-1.5 cursor-pointer text-xs text-stone-600 bg-stone-100 px-2.5 py-1 rounded hover:bg-stone-200 transition-colors">
                          <input
                            type="checkbox"
                            checked={item.showDescription === true}
                            onChange={(e) => {
                              const updated = [...formData.beforeAfterList];
                              updated[idx].showDescription = e.target.checked;
                              setFormData({ ...formData, beforeAfterList: updated });
                            }}
                            className="w-3.5 h-3.5 text-brand rounded border-stone-300 focus:ring-brand"
                          />
                          <span className="font-medium">Show Description on Live Card</span>
                        </label>
                      </div>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => {
                          const updated = [...formData.beforeAfterList];
                          updated[idx].description = e.target.value;
                          setFormData({ ...formData, beforeAfterList: updated });
                        }}
                        placeholder="Detailed room transformation story (optional)"
                        className="w-full px-3.5 py-2 rounded border border-stone-300 text-sm"
                      />
                      <p className="text-[11px] text-stone-500 mt-1">
                        {item.showDescription ? "✓ Visible on the live card beneath the headline" : "Hidden on the live card by default for a clean, scannable look"}
                      </p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Hero Slideshow (7) */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <h2 className="font-serif text-xl text-stone-900 font-normal">
              Hero Slideshow (7 Architectural Crossfades)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.heroSlides.map((slide, idx) => (
                <div key={slide.id} className="bg-white rounded-xl p-5 shadow-sm border border-stone-200 space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-xs font-mono font-bold text-stone-500 uppercase tracking-widest">
                      Slide #{idx + 1}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                      {slide.tag || 'Slide'}
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-28 h-28 rounded bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                      <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-grow space-y-2">
                      <label className="inline-flex items-center space-x-1.5 text-[11px] uppercase tracking-wider font-semibold bg-stone-50 border border-stone-300 px-3 py-1.5 rounded hover:bg-stone-100 cursor-pointer text-stone-700">
                        <Upload className="w-3 h-3" />
                        <span>Change Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(file, (url) => {
                                const updated = [...formData.heroSlides];
                                updated[idx].image = url;
                                setFormData({ ...formData, heroSlides: updated });
                              });
                            }
                          }}
                          className="hidden"
                        />
                      </label>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-stone-600 mb-0.5">Title</label>
                        <input
                          type="text"
                          value={slide.title}
                          onChange={(e) => {
                            const updated = [...formData.heroSlides];
                            updated[idx].title = e.target.value;
                            setFormData({ ...formData, heroSlides: updated });
                          }}
                          className="w-full px-2.5 py-1.5 rounded border border-stone-300 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Studio Narrative */}
        {activeTab === 'studio' && (
          <div className="bg-white rounded-xl p-4 sm:p-8 shadow-sm border border-stone-200 space-y-6 max-w-3xl">
            <h2 className="font-serif text-xl text-stone-900 font-normal border-b pb-3">
              Studio Narrative & Metrics
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-stone-700 mb-1">Heading Line 1</label>
                  <input
                    type="text"
                    value={formData.studioIntro.headingLine1}
                    onChange={(e) => setFormData({
                      ...formData,
                      studioIntro: { ...formData.studioIntro, headingLine1: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded border border-stone-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-stone-700 mb-1">Heading Line 2</label>
                  <input
                    type="text"
                    value={formData.studioIntro.headingLine2}
                    onChange={(e) => setFormData({
                      ...formData,
                      studioIntro: { ...formData.studioIntro, headingLine2: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded border border-stone-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-stone-700 mb-1">Paragraph 1</label>
                <textarea
                  rows={3}
                  value={formData.studioIntro.paragraph1}
                  onChange={(e) => setFormData({
                    ...formData,
                    studioIntro: { ...formData.studioIntro, paragraph1: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded border border-stone-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-stone-700 mb-1">Paragraph 2</label>
                <textarea
                  rows={3}
                  value={formData.studioIntro.paragraph2}
                  onChange={(e) => setFormData({
                    ...formData,
                    studioIntro: { ...formData.studioIntro, paragraph2: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded border border-stone-300 text-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-stone-700 mb-1">Founded Year</label>
                  <input
                    type="text"
                    value={formData.studioIntro.foundedYear}
                    onChange={(e) => setFormData({
                      ...formData,
                      studioIntro: { ...formData.studioIntro, foundedYear: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 rounded border border-stone-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-stone-700 mb-1">Commissions Count</label>
                  <input
                    type="text"
                    value={formData.studioIntro.completedProjects}
                    onChange={(e) => setFormData({
                      ...formData,
                      studioIntro: { ...formData.studioIntro, completedProjects: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 rounded border border-stone-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-stone-700 mb-1">Satisfaction Rate</label>
                  <input
                    type="text"
                    value={formData.studioIntro.clientSatisfaction}
                    onChange={(e) => setFormData({
                      ...formData,
                      studioIntro: { ...formData.studioIntro, clientSatisfaction: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 rounded border border-stone-300 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Projects Archive */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl text-stone-900 font-normal">
                Featured Projects Archive ({formData.projects.length})
              </h2>
              <button
                onClick={() => {
                  const newProj: ProjectItem = {
                    id: `p_${Date.now()}`,
                    title: 'New Luxury Commission',
                    category: 'Living room',
                    image: './assets/images/hero_slide_1.jpg',
                    location: 'Independence Layout, Enugu',
                    scope: 'Bespoke POP Ceiling, Custom Woodwork',
                    description: 'High-end architectural space renovation featuring custom false ceiling and ambient lighting.'
                  };
                  setFormData({
                    ...formData,
                    projects: [newProj, ...formData.projects]
                  });
                }}
                className="flex items-center space-x-1.5 text-xs uppercase tracking-wider font-bold bg-stone-900 hover:bg-stone-800 text-white px-4 py-2.5 rounded-lg shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formData.projects.map((proj, idx) => (
                <div key={proj.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-stone-200 flex flex-col">
                  <div className="relative aspect-[4/3] bg-stone-100">
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                    <label className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-stone-900 text-xs px-2.5 py-1.5 rounded shadow cursor-pointer font-medium flex items-center space-x-1">
                      <Upload className="w-3 h-3" />
                      <span>Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleImageUpload(file, (url) => {
                              const updated = [...formData.projects];
                              updated[idx].image = url;
                              setFormData({ ...formData, projects: updated });
                            });
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-stone-500">Category</label>
                        <select
                          value={proj.category}
                          onChange={(e) => {
                            const updated = [...formData.projects];
                            updated[idx].category = e.target.value as any;
                            setFormData({ ...formData, projects: updated });
                          }}
                          className="w-full px-2 py-1 rounded border border-stone-300 text-xs"
                        >
                          <option value="Kitchen">Kitchen</option>
                          <option value="Furnitures">Furnitures</option>
                          <option value="POP">POP Ceilings</option>
                          <option value="Wardrobe">Wardrobe</option>
                          <option value="Lighting">Lighting</option>
                          <option value="Living room">Living room</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-stone-500">Title</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => {
                            const updated = [...formData.projects];
                            updated[idx].title = e.target.value;
                            setFormData({ ...formData, projects: updated });
                          }}
                          className="w-full px-2 py-1 rounded border border-stone-300 text-xs font-serif"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-stone-500">Location</label>
                        <input
                          type="text"
                          value={proj.location}
                          onChange={(e) => {
                            const updated = [...formData.projects];
                            updated[idx].location = e.target.value;
                            setFormData({ ...formData, projects: updated });
                          }}
                          className="w-full px-2 py-1 rounded border border-stone-300 text-xs"
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t flex justify-end">
                      <button
                        onClick={() => {
                          if (confirm(`Delete project "${proj.title}"?`)) {
                            const updated = formData.projects.filter((_, i) => i !== idx);
                            setFormData({ ...formData, projects: updated });
                          }
                        }}
                        className="text-red-600 hover:text-red-700 text-xs flex items-center space-x-1 font-semibold"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: Testimonials */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl text-stone-900 font-normal">
                Client Testimonials ({formData.testimonials.length})
              </h2>
              <button
                onClick={() => {
                  const newT: TestimonialItem = {
                    id: `t_${Date.now()}`,
                    author: 'Client Name',
                    role: 'Homeowner, Enugu',
                    project: 'Residential POP & Living Room Fit-out',
                    quote: 'Exceptional attention to detail and flawless delivery.'
                  };
                  setFormData({
                    ...formData,
                    testimonials: [...formData.testimonials, newT]
                  });
                }}
                className="flex items-center space-x-1.5 text-xs uppercase tracking-wider font-bold bg-stone-900 hover:bg-stone-800 text-white px-4 py-2 rounded-lg shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Review</span>
              </button>
            </div>

            <div className="space-y-4">
              {formData.testimonials.map((test, idx) => (
                <div key={test.id} className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-xs font-mono font-bold text-stone-500 uppercase">Review #{idx + 1}</span>
                    <button
                      onClick={() => {
                        const updated = formData.testimonials.filter((_, i) => i !== idx);
                        setFormData({ ...formData, testimonials: updated });
                      }}
                      className="text-red-600 hover:text-red-700 text-xs flex items-center space-x-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-stone-600 mb-0.5">Quote</label>
                      <textarea
                        rows={2}
                        value={test.quote}
                        onChange={(e) => {
                          const updated = [...formData.testimonials];
                          updated[idx].quote = e.target.value;
                          setFormData({ ...formData, testimonials: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded border border-stone-300 text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-stone-600 mb-0.5">Author</label>
                        <input
                          type="text"
                          value={test.author}
                          onChange={(e) => {
                            const updated = [...formData.testimonials];
                            updated[idx].author = e.target.value;
                            setFormData({ ...formData, testimonials: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded border border-stone-300 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-stone-600 mb-0.5">Role / City</label>
                        <input
                          type="text"
                          value={test.role}
                          onChange={(e) => {
                            const updated = [...formData.testimonials];
                            updated[idx].role = e.target.value;
                            setFormData({ ...formData, testimonials: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded border border-stone-300 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-stone-600 mb-0.5">Commission</label>
                        <input
                          type="text"
                          value={test.project}
                          onChange={(e) => {
                            const updated = [...formData.testimonials];
                            updated[idx].project = e.target.value;
                            setFormData({ ...formData, testimonials: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded border border-stone-300 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Sticky Mobile Floating Publish Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 px-4 py-3 flex items-center justify-between shadow-2xl">
        <div className="flex items-center space-x-2 text-xs">
          {saveNotice ? (
            <span className="flex items-center space-x-1 text-emerald-400 font-bold">
              <Check className="w-3.5 h-3.5" />
              <span>Published & Live!</span>
            </span>
          ) : isCompressing ? (
            <span className="flex items-center space-x-1 text-amber-400 font-medium">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Compressing...</span>
            </span>
          ) : (
            <span className="text-stone-400 text-[11px] font-mono">
              Auto-optimizes photos
            </span>
          )}
        </div>

        <button
          onClick={() => handleSave()}
          disabled={isCompressing}
          className="flex items-center space-x-1.5 text-xs uppercase tracking-wider font-bold bg-brand hover:bg-brand-hover text-white px-5 py-2.5 rounded-full shadow transition-colors"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Publish Changes</span>
        </button>
      </div>
    </div>
  );
};
