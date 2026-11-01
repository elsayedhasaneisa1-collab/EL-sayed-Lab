import { useEffect, useState } from "react";
import type { PageId } from "./data/content";
import { CHEM_EXPS } from "./data/content";
import PeriodicTable from "./components/PeriodicTable";
import { AboutPage, CalcPage, HomePage, LabPage, LessonsPage, QuizPage } from "./components/Pages";
import { renderSim } from "./components/Sims";

function LogoMark() {
  return (
    <svg viewBox="0 0 64 64" className="h-11 w-11">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="#0b1220" />
      <rect x="1" y="1" width="62" height="62" rx="15" fill="none" stroke="url(#lg)" strokeWidth="2" />
      <ellipse cx="32" cy="32" rx="18" ry="7" fill="none" stroke="#22d3ee" strokeWidth="1.6" />
      <ellipse cx="32" cy="32" rx="18" ry="7" fill="none" stroke="#f59e0b" strokeWidth="1.6" transform="rotate(60 32 32)" />
      <ellipse cx="32" cy="32" rx="18" ry="7" fill="none" stroke="#67e8f9" strokeWidth="1.6" transform="rotate(-60 32 32)" />
      <circle cx="32" cy="32" r="5" fill="#fbbf24" />
    </svg>
  );
}

const NAV: { id: PageId; label: string; icon: string }[] = [
  { id: "home", label: "الرئيسية", icon: "⌂" },
  { id: "chem", label: "معمل الكيمياء", icon: "⚗" },
  { id: "phys", label: "معمل الفيزياء", icon: "⌁" },
  { id: "table", label: "الجدول الدوري", icon: "▣" },
  { id: "lessons", label: "ملخصات المنهج", icon: "☰" },
  { id: "calc", label: "الحاسبات", icon: "∑" },
  { id: "quiz", label: "اختبار الثانوية", icon: "?" },
  { id: "about", label: "عن المختبر", icon: "◆" },
];

export default function App() {
  const [page, setPage] = useState<PageId>("home");
  const [sim, setSim] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () => {
      setClock(new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const go = (id: PageId) => {
    setPage(id);
    setSim(null);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openSim = (id: string) => {
    const chem = CHEM_EXPS.some((e) => e.id === id);
    setPage(chem ? "chem" : "phys");
    setSim(id);
    setOpen(false);
  };

  return (
    <div className="lab-grid min-h-screen bg-[#05070d] text-slate-100" dir="rtl">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.08),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(245,158,11,0.08),transparent_30%)]" />

      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#05070d]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-3">
          <button onClick={() => go("home")} className="flex items-center gap-3">
            <LogoMark />
            <div className="text-right">
              <div className="text-lg font-black leading-none">Sayed Lab</div>
              <div className="text-[11px] text-cyan-300/80">مختبر الكيمياء والفيزياء</div>
            </div>
          </button>
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.slice(0, 7).map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={`rounded-xl px-3 py-2 text-sm ${page === n.id ? "bg-cyan-400 text-slate-950" : "text-slate-300 hover:bg-white/5"}`}
              >
                {n.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <span className="formula-chip hidden rounded-lg border border-white/10 px-2 py-1 text-xs text-cyan-300 sm:inline">{clock}</span>
            <button onClick={() => setOpen((v) => !v)} className="rounded-xl border border-white/10 px-3 py-2 lg:hidden">
              القائمة
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 lg:hidden" onClick={() => setOpen(false)}>
          <aside className="glass absolute inset-y-0 right-0 w-72 p-4" onClick={(e) => e.stopPropagation()}>
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-right ${page === n.id ? "bg-cyan-400 text-slate-950" : "hover:bg-white/5"}`}
              >
                <span>{n.icon}</span>
                {n.label}
              </button>
            ))}
          </aside>
        </div>
      )}

      <main className="relative mx-auto max-w-[1440px] px-4 py-8">
        {sim && page !== "chem" && page !== "phys" ? (
          renderSim(sim, () => setSim(null))
        ) : (
          <>
            {page === "home" && <HomePage go={(id) => go(id)} openSim={openSim} />}
            {page === "chem" && <LabPage subject="chem" sim={sim} setSim={setSim} />}
            {page === "phys" && <LabPage subject="phys" sim={sim} setSim={setSim} />}
            {page === "table" && <PeriodicTable />}
            {page === "lessons" && <LessonsPage />}
            {page === "calc" && <CalcPage />}
            {page === "quiz" && <QuizPage />}
            {page === "about" && <AboutPage />}
          </>
        )}
      </main>

      <footer className="relative border-t border-white/5 py-8 text-center text-sm text-slate-500">
        <p className="font-bold text-slate-300">EL-Sayed Lab · مختبر السيد</p>
        <p className="mt-1"> موقع تعليمي من انشاء الطالب السيد حسن عيسى </p>
      </footer>
    </div>
  );
}
