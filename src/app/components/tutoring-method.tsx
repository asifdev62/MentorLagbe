
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { House, MonitorPlay, BookOpenCheck, Users, Plus } from "lucide-react";

import { Reveal } from "@/components/reveal";

const methods = [
  {
    icon: House,
    title: "Home Tutoring",
    description: "Personalized learning at home",
  },
  {
    icon: MonitorPlay,
    title: "Online Tutoring",
    description: "Flexible learning from anywhere",
  },
  {
    icon: BookOpenCheck,
    title: "Crash Program",
    description: "Fast-track your exam prep",
  },
  {
    icon: Users,
    title: "Batch Tutoring",
    description: "Group learning, better results",
  },
];

const HATCH =
  "repeating-linear-gradient(45deg, rgba(17,27,53,0.07) 0 1.2px, transparent 1.2px 10px)";

function Feature({
  icon: Icon,
  title,
  description,
  align = "left",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  align?: "left" | "right";
}) {
  return (
    <div
      className={`group flex w-full max-w-[300px] flex-col ${
        align === "right" ? "items-end text-right" : "items-start text-left"
      }`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white shadow-[0_8px_18px_-6px_rgba(8,127,159,0.55)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_14px_26px_-8px_rgba(8,127,159,0.65)] sm:h-11 sm:w-11 xl:h-12 xl:w-12">
        <Icon
          size={20}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:scale-110 xl:size-[22px]"
        />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-[#20242C] transition-colors duration-300 group-hover:text-brand sm:text-xl xl:mt-5 xl:text-2xl">
        {title}
      </h3>

      <p className="mt-1.5 text-pretty text-sm text-[#5B6472] sm:text-[15px] xl:text-base">
        {description}
      </p>
    </div>
  );
}

function MethodCircle() {
  return (
    <div className="relative mx-auto aspect-square w-[78vw] max-w-[300px] sm:w-[340px] sm:max-w-[340px] lg:w-[380px] lg:max-w-[380px] xl:w-[430px] xl:max-w-[430px]">
      {/* Pale outer ring */}
      <div className="absolute inset-0 rounded-full border-[10px] border-brand/15 sm:border-[12px] xl:border-[14px]" />

      {/* Dashed circle - slowly rotates */}
      <div className="absolute inset-[4.5%] animate-spin-slow rounded-full border-2 border-dashed border-[#4B5563]/75" />

      {/* Plus badges */}
      {[45, 135, 225, 315].map((deg, index) => (
        <div
          key={deg}
          className="absolute inset-[4.5%]"
          style={{ transform: `rotate(${deg}deg)` }}
        >
          <span
            className="animate-pulse-soft absolute top-0 left-1/2 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white shadow-[0_4px_10px_rgba(8,127,159,0.4)] sm:h-6 sm:w-6"
            style={{ animationDelay: `${index * 600}ms` }}
          >
            <span
              className="flex items-center justify-center"
              style={{
                transform: `rotate(${-deg}deg)`,
                transformOrigin: "center",
              }}
            >
              <Plus
                size={11}
                strokeWidth={2.6}
                className="sm:size-[13px]"
              />
            </span>
          </span>
        </div>
      ))}

      {/* Photo */}
      <div className="absolute top-1/2 left-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-brand/5 shadow-[0_24px_60px_-24px_rgba(17,27,53,0.45)] ring-4 ring-white">
        <Image
          src="/images/photo.png"
          alt="A student using MentorLagbe on the go"
          fill
          sizes="(min-width: 1280px) 344px, (min-width: 1024px) 304px, (min-width: 640px) 272px, 78vw"
          className="object-cover object-[50%_15%]"
        />
      </div>
    </div>
  );
}

function Backdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Faint dashed grid */}
      <svg
        className="absolute inset-x-0 top-32 bottom-0 w-full"
        focusable="false"
      >
        <defs>
          <pattern
            id="tutoring-method-grid"
            width="236"
            height="236"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M236 0V236 M0 236H236"
              fill="none"
              stroke="#111B35"
              strokeOpacity="0.16"
              strokeWidth="1.5"
              strokeDasharray="5 8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tutoring-method-grid)" />
      </svg>

      {/* Diagonal hatch accents */}
      <div
        className="absolute top-0 right-0 hidden h-44 w-[24%] md:block"
        style={{ backgroundImage: HATCH }}
      />
      <div
        className="absolute top-[42%] left-0 hidden h-64 w-[13%] md:block"
        style={{ backgroundImage: HATCH }}
      />
      <div
        className="absolute top-[42%] right-0 hidden h-64 w-[13%] md:block"
        style={{ backgroundImage: HATCH }}
      />
    </div>
  );
}

export default function TutoringMethod() {
  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-24">
      <Backdrop />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <h2 className="text-balance text-2xl leading-snug font-bold tracking-tight text-[#20242C] sm:text-3xl lg:text-[40px]">
            Tutoring <span className="text-brand">Method</span>
          </h2>
        </Reveal>

        {/* Desktop: features around the circle */}
        <div className="mt-12 hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-x-10 xl:mt-14 xl:gap-x-24">
          <div className="flex flex-col items-end justify-between gap-12 py-2 xl:gap-16">
            <Reveal delay={80} className="flex w-full justify-end">
              <Feature {...methods[0]} align="right" />
            </Reveal>

            <Reveal delay={240} className="flex w-full justify-end">
              <Feature {...methods[2]} align="right" />
            </Reveal>
          </div>

          <Reveal y={28}>
            <MethodCircle />
          </Reveal>

          <div className="flex flex-col items-start justify-between gap-12 py-2 xl:gap-16">
            <Reveal delay={160} className="flex w-full justify-start">
              <Feature {...methods[1]} align="left" />
            </Reveal>

            <Reveal delay={320} className="flex w-full justify-start">
              <Feature {...methods[3]} align="left" />
            </Reveal>
          </div>
        </div>

        {/* Mobile & tablet */}
        <div className="mt-10 lg:hidden">
          <Reveal y={28}>
            <MethodCircle />
          </Reveal>

          <div className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10">
            {methods.map((method, index) => (
              <Reveal key={method.title} delay={index * 90}>
                <Feature {...method} align="left" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
