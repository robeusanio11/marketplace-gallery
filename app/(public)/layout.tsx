import { NavBar } from "@/components/NavBar";
import { siteConfig } from "@/lib/config";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">{children}</main>
      <footer className="border-t px-6 py-4 text-center text-sm text-muted-foreground space-y-1">
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
