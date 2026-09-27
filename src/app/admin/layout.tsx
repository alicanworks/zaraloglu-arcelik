import Link from "next/link";
import { LogOut, Megaphone, Newspaper } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { signOutAction } from "./actions";

export const metadata = { title: "Yönetim Paneli" };

/**
 * `/admin/login` kendi minimal sayfasını render eder (bu layout'un
 * dışında bir görünüm istemediğimiz için sidebar burada koşulsuz
 * render ediliyor; middleware zaten login'i ayrı tutuyor, ama login
 * sayfası da bu layout altında olduğundan basit bir kontrolle
 * sidebar'ı sadece oturum varken gösteriyoruz).
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // /admin/login — chrome olmadan direkt içerik.
    return <div className="min-h-screen bg-[#f5f5f5]">{children}</div>;
  }

  const nav = [
    { href: "/admin/kampanyalar", label: "Kampanyalar", icon: Megaphone },
    { href: "/admin/blog", label: "Blog", icon: Newspaper },
  ];

  return (
    <div className="flex min-h-screen bg-[#f5f5f5] text-[#222]">
      <aside className="flex w-60 shrink-0 flex-col border-r border-[#e6e6e6] bg-white">
        <div className="flex h-16 items-center gap-2.5 border-b border-[#e6e6e6] px-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#e4032e] text-white">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path
                d="M4 15.5 12 5l8 10.5"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 19h9"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="text-[14px] font-black leading-tight">
            Zaraloğlu
            <span className="block text-[10px] font-medium uppercase tracking-wide text-[#767676]">
              Yönetim Paneli
            </span>
          </span>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 rounded-[4px] px-3 py-2.5 text-[14px] font-semibold text-[#4a4a4a] hover:bg-[#f5f5f5] hover:text-[#222]"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-[#e6e6e6] p-3">
          <p className="truncate px-3 text-[12px] text-[#767676]">
            {user.email}
          </p>
          <form action={signOutAction}>
            <button
              type="submit"
              className="mt-1 flex w-full items-center gap-2.5 rounded-[4px] px-3 py-2.5 text-left text-[14px] font-semibold text-[#4a4a4a] hover:bg-[#f5f5f5] hover:text-[#222]"
            >
              <LogOut className="h-4 w-4" />
              Çıkış Yap
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-5xl px-6 py-8 md:px-10">{children}</div>
      </main>
    </div>
  );
}
