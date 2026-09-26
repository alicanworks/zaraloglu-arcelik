import Link from "next/link";
import { Plus } from "lucide-react";
import { listPosts } from "@/lib/admin/blog";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await listPosts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black">Blog</h1>
          <p className="mt-1 text-[13px] text-[#767676]">{posts.length} yazı</p>
        </div>
        <Link
          href="/admin/blog/yeni"
          className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#e4032e] px-5 text-[12px] font-black uppercase tracking-wide text-white hover:bg-[#c10228]"
        >
          <Plus className="h-4 w-4" />
          Yeni Yazı
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-[6px] border border-[#e6e6e6] bg-white">
        {posts.length === 0 ? (
          <p className="p-8 text-center text-sm text-[#767676]">
            Henüz blog yazısı eklenmedi.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#e6e6e6] text-[12px] uppercase tracking-wide text-[#767676]">
                <th className="px-5 py-3 font-bold">Başlık</th>
                <th className="px-5 py-3 font-bold">Yazar</th>
                <th className="px-5 py-3 font-bold">Tarih</th>
                <th className="px-5 py-3 font-bold">Durum</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-[#eee] last:border-0 hover:bg-[#f9f9f9]"
                >
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/blog/${p.id}`}
                      className="font-semibold text-[#222] hover:text-[#e4032e]"
                    >
                      {p.title}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-[#4a4a4a]">
                    {p.author ?? "—"}
                  </td>
                  <td className="px-5 py-3 text-[#4a4a4a]">
                    {formatDate(p.created_at)}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={
                        p.published
                          ? "rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-bold text-green-700"
                          : "rounded-full bg-[#f0f0f0] px-2.5 py-1 text-[11px] font-bold text-[#767676]"
                      }
                    >
                      {p.published ? "Yayında" : "Taslak"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
