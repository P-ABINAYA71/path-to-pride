export type Category = "OC" | "BC" | "MBC" | "SC" | "ST";

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: string;
  minMarks: number;       // out of 100 (12th %)
  maxIncome: number;      // INR per year
  categories: Category[]; // empty = all
  gender?: "Male" | "Female" | "Any";
  religion?: string;      // empty/undefined = any
  collegeType?: "Government" | "Private" | "Aided" | "Any";
  documents: string[];
  lastDate: string;
  applyUrl: string;
  description: string;
}

export const scholarships: Scholarship[] = [
  {
    id: "tn-cm-merit",
    name: "TN Chief Minister's Merit Scholarship",
    provider: "Govt. of Tamil Nadu",
    amount: "₹50,000 / year",
    minMarks: 90,
    maxIncome: 600000,
    categories: ["OC", "BC", "MBC", "SC", "ST"],
    documents: ["Marksheet", "Income Certificate", "Community Certificate", "Aadhaar"],
    lastDate: "2026-08-31",
    applyUrl: "https://tn.gov.in/scholarships",
    description: "For top 1000 students from government & aided schools in Tamil Nadu.",
  },
  {
    id: "first-graduate",
    name: "First Graduate Scheme (TN)",
    provider: "Govt. of Tamil Nadu",
    amount: "Full tuition waiver",
    minMarks: 60,
    maxIncome: 250000,
    categories: ["OC", "BC", "MBC", "SC", "ST"],
    collegeType: "Government",
    documents: ["First Graduate Certificate", "Income Certificate", "Marksheet"],
    lastDate: "2026-09-15",
    applyUrl: "https://tn.gov.in/firstgraduate",
    description: "Tuition fee waiver for first graduates in the family.",
  },
  {
    id: "post-matric-sc",
    name: "Post-Matric Scholarship (SC/ST)",
    provider: "Govt. of India",
    amount: "₹25,000 / year",
    minMarks: 50,
    maxIncome: 250000,
    categories: ["SC", "ST"],
    documents: ["Caste Certificate", "Income Certificate", "Bonafide Certificate"],
    lastDate: "2026-10-31",
    applyUrl: "https://scholarships.gov.in",
    description: "Central scholarship for SC/ST students pursuing higher education.",
  },
  {
    id: "nmms",
    name: "NMMS National Merit",
    provider: "MHRD, Govt. of India",
    amount: "₹12,000 / year",
    minMarks: 75,
    maxIncome: 350000,
    categories: ["OC", "BC", "MBC", "SC", "ST"],
    documents: ["Marksheet", "Income Certificate", "Aadhaar"],
    lastDate: "2026-07-30",
    applyUrl: "https://scholarships.gov.in",
    description: "Centrally sponsored merit-cum-means scholarship.",
  },
  {
    id: "minority",
    name: "Minority Community Scholarship",
    provider: "Ministry of Minority Affairs",
    amount: "₹20,000 / year",
    minMarks: 55,
    maxIncome: 200000,
    categories: ["OC", "BC", "MBC", "SC", "ST"],
    religion: "Minority",
    documents: ["Community Certificate", "Income Certificate", "Marksheet"],
    lastDate: "2026-09-30",
    applyUrl: "https://scholarships.gov.in",
    description: "For students from Muslim, Christian, Sikh, Buddhist, Parsi, Jain communities.",
  },
  {
    id: "girls",
    name: "Pragati Scholarship for Girls",
    provider: "AICTE",
    amount: "₹50,000 / year",
    minMarks: 60,
    maxIncome: 800000,
    categories: ["OC", "BC", "MBC", "SC", "ST"],
    gender: "Female",
    documents: ["Marksheet", "Income Certificate", "AICTE Approved College Proof"],
    lastDate: "2026-10-15",
    applyUrl: "https://scholarships.gov.in",
    description: "For girl students pursuing technical education at AICTE colleges.",
  },
  {
    id: "agaram",
    name: "Agaram Foundation Scholarship",
    provider: "Agaram Foundation",
    amount: "100% tuition + stipend",
    minMarks: 80,
    maxIncome: 150000,
    categories: ["OC", "BC", "MBC", "SC", "ST"],
    documents: ["Income Certificate", "Marksheet", "Bonafide Certificate"],
    lastDate: "2026-08-15",
    applyUrl: "https://agaram.org.in",
    description: "Full financial support for underprivileged students in TN.",
  },
];

export interface StudentProfile {
  marks: number;        // 12th %
  income: number;
  category: Category;
  gender: "Male" | "Female";
  religion: string;
  collegeType: "Government" | "Private" | "Aided" | "Any";
}

export function matchScholarships(p: StudentProfile): Scholarship[] {
  return scholarships.filter((s) => {
    if (p.marks < s.minMarks) return false;
    if (p.income > s.maxIncome) return false;
    if (s.categories.length && !s.categories.includes(p.category)) return false;
    if (s.gender && s.gender !== "Any" && s.gender !== p.gender) return false;
    if (s.collegeType && s.collegeType !== "Any" && p.collegeType !== "Any" && s.collegeType !== p.collegeType) return false;
    return true;
  });
}
