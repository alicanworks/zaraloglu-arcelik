import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ContactCTA } from "@/components/home/ContactCTA";
import { getPublishedPostBySlug } from "@/lib/public/blog";

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = (post.content ?? "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <section className="bg-surface">
        <div className="container-page max-w-3xl pb-2 pt-10 md:pt-14">
          {post.published_at ? (
            <p className="text-[13px] font-semibold text-[#767676]">
              {formatDate(post.published_at)}
              {post.author ? ` · ${post.author}` : ""}
            </p>
          ) : null}
          <h1 className="mt-2 text-[26px] font-black leading-[1.12] md:text-[36px]">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="container-page max-w-3xl">
          {post.cover_image ? (
            <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-[6px] bg-[#f5f5f5]">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 768px, 100vw"
                priority
              />
            </div>
          ) : null}

          <div className="space-y-4 text-[15px] leading-relaxed text-[#2a2a2a]">
            {paragraphs.length > 0 ? (
              paragraphs.map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <p className="text-[#767676]">Bu yazı için içerik eklenmedi.</p>
            )}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
