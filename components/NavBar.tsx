import Link from "next/link";
import { siteConfig } from "@/lib/config";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export function NavBar() {
  return (
    <header className="border-b px-6 py-4 flex items-center justify-between gap-4">
      <Link href="/" className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity">
        {siteConfig.companyName}
      </Link>
      <nav className="flex items-center gap-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
