import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ImageGallery } from "@/components/ImageGallery";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/types/database";

export const revalidate = 60;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  const product = data as Product | null;

  if (!product) notFound();

  const images = product.images ?? [];

  return (
    <div className="animate-page-in min-h-screen flex flex-col">
      <header className="border-b-2 border-border px-6 py-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </header>

      <main className="flex-1 px-4 py-8 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: image gallery */}
          <ImageGallery images={images} title={product.title} />

          {/* Right: product info */}
          <div className="space-y-5">
            <div className="space-y-2">
              {product.sold && (
                <span className="inline-block bg-foreground text-background text-xs font-bold tracking-widest uppercase px-2 py-1">SOLD</span>
              )}
              <h1 className="font-heading text-2xl font-bold uppercase tracking-wider leading-tight">{product.title}</h1>
              {product.price && (
                <p className="text-2xl font-bold font-heading text-primary">{product.price}</p>
              )}
            </div>

            {product.description && (
              <>
                <Separator />
                <div className="space-y-1.5">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Description
                  </h2>
                  <p className="text-base leading-relaxed whitespace-pre-wrap">
                    {product.description}
                  </p>
                </div>
              </>
            )}

            {product.contact && (
              <>
                <Separator />
                <div className="space-y-1.5">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Contact
                  </h2>
                  <p className="text-base">{product.contact}</p>
                </div>
              </>
            )}

            {product.link && (
              <>
                <Separator />
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  View listing
                </a>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
