import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Lang = "en" | "ta";

const dict = {
  en: {
    nav_home: "Home",
    nav_colleges: "Find Colleges",
    nav_scholarships: "Scholarships",
    nav_dashboard: "Dashboard",
    nav_admin: "Admin",
    cta_login: "Login",
    cta_register: "Register",
    hero_badge: "Admission Season 2026 Open",
    hero_title_a: "Bridge Your Path to ",
    hero_title_b: "Top Tier",
    hero_title_c: " Education.",
    hero_sub: "AI-powered college eligibility and scholarship mapping for 12th standard students. Get data-driven recommendations based on your cutoff, category, and preferred courses.",
    cta_check: "Check Eligibility Now",
    cta_view_scholarships: "View Scholarships",
    trusted_by: "TRUSTED BY",
    students_count: "10,000+ Students",
    form_title: "Smart Eligibility Profiler",
    form_sub: "Fill in your academic profile to generate AI recommendations.",
    submit: "Generate Recommendations",
    download_pdf: "Download Report (PDF)",
    top_matches: "Top College Matches",
    top_matches_sub: "Based on your profile, these are your best admission chances.",
    chance_high: "Admission Chance: High",
    chance_medium: "Admission Chance: Medium",
    chance_low: "Admission Chance: Low",
    eligible_scholarships: "Eligible Scholarships",
    how_title: "How EduPath AI Works",
    step_1: "Enter your 12th marks, category and preferences.",
    step_2: "Our AI analyses cutoff trends across 500+ colleges.",
    step_3: "Get matched colleges with chance and eligible scholarships.",
    testimonials: "What Students Say",
    footer_rights: "© 2026 Tamil Nadu Higher Education Guidance Portal.",
  },
  ta: {
    nav_home: "முகப்பு",
    nav_colleges: "கல்லூரிகள்",
    nav_scholarships: "உதவித்தொகை",
    nav_dashboard: "டாஷ்போர்டு",
    nav_admin: "நிர்வாகி",
    cta_login: "உள்நுழைய",
    cta_register: "பதிவு",
    hero_badge: "2026 சேர்க்கைகாலம் தொடங்கியது",
    hero_title_a: "உங்கள் பாதை ",
    hero_title_b: "உயர்தர",
    hero_title_c: " கல்விக்கு.",
    hero_sub: "12-ம் வகுப்பு மாணவர்களுக்கான AI அடிப்படையிலான கல்லூரி தகுதி மற்றும் உதவித்தொகை பரிந்துரை.",
    cta_check: "தகுதியை சரிபார்க்கவும்",
    cta_view_scholarships: "உதவித்தொகை பார்க்கவும்",
    trusted_by: "நம்பகத்துடன்",
    students_count: "10,000+ மாணவர்கள்",
    form_title: "தகுதி சுயவிவரம்",
    form_sub: "உங்கள் கல்வி விவரங்களை நிரப்பவும்.",
    submit: "பரிந்துரைகளை உருவாக்கு",
    download_pdf: "PDF பதிவிறக்கம்",
    top_matches: "சிறந்த கல்லூரி பரிந்துரைகள்",
    top_matches_sub: "உங்கள் சுயவிவரத்தின் அடிப்படையில்.",
    chance_high: "சேர்க்கை வாய்ப்பு: அதிகம்",
    chance_medium: "சேர்க்கை வாய்ப்பு: நடுத்தரம்",
    chance_low: "சேர்க்கை வாய்ப்பு: குறைவு",
    eligible_scholarships: "தகுதியான உதவித்தொகைகள்",
    how_title: "EduPath AI எப்படி வேலை செய்கிறது",
    step_1: "உங்கள் 12-ம் மதிப்பெண் & விவரங்களை உள்ளிடவும்.",
    step_2: "AI 500+ கல்லூரிகளின் கட்-ஆஃப் டிரெண்டை ஆராய்கிறது.",
    step_3: "பரிந்துரை + உதவித்தொகை பட்டியல் பெறவும்.",
    testimonials: "மாணவர்கள் கூறுவது",
    footer_rights: "© 2026 தமிழ்நாடு உயர்கல்வி வழிகாட்டி.",
  },
} as const;

type Key = keyof typeof dict["en"];

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string }>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("edupath_lang") as Lang | null;
    if (stored === "en" || stored === "ta") setLangState(stored);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("edupath_lang", l);
  };
  const t = (k: Key) => dict[lang][k] ?? dict.en[k];
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
