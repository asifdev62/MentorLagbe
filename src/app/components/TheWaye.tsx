import {
  UserRoundPlus,
  ClipboardList,
  FileText,
  BadgeCheck,
} from "lucide-react";

const steps = [
  {
    icon: UserRoundPlus,
    title: "Create Profile",
    description: "Create a profile to get more learning benefits from website.",
  },
  {
    icon: ClipboardList,
    title: "Submit Requirements",
    description: "Fill up expected tutor requirements & submit the request.",
  },
  {
    icon: FileText,
    title: "Get Tutors' CV",
    description: "On requirements, we will provide some expert tutors' CVs.",
  },
  {
    icon: BadgeCheck,
    title: "Select Your Tutor",
    description:
      "Evaluate tutors & start learning with your favorite one.",
  },
];

/* Center of each step column (percentage of the 4-column grid). */
const connectors = [
  { left: "12.5%", direction: "up" as const, id: "connect-arrow-1" },
  { left: "37.5%", direction: "down" as const, id: "connect-arrow-2" },
  { left: "62.5%", direction: "up" as const, id: "connect-arrow-3" },
];

const PATHS = {
  up: "M38 76 C98 0, 150 0, 182 58",
  down: "M38 94 C98 170, 150 170, 182 112",
};

function Connector({
  id,
  direction,
}: {
  id: string;
  direction: "up" | "down";
}) {
  return (
    <svg
      viewBox="0 0 220 170"
      className="h-auto w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <marker
          id={id}
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path
            d="M0 0 L10 5 L0 10"
            fill="none"
            stroke="#155DFC"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      <path
        d={PATHS[direction]}
        fill="none"
        stroke="#155DFC"
        strokeOpacity="0.75"
        strokeWidth="1.6"
        strokeDasharray="5 7"
        strokeLinecap="round"
        markerEnd={`url(#${id})`}
      />
    </svg>
  );
}

export default function TheWayes() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="text-2xl font-bold leading-snug tracking-tight text-[#20242C] sm:text-3xl lg:text-[40px]">
          The ways <span className="text-[#155DFC]">Students/Parents</span> can
          connect with us.
        </h2>

        <div className="relative mt-14 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:mt-20 lg:grid-cols-4 lg:gap-x-0 lg:gap-y-0">
          {/* Dashed curved arrows between the circles (large screens only) */}
          {connectors.map(({ left, direction, id }) => (
            <div
              key={id}
              className="pointer-events-none absolute top-10 z-0 hidden w-1/4 -translate-y-1/2 lg:block"
              style={{ left }}
            >
              <Connector id={id} direction={direction} />
            </div>
          ))}

          {steps.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#155DFC] text-white shadow-[0_12px_28px_-8px_rgba(21,93,252,0.45)] ring-[6px] ring-[#155DFC]/15 xl:h-24 xl:w-24">
                <Icon size={30} strokeWidth={1.9} className="xl:size-[34px]" />
              </div>

              <h3 className="mt-7 text-lg font-semibold text-[#20242C] xl:text-xl">
                {title}
              </h3>

              <p className="mt-3 max-w-[270px] text-[15px] leading-7 text-[#4C5462]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
