import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Chatbot from "./Chatbot";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Chatbot />
    </div>
  );
}
