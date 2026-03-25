import { Phone, Mail, MapPin } from "lucide-react";
import { FacebookIcon } from "@/components/SocialIcons";
import { siteConfig } from "@/lib/config";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="flex-1 flex flex-col justify-center px-8 py-10 max-w-5xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="font-heading text-5xl font-bold uppercase tracking-[0.2em]">Contact</h1>
        <p className="text-muted-foreground mt-2 text-base">
          Reach out about any listing or general inquiry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
        {/* Left: direct contact + social */}
        <div className="space-y-10">
          <div className="space-y-5">
            <h2 className="font-heading text-sm font-bold tracking-[0.25em] uppercase">
              Direct Contact
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 text-base">
                <Phone className="w-5 h-5 shrink-0 text-muted-foreground" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="hover:text-foreground text-muted-foreground transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-4 text-base">
                <Mail className="w-5 h-5 shrink-0 text-muted-foreground" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-foreground text-muted-foreground transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-4 text-base">
                <MapPin className="w-5 h-5 shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">{siteConfig.contact.location}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-5">
            <h2 className="font-heading text-sm font-bold tracking-[0.25em] uppercase">
              Social Media
            </h2>
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

        {/* Right: contact form */}
        <div className="space-y-5">
          <h2 className="font-heading text-sm font-bold tracking-[0.25em] uppercase">
            Send a Message
          </h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
