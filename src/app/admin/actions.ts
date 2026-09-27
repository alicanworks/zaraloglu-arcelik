"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

/**
 * `next` sorgu parametresi kullanıcı girdisidir (login sayfasının URL'i
 * üzerinden gelir). Doğrulanmadan `redirect()`'e verilirse open redirect
 * açığı oluşur (ör. `?next=https://evil.com` ile girişten sonra oltalama
 * sitesine yönlendirme). Yalnızca site-içi, "/" ile başlayan ve
 * "//" ile başlamayan (protokolden bağımsız harici URL hilesi) yolları
 * kabul ediyoruz.
 */
function safeRedirectTarget(next: string): string {
  if (next.startsWith("/") && !next.startsWith("//")) return next;
  return "/admin";
}

export async function signInAction(
  _prevState: { error: string | null },
  formData: FormData
): Promise<{ error: string | null }> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = safeRedirectTarget(String(formData.get("next") ?? "/admin"));

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "E-posta veya şifre hatalı." };
  }

  redirect(next);
}

export async function signOutAction() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
