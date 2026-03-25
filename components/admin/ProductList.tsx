"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteProduct } from "@/app/admin/actions";
import type { Product } from "@/types/database";

export function ProductList({ products }: { products: Product[] }) {
  const [pending, setPending] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const productToDelete = products.find((p) => p.id === confirmId);

  async function handleDelete() {
    if (!productToDelete) return;
    setPending(productToDelete.id);
    setConfirmId(null);
    try {
      await deleteProduct(productToDelete.id, productToDelete.images);
    } finally {
      setPending(null);
    }
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-24 text-muted-foreground">
        <p className="text-lg">No listings yet.</p>
        <p className="text-sm mt-1">Click "Add New Listing" to get started.</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Item</th>
              <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Price</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Date Added</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((product) => {
              const thumbnail = product.images?.[0] ?? null;
              const date = new Date(product.created_at).toLocaleDateString();

              return (
                <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted shrink-0">
                        {thumbnail ? (
                          <Image
                            src={thumbnail}
                            alt={product.title}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                            —
                          </div>
                        )}
                      </div>
                      <span className="font-medium line-clamp-2">{product.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                    {product.price ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                    {date}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {product.sold ? (
                      <span className="text-xs font-semibold text-destructive">SOLD</span>
                    ) : (
                      <span className="text-xs font-semibold text-green-600">Active</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/edit/${product.id}`}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "text-muted-foreground hover:text-foreground",
                          pending === product.id && "pointer-events-none opacity-50"
                        )}
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setConfirmId(product.id)}
                        disabled={pending === product.id}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Dialog open={!!confirmId} onOpenChange={() => setConfirmId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete listing?</DialogTitle>
            <DialogDescription>
              &quot;{productToDelete?.title}&quot; will be permanently removed along with its
              photos. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
