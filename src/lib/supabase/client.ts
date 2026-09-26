import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

/**
 * Tarayıcıda (client component) kullanılacak Supabase istemcisi.
 * Sadece public/anon anahtarla çalışır — RLS politikaları geçerlidir.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
