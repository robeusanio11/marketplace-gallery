import { NewListingForm } from "@/components/admin/NewListingForm";

export default function NewListingPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Add New Listing</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Fill in the details below. You can paste directly from your Facebook listing.
        </p>
      </div>
      <NewListingForm />
    </div>
  );
}
