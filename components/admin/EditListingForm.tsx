"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X, ImagePlus, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";
import { updateProduct } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/categories";
import type { Product } from "@/types/database";

type NewPhoto = { file: File; objectUrl: string };

export function EditListingForm({ product }: { product: Product }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Existing images the user has not removed
  const [existingImages, setExistingImages] = useState<string[]>(
    product.images ?? []
  );
  // URLs removed by the user — will be deleted from storage on save
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  // New files added by the user
  const [newPhotos, setNewPhotos] = useState<NewPhoto[]>([]);

  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price ?? "");
  const [description, setDescription] = useState(product.description ?? "");
  const [contact, setContact] = useState(product.contact ?? "");
  const [link, setLink] = useState(product.link ?? "");
  const [category, setCategory] = useState(product.category ?? "");
  const [sold, setSold] = useState(product.sold);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const previews = files.map((file) => ({
      file,
      objectUrl: URL.createObjectURL(file),
    }));
    setNewPhotos((prev) => [...prev, ...previews]);
    e.target.value = "";
  }

  function removeExisting(url: string) {
    setExistingImages((prev) => prev.filter((u) => u !== url));
    setRemovedImages((prev) => [...prev, url]);
  }

  function removeNew(index: number) {
    setNewPhotos((prev) => {
      URL.revokeObjectURL(prev[index].objectUrl);
      return prev.filter((_, i) => i !== index);
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const newImageUrls: string[] = [];

    try {
      // Upload new photos
      for (const photo of newPhotos) {
        const ext = photo.file.name.split(".").pop();
        const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(path, photo.file, { upsert: false });

        if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);

        const { data } = supabase.storage
          .from("product-images")
          .getPublicUrl(path);

        newImageUrls.push(data.publicUrl);
      }

      const finalImageUrls = [...existingImages, ...newImageUrls];

      await updateProduct(
        product.id,
        {
          title: title.trim(),
          price: price.trim() || null,
          description: description.trim() || null,
          contact: contact.trim() || null,
          link: link.trim() || null,
          category: category || null,
          sold,
        },
        finalImageUrls,
        removedImages
      );

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Photos */}
      <div className="space-y-2">
        <Label>Photos</Label>
        <div className="flex flex-wrap gap-3">
          {/* Existing images */}
          {existingImages.map((url, i) => (
            <div key={url} className="relative w-24 h-24 rounded-lg overflow-hidden border bg-muted">
              <Image
                src={url}
                alt={`Photo ${i + 1}`}
                fill
                className="object-contain"
                sizes="96px"
              />
              <button
                type="button"
                onClick={() => removeExisting(url)}
                className="absolute top-1 right-1 rounded-full bg-black/60 p-0.5 text-white hover:bg-black/80 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {/* New photos */}
          {newPhotos.map((photo, i) => (
            <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border bg-muted">
              <Image
                src={photo.objectUrl}
                alt={`New photo ${i + 1}`}
                fill
                className="object-contain"
                sizes="96px"
              />
              <button
                type="button"
                onClick={() => removeNew(i)}
                className="absolute top-1 right-1 rounded-full bg-black/60 p-0.5 text-white hover:bg-black/80 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "w-24 h-24 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1",
              "text-muted-foreground hover:text-foreground hover:border-foreground transition-colors text-xs"
            )}
          >
            <ImagePlus className="w-5 h-5" />
            Add photo
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Title */}
      <div className="space-y-1.5">
        <Label htmlFor="title">
          Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Price */}
      <div className="space-y-1.5">
        <Label htmlFor="price">Price <span className="text-muted-foreground font-normal">(optional)</span></Label>
        <Input
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="e.g. $80, Best offer, Free"
        />
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <Label htmlFor="category">Category <span className="text-muted-foreground font-normal">(optional)</span></Label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex h-9 w-full border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">— None —</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="description">Description <span className="text-muted-foreground font-normal">(optional)</span></Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
        />
      </div>

      {/* Contact */}
      <div className="space-y-1.5">
        <Label htmlFor="contact">Contact <span className="text-muted-foreground font-normal">(optional)</span></Label>
        <Input
          id="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="e.g. (555) 123-4567 or email@example.com"
        />
      </div>

      {/* Link */}
      <div className="space-y-1.5">
        <Label htmlFor="link">Link <span className="text-muted-foreground font-normal">(optional)</span></Label>
        <Input
          id="link"
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="e.g. https://facebook.com/marketplace/item/..."
        />
      </div>

      {/* Sold toggle */}
      <div className="flex items-center gap-3">
        <input
          id="sold"
          type="checkbox"
          checked={sold}
          onChange={(e) => setSold(e.target.checked)}
          className="h-4 w-4 rounded border-input"
        />
        <Label htmlFor="sold" className="cursor-pointer">
          Mark as Sold
        </Label>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={submitting || !title.trim()}>
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving…
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={submitting}
          onClick={() => router.push("/admin")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
