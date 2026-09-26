import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogForm } from "../BlogForm";

export const metadata = { title: "Yeni Blog Yazısı" };

export default function NewBlogPostPage() {
  return (
    <div>
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#767676] hover:text-[#222]"
      >
        <ArrowLeft className="h-4 w-4" />
        Blog
      </Link>
      <h1 className="mt-3 text-xl font-black">Yeni Blog Yazısı</h1>

      <div className="mt-6">
        <BlogForm />
      </div>
    </div>
  );
}
