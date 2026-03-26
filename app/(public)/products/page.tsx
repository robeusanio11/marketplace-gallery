import { Suspense } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { FacebookIcon } from "@/components/SocialIcons";
import { supabase } from "@/lib/supabase";
import { siteConfig } from "@/lib/config";
import { ProductCard } from "@/components/ProductCard";
import { ProductsFilter } from "@/components/ProductsFilter";
import type { Product } from "@/types/database";

export const revalidate = 60;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ available?: string; category?: string }>;
}) {
  const { available, category } = await searchParams;
  const availableOnly = available === "1";

  let query = supabase
    .from("products")
    .select("*")
    .order("position", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (availableOnly) {
    query = query.eq("sold", false);
  }

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Failed to fetch products:", error.message);
  }

  const items = (data as Product[] | null) ?? [];

  return (
    <div className="px-4 max-w-6xl mx-auto w-full">
      {/* Brand banner */}
      <div className="py-10 border-b border-border mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <p className="text-xs font-semibold tracking-[0.35em] uppercase text-primary mb-2">
            {siteConfig.tagline}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight uppercase leading-none mb-3">
            {siteConfig.companyName}
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm tracking-wide">
            {siteConfig.description}
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-muted-foreground shrink-0">
          <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-2 hover:text-foreground transition-colors">
            <Phone className="w-4 h-4 shrink-0" />
            {siteConfig.contact.phone}
          </a>
          <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 hover:text-foreground transition-colors">
            <Mail className="w-4 h-4 shrink-0" />
            {siteConfig.contact.email}
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 shrink-0" />
            {siteConfig.contact.location}
          </span>
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <FacebookIcon className="w-4 h-4 shrink-0" />
            Facebook
          </a>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="font-heading text-3xl font-bold tracking-[0.2em] uppercase">Listings</h2>
        <Suspense>
          <ProductsFilter />
        </Suspense>
      </div>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
          <p className="text-lg">No listings yet.</p>
          <p className="text-sm mt-1">Check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <div className="pb-8" />
    </div>
  );
}
