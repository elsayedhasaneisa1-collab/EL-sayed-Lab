import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { FLAMES, REACTIONS, WORK_FUNCTIONS } from "../data/content";

const H = 6.626e-34;
const E_CHARGE = 1.602e-19;
const C_LIGHT = 3e8;

export function SimFrame({
  title,
  formula,
  children,
  onBack,
}: {
  title: string;
  formula?: string;
  children: ReactNode;
  onBack: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 hover:bg-cyan-400/20"
        >
          ← رجوع للتجارب
        </button>
        {formula && (
          <span className="formula-chip rounded-lg border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-amber-200">
            {formula}
          </span>
        )}
      </div>
      <h2 className="text-2xl font-extrabold text-white">{title}</h2>
      {children}
    </div>
  );
}

function Panel({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`glass rounded-2xl p-4 ${className}`} style={style}>
      {children}
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  unit,
  amber,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  unit?: string;
  amber?: boolean;
}) {
  return (
    <label className="block space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="formula-chip text-cyan-300">
          {typeof value === "number" && value > 100 ? value.toFixed(0) : Number(value).toPrecision(3)} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`range-lab w-full ${amber ? "range-amber" : ""}`}
      />
    </label>
  );
}

export function TitrationSim({ onBack }: { onBack: () => void }) {
  const [vol, setVol] = useState(0);
  const [running, setRunning] = useState(false);
  const acidM = 0.1;
  const acidV = 25;
  const baseM = 0.1;
  const mmolH = acidM * acidV;
  const mmolOH = baseM * vol;
  const total = acidV + vol;
  let pH = 7;
  if (mmolOH < mmolH - 1e-9) {
    const h = (mmolH - mmolOH) / total;
    pH = Math.min(7, -Math.log10(Math.max(h, 1e-12)));
  } else if (mmolOH > mmolH + 1e-9) {
    const oh = (mmolOH - mmolH) / total;
    pH = Math.max(7, 14 + Math.log10(Math.max(oh, 1e-12)));
  }
  const pink = pH >= 8.2;
  const eq = Math.abs(mmolOH - mmolH) < 0.02;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setVol((v) => {
        if (v >= 40) {
          setRunning(false);
          return 40;
        }
        return +(v + 0.2).toFixed(2);
      });
    }, 40);
    return () => clearInterval(id);
  }, [running]);

  const curve = useMemo(() => {
    const pts: { v: number; p: number }[] = [];
    for (let v = 0; v <= 40; v += 0.4) {
      const oh = baseM * v;
      const t = acidV + v;
      let p = 7;
      if (oh < mmolH) p = -Math.log10((mmolH - oh) / t);
      else if (oh > mmolH) p = 14 + Math.log10((oh - mmolH) / t);
      pts.push({ v, p: Math.min(14, Math.max(0, p)) });
    }
    return pts;
  }, [mmolH]);

  return (
    <SimFrame title="المعايرة الحجمية — HCl × NaOH" formula="M₁V₁ = M₂V₂" onBack={onBack}>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(34,211,238,0.08),transparent_55%)]" />
          <svg viewBox="0 0 320 360" className="relative mx-auto h-[360px] w-full">
            <defs>
              <linearGradient id="liq" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={pink ? "#f9a8d4" : "#67e8f9"} stopOpacity="0.85" />
                <stop offset="100%" stopColor={pink ? "#9d174d" : "#0e7490"} stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <rect x="148" y="10" width="24" height="130" rx="4" fill="#0f172a" stroke="#67e8f9" strokeWidth="2" />
            <rect x="152" y={20 + (1 - vol / 50) * 110} width="16" height={(vol / 50) * 110} fill="#22d3ee" opacity="0.7" />
            {[0, 10, 20, 30, 40, 50].map((m) => (
              <g key={m}>
                <line x1="148" y1={20 + (1 - m / 50) * 110} x2="142" y2={20 + (1 - m / 50) * 110} stroke="#94a3b8" />
                <text x="138" y={24 + (1 - m / 50) * 110} fill="#94a3b8" fontSize="9" textAnchor="end">
                  {m}
                </text>
              </g>
            ))}
            {running &&
              Array.from({ length: 4 }).map((_, i) => (
                <circle key={i} cx="160" cy={150 + (i * 18) % 50} r="3" fill="#22d3ee">
                  <animate attributeName="cy" from="145" to="230" dur="0.6s" repeatCount="indefinite" begin={`${i * 0.15}s`} />
                  <animate attributeName="opacity" values="1;0" dur="0.6s" repeatCount="indefinite" begin={`${i * 0.15}s`} />
                </circle>
              ))}
            <path d="M110 220 L110 310 Q160 350 210 310 L210 220 Z" fill="url(#liq)" stroke="#e2e8f0" strokeWidth="3" />
            <ellipse cx="160" cy="220" rx="50" ry="10" fill={pink ? "#f9a8d4" : "#a5f3fc"} opacity="0.5" />
            <text x="160" y="275" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="700">
              {pink ? "وردي — فينولفيثالين" : "عديم اللون"}
            </text>
          </svg>
        </Panel>
        <div className="space-y-3">
          <Panel>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Stat k="حجم القاعدة" v={`${vol.toFixed(1)} mL`} />
              <Stat k="pH" v={pH.toFixed(2)} accent={eq} />
              <Stat k="حمض HCl" v="25 mL · 0.10 M" />
              <Stat k="قاعدة NaOH" v="0.10 M" />
            </div>
            {eq && (
              <p className="mt-3 rounded-lg bg-emerald-500/15 px-3 py-2 text-sm text-emerald-300">
                نقطة التعادل — الحجم النظري 25.0 mL و pH = 7 للحمض القوي مع القاعدة القوية.
              </p>
            )}
            {pink && !eq && <p className="mt-3 text-sm text-pink-300">تجاوزت نقطة نهاية الدليل (pH ≥ 8.2).</p>}
          </Panel>
          <Panel>
            <Slider label="حجم NaOH المضاف" value={vol} min={0} max={40} step={0.1} unit="mL" onChange={setVol} />
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setRunning((r) => !r)}
                className="flex-1 rounded-xl bg-cyan-400 px-3 py-2 text-sm font-bold text-slate-950"
              >
                {running ? "إيقاف" : "تشغيل التقطير"}
              </button>
              <button onClick={() => { setVol(0); setRunning(false); }} className="rounded-xl border border-white/10 px-3 py-2 text-sm">
                تصفير
              </button>
            </div>
          </Panel>
          <Panel>
            <p className="mb-2 text-xs text-slate-400">منحنى المعايرة</p>
            <svg viewBox="0 0 320 140" className="h-32 w-full">
              <polyline
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2"
                points={curve.map((p) => `${8 + (p.v / 40) * 300},${130 - (p.p / 14) * 118}`).join(" ")}
              />
              <circle cx={8 + (vol / 40) * 300} cy={130 - (pH / 14) * 118} r="5" fill="#f59e0b" />
              <line x1={8 + (25 / 40) * 300} y1="10" x2={8 + (25 / 40) * 300} y2="130" stroke="#f472b6" strokeDasharray="4 3" />
            </svg>
          </Panel>
        </div>
      </div>
    </SimFrame>
  );
}

function Stat({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl border px-3 py-2 ${accent ? "border-emerald-400/40 bg-emerald-400/10" : "border-white/5 bg-white/5"}`}>
      <div className="text-[11px] text-slate-400">{k}</div>
      <div className="formula-chip text-base text-white">{v}</div>
    </div>
  );
}

export function FlameSim({ onBack }: { onBack: () => void }) {
  const [ion, setIon] = useState(FLAMES[0]);
  return (
    <SimFrame title="اختبار اللهب الكيفي" formula="E = hν" onBack={onBack}>
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel className="flex min-h-[340px] items-end justify-center bg-gradient-to-b from-slate-950 to-black">
          <svg viewBox="0 0 260 320" className="h-[320px]">
            <ellipse cx="130" cy="300" rx="40" ry="8" fill="#1e293b" />
            <rect x="118" y="250" width="24" height="50" rx="4" fill="#334155" />
            <path
              d="M130 250 C110 200 90 150 130 40 C170 150 150 200 130 250"
              fill={ion.hex}
              opacity="0.85"
              className="pulse-glow"
            />
            <path d="M130 250 C120 210 118 160 130 90 C142 160 140 210 130 250" fill="#fff7ed" opacity="0.55" />
          </svg>
        </Panel>
        <div className="grid grid-cols-2 gap-2">
          {FLAMES.map((f) => (
            <button
              key={f.ion}
              onClick={() => setIon(f)}
              className={`rounded-2xl border p-3 text-right ${ion.ion === f.ion ? "glow-cyan border-cyan-300/40" : "border-white/10 bg-white/5"}`}
            >
              <div className="flex items-center justify-between">
                <span className="h-3 w-3 rounded-full" style={{ background: f.hex, boxShadow: `0 0 12px ${f.hex}` }} />
                <span className="formula-chip text-sm">{f.ion}</span>
              </div>
              <div className="mt-1 font-bold">{f.name}</div>
              <div className="text-xs text-slate-400">{f.color}</div>
            </button>
          ))}
          <Panel className="col-span-2">
            <p className="text-sm text-slate-300">
              الإلكترون المثار يعود لمستواه ويبعث فوتونًا بلون مميز. {ion.note}. هذا أساس التحليل الطيفي الكيفي في الثانوية العامة.
            </p>
          </Panel>
        </div>
      </div>
    </SimFrame>
  );
}

export function ElectrolysisSim({ onBack }: { onBack: () => void }) {
  const [on, setOn] = useState(true);
  const [volt, setVolt] = useState(6);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const bubbles: { x: number; y: number; r: number; sp: number; side: number }[] = [];
    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.fillStyle = "#082f49";
      ctx.fillRect(40, 80, 520, 220);
      ctx.fillStyle = "rgba(34,211,238,0.18)";
      ctx.fillRect(40, 80, 520, 220);
      ctx.fillStyle = "#94a3b8";
      ctx.fillRect(120, 50, 18, 250);
      ctx.fillRect(460, 50, 18, 250);
      ctx.fillStyle = "#f59e0b";
      ctx.fillRect(118, 40, 22, 12);
      ctx.fillStyle = "#22d3ee";
      ctx.fillRect(458, 40, 22, 12);
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "12px Cairo";
      ctx.fillText("مهبط −  H₂", 90, 36);
      ctx.fillText("مصعد +  O₂", 430, 36);
      if (on) {
        const rate = volt * 0.35;
        if (Math.random() < rate * 0.08) bubbles.push({ x: 129, y: 270, r: 3 + Math.random() * 3, sp: 0.6 + Math.random(), side: 0 });
        if (Math.random() < rate * 0.04) bubbles.push({ x: 469, y: 270, r: 3 + Math.random() * 4, sp: 0.5 + Math.random(), side: 1 });
      }
      ctx.fillStyle = "#ecfeff";
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.y -= b.sp * (on ? 1 : 0.2);
        ctx.beginPath();
        ctx.arc(b.x + Math.sin(b.y / 8) * 2, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
        if (b.y < 90) bubbles.splice(i, 1);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, volt]);

  return (
    <SimFrame title="التحليل الكهربي للماء" formula="2H₂O → 2H₂ + O₂" onBack={onBack}>
      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
        <Panel>
          <canvas ref={canvas} width={600} height={340} className="h-auto w-full rounded-xl bg-[#020617]" />
        </Panel>
        <Panel className="space-y-4">
          <Slider label="جهد المصدر" value={volt} min={2} max={12} step={0.5} unit="V" onChange={setVolt} amber />
          <button onClick={() => setOn((v) => !v)} className="w-full rounded-xl bg-amber-400 py-2 font-bold text-slate-950">
            {on ? "فصل التيار" : "توصيل التيار"}
          </button>
          <p className="text-sm leading-7 text-slate-300">
            الاختزال عند المهبط: 2H₂O + 2e⁻ → H₂ + 2OH⁻. الأكسدة عند المصعد: 2H₂O → O₂ + 4H⁺ + 4e⁻. حجم الهيدروجين ضعف الأكسجين.
          </p>
        </Panel>
      </div>
    </SimFrame>
  );
}

export function GalvanicSim({ onBack }: { onBack: () => void }) {
  const e = 0.34 - -0.76;
  return (
    <SimFrame title="خلية دانيال الجلفانية" formula="E° = 1.10 V" onBack={onBack}>
      <Panel>
        <svg viewBox="0 0 760 320" className="h-auto w-full">
          <rect x="40" y="80" width="220" height="180" rx="16" fill="#14532d" opacity="0.55" stroke="#86efac" />
          <rect x="500" y="80" width="220" height="180" rx="16" fill="#1e3a8a" opacity="0.55" stroke="#93c5fd" />
          <rect x="120" y="70" width="28" height="170" fill="#a3a3a3" />
          <rect x="610" y="70" width="28" height="170" fill="#b45309" />
          <path d="M260 120 C360 40 400 40 500 120" fill="none" stroke="#fbbf24" strokeWidth="10" />
          <text x="150" y="60" fill="#bbf7d0" fontSize="14">
            مصعد Zn
          </text>
          <text x="600" y="60" fill="#bfdbfe" fontSize="14">
            مهبط Cu
          </text>
          <text x="80" y="290" fill="#86efac" fontSize="13">
            Zn²⁺ + 2e⁻ ⇌ Zn    أكسدة
          </text>
          <text x="500" y="290" fill="#93c5fd" fontSize="13">
            Cu²⁺ + 2e⁻ → Cu    اختزال
          </text>
          <circle cx="380" cy="70" r="28" fill="#022c22" stroke="#34d399" strokeWidth="3" />
          <text x="380" y="75" textAnchor="middle" fill="#6ee7b7" fontSize="12">
            1.10V
          </text>
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} r="5" fill="#facc15">
              <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${i * 0.48}s`} path="M148 70 C260 20 500 20 624 70" />
            </circle>
          ))}
        </svg>
        <p className="mt-3 text-sm text-slate-300">
          تدفق الإلكترونات في السلك الخارجي من الزنك إلى النحاس. جهد الخلية القياسي {e.toFixed(2)} فولت. القنطرة الملحية (أصفر) تكمل الدائرة الأيونية.
        </p>
      </Panel>
    </SimFrame>
  );
}

export function MixerSim({ onBack }: { onBack: () => void }) {
  const reagents = Array.from(new Set(REACTIONS.flatMap((r) => [r.a, r.b])));
  const [a, setA] = useState("HCl");
  const [b, setB] = useState("NaOH");
  const hit = REACTIONS.find((r) => (r.a === a && r.b === b) || (r.a === b && r.b === a));
  return (
    <SimFrame title="مختبر خلط الكواشف" onBack={onBack}>
      <div className="grid gap-4 md:grid-cols-3">
        <Panel>
          <label className="text-sm text-slate-400">الكاشف الأول</label>
          <select value={a} onChange={(e) => setA(e.target.value)} className="mt-2 w-full rounded-xl bg-slate-900 p-3">
            {reagents.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </Panel>
        <Panel>
          <label className="text-sm text-slate-400">الكاشف الثاني</label>
          <select value={b} onChange={(e) => setB(e.target.value)} className="mt-2 w-full rounded-xl bg-slate-900 p-3">
            {reagents.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </Panel>
        <Panel className="flex items-center justify-center" style={{ background: hit ? hit.color : "#0f172a" }}>
          <div className="text-center">
            <div className="text-sm text-slate-950/80">{hit ? hit.type : "لا تفاعل مسجّل"}</div>
            <div className="formula-chip mt-1 text-lg font-bold text-slate-950">{hit ? "مزيج" : "—"}</div>
          </div>
        </Panel>
      </div>
      <Panel className="mt-4">
        {hit ? (
          <div className="space-y-2">
            <div className="formula-chip text-xl text-cyan-200">{hit.eq}</div>
            <p className="text-slate-300">{hit.obs}</p>
          </div>
        ) : (
          <p className="text-slate-400">جرّب أزواجًا شائعة في منهج الثانوية: HCl+Zn ، AgNO₃+NaCl ، FeCl₃+KSCN.</p>
        )}
      </Panel>
    </SimFrame>
  );
}

export function KineticsSim({ onBack }: { onBack: () => void }) {
  const [T, setT] = useState(300);
  const [n, setN] = useState(18);
  const [cat, setCat] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const parts = Array.from({ length: n }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * (T / 80),
      vy: (Math.random() - 0.5) * (T / 80),
    }));
    let raf = 0;
    const tick = () => {
      ctx.fillStyle = "rgba(2,6,23,0.25)";
      ctx.fillRect(0, 0, c.width, c.height);
      const speed = T / 90;
      parts.forEach((p) => {
        p.x += p.vx * speed * 0.2;
        p.y += p.vy * speed * 0.2;
        if (p.x < 0 || p.x > c.width) p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, cat ? 5 : 4, 0, Math.PI * 2);
        ctx.fillStyle = cat ? "#f472b6" : "#22d3ee";
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [T, n, cat]);
  return (
    <SimFrame title="الحركية الكيميائية — نظرية التصادم" formula="k = Ae^(−Ea/RT)" onBack={onBack}>
      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <Panel>
          <canvas ref={canvas} width={640} height={320} className="h-auto w-full rounded-xl bg-slate-950" />
        </Panel>
        <Panel className="space-y-4">
          <Slider label="درجة الحرارة" value={T} min={200} max={600} step={10} unit="K" onChange={setT} amber />
          <Slider label="عدد الجزيئات (التركيز)" value={n} min={6} max={40} step={1} onChange={setN} />
          <button onClick={() => setCat((v) => !v)} className={`w-full rounded-xl py-2 font-bold ${cat ? "bg-pink-500 text-white" : "bg-white/10"}`}>
            {cat ? "الحافز مفعّل — Ea أقل" : "تفعيل حافز"}
          </button>
          <p className="text-sm leading-7 text-slate-300">
            رفع T يزيد الطاقة الحركية وعدد التصادمات الفعّالة. الحافز يوفّر مسارًا بطاقة تنشيط أقل دون أن يُستهلك.
          </p>
        </Panel>
      </div>
    </SimFrame>
  );
}

export function OhmSim({ onBack }: { onBack: () => void }) {
  const [V, setV] = useState(12);
  const [R, setR] = useState(6);
  const I = V / R;
  const P = I * V;
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let t = 0;
    let raf = 0;
    const tick = () => {
      t += 0.05 * Math.min(I, 4);
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.strokeStyle = "#22d3ee";
      ctx.lineWidth = 4;
      ctx.strokeRect(80, 70, 440, 180);
      ctx.fillStyle = "#f59e0b";
      ctx.fillRect(70, 140, 30, 40);
      ctx.fillStyle = "#64748b";
      ctx.fillRect(480, 145, 50, 12);
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "16px Share Tech Mono";
      ctx.fillText(`${V.toFixed(1)} V`, 55, 130);
      ctx.fillText(`${R.toFixed(1)} Ω`, 480, 135);
      ctx.fillText(`${I.toFixed(2)} A`, 250, 55);
      const n = 10;
      for (let i = 0; i < n; i++) {
        const p = (t + i / n) % 1;
        const per = 2 * (440 + 180);
        let d = p * per;
        let x = 80, y = 70;
        if (d < 440) {
          x = 80 + d;
          y = 70;
        } else if (d < 440 + 180) {
          x = 520;
          y = 70 + (d - 440);
        } else if (d < 880 + 180) {
          x = 520 - (d - 620);
          y = 250;
        } else {
          x = 80;
          y = 250 - (d - 800);
        }
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#facc15";
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [V, R, I]);
  return (
    <SimFrame title="قانون أوم" formula="V = I R" onBack={onBack}>
      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <Panel>
          <canvas ref={canvas} width={640} height={300} className="h-auto w-full rounded-xl bg-slate-950" />
        </Panel>
        <Panel className="space-y-4">
          <Slider label="جهد البطارية" value={V} min={1} max={24} step={0.5} unit="V" onChange={setV} amber />
          <Slider label="المقاومة" value={R} min={1} max={40} step={0.5} unit="Ω" onChange={setR} />
          <div className="grid grid-cols-2 gap-2">
            <Stat k="التيار" v={`${I.toFixed(3)} A`} />
            <Stat k="القدرة" v={`${P.toFixed(2)} W`} />
          </div>
        </Panel>
      </div>
    </SimFrame>
  );
}

export function PhotoSim({ onBack }: { onBack: () => void }) {
  const [metal, setMetal] = useState(WORK_FUNCTIONS[2]);
  const [nm, setNm] = useState(400);
  const [inten, setInten] = useState(0.6);
  const f = C_LIGHT / (nm * 1e-9);
  const eV = (H * f) / E_CHARGE;
  const kmax = eV - metal.phi;
  const emit = kmax >= 0;
  const Vs = emit ? kmax : 0;
  const f0 = (metal.phi * E_CHARGE) / H;
  return (
    <SimFrame title="الظاهرة الكهروضوئية" formula="hf = φ + K_max" onBack={onBack}>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel className="relative min-h-[300px] overflow-hidden">
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 20% 40%, hsl(${Math.max(0, 280 - nm / 2)} 80% 50% / ${inten}), transparent 50%)` }} />
          <svg viewBox="0 0 400 260" className="relative h-[260px] w-full">
            <rect x="260" y="70" width="18" height="120" fill="#94a3b8" />
            <text x="250" y="60" fill="#e2e8f0" fontSize="12">
              {metal.ar}
            </text>
            {emit &&
              Array.from({ length: Math.round(3 + inten * 6) }).map((_, i) => (
                <circle key={i} r="4" fill="#facc15">
                  <animateMotion dur={`${1.2 / (0.5 + inten)}s`} repeatCount="indefinite" begin={`${i * 0.18}s`} path="M270 130 L80 80" />
                </circle>
              ))}
            <text x="20" y="230" fill={emit ? "#86efac" : "#f87171"} fontSize="14">
              {emit ? "انبعاث إلكترونات" : "لا انبعاث — دون العتبة"}
            </text>
          </svg>
        </Panel>
        <Panel className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {WORK_FUNCTIONS.map((m) => (
              <button
                key={m.metal}
                onClick={() => setMetal(m)}
                className={`rounded-lg px-3 py-1 text-sm ${metal.metal === m.metal ? "bg-amber-400 text-slate-950" : "bg-white/10"}`}
              >
                {m.ar}
              </button>
            ))}
          </div>
          <Slider label="الطول الموجي" value={nm} min={200} max={700} step={5} unit="nm" onChange={setNm} amber />
          <Slider label="شدة الضوء" value={inten} min={0.1} max={1} step={0.05} onChange={setInten} />
          <div className="grid grid-cols-2 gap-2">
            <Stat k="طاقة الفوتون" v={`${eV.toFixed(2)} eV`} />
            <Stat k="دالة الشغل φ" v={`${metal.phi.toFixed(2)} eV`} />
            <Stat k="K_max" v={emit ? `${kmax.toFixed(2)} eV` : "0"} accent={emit} />
            <Stat k="جهد الإيقاف" v={`${Vs.toFixed(2)} V`} />
          </div>
          <p className="text-xs text-slate-400">
            تردد العتبة f₀ = {(f0 / 1e14).toFixed(2)}×10¹⁴ Hz. زيادة الشدة تزيد عدد الإلكترونات لا طاقتها.
          </p>
        </Panel>
      </div>
    </SimFrame>
  );
}

export function PendulumSim({ onBack }: { onBack: () => void }) {
  const [L, setL] = useState(1);
  const [amp, setAmp] = useState(15);
  const g = 9.8;
  const T = 2 * Math.PI * Math.sqrt(L / g);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = (now - t0) / 1000;
      const th = ((amp * Math.PI) / 180) * Math.cos((2 * Math.PI * t) / T);
      ctx.clearRect(0, 0, c.width, c.height);
      const ox = c.width / 2;
      const oy = 30;
      const len = 80 + L * 120;
      const x = ox + Math.sin(th) * len;
      const y = oy + Math.cos(th) * len;
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.fillStyle = "#22d3ee";
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#f8fafc";
      ctx.beginPath();
      ctx.arc(ox, oy, 5, 0, Math.PI * 2);
      ctx.fill();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [L, amp, T]);
  return (
    <SimFrame title="البندول البسيط" formula="T = 2π√(L/g)" onBack={onBack}>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Panel>
          <canvas ref={canvas} width={500} height={340} className="h-auto w-full rounded-xl bg-slate-950" />
        </Panel>
        <Panel className="space-y-4">
          <Slider label="الطول" value={L} min={0.3} max={2} step={0.05} unit="m" onChange={setL} />
          <Slider label="سعة الزاوية" value={amp} min={5} max={30} step={1} unit="°" onChange={setAmp} amber />
          <Stat k="الزمن الدوري" v={`${T.toFixed(3)} s`} accent />
          <p className="text-sm text-slate-300">للزوايا الصغيرة sinθ ≈ θ، والحركة توافقية بسيطة مستقلة عن الكتلة والسعة.</p>
        </Panel>
      </div>
    </SimFrame>
  );
}

export function SlitSim({ onBack }: { onBack: () => void }) {
  const [lambda, setLambda] = useState(500);
  const [d, setD] = useState(0.25);
  const [D, setDist] = useState(1.2);
  const canvas = useRef<HTMLCanvasElement>(null);
  const dy = (lambda * 1e-9 * D) / (d * 1e-3);
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const img = ctx.createImageData(c.width, c.height);
    const k = (2 * Math.PI * (d * 1e-3)) / (lambda * 1e-9 * D);
    for (let x = 0; x < c.width; x++) {
      const yOff = (x - c.width / 2) * 0.00035;
      const I = Math.cos((k * yOff * D) / 2) ** 2;
      for (let y = 0; y < c.height; y++) {
        const i = (y * c.width + x) * 4;
        const hue = (lambda - 380) / 400;
        img.data[i] = I * (lambda > 580 ? 255 : hue * 80);
        img.data[i + 1] = I * (lambda > 490 && lambda < 600 ? 220 : 40);
        img.data[i + 2] = I * (lambda < 500 ? 255 : 40);
        img.data[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }, [lambda, d, D]);
  return (
    <SimFrame title="تداخل الشق المزدوج — يونج" formula="Δy = λD/d" onBack={onBack}>
      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <Panel>
          <canvas ref={canvas} width={640} height={220} className="h-auto w-full rounded-xl" />
        </Panel>
        <Panel className="space-y-4">
          <Slider label="الطول الموجي λ" value={lambda} min={380} max={700} step={5} unit="nm" onChange={setLambda} amber />
          <Slider label="المسافة بين الشقين d" value={d} min={0.1} max={0.8} step={0.01} unit="mm" onChange={setD} />
          <Slider label="بعد الشاشة D" value={D} min={0.5} max={2.5} step={0.05} unit="m" onChange={setDist} />
          <Stat k="المسافة بين هدين" v={`${(dy * 1000).toFixed(2)} mm`} accent />
        </Panel>
      </div>
    </SimFrame>
  );
}

export function ProjectileSim({ onBack }: { onBack: () => void }) {
  const [v, setV] = useState(25);
  const [th, setTh] = useState(45);
  const g = 9.8;
  const rad = (th * Math.PI) / 180;
  const R = (v * v * Math.sin(2 * rad)) / g;
  const Hmax = (v * v * Math.sin(rad) ** 2) / (2 * g);
  const time = (2 * v * Math.sin(rad)) / g;
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let t = 0;
    let raf = 0;
    const scale = Math.min(500 / Math.max(R, 1), 220 / Math.max(Hmax, 1));
    const tick = () => {
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.strokeStyle = "#334155";
      ctx.beginPath();
      ctx.moveTo(40, 260);
      ctx.lineTo(620, 260);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = "#22d3ee";
      ctx.lineWidth = 2;
      for (let tt = 0; tt <= time; tt += 0.02) {
        const x = v * Math.cos(rad) * tt;
        const y = v * Math.sin(rad) * tt - 0.5 * g * tt * tt;
        const px = 50 + x * scale;
        const py = 260 - y * scale;
        if (tt === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      t += 0.03;
      if (t > time) t = 0;
      const x = v * Math.cos(rad) * t;
      const y = v * Math.sin(rad) * t - 0.5 * g * t * t;
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.arc(50 + x * scale, 260 - y * scale, 8, 0, Math.PI * 2);
      ctx.fill();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [v, th, R, Hmax, time, rad]);
  return (
    <SimFrame title="حركة المقذوفات" formula="R = v² sin2θ / g" onBack={onBack}>
      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <Panel>
          <canvas ref={canvas} width={640} height={300} className="h-auto w-full rounded-xl" />
        </Panel>
        <Panel className="space-y-4">
          <Slider label="السرعة الابتدائية" value={v} min={5} max={50} step={1} unit="m/s" onChange={setV} amber />
          <Slider label="زاوية الإطلاق" value={th} min={10} max={80} step={1} unit="°" onChange={setTh} />
          <div className="grid grid-cols-1 gap-2">
            <Stat k="المدى الأفقي" v={`${R.toFixed(2)} m`} accent />
            <Stat k="أقصى ارتفاع" v={`${Hmax.toFixed(2)} m`} />
            <Stat k="زمن الطيران" v={`${time.toFixed(2)} s`} />
          </div>
        </Panel>
      </div>
    </SimFrame>
  );
}

export function LensSim({ onBack }: { onBack: () => void }) {
  const [f, setF] = useState(8);
  const [u, setU] = useState(-20);
  const invV = 1 / f + 1 / u;
  const v = Math.abs(invV) > 1e-6 ? 1 / invV : 999;
  const m = v / u;
  return (
    <SimFrame title="العدسة الرقيقة" formula="1/f = 1/v − 1/u" onBack={onBack}>
      <Panel>
        <svg viewBox="0 0 700 260" className="h-auto w-full">
          <line x1="20" y1="130" x2="680" y2="130" stroke="#475569" />
          <ellipse cx="350" cy="130" rx="12" ry="90" fill="none" stroke="#67e8f9" strokeWidth="3" />
          <line x1={350 + u * 8} y1="130" x2={350 + u * 8} y2="70" stroke="#f59e0b" strokeWidth="4" />
          <line x1={350 + u * 8} y1="70" x2="350" y2="70" stroke="#f472b6" />
          <line x1="350" y1="70" x2={350 + Math.max(Math.min(v, 40), -40) * 8} y2="130" stroke="#f472b6" />
          <line x1={350 + u * 8} y1="70" x2="350" y2="130" stroke="#a3e635" />
          <line
            x1="350"
            y1="130"
            x2={350 + Math.max(Math.min(v, 40), -40) * 8}
            y2={130 - m * 60}
            stroke="#a3e635"
          />
          <line
            x1={350 + Math.max(Math.min(v, 40), -40) * 8}
            y1="130"
            x2={350 + Math.max(Math.min(v, 40), -40) * 8}
            y2={130 - m * 60}
            stroke="#22d3ee"
            strokeWidth="3"
          />
        </svg>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Slider label="البعد البؤري f (موجب محدبة)" value={f} min={4} max={16} step={0.5} unit="cm" onChange={setF} />
          <Slider label="بعد الجسم u (سالب اصطلاحًا)" value={u} min={-40} max={-6} step={0.5} unit="cm" onChange={setU} amber />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <Stat k="بعد الصورة v" v={`${v.toFixed(1)} cm`} />
          <Stat k="التكبير m" v={m.toFixed(2)} />
          <Stat k="نوع الصورة" v={v > 0 ? "حقيقية مقلوبة" : "تقديرية معتدلة"} accent />
        </div>
      </Panel>
    </SimFrame>
  );
}

export function DecaySim({ onBack }: { onBack: () => void }) {
  const [half, setHalf] = useState(4);
  const [t, setT] = useState(0);
  const [play, setPlay] = useState(true);
  const N0 = 160;
  const lam = Math.LN2 / half;
  const N = N0 * Math.exp(-lam * t);
  useEffect(() => {
    if (!play) return;
    const id = setInterval(() => setT((x) => (x >= half * 5 ? 0 : +(x + 0.05).toFixed(2))), 50);
    return () => clearInterval(id);
  }, [play, half]);
  const alive = Math.round(N);
  return (
    <SimFrame title="الاضمحلال الإشعاعي" formula="N = N₀ e^(−λt)" onBack={onBack}>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Panel>
          <div className="grid grid-cols-[repeat(16,minmax(0,1fr))] gap-1">
            {Array.from({ length: N0 }).map((_, i) => (
              <span key={i} className={`h-3 w-3 rounded-sm ${i < alive ? "bg-amber-400" : "bg-slate-800"}`} />
            ))}
          </div>
        </Panel>
        <Panel className="space-y-4">
          <Slider label="نصف العمر" value={half} min={1} max={10} step={0.5} unit="يوم" onChange={setHalf} amber />
          <Slider label="الزمن" value={t} min={0} max={half * 5} step={0.1} unit="يوم" onChange={setT} />
          <div className="grid grid-cols-2 gap-2">
            <Stat k="المتبقي" v={`${alive} / ${N0}`} accent />
            <Stat k="λ" v={lam.toFixed(3)} />
          </div>
          <button onClick={() => setPlay((p) => !p)} className="w-full rounded-xl bg-amber-400 py-2 font-bold text-slate-950">
            {play ? "إيقاف" : "تشغيل"}
          </button>
        </Panel>
      </div>
    </SimFrame>
  );
}

export function BohrSim({ onBack }: { onBack: () => void }) {
  const [n, setN] = useState(3);
  const [from, setFrom] = useState(3);
  const E = (nn: number) => -13.6 / nn ** 2;
  const dE = E(from) - E(n);
  const absorb = n > from;
  const nm = dE !== 0 ? 1240 / Math.abs(dE) : 0;
  const visible = nm >= 380 && nm <= 750;
  return (
    <SimFrame title="نموذج بور — ذرة الهيدروجين" formula="Eₙ = −13.6 / n² eV" onBack={onBack}>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel className="flex items-center justify-center">
          <svg viewBox="0 0 320 320" className="h-[300px]">
            <circle cx="160" cy="160" r="14" fill="#f59e0b" />
            {[1, 2, 3, 4, 5, 6].map((lvl) => (
              <circle key={lvl} cx="160" cy="160" r={18 + 16 * lvl} fill="none" stroke={lvl === n ? "#22d3ee" : "#334155"} strokeWidth={lvl === n ? 3 : 1} />
            ))}
            <circle cx={160} cy={160 - (18 + 16 * n)} r="8" fill="#67e8f9">
              <animateTransform attributeName="transform" type="rotate" from="0 160 160" to="360 160 160" dur={`${n}s`} repeatCount="indefinite" />
            </circle>
          </svg>
        </Panel>
        <Panel className="space-y-3">
          <p className="text-sm text-slate-400">المستوى الحالي للإلكترون ثم اختر مستوى القفز</p>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setFrom(n);
                  setN(lvl);
                }}
                className={`rounded-lg px-3 py-1 ${n === lvl ? "bg-cyan-400 text-slate-950" : "bg-white/10"}`}
              >
                n={lvl} ({E(lvl).toFixed(2)} eV)
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Stat k="ΔE" v={`${dE === 0 ? "0" : dE.toFixed(2)} eV`} />
            <Stat k="λ" v={nm ? `${nm.toFixed(0)} nm` : "—"} />
            <Stat k="العملية" v={dE === 0 ? "مستقر" : absorb ? "امتصاص" : "انبعاث"} accent />
            <Stat k="سلسلة" v={n === 1 || from === 1 ? "ليمان" : n === 2 || from === 2 ? "بالمر" : "باشن"} />
          </div>
          <div className="h-8 rounded-lg" style={{ background: visible ? `hsl(${Math.max(0, 280 - (nm - 380) * 0.7)},80%,55%)` : "#111827" }} />
          <p className="text-sm text-slate-300">سلسلة بالمر (إلى n=2) تقع في المرئي. ليمان إلى n=1 فوق بنفسجي، باشن تحت أحمر.</p>
        </Panel>
      </div>
    </SimFrame>
  );
}

export function TransformerSim({ onBack }: { onBack: () => void }) {
  const [np, setNp] = useState(200);
  const [ns, setNs] = useState(50);
  const [vp, setVp] = useState(220);
  const vs = vp * (ns / np);
  const ip = 2;
  const is = np === 0 ? 0 : (ip * vp) / Math.max(vs, 0.001);
  const step = ns > np ? "رافع للجهد" : ns < np ? "خافض للجهد" : "عازل 1:1";
  return (
    <SimFrame title="المحول الكهربي المثالي" formula="Vp/Vs = Np/Ns = Is/Ip" onBack={onBack}>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Panel>
          <svg viewBox="0 0 640 260" className="h-auto w-full">
            <rect x="250" y="40" width="36" height="180" rx="6" fill="#334155" />
            <rect x="354" y="40" width="36" height="180" rx="6" fill="#334155" />
            <path d="M268 50 C200 50 200 90 268 90 C200 90 200 130 268 130 C200 130 200 170 268 170 C200 170 200 210 268 210" fill="none" stroke="#f59e0b" strokeWidth="4" />
            <path d="M372 50 C440 50 440 90 372 90 C440 90 440 130 372 130 C440 130 440 170 372 170 C440 170 440 210 372 210" fill="none" stroke="#22d3ee" strokeWidth="4" />
            <text x="120" y="36" fill="#fbbf24" fontSize="14">
              ابتدائي {np} لفة
            </text>
            <text x="400" y="36" fill="#67e8f9" fontSize="14">
              ثانوي {ns} لفة
            </text>
            <text x="80" y="250" fill="#e2e8f0" fontSize="16">
              {vp.toFixed(0)} V
            </text>
            <text x="480" y="250" fill="#e2e8f0" fontSize="16">
              {vs.toFixed(1)} V
            </text>
          </svg>
        </Panel>
        <Panel className="space-y-4">
          <Slider label="لفات الابتدائي Np" value={np} min={50} max={400} step={10} onChange={setNp} amber />
          <Slider label="لفات الثانوي Ns" value={ns} min={20} max={400} step={10} onChange={setNs} />
          <Slider label="جهد الدخل Vp" value={vp} min={12} max={220} step={4} unit="V" onChange={setVp} />
          <div className="grid grid-cols-2 gap-2">
            <Stat k="جهد الخرج" v={`${vs.toFixed(1)} V`} accent />
            <Stat k="نوع المحول" v={step} />
            <Stat k="نسبة التحويل" v={(ns / np).toFixed(2)} />
            <Stat k="تيار الثانوي (عند Ip=2A)" v={`${is.toFixed(2)} A`} />
          </div>
        </Panel>
      </div>
    </SimFrame>
  );
}

export function renderSim(id: string, onBack: () => void) {
  switch (id) {
    case "titration":
      return <TitrationSim onBack={onBack} />;
    case "flame":
      return <FlameSim onBack={onBack} />;
    case "electrolysis":
      return <ElectrolysisSim onBack={onBack} />;
    case "galvanic":
      return <GalvanicSim onBack={onBack} />;
    case "mixer":
      return <MixerSim onBack={onBack} />;
    case "kinetics":
      return <KineticsSim onBack={onBack} />;
    case "ohm":
      return <OhmSim onBack={onBack} />;
    case "photo":
      return <PhotoSim onBack={onBack} />;
    case "pendulum":
      return <PendulumSim onBack={onBack} />;
    case "slit":
      return <SlitSim onBack={onBack} />;
    case "projectile":
      return <ProjectileSim onBack={onBack} />;
    case "lens":
      return <LensSim onBack={onBack} />;
    case "decay":
      return <DecaySim onBack={onBack} />;
    case "bohr":
      return <BohrSim onBack={onBack} />;
    case "transformer":
      return <TransformerSim onBack={onBack} />;
    default:
      return null;
  }
}
