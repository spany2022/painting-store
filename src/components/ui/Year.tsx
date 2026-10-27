"use client";

import { useEffect, useState } from "react";

/** Current year, resolved on the client so the prerendered shell stays static. */
export function Year() {
  const [year, setYear] = useState<number | null>(null);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <span>{year}</span>;
}
