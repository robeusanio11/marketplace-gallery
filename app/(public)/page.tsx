import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FacebookIcon } from "@/components/SocialIcons";
import { siteConfig } from "@/lib/config";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 gap-12 text-center">
      {/* Brand */}
      <div className="flex flex-col items-center gap-6">
        <p className="text-sm font-semibold tracking-[0.4em] uppercase text-primary">
          {siteConfig.tagline}
        </p>
        <h1 className="font-heading text-6xl sm:text-8xl font-bold tracking-tight uppercase leading-none">
          {siteConfig.companyName}
        </h1>
        <p className="text-base tracking-wider text-muted-foreground max-w-md">
          {siteConfig.description}
        </p>
        <Link
          href="/products"
          className={cn(buttonVariants({ size: "lg" }), "tracking-[0.2em] uppercase text-sm font-bold px-10 h-12")}
        >
          Shop Now
        </Link>
      </div>

      {/* Divider */}
      <div className="w-20 border-t border-border" />

      {/* Contact + Social */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-8 text-left w-full max-w-lg">
        <div className="space-y-4">
          <h2 className="font-heading text-sm font-bold tracking-[0.25em] uppercase">Get in Touch</h2>
          <ul className="space-y-3 text-base text-muted-foreground">
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 shrink-0" />
              <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-foreground transition-colors">
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 shrink-0" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-foreground transition-colors">
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-5 h-5 shrink-0" />
              <span>{siteConfig.contact.location}</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="font-heading text-sm font-bold tracking-[0.25em] uppercase">Follow Us</h2>
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "gap-2 tracking-[0.15em] uppercase text-sm h-10 px-5")}
          >
            <FacebookIcon className="w-4 h-4" />
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
}
