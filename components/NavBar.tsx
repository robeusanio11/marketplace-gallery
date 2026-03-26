"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const links = [
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="border-b-2 border-border px-6 py-5 flex items-center justify-between gap-4">
      <Link
        href="/products"
        className="font-heading text-xl font-bold tracking-[0.2em] uppercase hover:text-primary transition-colors"
      >
        {siteConfig.companyName}
      </Link>
      <nav className="flex items-center gap-8">
        {links.map(({ href, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative text-xs font-semibold tracking-[0.2em] uppercase transition-colors pb-1",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-[2px] w-full bg-foreground transition-transform duration-300 origin-left",
                  active ? "scale-x-100" : "scale-x-0"
                )}
              />
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
