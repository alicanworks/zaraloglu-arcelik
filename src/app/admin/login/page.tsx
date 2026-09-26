import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Admin Girişi" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5] px-4">
      <div className="w-full max-w-sm rounded-lg border border-[#e6e6e6] bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-sm bg-[#e4032e] text-white">
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
          </div>
          <h1 className="mt-3 text-lg font-bold text-[#222]">
            Zaraloğlu Arçelik — Yönetim Paneli
          </h1>
          <p className="mt-1 text-sm text-[#767676]">
            Devam etmek için giriş yapın.
          </p>
        </div>

        <LoginForm next={next ?? "/admin"} />
      </div>
    </div>
  );
}
