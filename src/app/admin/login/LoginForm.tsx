"use client";

import { useActionState } from "react";
import { signInAction } from "../actions";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(signInAction, {
    error: null,
  });

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={next} />
      <div>
        <label className="block text-[13px] font-semibold text-[#222]">
          E-posta
        </label>
        <input
          type="email"
          name="email"
          required
          autoComplete="username"
          className="mt-1.5 h-11 w-full rounded-[4px] border border-[#d6d6d6] px-3 text-sm outline-none focus:border-[#222]"
        />
      </div>
      <div>
        <label className="block text-[13px] font-semibold text-[#222]">
          Şifre
        </label>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="mt-1.5 h-11 w-full rounded-[4px] border border-[#d6d6d6] px-3 text-sm outline-none focus:border-[#222]"
        />
      </div>

      {state.error ? (
        <p className="rounded-[4px] bg-red-50 px-3 py-2 text-[13px] text-[#c10228]">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="h-11 w-full rounded-full bg-[#e4032e] text-[13px] font-black uppercase tracking-wide text-white transition-colors hover:bg-[#c10228] disabled:opacity-60"
      >
        {pending ? "Giriş yapılıyor…" : "Giriş Yap"}
      </button>
    </form>
  );
}
