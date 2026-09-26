import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCTA } from "@/components/home/ContactCTA";
import { getPublishedPosts } from "@/lib/public/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Zaraloğlu Arçelik blogu: ürün rehberleri, bakım önerileri ve mağazamızdan haberler.",
};

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Ürün rehberleri ve mağazamızdan haberler"
        description="Arçelik ürünleri hakkında bilmeniz gerekenler ve mağazamızdan güncel içerikler."
      />

      <section className="py-14 md:py-16">
        <div className="container-page">
          {posts.length === 0 ? (
            <p className="text-[15px] text-[#4a4a4a]">
              Henüz blog yazısı yayınlanmadı.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[6px] border border-[#e6e6e6] bg-white transition hover:border-[#c9c9c9]"
                >
                  {post.cover_image ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f5f5f5]">
                      <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-[1.03]"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    {post.published_at ? (
                      <span className="text-[12px] font-semibold text-[#767676]">
                        {formatDate(post.published_at)}
                      </span>
                    ) : null}
                    <h2 className="text-[17px] font-black leading-snug">
                      {post.title}
                    </h2>
                    {post.excerpt ? (
                      <p className="text-[14px] text-[#4a4a4a]">
                        {post.excerpt}
                      </p>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
