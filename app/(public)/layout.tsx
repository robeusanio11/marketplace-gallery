import { NavBar } from "@/components/NavBar";
import { siteConfig } from "@/lib/config";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 flex flex-col overflow-y-auto">{children}</main>
      <footer className="border-t-2 border-border px-6 py-4 text-center text-xs tracking-wider text-muted-foreground space-y-1">
        <p>© {new Date().getFullYear()} {siteConfig.companyName}. All items sold as-is.</p>
        <p>
          Website developed by{" "}
          <a
            href="https://robeusanio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors underline underline-offset-4"
          >
            Rob Eusanio
          </a>
        </p>
      </footer>
    </div>
  );
}
