"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function ProductsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const availableOnly = searchParams.get("available") === "1";

  function select(available: boolean) {
    const params = new URLSearchParams(searchParams.toString());
    if (available) {
      params.set("available", "1");
    } else {
      params.delete("available");
    }
    router.push(`/products?${params.toString()}`);
  }

  const base = "cursor-pointer text-xs font-heading font-bold tracking-[0.2em] uppercase px-4 h-9 border transition-colors";
  const active = "bg-foreground text-background border-foreground";
  const inactive = "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground";

  return (
    <div className="flex">
      <button onClick={() => select(false)} className={`${base} ${!availableOnly ? active : inactive}`}>
        All
      </button>
      <button onClick={() => select(true)} className={`${base} -ml-px ${availableOnly ? active : inactive}`}>
        Available
      </button>
    </div>
  );
}
