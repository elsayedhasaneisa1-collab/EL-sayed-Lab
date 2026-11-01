import { useMemo, useState } from "react";
import { CAT_META, ELEMENTS, type Category, type ChemElement } from "../data/periodic";

export default function PeriodicTable() {
  const [sel, setSel] = useState<ChemElement>(ELEMENTS[25]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "all">("all");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return ELEMENTS.filter((e) => {
      const okCat = cat === "all" || e.cat === cat;
      const okQ = !s || e.s.toLowerCase().includes(s) || e.ar.includes(q) || e.en.toLowerCase().includes(s) || String(e.z) === s;
      return okCat && okQ;
    });
  }, [q, cat]);

  const shown = new Set(filtered.map((e) => e.z));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.3em] text-cyan-400">PERIODIC TABLE</p>
          <h2 className="text-3xl font-black text-white">الجدول الدوري التفاعلي</h2>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ابحث بالرمز أو الاسم أو العدد الذري..."
          className="w-full max-w-md rounded-2xl border border-cyan-400/20 bg-slate-950/70 px-4 py-2.5 text-sm outline-none focus:border-cyan-400"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCat("all")}
          className={`rounded-full px-3 py-1 text-xs ${cat === "all" ? "bg-white text-slate-900" : "bg-white/10"}`}
        >
          الكل
        </button>
        {(Object.keys(CAT_META) as Category[]).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-3 py-1 text-xs ${cat === c ? "bg-white text-slate-900" : "bg-white/10"}`}
          >
            {CAT_META[c].ar}
          </button>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_280px]">
        <div className="overflow-x-auto pb-2">
          <div
            className="grid min-w-[920px] gap-[3px]"
            style={{ gridTemplateColumns: "repeat(18, minmax(0, 1fr))" }}
          >
            {Array.from({ length: 7 * 18 }).map((_, i) => {
              const row = Math.floor(i / 18) + 1;
              const col = (i % 18) + 1;
              const el = ELEMENTS.find((e) => e.row === row && e.col === col);
              if (!el) {
                if (row === 6 && col === 3)
                  return (
                    <div key={i} className="flex h-12 items-center justify-center rounded bg-fuchsia-900/40 text-[10px] text-fuchsia-200">
                      57-71
                    </div>
                  );
                if (row === 7 && col === 3)
                  return (
                    <div key={i} className="flex h-12 items-center justify-center rounded bg-pink-900/40 text-[10px] text-pink-200">
                      89-103
                    </div>
                  );
                return <div key={i} />;
              }
              return <Cell key={el.z} el={el} active={sel.z === el.z} dim={!shown.has(el.z)} onClick={() => setSel(el)} />;
            })}
          </div>
          <div className="mt-4 grid min-w-[920px] gap-[3px]" style={{ gridTemplateColumns: "repeat(18, minmax(0, 1fr))" }}>
            <div />
            <div />
            {ELEMENTS.filter((e) => e.row === 8).map((el) => (
              <Cell key={el.z} el={el} active={sel.z === el.z} dim={!shown.has(el.z)} onClick={() => setSel(el)} />
            ))}
          </div>
          <div className="mt-1 grid min-w-[920px] gap-[3px]" style={{ gridTemplateColumns: "repeat(18, minmax(0, 1fr))" }}>
            <div />
            <div />
            {ELEMENTS.filter((e) => e.row === 9).map((el) => (
              <Cell key={el.z} el={el} active={sel.z === el.z} dim={!shown.has(el.z)} onClick={() => setSel(el)} />
            ))}
          </div>
        </div>

        <aside className="glass glow-cyan rounded-3xl p-5">
          <div className={`inline-flex rounded-xl px-2 py-0.5 text-xs ${CAT_META[sel.cat].bg}`}>{CAT_META[sel.cat].ar}</div>
          <div className="mt-3 flex items-end justify-between">
            <span className="text-5xl font-black text-white">{sel.s}</span>
            <span className="formula-chip text-cyan-300">{sel.z}</span>
          </div>
          <h3 className="mt-1 text-2xl font-bold">{sel.ar}</h3>
          <p className="text-sm text-slate-400">{sel.en}</p>
          <dl className="mt-4 space-y-2 text-sm">
            <Row k="الكتلة الذرية" v={String(sel.mass)} />
            <Row k="التوزيع الإلكتروني" v={sel.config} />
            <Row k="الكهروسالبية" v={sel.eneg ? String(sel.eneg) : "—"} />
            <Row k="الاستخدامات" v={sel.uses} />
          </dl>
        </aside>
      </div>
    </div>
  );
}

function Cell({
  el,
  active,
  dim,
  onClick,
}: {
  el: ChemElement;
  active: boolean;
  dim: boolean;
  onClick: () => void;
}) {
  const m = CAT_META[el.cat];
  return (
    <button
      onClick={onClick}
      className={`element-cell h-12 rounded-md border p-0.5 text-center ${m.bg} ${m.border} ${m.text} ${active ? "ring-2 ring-white" : ""} ${dim ? "opacity-20" : ""}`}
      title={`${el.ar} (${el.s})`}
    >
      <div className="text-[8px] leading-none opacity-80">{el.z}</div>
      <div className="text-[11px] font-black leading-tight">{el.s}</div>
    </button>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-white/5 pb-2">
      <dt className="text-slate-400">{k}</dt>
      <dd className="formula-chip text-left text-cyan-100">{v}</dd>
    </div>
  );
}
