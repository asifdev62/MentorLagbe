"use client";

import { useInView } from "@/components/reveal";

const PATHS = {
  up: "M38 76 C98 0, 150 0, 182 58",
  down: "M38 94 C98 170, 150 170, 182 112",
};

type StepConnectorProps = {
  id: string;
  direction: "up" | "down";
};

/**
 * Dashed arrow that starts flowing once the process section is on screen.
 */
export default function StepConnector({ id, direction }: StepConnectorProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <div ref={ref} className="h-auto w-full">
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
          className={`transition-opacity duration-700 ${
            inView ? "animate-dash opacity-100" : "opacity-0"
          }`}
        />
      </svg>
    </div>
  );
}
