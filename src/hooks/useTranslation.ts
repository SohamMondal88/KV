"use client";

import { useState, useEffect, useCallback } from "react";

export type Language = "en" | "hi" | "ne" | "bn" | "bo";

export interface LanguageInfo {
  code: Language;
  name: string;
  native: string;
}

export const languages: LanguageInfo[] = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "ne", name: "Nepali", native: "नेपाली" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "bo", name: "Tibetan", native: "བོད་སྐད་" },
];

const hiTranslations: Record<string, string> = {
  Destinations: "गंतव्य",
  Packages: "पैकेज",
  Homestays: "होमस्टे",
  Hotels: "होटल",
  "AI Planner": "AI योजनाकार",
  Blog: "ब्लॉग",
  About: "हमारे बारे में",
  Contact: "संपर्क",
  Home: "होम",
  "Book Now": "अभी बुक करें",
  "Travel For Premium Memories": "प्रीमियम यादों के लिए यात्रा",
  "Sign In": "साइन इन",
  "Sign Up": "साइन अप",
  Dashboard: "डैशबोर्ड",
  Wishlist: "इच्छा सूची",
  "My Bookings": "मेरी बुकिंग",
  Logout: "लॉग आउट",
};

export function useTranslation() {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("kv-language") as Language | null;
      if (saved && languages.some((l) => l.code === saved)) {
        setLanguageState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("kv-language", lang);
    } catch {
      // ignore
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      if (language === "en") return key;
      if (language === "hi") {
        return hiTranslations[key] || key;
      }
      // Other languages fall back to English for now
      return key;
    },
    [language]
  );

  return { language, setLanguage, t, mounted, isEnglish: language === "en" };
}
