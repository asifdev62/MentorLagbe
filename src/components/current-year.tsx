"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

const getClientYear = () => String(new Date().getFullYear());

// Keep the server snapshot stable so the static shell never reads the clock
// during prerendering. The browser snapshot fills in the year after hydration.
const getServerYear = () => "";

export default function CurrentYear() {
  const year = useSyncExternalStore(subscribe, getClientYear, getServerYear);

  return <>{year}</>;
}
