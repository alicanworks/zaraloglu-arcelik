import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Çerez Politikası" };

export default function CerezPage() {
  return (
    <LegalPage
      title="Çerez Politikası"
      intro="Web sitemizde kullanılan çerezler ve bunları nasıl yönetebileceğiniz hakkında bilgi."
      sections={[
        {
          heading: "Çerez Nedir?",
          body: [
            "Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınıza kaydedilen küçük metin dosyalarıdır.",
          ],
        },
        {
          heading: "Kullandığımız Çerezler",
          body: [
            "Zorunlu çerezler: Sitenin temel işlevleri için gereklidir ve devre dışı bırakılamaz.",
            "Performans çerezleri: Sitenin nasıl kullanıldığını anonim olarak anlamamıza yardımcı olur ve yalnızca onayınızla kullanılır.",
          ],
        },
        {
          heading: "Çerezleri Yönetme",
          body: [
            "Tarayıcınızın ayarlarından çerezleri silebilir veya engelleyebilirsiniz. Zorunlu çerezlerin engellenmesi sitenin bazı bölümlerinin çalışmamasına neden olabilir.",
          ],
        },
      ]}
    />
  );
}
