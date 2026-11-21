
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
    description: "Evaluate tutors & start learning with your favorite one.",
  },
];

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
            stroke="#087F9F"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      <path
        d={PATHS[direction]}
        fill="none"
        stroke="#087F9F"
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
    <section className="bg-white py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="text-balance text-2xl font-bold leading-snug tracking-tight text-[#20242C] sm:text-3xl lg:text-[40px]">
          The ways <span className="text-[#087F9F]">Students/Parents</span> can
          connect with us.
        </h2>

        <div className="relative mt-10 grid grid-cols-1 gap-y-10 sm:mt-14 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 lg:mt-20 lg:grid-cols-4 lg:gap-x-0 lg:gap-y-0">
          {/* Dashed curved arrows between the circles (large screens only) */}
          {connectors.map(({ left, direction, id }) => (
            <div
              key={id}
              className="pointer-events-none absolute top-10 z-0 hidden w-1/4 -translate-y-1/2 lg:block xl:top-12"
              style={{ left }}
            >
              <Connector id={id} direction={direction} />
            </div>
          ))}

          {steps.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="relative z-10 flex flex-col items-center px-2 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#087F9F] text-white shadow-[0_12px_28px_-8px_rgba(8,127,159,0.45)] ring-[5px] ring-[#087F9F]/15 sm:h-20 sm:w-20 sm:ring-[6px] xl:h-24 xl:w-24">
                <Icon
                  size={26}
                  strokeWidth={1.9}
                  className="sm:size-[30px] xl:size-[34px]"
                />
              </div>

              <h3 className="mt-5 text-base font-semibold text-[#20242C] sm:mt-6 sm:text-lg xl:mt-7 xl:text-xl">
                {title}
              </h3>

              <p className="mt-2.5 max-w-[290px] text-pretty text-sm leading-6 text-[#4C5462] sm:text-[15px] sm:leading-7">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
