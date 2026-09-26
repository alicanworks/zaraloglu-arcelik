import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPost } from "@/lib/admin/blog";
import { BlogForm } from "../BlogForm";

export const metadata = { title: "Yazıyı Düzenle" };

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <div>
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#767676] hover:text-[#222]"
      >
        <ArrowLeft className="h-4 w-4" />
        Blog
      </Link>
      <h1 className="mt-3 text-xl font-black">{post.title}</h1>

      <div className="mt-6">
        <BlogForm initial={post} />
      </div>
    </div>
  );
}
