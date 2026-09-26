/**
 * Elle yazılmış geçici tip tanımları — `supabase/schema.sql` ile birebir
 * eşleşir. Gerçek proje bağlanınca şununla değiştirin:
 *
 *   npx supabase gen types typescript --project-id <id> > src/lib/supabase/types.ts
 */
export interface Database {
  public: {
    Tables: {
      campaigns: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category: string;
          description: string;
          long_description: string | null;
          image: string;
          hero_image: string | null;
          benefit: string;
          tag: string | null;
          start_date: string;
          end_date: string;
          featured: boolean;
          price: number | null;
          old_price: number | null;
          terms: string[];
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["campaigns"]["Row"]> & {
          slug: string;
          title: string;
          category: string;
          description: string;
          image: string;
          benefit: string;
          start_date: string;
          end_date: string;
        };
        Update: Partial<Database["public"]["Tables"]["campaigns"]["Row"]>;
        Relationships: [];
      };
      campaign_products: {
        Row: {
          id: string;
          campaign_id: string;
          name: string;
          image: string | null;
          description: string | null;
          old_price: number | null;
          campaign_price: number | null;
          highlights: string[];
          sort_order: number;
        };
        Insert: Partial<
          Database["public"]["Tables"]["campaign_products"]["Row"]
        > & { campaign_id: string; name: string };
        Update: Partial<
          Database["public"]["Tables"]["campaign_products"]["Row"]
        >;
        Relationships: [
          {
            foreignKeyName: "campaign_products_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "campaigns";
            referencedColumns: ["id"];
          },
        ];
      };
      banners: {
        Row: {
          id: string;
          image: string;
          alt: string;
          href: string | null;
          heading: string | null;
          description: string | null;
          cta_label: string | null;
          sort_order: number;
          active: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["banners"]["Row"]> & {
          image: string;
        };
        Update: Partial<Database["public"]["Tables"]["banners"]["Row"]>;
        Relationships: [];
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string | null;
          content: string | null;
          cover_image: string | null;
          author: string | null;
          published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["blog_posts"]["Row"]> & {
          slug: string;
          title: string;
        };
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Row"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
