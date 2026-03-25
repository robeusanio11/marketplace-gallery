import { Phone, Mail, MapPin } from "lucide-react";
import { FacebookIcon } from "@/components/SocialIcons";
import { siteConfig } from "@/lib/config";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import { ContactForm } from "@/components/ContactForm";
import { Separator } from "@/components/ui/separator";

export default function ContactPage() {
  return (
    <div className="px-6 py-12 max-w-xl mx-auto w-full space-y-10">
      <div>
        <h1 className="text-2xl font-bold">Contact</h1>
        <p className="text-muted-foreground mt-1">
          Reach out about any listing or general inquiry.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Direct Contact
        </h2>
        <ul className="space-y-4">
          <li className="flex items-center gap-3">
            <Phone className="w-5 h-5 shrink-0 text-muted-foreground" />
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="hover:text-foreground text-muted-foreground transition-colors"
            >
              {siteConfig.contact.phone}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Mail className="w-5 h-5 shrink-0 text-muted-foreground" />
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="hover:text-foreground text-muted-foreground transition-colors"
            >
              {siteConfig.contact.email}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <MapPin className="w-5 h-5 shrink-0 text-muted-foreground" />
            <span className="text-muted-foreground">{siteConfig.contact.location}</span>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Social Media
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "gap-2 justify-center")}
          >
            <FacebookIcon className="w-4 h-4" />
            Facebook
          </a>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Send a Message
        </h2>
        <ContactForm />
      </div>
    </div>
  );
}
