export type Category =
  | "alkali"
  | "alkaline"
  | "transition"
  | "post"
  | "metalloid"
  | "nonmetal"
  | "halogen"
  | "noble"
  | "lanthanide"
  | "actinide"
  | "unknown";

export type ChemElement = {
  z: number;
  s: string;
  ar: string;
  en: string;
  mass: number;
  cat: Category;
  col: number;
  row: number;
  config: string;
  eneg?: number;
  uses: string;
};

export const CAT_META: Record<
  Category,
  { ar: string; bg: string; border: string; text: string }
> = {
  alkali: { ar: "فلز قلوي", bg: "bg-rose-500/80", border: "border-rose-300/40", text: "text-rose-100" },
  alkaline: { ar: "فلز قلوي ترابي", bg: "bg-orange-500/80", border: "border-orange-300/40", text: "text-orange-50" },
  transition: { ar: "فلز انتقالي", bg: "bg-sky-600/80", border: "border-sky-300/40", text: "text-sky-50" },
  post: { ar: "فلز بعد انتقالي", bg: "bg-teal-600/80", border: "border-teal-300/40", text: "text-teal-50" },
  metalloid: { ar: "شبه فلز", bg: "bg-lime-600/75", border: "border-lime-300/40", text: "text-lime-50" },
  nonmetal: { ar: "لا فلز", bg: "bg-emerald-600/80", border: "border-emerald-300/40", text: "text-emerald-50" },
  halogen: { ar: "هالوجين", bg: "bg-yellow-500/80", border: "border-yellow-200/40", text: "text-yellow-950" },
  noble: { ar: "غاز نبيل", bg: "bg-indigo-500/80", border: "border-indigo-200/40", text: "text-indigo-50" },
  lanthanide: { ar: "لانثانيد", bg: "bg-fuchsia-600/80", border: "border-fuchsia-300/40", text: "text-fuchsia-50" },
  actinide: { ar: "أكتينيد", bg: "bg-pink-700/80", border: "border-pink-300/40", text: "text-pink-50" },
  unknown: { ar: "غير معروف", bg: "bg-slate-600/80", border: "border-slate-300/30", text: "text-slate-100" },
};

export const ELEMENTS: ChemElement[] = [
  { z: 1, s: "H", ar: "هيدروجين", en: "Hydrogen", mass: 1.008, cat: "nonmetal", col: 1, row: 1, config: "1s1", eneg: 2.2, uses: "وقود، أحماض، ماء" },
  { z: 2, s: "He", ar: "هيليوم", en: "Helium", mass: 4.003, cat: "noble", col: 18, row: 1, config: "1s2", uses: "بالونات، تبريد فائق" },
  { z: 3, s: "Li", ar: "ليثيوم", en: "Lithium", mass: 6.94, cat: "alkali", col: 1, row: 2, config: "[He] 2s1", eneg: 0.98, uses: "بطاريات" },
  { z: 4, s: "Be", ar: "بيريليوم", en: "Beryllium", mass: 9.012, cat: "alkaline", col: 2, row: 2, config: "[He] 2s2", eneg: 1.57, uses: "سبائك خفيفة" },
  { z: 5, s: "B", ar: "بورون", en: "Boron", mass: 10.81, cat: "metalloid", col: 13, row: 2, config: "[He] 2s2 2p1", eneg: 2.04, uses: "زجاج بوروسليكات" },
  { z: 6, s: "C", ar: "كربون", en: "Carbon", mass: 12.011, cat: "nonmetal", col: 14, row: 2, config: "[He] 2s2 2p2", eneg: 2.55, uses: "حياة عضوية، ألماس، جرافيت" },
  { z: 7, s: "N", ar: "نيتروجين", en: "Nitrogen", mass: 14.007, cat: "nonmetal", col: 15, row: 2, config: "[He] 2s2 2p3", eneg: 3.04, uses: "أمونيا، أسمدة" },
  { z: 8, s: "O", ar: "أكسجين", en: "Oxygen", mass: 15.999, cat: "nonmetal", col: 16, row: 2, config: "[He] 2s2 2p4", eneg: 3.44, uses: "تنفس، احتراق" },
  { z: 9, s: "F", ar: "فلور", en: "Fluorine", mass: 18.998, cat: "halogen", col: 17, row: 2, config: "[He] 2s2 2p5", eneg: 3.98, uses: "معجون أسنان، تفلون" },
  { z: 10, s: "Ne", ar: "نيون", en: "Neon", mass: 20.18, cat: "noble", col: 18, row: 2, config: "[He] 2s2 2p6", uses: "لافتات مضيئة" },
  { z: 11, s: "Na", ar: "صوديوم", en: "Sodium", mass: 22.99, cat: "alkali", col: 1, row: 3, config: "[Ne] 3s1", eneg: 0.93, uses: "ملح الطعام، مصابيح" },
  { z: 12, s: "Mg", ar: "مغنيسيوم", en: "Magnesium", mass: 24.305, cat: "alkaline", col: 2, row: 3, config: "[Ne] 3s2", eneg: 1.31, uses: "سبائك، ألعاب نارية" },
  { z: 13, s: "Al", ar: "ألومنيوم", en: "Aluminium", mass: 26.982, cat: "post", col: 13, row: 3, config: "[Ne] 3s2 3p1", eneg: 1.61, uses: "علب، طائرات" },
  { z: 14, s: "Si", ar: "سيليكون", en: "Silicon", mass: 28.085, cat: "metalloid", col: 14, row: 3, config: "[Ne] 3s2 3p2", eneg: 1.9, uses: "رقائق إلكترونية" },
  { z: 15, s: "P", ar: "فوسفور", en: "Phosphorus", mass: 30.974, cat: "nonmetal", col: 15, row: 3, config: "[Ne] 3s2 3p3", eneg: 2.19, uses: "أسمدة، عظام" },
  { z: 16, s: "S", ar: "كبريت", en: "Sulfur", mass: 32.06, cat: "nonmetal", col: 16, row: 3, config: "[Ne] 3s2 3p4", eneg: 2.58, uses: "حمض الكبريتيك" },
  { z: 17, s: "Cl", ar: "كلور", en: "Chlorine", mass: 35.45, cat: "halogen", col: 17, row: 3, config: "[Ne] 3s2 3p5", eneg: 3.16, uses: "تعقيم الماء، PVC" },
  { z: 18, s: "Ar", ar: "أرجون", en: "Argon", mass: 39.948, cat: "noble", col: 18, row: 3, config: "[Ne] 3s2 3p6", uses: "لحام، مصابيح" },
  { z: 19, s: "K", ar: "بوتاسيوم", en: "Potassium", mass: 39.098, cat: "alkali", col: 1, row: 4, config: "[Ar] 4s1", eneg: 0.82, uses: "أسمدة، أعصاب" },
  { z: 20, s: "Ca", ar: "كالسيوم", en: "Calcium", mass: 40.078, cat: "alkaline", col: 2, row: 4, config: "[Ar] 4s2", eneg: 1.0, uses: "عظام، إسمنت" },
  { z: 21, s: "Sc", ar: "سكانديوم", en: "Scandium", mass: 44.956, cat: "transition", col: 3, row: 4, config: "[Ar] 3d1 4s2", eneg: 1.36, uses: "سبائك خفيفة" },
  { z: 22, s: "Ti", ar: "تيتانيوم", en: "Titanium", mass: 47.867, cat: "transition", col: 4, row: 4, config: "[Ar] 3d2 4s2", eneg: 1.54, uses: "طيران، زراعات طبية" },
  { z: 23, s: "V", ar: "فاناديوم", en: "Vanadium", mass: 50.942, cat: "transition", col: 5, row: 4, config: "[Ar] 3d3 4s2", eneg: 1.63, uses: "صلب قوي" },
  { z: 24, s: "Cr", ar: "كروم", en: "Chromium", mass: 51.996, cat: "transition", col: 6, row: 4, config: "[Ar] 3d5 4s1", eneg: 1.66, uses: "طلاء، ستانلس" },
  { z: 25, s: "Mn", ar: "منجنيز", en: "Manganese", mass: 54.938, cat: "transition", col: 7, row: 4, config: "[Ar] 3d5 4s2", eneg: 1.55, uses: "صلب، بطاريات" },
  { z: 26, s: "Fe", ar: "حديد", en: "Iron", mass: 55.845, cat: "transition", col: 8, row: 4, config: "[Ar] 3d6 4s2", eneg: 1.83, uses: "صلب، هيموجلوبين" },
  { z: 27, s: "Co", ar: "كوبالت", en: "Cobalt", mass: 58.933, cat: "transition", col: 9, row: 4, config: "[Ar] 3d7 4s2", eneg: 1.88, uses: "مغناطيس، بطاريات" },
  { z: 28, s: "Ni", ar: "نيكل", en: "Nickel", mass: 58.693, cat: "transition", col: 10, row: 4, config: "[Ar] 3d8 4s2", eneg: 1.91, uses: "عملات، سبائك" },
  { z: 29, s: "Cu", ar: "نحاس", en: "Copper", mass: 63.546, cat: "transition", col: 11, row: 4, config: "[Ar] 3d10 4s1", eneg: 1.9, uses: "أسلاك كهرباء" },
  { z: 30, s: "Zn", ar: "زنك", en: "Zinc", mass: 65.38, cat: "transition", col: 12, row: 4, config: "[Ar] 3d10 4s2", eneg: 1.65, uses: "جلفنة، بطاريات" },
  { z: 31, s: "Ga", ar: "جاليوم", en: "Gallium", mass: 69.723, cat: "post", col: 13, row: 4, config: "[Ar] 3d10 4s2 4p1", eneg: 1.81, uses: "LED، أشباه موصلات" },
  { z: 32, s: "Ge", ar: "جرمانيوم", en: "Germanium", mass: 72.63, cat: "metalloid", col: 14, row: 4, config: "[Ar] 3d10 4s2 4p2", eneg: 2.01, uses: "إلكترونيات" },
  { z: 33, s: "As", ar: "زرنيخ", en: "Arsenic", mass: 74.922, cat: "metalloid", col: 15, row: 4, config: "[Ar] 3d10 4s2 4p3", eneg: 2.18, uses: "سبائك، أشباه موصلات" },
  { z: 34, s: "Se", ar: "سيلينيوم", en: "Selenium", mass: 78.971, cat: "nonmetal", col: 16, row: 4, config: "[Ar] 3d10 4s2 4p4", eneg: 2.55, uses: "خلايا ضوئية" },
  { z: 35, s: "Br", ar: "بروم", en: "Bromine", mass: 79.904, cat: "halogen", col: 17, row: 4, config: "[Ar] 3d10 4s2 4p5", eneg: 2.96, uses: "مثبطات لهب" },
  { z: 36, s: "Kr", ar: "كريبتون", en: "Krypton", mass: 83.798, cat: "noble", col: 18, row: 4, config: "[Ar] 3d10 4s2 4p6", uses: "إضاءة" },
  { z: 37, s: "Rb", ar: "روبيديوم", en: "Rubidium", mass: 85.468, cat: "alkali", col: 1, row: 5, config: "[Kr] 5s1", eneg: 0.82, uses: "ساعات ذرية" },
  { z: 38, s: "Sr", ar: "سترونشيوم", en: "Strontium", mass: 87.62, cat: "alkaline", col: 2, row: 5, config: "[Kr] 5s2", eneg: 0.95, uses: "ألعاب نارية حمراء" },
  { z: 39, s: "Y", ar: "إتريوم", en: "Yttrium", mass: 88.906, cat: "transition", col: 3, row: 5, config: "[Kr] 4d1 5s2", eneg: 1.22, uses: "ليزر، فوسفور" },
  { z: 40, s: "Zr", ar: "زركونيوم", en: "Zirconium", mass: 91.224, cat: "transition", col: 4, row: 5, config: "[Kr] 4d2 5s2", eneg: 1.33, uses: "مفاعلات نووية" },
  { z: 41, s: "Nb", ar: "نيوبيوم", en: "Niobium", mass: 92.906, cat: "transition", col: 5, row: 5, config: "[Kr] 4d4 5s1", eneg: 1.6, uses: "مغناطيس فائق" },
  { z: 42, s: "Mo", ar: "موليبدنوم", en: "Molybdenum", mass: 95.95, cat: "transition", col: 6, row: 5, config: "[Kr] 4d5 5s1", eneg: 2.16, uses: "صلب مقاوم" },
  { z: 43, s: "Tc", ar: "تكنيشيوم", en: "Technetium", mass: 98, cat: "transition", col: 7, row: 5, config: "[Kr] 4d5 5s2", eneg: 1.9, uses: "طب نووي" },
  { z: 44, s: "Ru", ar: "روثينيوم", en: "Ruthenium", mass: 101.07, cat: "transition", col: 8, row: 5, config: "[Kr] 4d7 5s1", eneg: 2.2, uses: "حفّازات" },
  { z: 45, s: "Rh", ar: "روديوم", en: "Rhodium", mass: 102.91, cat: "transition", col: 9, row: 5, config: "[Kr] 4d8 5s1", eneg: 2.28, uses: "محولات حفازة" },
  { z: 46, s: "Pd", ar: "بالاديوم", en: "Palladium", mass: 106.42, cat: "transition", col: 10, row: 5, config: "[Kr] 4d10", eneg: 2.2, uses: "حفّازات، مجوهرات" },
  { z: 47, s: "Ag", ar: "فضة", en: "Silver", mass: 107.87, cat: "transition", col: 11, row: 5, config: "[Kr] 4d10 5s1", eneg: 1.93, uses: "مجوهرات، موصل ممتاز" },
  { z: 48, s: "Cd", ar: "كادميوم", en: "Cadmium", mass: 112.41, cat: "transition", col: 12, row: 5, config: "[Kr] 4d10 5s2", eneg: 1.69, uses: "بطاريات" },
  { z: 49, s: "In", ar: "إنديوم", en: "Indium", mass: 114.82, cat: "post", col: 13, row: 5, config: "[Kr] 4d10 5s2 5p1", eneg: 1.78, uses: "شاشات لمس" },
  { z: 50, s: "Sn", ar: "قصدير", en: "Tin", mass: 118.71, cat: "post", col: 14, row: 5, config: "[Kr] 4d10 5s2 5p2", eneg: 1.96, uses: "لحام، تغليف" },
  { z: 51, s: "Sb", ar: "إثمد", en: "Antimony", mass: 121.76, cat: "metalloid", col: 15, row: 5, config: "[Kr] 4d10 5s2 5p3", eneg: 2.05, uses: "سبائك، مثبط لهب" },
  { z: 52, s: "Te", ar: "تيلوريوم", en: "Tellurium", mass: 127.6, cat: "metalloid", col: 16, row: 5, config: "[Kr] 4d10 5s2 5p4", eneg: 2.1, uses: "سبائك، طاقة شمسية" },
  { z: 53, s: "I", ar: "يود", en: "Iodine", mass: 126.9, cat: "halogen", col: 17, row: 5, config: "[Kr] 4d10 5s2 5p5", eneg: 2.66, uses: "مطهر، غدة درقية" },
  { z: 54, s: "Xe", ar: "زينون", en: "Xenon", mass: 131.29, cat: "noble", col: 18, row: 5, config: "[Kr] 4d10 5s2 5p6", uses: "مصابيح، تخدير" },
  { z: 55, s: "Cs", ar: "سيزيوم", en: "Caesium", mass: 132.91, cat: "alkali", col: 1, row: 6, config: "[Xe] 6s1", eneg: 0.79, uses: "ساعات ذرية" },
  { z: 56, s: "Ba", ar: "باريوم", en: "Barium", mass: 137.33, cat: "alkaline", col: 2, row: 6, config: "[Xe] 6s2", eneg: 0.89, uses: "أشعة سينية للجهاز الهضمي" },
  { z: 57, s: "La", ar: "لانثانوم", en: "Lanthanum", mass: 138.91, cat: "lanthanide", col: 3, row: 8, config: "[Xe] 5d1 6s2", eneg: 1.1, uses: "عدسات، بطاريات هجين" },
  { z: 58, s: "Ce", ar: "سيريوم", en: "Cerium", mass: 140.12, cat: "lanthanide", col: 4, row: 8, config: "[Xe] 4f1 5d1 6s2", eneg: 1.12, uses: "محفزات، صقل زجاج" },
  { z: 59, s: "Pr", ar: "براسيوديميوم", en: "Praseodymium", mass: 140.91, cat: "lanthanide", col: 5, row: 8, config: "[Xe] 4f3 6s2", eneg: 1.13, uses: "مغناطيس، زجاج" },
  { z: 60, s: "Nd", ar: "نيوديميوم", en: "Neodymium", mass: 144.24, cat: "lanthanide", col: 6, row: 8, config: "[Xe] 4f4 6s2", eneg: 1.14, uses: "مغناطيس قوي" },
  { z: 61, s: "Pm", ar: "بروميثيوم", en: "Promethium", mass: 145, cat: "lanthanide", col: 7, row: 8, config: "[Xe] 4f5 6s2", uses: "بطاريات نووية" },
  { z: 62, s: "Sm", ar: "ساماريوم", en: "Samarium", mass: 150.36, cat: "lanthanide", col: 8, row: 8, config: "[Xe] 4f6 6s2", eneg: 1.17, uses: "مغناطيس، طب نووي" },
  { z: 63, s: "Eu", ar: "يوروبيوم", en: "Europium", mass: 151.96, cat: "lanthanide", col: 9, row: 8, config: "[Xe] 4f7 6s2", eneg: 1.2, uses: "فوسفور أحمر للشاشات" },
  { z: 64, s: "Gd", ar: "جادولينيوم", en: "Gadolinium", mass: 157.25, cat: "lanthanide", col: 10, row: 8, config: "[Xe] 4f7 5d1 6s2", eneg: 1.2, uses: "رنين مغناطيسي" },
  { z: 65, s: "Tb", ar: "تربيوم", en: "Terbium", mass: 158.93, cat: "lanthanide", col: 11, row: 8, config: "[Xe] 4f9 6s2", eneg: 1.2, uses: "فوسفور أخضر" },
  { z: 66, s: "Dy", ar: "ديسبروسيوم", en: "Dysprosium", mass: 162.5, cat: "lanthanide", col: 12, row: 8, config: "[Xe] 4f10 6s2", eneg: 1.22, uses: "مغناطيس عالي الحرارة" },
  { z: 67, s: "Ho", ar: "هولميوم", en: "Holmium", mass: 164.93, cat: "lanthanide", col: 13, row: 8, config: "[Xe] 4f11 6s2", eneg: 1.23, uses: "ليزر طبي" },
  { z: 68, s: "Er", ar: "إربيوم", en: "Erbium", mass: 167.26, cat: "lanthanide", col: 14, row: 8, config: "[Xe] 4f12 6s2", eneg: 1.24, uses: "ألياف ضوئية" },
  { z: 69, s: "Tm", ar: "ثوليوم", en: "Thulium", mass: 168.93, cat: "lanthanide", col: 15, row: 8, config: "[Xe] 4f13 6s2", eneg: 1.25, uses: "أشعة سينية محمولة" },
  { z: 70, s: "Yb", ar: "إتيربيوم", en: "Ytterbium", mass: 173.05, cat: "lanthanide", col: 16, row: 8, config: "[Xe] 4f14 6s2", eneg: 1.1, uses: "ليزر، ساعات" },
  { z: 71, s: "Lu", ar: "لوتيتيوم", en: "Lutetium", mass: 174.97, cat: "lanthanide", col: 17, row: 8, config: "[Xe] 4f14 5d1 6s2", eneg: 1.27, uses: "حفّازات، PET" },
  { z: 72, s: "Hf", ar: "هافنيوم", en: "Hafnium", mass: 178.49, cat: "transition", col: 4, row: 6, config: "[Xe] 4f14 5d2 6s2", eneg: 1.3, uses: "قضبان تحكم نووية" },
  { z: 73, s: "Ta", ar: "تانتالوم", en: "Tantalum", mass: 180.95, cat: "transition", col: 5, row: 6, config: "[Xe] 4f14 5d3 6s2", eneg: 1.5, uses: "مكثفات إلكترونية" },
  { z: 74, s: "W", ar: "تنجستن", en: "Tungsten", mass: 183.84, cat: "transition", col: 6, row: 6, config: "[Xe] 4f14 5d4 6s2", eneg: 2.36, uses: "فتيل المصباح" },
  { z: 75, s: "Re", ar: "رينيوم", en: "Rhenium", mass: 186.21, cat: "transition", col: 7, row: 6, config: "[Xe] 4f14 5d5 6s2", eneg: 1.9, uses: "محركات نفاثة" },
  { z: 76, s: "Os", ar: "أوزميوم", en: "Osmium", mass: 190.23, cat: "transition", col: 8, row: 6, config: "[Xe] 4f14 5d6 6s2", eneg: 2.2, uses: "سبائك صلدة" },
  { z: 77, s: "Ir", ar: "إريديوم", en: "Iridium", mass: 192.22, cat: "transition", col: 9, row: 6, config: "[Xe] 4f14 5d7 6s2", eneg: 2.2, uses: "شمعات احتراق" },
  { z: 78, s: "Pt", ar: "بلاتين", en: "Platinum", mass: 195.08, cat: "transition", col: 10, row: 6, config: "[Xe] 4f14 5d9 6s1", eneg: 2.28, uses: "حفّازات، مجوهرات" },
  { z: 79, s: "Au", ar: "ذهب", en: "Gold", mass: 196.97, cat: "transition", col: 11, row: 6, config: "[Xe] 4f14 5d10 6s1", eneg: 2.54, uses: "مجوهرات، إلكترونيات" },
  { z: 80, s: "Hg", ar: "زئبق", en: "Mercury", mass: 200.59, cat: "transition", col: 12, row: 6, config: "[Xe] 4f14 5d10 6s2", eneg: 2.0, uses: "موازين حرارة قديمة" },
  { z: 81, s: "Tl", ar: "ثاليوم", en: "Thallium", mass: 204.38, cat: "post", col: 13, row: 6, config: "[Xe] 4f14 5d10 6s2 6p1", eneg: 1.62, uses: "إلكترونيات" },
  { z: 82, s: "Pb", ar: "رصاص", en: "Lead", mass: 207.2, cat: "post", col: 14, row: 6, config: "[Xe] 4f14 5d10 6s2 6p2", eneg: 2.33, uses: "بطاريات، تدريع إشعاعي" },
  { z: 83, s: "Bi", ar: "بزموت", en: "Bismuth", mass: 208.98, cat: "post", col: 15, row: 6, config: "[Xe] 4f14 5d10 6s2 6p3", eneg: 2.02, uses: "أدوية، سبائك" },
  { z: 84, s: "Po", ar: "بولونيوم", en: "Polonium", mass: 209, cat: "post", col: 16, row: 6, config: "[Xe] 4f14 5d10 6s2 6p4", eneg: 2.0, uses: "مصادر حرارة نووية" },
  { z: 85, s: "At", ar: "أستاتين", en: "Astatine", mass: 210, cat: "halogen", col: 17, row: 6, config: "[Xe] 4f14 5d10 6s2 6p5", eneg: 2.2, uses: "بحث طبي" },
  { z: 86, s: "Rn", ar: "رادون", en: "Radon", mass: 222, cat: "noble", col: 18, row: 6, config: "[Xe] 4f14 5d10 6s2 6p6", uses: "علاج إشعاعي قديم" },
  { z: 87, s: "Fr", ar: "فرانسيوم", en: "Francium", mass: 223, cat: "alkali", col: 1, row: 7, config: "[Rn] 7s1", eneg: 0.7, uses: "بحث علمي" },
  { z: 88, s: "Ra", ar: "راديوم", en: "Radium", mass: 226, cat: "alkaline", col: 2, row: 7, config: "[Rn] 7s2", eneg: 0.9, uses: "علاج إشعاعي تاريخي" },
  { z: 89, s: "Ac", ar: "أكتينيوم", en: "Actinium", mass: 227, cat: "actinide", col: 3, row: 9, config: "[Rn] 6d1 7s2", uses: "مصادر نيوترون" },
  { z: 90, s: "Th", ar: "ثوريوم", en: "Thorium", mass: 232.04, cat: "actinide", col: 4, row: 9, config: "[Rn] 6d2 7s2", eneg: 1.3, uses: "وقود نووي محتمل" },
  { z: 91, s: "Pa", ar: "بروتكتينيوم", en: "Protactinium", mass: 231.04, cat: "actinide", col: 5, row: 9, config: "[Rn] 5f2 6d1 7s2", eneg: 1.5, uses: "بحث علمي" },
  { z: 92, s: "U", ar: "يورانيوم", en: "Uranium", mass: 238.03, cat: "actinide", col: 6, row: 9, config: "[Rn] 5f3 6d1 7s2", eneg: 1.38, uses: "طاقة نووية" },
  { z: 93, s: "Np", ar: "نبتونيوم", en: "Neptunium", mass: 237, cat: "actinide", col: 7, row: 9, config: "[Rn] 5f4 6d1 7s2", eneg: 1.36, uses: "بحث نووي" },
  { z: 94, s: "Pu", ar: "بلوتونيوم", en: "Plutonium", mass: 244, cat: "actinide", col: 8, row: 9, config: "[Rn] 5f6 7s2", eneg: 1.28, uses: "مفاعلات، بطاريات فضاء" },
  { z: 95, s: "Am", ar: "أمريسيوم", en: "Americium", mass: 243, cat: "actinide", col: 9, row: 9, config: "[Rn] 5f7 7s2", eneg: 1.3, uses: "كواشف دخان" },
  { z: 96, s: "Cm", ar: "كوريوم", en: "Curium", mass: 247, cat: "actinide", col: 10, row: 9, config: "[Rn] 5f7 6d1 7s2", eneg: 1.3, uses: "مصادر طاقة فضائية" },
  { z: 97, s: "Bk", ar: "بركيليوم", en: "Berkelium", mass: 247, cat: "actinide", col: 11, row: 9, config: "[Rn] 5f9 7s2", uses: "بحث علمي" },
  { z: 98, s: "Cf", ar: "كاليفورنيوم", en: "Californium", mass: 251, cat: "actinide", col: 12, row: 9, config: "[Rn] 5f10 7s2", uses: "مصدر نيوترونات" },
  { z: 99, s: "Es", ar: "أينشتاينيوم", en: "Einsteinium", mass: 252, cat: "actinide", col: 13, row: 9, config: "[Rn] 5f11 7s2", uses: "بحث علمي" },
  { z: 100, s: "Fm", ar: "فيرميوم", en: "Fermium", mass: 257, cat: "actinide", col: 14, row: 9, config: "[Rn] 5f12 7s2", uses: "بحث علمي" },
  { z: 101, s: "Md", ar: "مندليفيوم", en: "Mendelevium", mass: 258, cat: "actinide", col: 15, row: 9, config: "[Rn] 5f13 7s2", uses: "بحث علمي" },
  { z: 102, s: "No", ar: "نوبليوم", en: "Nobelium", mass: 259, cat: "actinide", col: 16, row: 9, config: "[Rn] 5f14 7s2", uses: "بحث علمي" },
  { z: 103, s: "Lr", ar: "لورنسيوم", en: "Lawrencium", mass: 266, cat: "actinide", col: 17, row: 9, config: "[Rn] 5f14 7s2 7p1", uses: "بحث علمي" },
  { z: 104, s: "Rf", ar: "رذرفورديوم", en: "Rutherfordium", mass: 267, cat: "transition", col: 4, row: 7, config: "[Rn] 5f14 6d2 7s2", uses: "بحث علمي" },
  { z: 105, s: "Db", ar: "دبنيوم", en: "Dubnium", mass: 268, cat: "transition", col: 5, row: 7, config: "[Rn] 5f14 6d3 7s2", uses: "بحث علمي" },
  { z: 106, s: "Sg", ar: "سيبورغيوم", en: "Seaborgium", mass: 269, cat: "transition", col: 6, row: 7, config: "[Rn] 5f14 6d4 7s2", uses: "بحث علمي" },
  { z: 107, s: "Bh", ar: "بوريوم", en: "Bohrium", mass: 270, cat: "transition", col: 7, row: 7, config: "[Rn] 5f14 6d5 7s2", uses: "بحث علمي" },
  { z: 108, s: "Hs", ar: "هاسيوم", en: "Hassium", mass: 277, cat: "transition", col: 8, row: 7, config: "[Rn] 5f14 6d6 7s2", uses: "بحث علمي" },
  { z: 109, s: "Mt", ar: "مايتنريوم", en: "Meitnerium", mass: 278, cat: "unknown", col: 9, row: 7, config: "[Rn] 5f14 6d7 7s2", uses: "بحث علمي" },
  { z: 110, s: "Ds", ar: "دارمشتاتيوم", en: "Darmstadtium", mass: 281, cat: "unknown", col: 10, row: 7, config: "[Rn] 5f14 6d8 7s2", uses: "بحث علمي" },
  { z: 111, s: "Rg", ar: "رونتجينيوم", en: "Roentgenium", mass: 282, cat: "unknown", col: 11, row: 7, config: "[Rn] 5f14 6d9 7s2", uses: "بحث علمي" },
  { z: 112, s: "Cn", ar: "كوبرنيسيوم", en: "Copernicium", mass: 285, cat: "transition", col: 12, row: 7, config: "[Rn] 5f14 6d10 7s2", uses: "بحث علمي" },
  { z: 113, s: "Nh", ar: "نيهونيوم", en: "Nihonium", mass: 286, cat: "unknown", col: 13, row: 7, config: "[Rn] 5f14 6d10 7s2 7p1", uses: "بحث علمي" },
  { z: 114, s: "Fl", ar: "فليروفيوم", en: "Flerovium", mass: 289, cat: "unknown", col: 14, row: 7, config: "[Rn] 5f14 6d10 7s2 7p2", uses: "بحث علمي" },
  { z: 115, s: "Mc", ar: "موسكوفيوم", en: "Moscovium", mass: 290, cat: "unknown", col: 15, row: 7, config: "[Rn] 5f14 6d10 7s2 7p3", uses: "بحث علمي" },
  { z: 116, s: "Lv", ar: "ليفرموريوم", en: "Livermorium", mass: 293, cat: "unknown", col: 16, row: 7, config: "[Rn] 5f14 6d10 7s2 7p4", uses: "بحث علمي" },
  { z: 117, s: "Ts", ar: "تينيسين", en: "Tennessine", mass: 294, cat: "unknown", col: 17, row: 7, config: "[Rn] 5f14 6d10 7s2 7p5", uses: "بحث علمي" },
  { z: 118, s: "Og", ar: "أوغانيسون", en: "Oganesson", mass: 294, cat: "unknown", col: 18, row: 7, config: "[Rn] 5f14 6d10 7s2 7p6", uses: "بحث علمي" },
];
