"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export default function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => String(new Date().getFullYear()), // browser-এ
    () => "" // server/prerender-এ
  );

  return <>{year}</>;
}