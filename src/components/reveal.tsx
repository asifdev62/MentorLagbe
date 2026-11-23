"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);

  query.addEventListener("change", callback);

  return () => query.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

type UseInViewOptions = {
  threshold?: number;
  rootMargin?: string;
};

/**
 * Fires once when the element scrolls into the viewport.
 * Falls back to "visible" when IntersectionObserver is unavailable.
 */
export function useInView<T extends HTMLElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -60px 0px",
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in ms, useful for staggering a group of items. */
  delay?: number;
  /** Distance in px the element travels while fading in. */
  y?: number;
};

/**
 * Fades + slides its children in the first time they enter the viewport.
 * Server components can use it directly since it is a client boundary.
 */
export function Reveal({ children, className = "", delay = 0, y = 18 }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "reveal-in" : ""} ${className}`.trim()}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-y": `${y}px`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

type CountUpProps = {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Counts up from 0 to `end` the first time it becomes visible.
 * Renders the final value immediately when the user prefers reduced motion.
 */
export function CountUp({
  end,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1600,
  className = "",
}: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const prefersReduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  const current = prefersReduced ? end : value;

  useEffect(() => {
    if (!inView || prefersReduced) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(end * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [inView, end, duration, prefersReduced]);

  const display = current.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  const finalDisplay = end.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span
      ref={ref}
      className={className}
      aria-label={`${prefix}${finalDisplay}${suffix}`}
    >
      <span aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
    </span>
  );
}

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Card wrapper that moves a soft radial highlight towards the cursor.
 */
export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();

    target.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`spotlight-card ${className}`.trim()}
    >
      {children}
    </div>
  );
}
