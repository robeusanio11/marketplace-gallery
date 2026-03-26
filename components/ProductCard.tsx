import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/types/database";

export function ProductCard({ product }: { product: Product }) {
  const thumbnail = product.images?.[0] ?? null;
  const truncatedDescription = product.description
    ? product.description.length > 100
      ? product.description.slice(0, 100) + "…"
      : product.description
    : null;

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="h-full overflow-hidden transition-colors hover:border-primary border border-border cursor-pointer">
        <div className="relative aspect-[3/4] w-full bg-muted">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={product.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground text-xs tracking-widest uppercase">
              No photo
            </div>
          )}
          {product.sold && (
            <span className="absolute top-2 left-2 bg-foreground text-background text-xs font-bold tracking-widest uppercase px-2 py-1">
              SOLD
            </span>
          )}
        </div>
        <CardContent className="p-4 space-y-2">
          {product.category && (
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              {product.category}
            </p>
          )}
          <div className="flex items-start justify-between gap-2">
            <h2 className="font-heading font-bold text-sm tracking-wider uppercase leading-tight line-clamp-2">
              {product.title}
            </h2>
            {product.price && (
              <span className="shrink-0 text-primary font-bold text-sm font-heading">
                {product.price}
              </span>
            )}
          </div>
          {truncatedDescription && (
            <p className="text-xs text-muted-foreground leading-snug">
              {truncatedDescription}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
