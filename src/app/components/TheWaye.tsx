
import {
  UserRoundPlus,
  ClipboardList,
  FileText,
  BadgeCheck,
} from "lucide-react";

import { Reveal } from "@/components/reveal";
import StepConnector from "./step-connector";

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

export default function TheWayes() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <h2 className="text-balance text-2xl leading-snug font-bold tracking-tight text-[#20242C] sm:text-3xl lg:text-[40px]">
            The ways <span className="text-brand">Students/Parents</span> can
            connect with us.
          </h2>
        </Reveal>

        <div className="relative mt-10 grid grid-cols-1 gap-y-10 sm:mt-14 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 lg:mt-20 lg:grid-cols-4 lg:gap-x-0 lg:gap-y-0">
          {/* Dashed curved arrows between the circles (large screens only) */}
          {connectors.map(({ left, direction, id }) => (
            <div
              key={id}
              className="pointer-events-none absolute top-10 z-0 hidden w-1/4 -translate-y-1/2 lg:block xl:top-12"
              style={{ left }}
            >
              <StepConnector id={id} direction={direction} />
            </div>
          ))}

          {steps.map(({ icon: Icon, title, description }, index) => (
            <Reveal
              key={title}
              delay={index * 110}
              className="relative z-10"
            >
              <div className="group flex flex-col items-center px-2 text-center">
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-[0_12px_28px_-8px_rgba(8,127,159,0.45)] ring-[5px] ring-brand/15 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_38px_-10px_rgba(8,127,159,0.55)] sm:h-20 sm:w-20 sm:ring-[6px] xl:h-24 xl:w-24">
                    <Icon
                      size={26}
                      strokeWidth={1.9}
                      className="transition-transform duration-300 group-hover:scale-110 sm:size-[30px] xl:size-[34px]"
                    />
                  </div>

                  <span className="absolute -top-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-white text-[11px] font-extrabold text-brand shadow-md shadow-brand/20 ring-1 ring-brand/15">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 text-base font-semibold text-[#20242C] transition-colors duration-300 group-hover:text-brand sm:mt-6 sm:text-lg xl:mt-7 xl:text-xl">
                  {title}
                </h3>

                <p className="mt-2.5 max-w-[290px] text-pretty text-sm leading-6 text-[#4C5462] sm:text-[15px] sm:leading-7">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
