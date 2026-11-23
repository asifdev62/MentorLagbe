import {
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  BookOpen,
  Languages,
  Cpu,
  Sigma,
  Briefcase,
  GraduationCap,
} from "lucide-react";

const subjects = [
  { label: "Mathematics", icon: Calculator },
  { label: "Physics", icon: Atom },
  { label: "Chemistry", icon: FlaskConical },
  { label: "Biology", icon: Dna },
  { label: "English", icon: BookOpen },
  { label: "Bangla", icon: Languages },
  { label: "ICT", icon: Cpu },
  { label: "Higher Math", icon: Sigma },
  { label: "Accounting", icon: Briefcase },
  { label: "Admission Prep", icon: GraduationCap },
];

function Chip({ label, icon: Icon }: (typeof subjects)[number]) {
  return (
    <span className="mr-3 inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-brand/40 hover:bg-brand/5 hover:text-brand">
      <Icon size={16} className="text-brand" />
      {label}
    </span>
  );
}

export default function SubjectMarquee() {
  return (
    <section
      aria-label="Popular subjects"
      className="border-y border-slate-100 bg-white/80 py-5"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 lg:px-8">
        <span className="hidden shrink-0 text-[11px] font-bold tracking-[0.18em] text-slate-400 uppercase md:block">
          Popular subjects
        </span>

        <div className="marquee-host marquee-fade relative flex-1 overflow-hidden">
          <div className="marquee-track">
            {subjects.map((subject) => (
              <Chip key={subject.label} {...subject} />
            ))}

            {/* Duplicate half keeps the loop seamless */}
            <div aria-hidden="true" className="contents">
              {subjects.map((subject) => (
                <Chip key={`${subject.label}-clone`} {...subject} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
