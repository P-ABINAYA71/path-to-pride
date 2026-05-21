import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";

interface Msg { role: "bot" | "user"; text: string }

const faqs: { q: RegExp; a: string }[] = [
  { q: /scholarship|உதவித்தொகை/i, a: "Check the Scholarships page — we match you with TN Chief Minister's, NMMS, First Graduate scheme and more based on your marks, income and category." },
  { q: /document|certificate/i, a: "Common documents: 10th & 12th marksheets, Community certificate, Income certificate, Aadhaar, Bank passbook, Bonafide certificate." },
  { q: /cutoff/i, a: "Tamil Nadu engineering cutoff = Maths + Physics/2 + Chemistry/2 (out of 200). Enter it in the eligibility form." },
  { q: /college|admission/i, a: "Submit the eligibility form to see top colleges with High / Medium / Low admission chances." },
  { q: /hostel/i, a: "Most government and aided colleges in TN offer separate hostels for boys and girls." },
  { q: /fee/i, a: "Government college fees range ₹15,000–₹55,000/yr. Private colleges may charge ₹1.5L–₹2.5L/yr." },
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Hi! I'm EduBot. Ask me about colleges, scholarships, cutoffs, documents or hostels." },
  ]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const reply = faqs.find((f) => f.q.test(text))?.a ?? "Try asking about scholarships, cutoff, fees, hostel or required documents.";
    setMsgs((m) => [...m, { role: "user", text }, { role: "bot", text: reply }]);
    setInput("");
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      {open && (
        <div className="mb-3 w-[min(92vw,360px)] rounded-2xl border border-border bg-card p-5 shadow-elegant">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-full bg-brand/10 text-brand font-bold">AI</div>
              <div>
                <p className="text-sm font-bold">EduBot Assistant</p>
                <p className="text-[10px] text-emerald-600">Online now</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="p-1 text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </button>
          </div>
          <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                  m.role === "user" ? "bg-brand text-brand-foreground" : "bg-secondary text-foreground"
                }`}>{m.text}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask a question…"
              className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-xs outline-none focus:border-brand"
            />
            <button onClick={send} className="grid size-9 place-items-center rounded-full bg-brand text-brand-foreground">
              <Send className="size-4" />
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="grid size-14 place-items-center rounded-full bg-brand text-brand-foreground shadow-elegant hover:bg-brand-2 transition-colors"
        aria-label="Open chat"
      >
        <MessageSquare className="size-6" />
      </button>
    </div>
  );
}
