export interface DestinationTheme {
  slug: string;
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    cardBg: string;
    text: string;
  };
  atmosphere: string;
  iconSet: string[];
  typography: {
    headingFont: string;
    bodyFont: string;
  };
  effects: {
    particleType: "snow" | "fog" | "blossom" | "fireflies" | "dust" | "none";
    parallaxSpeed: number;
    overlayGradient: string;
  };
  mood: string;
}

export const destinationThemes: Record<string, DestinationTheme> = {
  kalimpong: {
    slug: "kalimpong",
    colorPalette: {
      primary: "#B8860B",
      secondary: "#2D5016",
      accent: "#FFD700",
      background: "#1a1408",
      cardBg: "rgba(184,134,11,0.08)",
      text: "#FFF8E7",
    },
    atmosphere: "morning-golden",
    iconSet: ["Sun", "Mountain", "Church", "Trees"],
    typography: { headingFont: "Clash Display", bodyFont: "Satoshi" },
    effects: {
      particleType: "dust",
      parallaxSpeed: 0.3,
      overlayGradient: "linear-gradient(135deg, rgba(184,134,11,0.3) 0%, rgba(45,80,22,0.5) 100%)",
    },
    mood: "Warm morning light filtering through pine forests, echoing church bells and Himalayan freshness.",
  },
  pabong: {
    slug: "pabong",
    colorPalette: {
      primary: "#E8F4F8",
      secondary: "#1E3A5F",
      accent: "#87CEEB",
      background: "#0a1a2a",
      cardBg: "rgba(232,244,248,0.06)",
      text: "#F0F8FF",
    },
    atmosphere: "snow-village",
    iconSet: ["Snowflake", "Home", "TreePine", "ThermometerSnowflake"],
    typography: { headingFont: "Clash Display", bodyFont: "General Sans" },
    effects: {
      particleType: "snow",
      parallaxSpeed: 0.4,
      overlayGradient: "linear-gradient(180deg, rgba(135,206,235,0.2) 0%, rgba(10,26,42,0.7) 100%)",
    },
    mood: "Silent snow-blanketed village under crystal skies, warmth glowing from wooden cottages.",
  },
  lebong: {
    slug: "lebong",
    colorPalette: {
      primary: "#8B6914",
      secondary: "#4A7C59",
      accent: "#DAA520",
      background: "#1a1200",
      cardBg: "rgba(139,105,20,0.08)",
      text: "#FFF8DC",
    },
    atmosphere: "tea-garden",
    iconSet: ["Leaf", "Sunrise", "Footprints", "Coffee"],
    typography: { headingFont: "Clash Display", bodyFont: "Satoshi" },
    effects: {
      particleType: "dust",
      parallaxSpeed: 0.25,
      overlayGradient: "linear-gradient(135deg, rgba(139,105,20,0.25) 0%, rgba(74,124,89,0.45) 100%)",
    },
    mood: "Rolling emerald tea gardens catching golden light, the aroma of fresh leaves on mountain breeze.",
  },
  ramdhura: {
    slug: "ramdhura",
    colorPalette: {
      primary: "#708090",
      secondary: "#8FBC8F",
      accent: "#C0C0C0",
      background: "#0f1419",
      cardBg: "rgba(112,128,144,0.08)",
      text: "#F5F5F5",
    },
    atmosphere: "fog-ridge",
    iconSet: ["CloudFog", "Mountain", "Eye", "Wind"],
    typography: { headingFont: "Clash Display", bodyFont: "General Sans" },
    effects: {
      particleType: "fog",
      parallaxSpeed: 0.35,
      overlayGradient: "linear-gradient(180deg, rgba(112,128,144,0.4) 0%, rgba(15,20,25,0.7) 100%)",
    },
    mood: "Misty ridge where clouds kiss the earth, a mystical stillness broken only by distant bird calls.",
  },
  mirik: {
    slug: "mirik",
    colorPalette: {
      primary: "#006994",
      secondary: "#008B8B",
      accent: "#40E0D0",
      background: "#001a25",
      cardBg: "rgba(0,105,148,0.08)",
      text: "#E0FFFF",
    },
    atmosphere: "lake-reflection",
    iconSet: ["Waves", "Boat", "Sunset", "Fish"],
    typography: { headingFont: "Clash Display", bodyFont: "Satoshi" },
    effects: {
      particleType: "none",
      parallaxSpeed: 0.2,
      overlayGradient: "linear-gradient(180deg, rgba(0,139,139,0.3) 0%, rgba(0,26,37,0.7) 100%)",
    },
    mood: "Mirror-still lake reflecting snow-capped peaks, the hush of water lapping against wooden boats.",
  },
  lamahatta: {
    slug: "lamahatta",
    colorPalette: {
      primary: "#228B22",
      secondary: "#8B4513",
      accent: "#90EE90",
      background: "#0a1a0a",
      cardBg: "rgba(34,139,34,0.08)",
      text: "#F0FFF0",
    },
    atmosphere: "eco-forest",
    iconSet: ["TreePine", "Bird", "Footprints", "Leaf"],
    typography: { headingFont: "Clash Display", bodyFont: "Satoshi" },
    effects: {
      particleType: "blossom",
      parallaxSpeed: 0.3,
      overlayGradient: "linear-gradient(135deg, rgba(34,139,34,0.3) 0%, rgba(139,69,19,0.4) 100%)",
    },
    mood: "Ancient forest cathedral where moss carpets the ground and sunlight filters through a canopy of green.",
  },
  lepchajagat: {
    slug: "lepchajagat",
    colorPalette: {
      primary: "#800020",
      secondary: "#D4AF37",
      accent: "#FFBF00",
      background: "#1a0a0a",
      cardBg: "rgba(128,0,32,0.08)",
      text: "#FFF8DC",
    },
    atmosphere: "heritage-dawn",
    iconSet: ["Sunrise", "Landmark", "BookOpen", "Flame"],
    typography: { headingFont: "Clash Display", bodyFont: "General Sans" },
    effects: {
      particleType: "dust",
      parallaxSpeed: 0.35,
      overlayGradient: "linear-gradient(135deg, rgba(212,175,55,0.25) 0%, rgba(128,0,32,0.4) 100%)",
    },
    mood: "Dawn breaking over heritage cottages, amber light painting stories of Lepcha culture on wooden walls.",
  },
  chatakpur: {
    slug: "chatakpur",
    colorPalette: {
      primary: "#A9A9A9",
      secondary: "#87CEFA",
      accent: "#E0E0E0",
      background: "#101418",
      cardBg: "rgba(169,169,169,0.08)",
      text: "#F8F8FF",
    },
    atmosphere: "cloud-village",
    iconSet: ["Cloud", "Home", "Mountain", "Sun"],
    typography: { headingFont: "Clash Display", bodyFont: "Satoshi" },
    effects: {
      particleType: "fog",
      parallaxSpeed: 0.4,
      overlayGradient: "linear-gradient(180deg, rgba(135,206,250,0.2) 0%, rgba(16,20,24,0.7) 100%)",
    },
    mood: "Village floating above the clouds, where every morning begins with a sea of mist below your feet.",
  },
  samsing: {
    slug: "samsing",
    colorPalette: {
      primary: "#40E0D0",
      secondary: "#228B22",
      accent: "#F4A460",
      background: "#0a1a15",
      cardBg: "rgba(64,224,208,0.08)",
      text: "#F0FFFF",
    },
    atmosphere: "river-valley",
    iconSet: ["Waves", "Mountain", "Tent", "Compass"],
    typography: { headingFont: "Clash Display", bodyFont: "General Sans" },
    effects: {
      particleType: "none",
      parallaxSpeed: 0.3,
      overlayGradient: "linear-gradient(135deg, rgba(64,224,208,0.25) 0%, rgba(34,139,34,0.4) 100%)",
    },
    mood: "Turquoise river winding through dense forest, the valley echoing with the music of rushing water.",
  },
  sittong: {
    slug: "sittong",
    colorPalette: {
      primary: "#FF8C00",
      secondary: "#228B22",
      accent: "#FFDAB9",
      background: "#1a1200",
      cardBg: "rgba(255,140,0,0.08)",
      text: "#FFF5E1",
    },
    atmosphere: "orange-grove",
    iconSet: ["Citrus", "Sun", "TreePine", "Basket"],
    typography: { headingFont: "Clash Display", bodyFont: "Satoshi" },
    effects: {
      particleType: "blossom",
      parallaxSpeed: 0.25,
      overlayGradient: "linear-gradient(135deg, rgba(255,140,0,0.25) 0%, rgba(34,139,34,0.4) 100%)",
    },
    mood: "Sun-drenched orange orchards heavy with fruit, the sweet citrus air mingling with mountain pine.",
  },
  bijanbari: {
    slug: "bijanbari",
    colorPalette: {
      primary: "#4682B4",
      secondary: "#708090",
      accent: "#8FBC8F",
      background: "#0a121a",
      cardBg: "rgba(70,130,180,0.08)",
      text: "#F0F8FF",
    },
    atmosphere: "riverside",
    iconSet: ["Waves", "Mountain", "Fish", "Tent"],
    typography: { headingFont: "Clash Display", bodyFont: "Satoshi" },
    effects: {
      particleType: "none",
      parallaxSpeed: 0.2,
      overlayGradient: "linear-gradient(180deg, rgba(70,130,180,0.3) 0%, rgba(10,18,26,0.7) 100%)",
    },
    mood: "Riverside tranquility where clear mountain water flows over smooth stones, surrounded by mossy cliffs.",
  },
  ahaldhara: {
    slug: "ahaldhara",
    colorPalette: {
      primary: "#FF7F50",
      secondary: "#FFD700",
      accent: "#B0E0E6",
      background: "#1a0f0a",
      cardBg: "rgba(255,127,80,0.08)",
      text: "#FFF8F0",
    },
    atmosphere: "viewpoint-sunrise",
    iconSet: ["Sunrise", "Mountain", "Camera", "Eye"],
    typography: { headingFont: "Clash Display", bodyFont: "General Sans" },
    effects: {
      particleType: "dust",
      parallaxSpeed: 0.3,
      overlayGradient: "linear-gradient(135deg, rgba(255,127,80,0.25) 0%, rgba(255,215,0,0.3) 100%)",
    },
    mood: "First golden rays breaking over the horizon, painting the sky in coral and amber over endless ridges.",
  },
  kolbong: {
    slug: "kolbong",
    colorPalette: {
      primary: "#013220",
      secondary: "#8B4513",
      accent: "#A9A9A9",
      background: "#080f0a",
      cardBg: "rgba(1,50,32,0.08)",
      text: "#F5F5F0",
    },
    atmosphere: "pine-forest",
    iconSet: ["TreePine", "Footprints", "Mountain", "Compass"],
    typography: { headingFont: "Clash Display", bodyFont: "Satoshi" },
    effects: {
      particleType: "fog",
      parallaxSpeed: 0.35,
      overlayGradient: "linear-gradient(180deg, rgba(1,50,32,0.4) 0%, rgba(8,15,10,0.8) 100%)",
    },
    mood: "Dense pine cathedral where needles carpet the path and fog drifts between towering trunks.",
  },
  kolakham: {
    slug: "kolakham",
    colorPalette: {
      primary: "#FFFFFF",
      secondary: "#191970",
      accent: "#FFD700",
      background: "#0a0a1a",
      cardBg: "rgba(255,255,255,0.06)",
      text: "#F8F8FF",
    },
    atmosphere: "kanchenjunga-close",
    iconSet: ["Mountain", "Snowflake", "Star", "Camera"],
    typography: { headingFont: "Clash Display", bodyFont: "General Sans" },
    effects: {
      particleType: "snow",
      parallaxSpeed: 0.45,
      overlayGradient: "linear-gradient(135deg, rgba(25,25,112,0.3) 0%, rgba(255,255,255,0.1) 100%)",
    },
    mood: "The mighty Kanchenjunga fills the sky, snow glittering like diamonds against impossible blue.",
  },
  peshok: {
    slug: "peshok",
    colorPalette: {
      primary: "#50C878",
      secondary: "#FFFDD0",
      accent: "#E2725B",
      background: "#0a1a0f",
      cardBg: "rgba(80,200,120,0.08)",
      text: "#FFFFF0",
    },
    atmosphere: "tea-estate",
    iconSet: ["Leaf", "Sunrise", "Mountain", "Coffee"],
    typography: { headingFont: "Clash Display", bodyFont: "Satoshi" },
    effects: {
      particleType: "dust",
      parallaxSpeed: 0.3,
      overlayGradient: "linear-gradient(135deg, rgba(80,200,120,0.25) 0%, rgba(226,114,91,0.2) 100%)",
    },
    mood: "Emerald tea bushes stretching to the horizon, terracotta soil paths weaving through plantations.",
  },
  rishikhola: {
    slug: "rishikhola",
    colorPalette: {
      primary: "#6B8E23",
      secondary: "#4682B4",
      accent: "#DEB887",
      background: "#0a150a",
      cardBg: "rgba(107,142,35,0.08)",
      text: "#F5F5DC",
    },
    atmosphere: "riverside-camp",
    iconSet: ["Tent", "Waves", "Fire", "Mountain"],
    typography: { headingFont: "Clash Display", bodyFont: "General Sans" },
    effects: {
      particleType: "fireflies",
      parallaxSpeed: 0.25,
      overlayGradient: "linear-gradient(180deg, rgba(107,142,35,0.3) 0%, rgba(70,130,180,0.25) 100%)",
    },
    mood: "Riverside camp under a canopy of stars, fireflies dancing above the water as the fire crackles.",
  },
  pelling: {
    slug: "pelling",
    colorPalette: {
      primary: "#663399",
      secondary: "#DAA520",
      accent: "#E6E6FA",
      background: "#0f0a1a",
      cardBg: "rgba(102,51,153,0.08)",
      text: "#F8F8FF",
    },
    atmosphere: "sacred-peaks",
    iconSet: ["Mountain", "Church", "Star", "Pray"],
    typography: { headingFont: "Clash Display", bodyFont: "Satoshi" },
    effects: {
      particleType: "snow",
      parallaxSpeed: 0.4,
      overlayGradient: "linear-gradient(135deg, rgba(102,51,153,0.25) 0%, rgba(218,165,32,0.2) 100%)",
    },
    mood: "Sacred peaks where prayer flags flutter in thin air, ancient monasteries watching over snow-crowned summits.",
  },
};

export function getThemeBySlug(slug: string): DestinationTheme {
  return destinationThemes[slug] ?? destinationThemes["kalimpong"];
}
