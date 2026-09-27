import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactCTA } from "@/components/home/ContactCTA";
import { getPublishedPostBySlug, getPublishedPosts } from "@/lib/public/blog";

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

  const allPosts = await getPublishedPosts();
  const otherPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

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

      {otherPosts.length > 0 ? (
        <section className="border-t border-[#e6e6e6] py-14 md:py-16">
          <div className="container-page">
            <h2 className="text-[19px] font-black md:text-[24px]">
              Diğer Yazılarımızı İnceleyin
            </h2>
            <div className="mt-6 grid gap-8 md:grid-cols-3">
              {otherPosts.map((other) => (
                <Link
                  key={other.id}
                  href={`/blog/${other.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[6px] border border-[#e6e6e6] bg-white transition hover:border-[#c9c9c9]"
                >
                  {other.cover_image ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f5f5f5]">
                      <Image
                        src={other.cover_image}
                        alt={other.title}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-[1.03]"
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    {other.published_at ? (
                      <span className="text-[12px] font-semibold text-[#767676]">
                        {formatDate(other.published_at)}
                      </span>
                    ) : null}
                    <h3 className="text-[16px] font-black leading-snug">
                      {other.title}
                    </h3>
                    {other.excerpt ? (
                      <p className="text-[14px] text-[#4a4a4a]">
                        {other.excerpt}
                      </p>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ContactCTA />
    </>
  );
}
