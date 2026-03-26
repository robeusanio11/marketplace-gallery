export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          price: string | null;
          contact: string | null;
          link: string | null;
          images: string[] | null;
          sold: boolean;
          created_at: string;
          position: number | null;
          category: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          price?: string | null;
          contact?: string | null;
          link?: string | null;
          images?: string[] | null;
          sold?: boolean;
          created_at?: string;
          position?: number | null;
          category?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          price?: string | null;
          contact?: string | null;
          link?: string | null;
          images?: string[] | null;
          sold?: boolean;
          created_at?: string;
          position?: number | null;
          category?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

// Convenience type for a product row
export type Product = Database["public"]["Tables"]["products"]["Row"];
