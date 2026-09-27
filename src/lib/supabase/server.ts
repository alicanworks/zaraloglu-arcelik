import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Sunucu tarafında (Server Component / Route Handler / Server Action)
 * kullanılacak Supabase istemcisi. Oturum çerezlerini okur/yazar — admin
 * panelde giriş yapmış kullanıcıyı tanımak için bu kullanılır.
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component içinden çağrılırsa cookie set edilemez;
            // middleware oturumu tazelediği sürece sorun olmaz.
          }
        },
      },
    }
  );
}

/**
 * Yalnızca güvenilir sunucu bağlamlarında (ör. admin panel yazma
 * işlemleri) kullanılır — RLS'i bypass eder. `SUPABASE_SERVICE_ROLE_KEY`
 * asla istemciye sızdırılmamalı, bu dosya "use client" içine import
 * edilmemelidir.
 */
export function createServiceRoleClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
