import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/public/blog";

const BASE_URL = "https://zaralogluarcelik.com.tr";

const staticRoutes = [
  "",
  "/kampanyalar",
  "/blog",
  "/magazamiz",
  "/hakkimizda",
  "/iletisim",
  "/kvkk",
  "/gizlilik-politikasi",
  "/cerez-politikasi",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts().catch(() => []);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
  }));

  return [...staticEntries, ...blogEntries];
}
