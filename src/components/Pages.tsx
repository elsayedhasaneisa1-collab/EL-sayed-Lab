import { useEffect, useMemo, useState, type ReactNode } from "react";
import { CHEM_EXPS, LESSONS, PHYS_EXPS, QUESTIONS, type Experiment, type Question } from "../data/content";
import { renderSim } from "./Sims";
import { IMAGES } from "../assets/media";

export function HomePage({
  go,
  openSim,
}: {
  go: (id: "chem" | "phys" | "table" | "quiz" | "lessons") => void;
  openSim: (id: string) => void;
}) {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[32px] border border-cyan-400/20">
        <img src={IMAGES.hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#05070d] via-[#05070d]/80 to-transparent" />
        <div className="relative grid gap-8 p-8 lg:grid-cols-2 lg:p-14">
          <div />
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 pulse-glow" />
              اهلا بك في مختبري نورت المختبر كلو 🙂
            </div>
            <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">
              EL-sayed Lab
              <span className="mt-2 block bg-gradient-to-l from-cyan-300 to-amber-300 bg-clip-text text-transparent">
                مختبر السيد
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-300">
              موقع تجارب تفاعلي للفيزياء والكيمياء من انشاء الطالب السيد حسن عيسى
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => go("chem")} className="rounded-2xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.35)]">
                ادخل معمل الكيمياء
              </button>
              <button onClick={() => go("phys")} className="rounded-2xl bg-amber-400 px-6 py-3 font-bold text-slate-950">
                ادخل معمل الفيزياء
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        {["M₁V₁=M₂V₂", "E=hf−φ", "PV=nRT", "T=2π√(L/g)", "Δy=λD/d", "Eₙ=−13.6/n²"].map((f) => (
          <span key={f} className="formula-chip rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs text-cyan-200/80">
            {f}
          </span>
        ))}
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["118", "عنصرًا في الجدول الدوري"],
          ["15", "تجربة محاكاة حية"],
          ["16", "سؤال امتحاني محلول"],
          ["8", "دروس ملخصة للمنهج"],
        ].map(([n, l]) => (
          <div key={l} className="glass rounded-2xl p-5">
            <div className="formula-chip text-3xl font-black text-cyan-300">{n}</div>
            <div className="mt-1 text-sm text-slate-400">{l}</div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Portal
          img={IMAGES.chem}
          title="معمل الكيمياء"
          accent="cyan"
          text="معايرة، لهب، تحليل كهربي، خلية دانيال، خلط كواشف وحركية التفاعل."
          onClick={() => go("chem")}
        />
        <Portal
          img={IMAGES.phys}
          title="معمل الفيزياء"
          accent="amber"
          text="قانون أوم، كهروضوئية، بندول، شق مزدوج، مقذوفات، عدسات، اضمحلال وبور."
          onClick={() => go("phys")}
        />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-black">تجارب مقترحة للامتحان</h2>
          <button onClick={() => go("quiz")} className="text-sm text-cyan-300">
            اختبر نفسك ←
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {[...CHEM_EXPS.slice(0, 2), ...PHYS_EXPS.slice(0, 2)].map((e) => (
            <button key={e.id} onClick={() => openSim(e.id)} className="glass rounded-2xl p-4 text-right hover:border-cyan-300/40">
              <div className="text-xs text-cyan-400">{e.unit}</div>
              <div className="mt-1 font-bold">{e.title}</div>
              <p className="mt-2 line-clamp-2 text-xs text-slate-400">{e.desc}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function Portal({
  img,
  title,
  text,
  onClick,
  accent,
}: {
  img: string;
  title: string;
  text: string;
  onClick: () => void;
  accent: "cyan" | "amber";
}) {
  return (
    <button onClick={onClick} className="group relative overflow-hidden rounded-[28px] border border-white/10 text-right">
      <img src={img} alt="" className="h-64 w-full object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className={`text-2xl font-black ${accent === "cyan" ? "text-cyan-300" : "text-amber-300"}`}>{title}</h3>
        <p className="mt-2 text-sm text-slate-300">{text}</p>
      </div>
    </button>
  );
}

export function LabPage({
  subject,
  sim,
  setSim,
}: {
  subject: "chem" | "phys";
  sim: string | null;
  setSim: (id: string | null) => void;
}) {
  const list = subject === "chem" ? CHEM_EXPS : PHYS_EXPS;
  if (sim) return <div>{renderSim(sim, () => setSim(null))}</div>;
  return (
    <div className="space-y-6">
      <header className="overflow-hidden rounded-[28px] border border-white/10">
        <div className="relative h-44">
          <img
            src={subject === "chem" ? IMAGES.chem : IMAGES.phys}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#05070d] to-black/30" />
          <div className="absolute bottom-6 right-6">
            <p className="text-xs tracking-[0.35em] text-white/70">{subject === "chem" ? "CHEMISTRY LAB" : "PHYSICS LAB"}</p>
            <h2 className="text-3xl font-black">{subject === "chem" ? "معمل الكيمياء" : "معمل الفيزياء"}</h2>
          </div>
        </div>
      </header>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((e) => (
          <ExpCard key={e.id} exp={e} onOpen={() => setSim(e.id)} />
        ))}
      </div>
    </div>
  );
}

function ExpCard({ exp, onOpen }: { exp: Experiment; onOpen: () => void }) {
  const tone = exp.subject === "chem" ? "cyan" : "amber";
  return (
    <article className="glass flex flex-col rounded-3xl p-5">
      <div className="flex items-center justify-between text-xs">
        <span className={tone === "cyan" ? "text-cyan-300" : "text-amber-300"}>{exp.unit}</span>
        <span className="rounded-full bg-white/10 px-2 py-0.5">{exp.level}</span>
      </div>
      <h3 className="mt-3 text-xl font-bold">{exp.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-7 text-slate-400">{exp.desc}</p>
      <p className="mt-2 text-xs text-slate-500">الهدف: {exp.goal}</p>
      {exp.formula && <p className="formula-chip mt-2 text-cyan-200">{exp.formula}</p>}
      <p className="mt-2 text-[11px] text-amber-200/70">سلامة: {exp.safety}</p>
      <button
        onClick={onOpen}
        className={`mt-4 rounded-xl py-2.5 text-sm font-bold ${tone === "cyan" ? "bg-cyan-400 text-slate-950" : "bg-amber-400 text-slate-950"}`}
      >
        تشغيل التجربة · {exp.minutes} د
      </button>
    </article>
  );
}

export function LessonsPage() {
  const [sub, setSub] = useState<"all" | "chem" | "phys">("all");
  const data = LESSONS.filter((l) => sub === "all" || l.subject === sub);
  return (
    <div className="space-y-5">
      <h2 className="text-3xl font-black">ملخصات المنهج</h2>
      <div className="flex gap-2">
        {(["all", "chem", "phys"] as const).map((s) => (
          <button key={s} onClick={() => setSub(s)} className={`rounded-full px-4 py-1.5 text-sm ${sub === s ? "bg-white text-slate-900" : "bg-white/10"}`}>
            {s === "all" ? "الكل" : s === "chem" ? "كيمياء" : "فيزياء"}
          </button>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {data.map((l) => (
          <article key={l.id} className="glass rounded-3xl p-6">
            <div className={`text-xs ${l.subject === "chem" ? "text-cyan-300" : "text-amber-300"}`}>{l.unit}</div>
            <h3 className="mt-1 text-xl font-bold">{l.title}</h3>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-300">
              {l.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  {p}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

export function QuizPage() {
  const [sub, setSub] = useState<"all" | "chem" | "phys">("all");
  const bank = useMemo(() => QUESTIONS.filter((q) => sub === "all" || q.subject === sub), [sub]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q: Question | undefined = bank[i];

  useEffect(() => {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  }, [sub]);

  if (!q) return null;
  if (done) {
    const pct = Math.round((score / bank.length) * 100);
    return (
      <div className="glass mx-auto max-w-lg rounded-3xl p-8 text-center">
        <p className="text-cyan-300">نتيجة الاختبار</p>
        <div className="mt-3 text-6xl font-black">{pct}%</div>
        <p className="mt-2 text-slate-400">
          {score} من {bank.length} — {pct >= 85 ? "مستوى امتياز، جاهز للجنة." : pct >= 65 ? "جيد، راجع النقاط الضعيفة." : "أعد التجارب والدروس ثم حاول."}
        </p>
        <button
          onClick={() => {
            setI(0);
            setPicked(null);
            setScore(0);
            setDone(false);
          }}
          className="mt-6 rounded-xl bg-cyan-400 px-6 py-2 font-bold text-slate-950"
        >
          إعادة الاختبار
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-3xl font-black">اختبار الثانوية</h2>
        <div className="flex gap-2">
          {(["all", "chem", "phys"] as const).map((s) => (
            <button key={s} onClick={() => setSub(s)} className={`rounded-full px-3 py-1 text-sm ${sub === s ? "bg-white text-slate-900" : "bg-white/10"}`}>
              {s === "all" ? "شامل" : s === "chem" ? "كيمياء" : "فيزياء"}
            </button>
          ))}
        </div>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-gradient-to-l from-cyan-400 to-amber-400" style={{ width: `${((i + 1) / bank.length) * 100}%` }} />
      </div>
      <article className="glass rounded-3xl p-6">
        <div className="text-xs text-slate-400">
          سؤال {i + 1} / {bank.length} · {q.subject === "chem" ? "كيمياء" : "فيزياء"}
        </div>
        <h3 className="mt-3 text-xl font-bold leading-9">{q.q}</h3>
        <div className="mt-5 grid gap-2">
          {q.choices.map((c, idx) => {
            const show = picked !== null;
            const ok = idx === q.answer;
            const mine = idx === picked;
            return (
              <button
                key={c}
                disabled={picked !== null}
                onClick={() => {
                  setPicked(idx);
                  if (idx === q.answer) setScore((s) => s + 1);
                }}
                className={`rounded-2xl border px-4 py-3 text-right ${
                  show && ok ? "border-emerald-400 bg-emerald-400/15" : show && mine ? "border-rose-400 bg-rose-400/15" : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <span className="formula-chip ml-2 text-cyan-300">{["أ", "ب", "ج", "د"][idx]}</span>
                {c}
              </button>
            );
          })}
        </div>
        {picked !== null && (
          <p className="mt-4 rounded-xl bg-white/5 p-3 text-sm leading-7 text-slate-300">{q.explain}</p>
        )}
        {picked !== null && (
          <button
            onClick={() => {
              if (i + 1 >= bank.length) setDone(true);
              else {
                setI(i + 1);
                setPicked(null);
              }
            }}
            className="mt-4 rounded-xl bg-cyan-400 px-5 py-2 font-bold text-slate-950"
          >
            {i + 1 >= bank.length ? "عرض النتيجة" : "السؤال التالي"}
          </button>
        )}
      </article>
    </div>
  );
}

export function CalcPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black">حاسبات المعمل</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <MolarCalc />
        <PhCalc />
        <OhmCalc />
        <PhotonCalc />
        <GasCalc />
        <HalfCalc />
      </div>
    </div>
  );
}

function Field({ label, value, set, unit }: { label: string; value: number; set: (n: number) => void; unit: string }) {
  return (
    <label className="block text-sm">
      <span className="text-slate-400">{label}</span>
      <div className="mt-1 flex overflow-hidden rounded-xl border border-white/10">
        <input
          type="number"
          value={value}
          onChange={(e) => set(Number(e.target.value))}
          className="w-full bg-slate-950 px-3 py-2 outline-none"
        />
        <span className="bg-white/5 px-3 py-2 text-cyan-300">{unit}</span>
      </div>
    </label>
  );
}

function MolarCalc() {
  const [m, setM] = useState(36.5);
  const [g, setG] = useState(3.65);
  const [v, setV] = useState(0.5);
  const moles = g / m;
  const molar = moles / v;
  return (
    <Box title="التركيز المولاري" f="M = n / V">
      <Field label="الكتلة المولية" value={m} set={setM} unit="g/mol" />
      <Field label="كتلة المذاب" value={g} set={setG} unit="g" />
      <Field label="حجم المحلول" value={v} set={setV} unit="L" />
      <Out a={`${moles.toFixed(4)} mol`} b={`${molar.toFixed(4)} M`} />
    </Box>
  );
}

function PhCalc() {
  const [h, setH] = useState(0.01);
  const pH = -Math.log10(Math.max(h, 1e-15));
  return (
    <Box title="الرقم الهيدروجيني" f="pH = −log[H⁺]">
      <Field label="[H₃O⁺]" value={h} set={setH} unit="M" />
      <Out a={`pH = ${pH.toFixed(2)}`} b={pH < 7 ? "حمضي" : pH > 7 ? "قاعدي" : "متعادل"} />
    </Box>
  );
}

function OhmCalc() {
  const [V, setV] = useState(12);
  const [R, setR] = useState(4);
  const I = V / R;
  return (
    <Box title="قانون أوم" f="I = V / R">
      <Field label="الجهد" value={V} set={setV} unit="V" />
      <Field label="المقاومة" value={R} set={setR} unit="Ω" />
      <Out a={`${I.toFixed(3)} A`} b={`${(I * V).toFixed(2)} W`} />
    </Box>
  );
}

function PhotonCalc() {
  const [nm, setNm] = useState(500);
  const eV = 1240 / nm;
  return (
    <Box title="طاقة الفوتون" f="E = hc / λ">
      <Field label="الطول الموجي" value={nm} set={setNm} unit="nm" />
      <Out a={`${eV.toFixed(3)} eV`} b={`${(eV * 1.602e-19).toExponential(3)} J`} />
    </Box>
  );
}

function GasCalc() {
  const [n, setN] = useState(1);
  const [T, setT] = useState(273);
  const [P, setP] = useState(1);
  const V = (n * 0.0821 * T) / P;
  return (
    <Box title="قانون الغاز المثالي" f="PV = nRT">
      <Field label="عدد المولات" value={n} set={setN} unit="mol" />
      <Field label="درجة الحرارة" value={T} set={setT} unit="K" />
      <Field label="الضغط" value={P} set={setP} unit="atm" />
      <Out a={`${V.toFixed(3)} L`} b="R = 0.0821 L·atm/mol·K" />
    </Box>
  );
}

function HalfCalc() {
  const [n0, setN0] = useState(100);
  const [half, setHalf] = useState(4);
  const [t, setT] = useState(12);
  const n = n0 * Math.pow(0.5, t / half);
  return (
    <Box title="المتبقية بعد الاضمحلال" f="N = N₀ (½)^(t/T½)">
      <Field label="الكمية الأصلية" value={n0} set={setN0} unit="" />
      <Field label="نصف العمر" value={half} set={setHalf} unit="" />
      <Field label="الزمن" value={t} set={setT} unit="" />
      <Out a={n.toFixed(3)} b={`${((n / n0) * 100).toFixed(1)}%`} />
    </Box>
  );
}

function Box({ title, f, children }: { title: string; f: string; children: ReactNode }) {
  return (
    <section className="glass space-y-3 rounded-3xl p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">{title}</h3>
        <span className="formula-chip text-xs text-cyan-300">{f}</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">{children}</div>
    </section>
  );
}

function Out({ a, b }: { a: string; b: string }) {
  return (
    <div className="rounded-xl bg-cyan-400/10 p-3 sm:col-span-3">
      <div className="formula-chip text-lg text-cyan-200">{a}</div>
      <div className="text-xs text-slate-400">{b}</div>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <p className="text-xs tracking-[0.4em] text-cyan-400">EL-sayed LAB</p>
        <h2 className="text-4xl font-black">مختبر رقمي بمعايير لجنة الثانوية</h2>
        <p className="leading-8 text-slate-300">
          EL-sayed Lab منصة تعليمية صُممت لطالب الصف الثالث الثانوي تجمع المحاكاة الحية والجدول الدوري والحاسبات والاختبارات في واجهة واحدة بالعربية، مع الالتزام بمصطلحات الوزارة: مصعد ومهبط، دالة الشغل، هدب التداخل، ونصف العمر.
        </p>
        <ul className="space-y-2 text-sm text-slate-400">
          <li>• تجارب كيمياء: معايرة، لهب، تحليل كهربي، دانيال، كواشف، حركية.</li>
          <li>• تجارب فيزياء: أوم، كهروضوئية، بندول، يونج، مقذوفات، عدسات، اضمحلال، بور، محول.</li>
          <li>• لا حاجة لاتصال خادم — كل الحسابات تعمل على جهازك.</li>
        </ul>
      </div>
      <img src={IMAGES.organic} alt="نماذج جزيئية" className="h-80 w-full rounded-[28px] object-cover" />
    </div>
  );
}
