// Lightweight client-side store using localStorage (mock backend).
import type { Category } from "@/lib/data/scholarships";

export interface EligibilityProfile {
  name: string;
  gender: "Male" | "Female";
  state: string;
  district: string;
  board: "State Board" | "CBSE" | "ICSE";
  group: "Biology" | "Computer Science" | "Commerce" | "Arts";
  marks: number;        // 12th %
  cutoff: number;       // out of 200
  category: Category;
  religion: string;
  income: number;
  course: string;
  collegeType: "Government" | "Private" | "Any";
}

const PROFILE_KEY = "edupath_profile";
const USER_KEY = "edupath_user";
const APPS_KEY = "edupath_applications";

export interface AuthUser {
  email: string;
  name: string;
  role: "student" | "admin";
}

const safeLS = () => (typeof window !== "undefined" ? window.localStorage : null);

export const profileStore = {
  get(): EligibilityProfile | null {
    const ls = safeLS(); if (!ls) return null;
    const raw = ls.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  set(p: EligibilityProfile) {
    safeLS()?.setItem(PROFILE_KEY, JSON.stringify(p));
  },
  clear() { safeLS()?.removeItem(PROFILE_KEY); },
};

export const authStore = {
  get(): AuthUser | null {
    const ls = safeLS(); if (!ls) return null;
    const raw = ls.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  set(u: AuthUser) { safeLS()?.setItem(USER_KEY, JSON.stringify(u)); },
  clear() { safeLS()?.removeItem(USER_KEY); },
};

export const appsStore = {
  list(): string[] {
    const ls = safeLS(); if (!ls) return [];
    const raw = ls.getItem(APPS_KEY);
    return raw ? JSON.parse(raw) : [];
  },
  toggle(id: string) {
    const cur = appsStore.list();
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    safeLS()?.setItem(APPS_KEY, JSON.stringify(next));
    return next;
  },
};
