"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";

export function ProductsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const availableOnly = searchParams.get("available") === "1";
  const activeCategory = searchParams.get("category") ?? "";

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`);
  }

  const btn = "cursor-pointer text-xs font-heading font-bold tracking-[0.2em] uppercase px-4 h-9 border transition-colors";
  const active = "bg-foreground text-background border-foreground";
  const inactive = "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground";

  return (
    <div className="flex flex-col gap-2 items-end">
      {/* Available toggle */}
      <div className="flex">
        <button onClick={() => setParam("available", null)} className={`${btn} ${!availableOnly ? active : inactive}`}>
          All
        </button>
        <button onClick={() => setParam("available", "1")} className={`${btn} -ml-px ${availableOnly ? active : inactive}`}>
          Available
        </button>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap justify-end">
        <button
          onClick={() => setParam("category", null)}
          className={`${btn} ${!activeCategory ? active : inactive}`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => setParam("category", c.value)}
            className={`${btn} -ml-px ${activeCategory === c.value ? active : inactive}`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
