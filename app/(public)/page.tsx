import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FacebookIcon } from "@/components/SocialIcons";
import { siteConfig } from "@/lib/config";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 gap-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          {siteConfig.companyName}
        </h1>
        <p className="text-lg text-muted-foreground max-w-md">
          {siteConfig.tagline}
        </p>
        <p className="text-muted-foreground max-w-sm">{siteConfig.description}</p>
        <Link
          href="/products"
          className={cn(buttonVariants({ size: "lg" }), "mt-2")}
        >
          Browse Listings
        </Link>
      </section>

      {/* Contact info */}
      <section className="border-t px-6 py-12 max-w-xl mx-auto w-full space-y-4">
        <h2 className="text-lg font-semibold">Get in Touch</h2>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-center gap-3">
            <Phone className="w-4 h-4 shrink-0" />
            <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-foreground transition-colors">
              {siteConfig.contact.phone}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Mail className="w-4 h-4 shrink-0" />
            <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-foreground transition-colors">
              {siteConfig.contact.email}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{siteConfig.contact.location}</span>
          </li>
        </ul>
      </section>

      {/* Social media */}
      <section className="border-t px-6 py-12 max-w-xl mx-auto w-full space-y-4">
        <h2 className="text-lg font-semibold">Follow Us</h2>
        <div className="flex gap-3">
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
          >
            <FacebookIcon className="w-4 h-4" />
            Facebook
          </a>
        </div>
      </section>
    </div>
  );
}
