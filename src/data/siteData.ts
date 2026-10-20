export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  tag: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Kitchen' | 'Furnitures' | 'POP' | 'Wardrobe' | 'Lighting' | 'Living room';
  image: string;
  location: string;
  scope: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  project: string;
}

export interface BeforeAfterItem {
  id: string;
  beforeImage: string;
  afterImage: string;
  title: string;
  subtitle: string;
  location: string;
  scope?: string;
  description: string;
  showDescription?: boolean;
  isActive: boolean;
}

export interface SectionToggles {
  showBeforeAfter: boolean;
  showStats: boolean;
  showTestimonials: boolean;
  showInteractiveMap: boolean;
}

export interface SiteData {
  brand: {
    name: string;
    tagline: string;
    logoUrl?: string;
    themePreset?: 'terracotta' | 'emerald' | 'gold' | 'slate';
    phone: string;
    phoneClean: string;
    phoneSecondary: string;
    instagram: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    tiktok?: string;
    email: string;
    address: string;
    plusCode: string;
    city: string;
    state: string;
    coords: {
      lat: number;
      lng: number;
    };
  };
  sectionToggles: SectionToggles;
  beforeAfterList: BeforeAfterItem[];
  heroSlides: HeroSlide[];
  studioIntro: {
    headingLine1: string;
    headingLine2: string;
    paragraph1: string;
    paragraph2: string;
    foundedYear: string;
    completedProjects: string;
    clientSatisfaction: string;
  };
  projects: ProjectItem[];
  testimonials: TestimonialItem[];
}

export const defaultSiteData: SiteData = {
  brand: {
    name: "KENRY INTERIORS",
    tagline: "Architectural Interior & Contemporary Space Design",
    logoUrl: "",
    themePreset: "terracotta",
    phone: "0816 075 8197",
    phoneClean: "2348160758197",
    phoneSecondary: "0808 837 7677",
    instagram: "https://instagram.com/kenryinteriors",
    facebook: "https://facebook.com/kenryinteriors",
    twitter: "https://twitter.com/kenryinteriors",
    linkedin: "https://linkedin.com/company/kenryinteriors",
    tiktok: "",
    email: "consult@kenryinteriors.com",
    address: "Shop 16 Emmanuel Ngwu St, Old Air-Port Rd, Thinkers Corner, Enugu 400103, Enugu State",
    plusCode: "FG7V+G5 Enugu",
    city: "Enugu",
    state: "Enugu State",
    coords: {
      lat: 6.4638675,
      lng: 7.5429568
    }
  },
  sectionToggles: {
    showBeforeAfter: true,
    showStats: true,
    showTestimonials: true,
    showInteractiveMap: true
  },
  beforeAfterList: [
    {
      id: "ba1",
      beforeImage: "./assets/images/before_transformation_1.jpg",
      afterImage: "./assets/images/hero_slide_3.jpg",
      title: "Double-Volume Architectural POP Ceiling & Cove Lighting",
      subtitle: "Complete Structural Renovation & Ambient Illumination",
      location: "Thinkers Corner, Enugu",
      description: "Transforming an unrendered structural concrete slab and exposed masonry into an expansive, floating canopy with warm shadow gaps and architectural light tracks.",
      showDescription: false,
      isActive: true
    },
    {
      id: "ba2",
      beforeImage: "./assets/images/before_transformation_2.jpg",
      afterImage: "./assets/images/project_1_gra.jpg",
      title: "Executive Modern Living Lounge & Wall Slat Paneling",
      subtitle: "From Bare Blockwork to Curated Living",
      location: "Independence Layout, Enugu",
      description: "Evolving an unfinished bare concrete block shell into an airy, light-filled executive parlor with bespoke furniture and designer lighting.",
      showDescription: false,
      isActive: true
    }
  ],
  heroSlides: [
    {
      id: "h1",
      image: "./assets/images/hero_slide_1.jpg",
      title: "Modern Living Room",
      subtitle: "",
      tag: "Living Room"
    },
    {
      id: "h2",
      image: "./assets/images/hero_slide_2.jpg",
      title: "Luxury Kitchen",
      subtitle: "",
      tag: "Kitchen"
    },
    {
      id: "h3",
      image: "./assets/images/hero_slide_3.jpg",
      title: "POP Ceiling Architecture",
      subtitle: "",
      tag: "POP Ceilings"
    },
    {
      id: "h4",
      image: "./assets/images/hero_slide_4.jpg",
      title: "Master Walk-In Wardrobe",
      subtitle: "",
      tag: "Wardrobes"
    },
    {
      id: "h5",
      image: "./assets/images/hero_slide_5.jpg",
      title: "Architectural Lighting",
      subtitle: "",
      tag: "Lighting"
    },
    {
      id: "h6",
      image: "./assets/images/hero_slide_6.jpg",
      title: "Bespoke Furnitures",
      subtitle: "",
      tag: "Furnitures"
    },
    {
      id: "h7",
      image: "./assets/images/hero_slide_7.jpg",
      title: "Executive Residence",
      subtitle: "",
      tag: "Living Room"
    }
  ],
  studioIntro: {
    headingLine1: "KENRY INTERIORS",
    headingLine2: "DESIGN STUDIO",
    paragraph1: "Kenry Interiors & Exteriors Ltd is an architectural interior practice based in Thinkers Corner along Old Air-Port Road, Enugu, working with discerning private clients, residential estates, and commercial developments across Nigeria and internationally.",
    paragraph2: "Founded on the principles of refined simplicity and master craftsmanship, our multidisciplinary studio brings together architectural space planning, modern POP false ceilings, bespoke furniture fabrication, and high-performance lighting systems to create spaces that are timeless, functional, and built to last.",
    foundedYear: "2013",
    completedProjects: "220+",
    clientSatisfaction: "100%"
  },
  projects: [
    {
      id: "pk1",
      title: "Minimalist Quartz Kitchen Island & Cabinetry",
      category: "Kitchen",
      image: "./assets/images/custom_kitchen_1.jpg",
      location: "Independence Layout, Enugu",
      scope: "Modular Acrylic Cabinets, Quartz Countertop, Hidden LED",
      description: "A seamless open-concept luxury kitchen featuring imported acrylic soft-close cabinets, waterfall quartz central island, and integrated strip lighting."
    },
    {
      id: "pk2",
      title: "Contemporary Charcoal & Warm Oak Pantry",
      category: "Kitchen",
      image: "./assets/images/hero_slide_2.jpg",
      location: "GRA, Enugu",
      scope: "Bespoke Millwork, Floating Shelving, Smoke Glass Inserts",
      description: "Custom-fitted chef kitchen with matte charcoal cabinetry, fluted glass upper displays, and ambient under-shelf task lighting."
    },
    {
      id: "pk3",
      title: "Executive Villa Kitchen & Breakfast Bar",
      category: "Kitchen",
      image: "./assets/images/dfluxe-fabrication.jpg",
      location: "Trans-Ekulu, Enugu",
      scope: "Full Kitchen Fit-Out, Island Seating, Appliance Integration",
      description: "High-end residential kitchen with marble-veined backsplash, integrated breakfast bar for four, and minimalist brass fixture accents."
    },
    {
      id: "pf1",
      title: "Curved Velvet Sectional & Marble Tables",
      category: "Furnitures",
      image: "./assets/images/hero_slide_6.jpg",
      location: "New Haven, Enugu",
      scope: "Bespoke Upholstery, Hardwood Frame, Custom Coffee Table",
      description: "Bespoke organic curved sectional couch upholstered in stain-resistant ivory boucle, paired with solid nero marquina marble center tables."
    },
    {
      id: "pf3",
      title: "Bespoke Accent Armchairs & Center Table",
      category: "Furnitures",
      image: "./assets/images/lekays_project_04.jpg",
      location: "Coal City Garden Estate, Enugu",
      scope: "Sculptural Seating, Brass Accents, Custom Cushioning",
      description: "Statement lounge armchairs featuring brushed brass frames and rich terracotta velvet upholstery for an executive formal parlor."
    },
    {
      id: "pp1",
      title: "Geometric Multi-Tier POP False Ceiling",
      category: "POP",
      image: "./assets/images/custom_pop_1.jpg",
      location: "Independence Layout, Enugu",
      scope: "Gypsum False Ceiling, Concealed Perimeter LED, Spotlights",
      description: "Architectural ceiling drop with sharp shadow lines, recessed cove illumination, and strategically placed glare-free spotlights."
    },
    {
      id: "pp2",
      title: "Curved Organic Ceiling Channel & Chandelier Box",
      category: "POP",
      image: "./assets/images/hero_slide_3.jpg",
      location: "GRA, Enugu",
      scope: "Custom POP Gypsum Molding, Acoustic Insulation",
      description: "Flowing organic ceiling drop that visually anchors the grand double-volume dining and living areas with warm indirect illumination."
    },
    {
      id: "pp3",
      title: "Recessed Minimalist Coffer False Ceiling",
      category: "POP",
      image: "./assets/images/lekays_project_06.jpg",
      location: "Trans-Ekulu, Enugu",
      scope: "Linear LED Channels, Perimeter Pelmets, High-Finish Plaster",
      description: "Sleek coffer ceiling with embedded black architectural track channels and integrated double-track motorized curtain pelmets."
    },
    {
      id: "pw1",
      title: "Executive Walk-In Wardrobe with Glass Doors",
      category: "Wardrobe",
      image: "./assets/images/custom_wardrobe_1.jpg",
      location: "GRA, Enugu",
      scope: "Floor-to-Ceiling Smoked Glass Doors, Built-in Lighting",
      description: "High-luxury walk-in closet system with motion-activated sensor lighting, velvet-lined jewelry drawers, and tempered glass facades."
    },
    {
      id: "pw2",
      title: "Master Suite Fitted Wardrobe & Dressing Island",
      category: "Wardrobe",
      image: "./assets/images/hero_slide_4.jpg",
      location: "Independence Layout, Enugu",
      scope: "Modular Closet Units, Central Accessory Island, Full Mirror",
      description: "Floor-to-ceiling fitted wardrobe featuring integrated shoe showcases, leather pull handles, and a central granite-top accessory island."
    },
    {
      id: "pl1",
      title: "Architectural Magnetic Track & Linear Spotlights",
      category: "Lighting",
      image: "./assets/images/custom_lighting_1.jpg",
      location: "Ogui Road, Enugu",
      scope: "Low-Voltage Magnetic Tracks, Adjustable Beam Spotlights",
      description: "State-of-the-art magnetic track lighting offering versatile beam angles for highlighting art pieces and architectural textures."
    },
    {
      id: "pl2",
      title: "Warm Ambient Cove & Backlit Wall Slats",
      category: "Lighting",
      image: "./assets/images/hero_slide_5.jpg",
      location: "GRA, Enugu",
      scope: "High-CRI 3000K LED Strips, Concealed Diffusers, Smart Dimming",
      description: "Concealed 3000K warm diffused illumination integrated behind fluted wooden slats and floating media cabinets."
    },
    {
      id: "pl3",
      title: "Sculptural Pendant & Stairwell Void Chandelier",
      category: "Lighting",
      image: "./assets/images/dfluxe-wall.jpg",
      location: "Trans-Ekulu, Enugu",
      scope: "Custom Hand-Blown Glass Globes, Multi-Tier Suspension",
      description: "Dramatic multi-globe cascading chandelier designed for a double-volume foyer and staircase void."
    },
    {
      id: "plv1",
      title: "Double-Volume Parlor with Acoustic Media Wall",
      category: "Living room",
      image: "./assets/images/hero_slide_1.jpg",
      location: "Independence Layout, Enugu",
      scope: "Full Room Fit-Out, Fluted Slats, Motorized Wave Curtains",
      description: "Grand family parlor with high-volume double-track motorized wave curtains, fluted TV media wall, and curated artwork placement."
    },
    {
      id: "plv3",
      title: "Executive Private Salon & Fireplace Backdrop",
      category: "Living room",
      image: "./assets/images/project_2_peterodili.jpg",
      location: "GRA, Enugu",
      scope: "Symmetry Space Planning, Custom Built-Ins, Designer Lamps",
      description: "Formal entertaining living room featuring bespoke shelving, curated accent armchairs, and floor-to-ceiling sheer linen curtains."
    }
  ],
  testimonials: [
    {
      id: "t1",
      quote: "Kenry Interiors did a phenomenal job on our family home in Thinkers Corner. The modern POP ceiling designs, concealed ambient LED lighting, and luxury curtains gave our living space a truly executive look. We never tire of spending time in our home.",
      author: "Chief Emeka Nwankwo",
      role: "Resident, Thinkers Corner, Enugu",
      project: "Full Duplex POP Ceiling & Living Room Fit-Out"
    },
    {
      id: "t2",
      quote: "Their attention to detail with TV wall consoles, acoustic wood cladding, and motorized curtains is unmatched in Enugu. Very polite artisans, meticulous space planning, and prompt delivery on our executive duplex.",
      author: "Mrs. Ifeoma Onyekwelu",
      role: "Homeowner, Trans-Ekulu, Enugu",
      project: "Living Room TV Wall & Lounge Setup"
    },
    {
      id: "t3",
      quote: "We partnered with Kenry Interiors on multiple residential projects. Professional execution from initial 3D design to the final finishing touches. Their understanding of false ceilings and bespoke joinery is world-class.",
      author: "Arc. Somtochukwu Obi",
      role: "Commercial Project Manager, Enugu",
      project: "Multi-Unit Residential Ceiling & Blinds"
    }
  ]
};

const STORAGE_KEY = 'kenry_interiors_site_data_v3';

export const loadSiteData = (): SiteData => {
  if (typeof window === 'undefined') return defaultSiteData;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...defaultSiteData,
        ...parsed,
        brand: { ...defaultSiteData.brand, ...(parsed.brand || {}) },
        sectionToggles: { ...defaultSiteData.sectionToggles, ...(parsed.sectionToggles || {}) },
        beforeAfterList: Array.isArray(parsed.beforeAfterList) && parsed.beforeAfterList.length > 0
          ? parsed.beforeAfterList
          : defaultSiteData.beforeAfterList
      };
    }
  } catch (err) {
    console.error('Error loading site data from localStorage:', err);
  }
  return defaultSiteData;
};

export const saveSiteData = (data: SiteData): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Error saving site data to localStorage:', err);
  }
};

/**
 * Sync with Cloudflare Pages Functions KV endpoint (/api/site-data)
 */
export const fetchRemoteSiteData = async (): Promise<SiteData | null> => {
  try {
    const res = await fetch('/api/site-data');
    if (res.ok) {
      const remote = await res.json();
      if (remote && typeof remote === 'object') {
        const merged: SiteData = {
          ...defaultSiteData,
          ...remote,
          brand: { ...defaultSiteData.brand, ...(remote.brand || {}) },
          sectionToggles: { ...defaultSiteData.sectionToggles, ...(remote.sectionToggles || {}) },
          beforeAfterList: Array.isArray(remote.beforeAfterList) && remote.beforeAfterList.length > 0
            ? remote.beforeAfterList
            : defaultSiteData.beforeAfterList
        };
        saveSiteData(merged);
        return merged;
      }
    }
  } catch {
    // Silently fall back to localStorage/defaults if API not present
  }
  return null;
};

export const saveRemoteSiteData = async (data: SiteData): Promise<boolean> => {
  // Always update local cache
  saveSiteData(data);
  try {
    const res = await fetch('/api/site-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.ok;
  } catch {
    return false;
  }
};
