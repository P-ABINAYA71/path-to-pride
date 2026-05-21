import type { Chance } from "@/lib/data/colleges";

export default function ChanceBadge({ chance }: { chance: Chance }) {
  const map = {
    High: "bg-emerald-100 text-emerald-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-rose-100 text-rose-700",
  } as const;
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${map[chance]}`}>
      Admission Chance: {chance}
    </span>
  );
}
