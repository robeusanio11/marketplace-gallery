"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove("animate-page-in");
    void el.offsetWidth; // force reflow to restart animation
    el.classList.add("animate-page-in");
  }, [pathname]);

  return (
    <div ref={ref} className="animate-page-in flex-1 flex flex-col">
      {children}
    </div>
  );
}
