import Link from "next/link";
import { siteConfig } from "@/lib/config";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export function NavBar() {
  return (
    <header className="border-b-2 border-border px-6 py-5 flex items-center justify-between gap-4">
      <Link
        href="/"
        className="font-heading text-xl font-bold tracking-[0.2em] uppercase hover:text-primary transition-colors"
      >
        {siteConfig.companyName}
      </Link>
      <nav className="flex items-center gap-8">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
