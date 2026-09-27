export interface SeoIssue {
  level: "error" | "warning";
  message: string;
}

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function wordCount(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function checkBlogSeo(values: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
}): SeoIssue[] {
  const issues: SeoIssue[] = [];
  const title = values.title.trim();
  const slug = values.slug.trim();
  const excerpt = values.excerpt.trim();
  const content = values.content.trim();

  if (!title) {
    issues.push({ level: "error", message: "Başlık boş olamaz." });
  } else if (title.length < 20) {
    issues.push({
      level: "warning",
      message:
        "Başlık kısa kalmış (arama sonuçlarında etkisi az olabilir). 30-60 karakter önerilir.",
    });
  } else if (title.length > 60) {
    issues.push({
      level: "warning",
      message:
        "Başlık 60 karakteri geçiyor, Google arama sonuçlarında sonu kesilebilir.",
    });
  }

  if (!slug) {
    issues.push({ level: "error", message: "Slug (URL) boş olamaz." });
  } else if (!SLUG_PATTERN.test(slug)) {
    issues.push({
      level: "warning",
      message:
        "Slug sadece küçük harf, rakam ve tire (-) içermeli; Türkçe karakter/boşluk kullanmayın.",
    });
  }

  if (!excerpt) {
    issues.push({
      level: "warning",
      message:
        "Özet (meta açıklama) boş — arama sonuçlarında Google rastgele bir metin gösterir.",
    });
  } else if (excerpt.length < 50) {
    issues.push({
      level: "warning",
      message: "Özet kısa kalmış, 50-160 karakter arası önerilir.",
    });
  } else if (excerpt.length > 160) {
    issues.push({
      level: "warning",
      message:
        "Özet 160 karakteri geçiyor, arama sonuçlarında sonu kesilebilir.",
    });
  }

  if (!values.coverImage.trim()) {
    issues.push({
      level: "warning",
      message:
        "Kapak görseli eklenmemiş — WhatsApp/Instagram gibi platformlarda paylaşılınca görsel görünmez.",
    });
  }

  if (!content) {
    issues.push({
      level: "warning",
      message: "İçerik boş — arama motorları içeriksiz sayfaları düşük sıralar.",
    });
  } else if (wordCount(content) < 100) {
    issues.push({
      level: "warning",
      message: `İçerik kısa (${wordCount(content)} kelime). En az 150-300 kelime önerilir.`,
    });
  }

  return issues;
}
