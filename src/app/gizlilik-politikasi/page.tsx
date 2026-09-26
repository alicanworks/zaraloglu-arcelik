import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Gizlilik Politikası" };

export default function GizlilikPage() {
  return (
    <LegalPage
      title="Gizlilik Politikası"
      intro="Bu politika, web sitemizi ziyaret ettiğinizde bilgilerinizin nasıl toplandığını ve kullanıldığını açıklar."
      sections={[
        {
          heading: "Toplanan Bilgiler",
          body: [
            "Sitemiz bir e-ticaret platformu değildir; üyelik veya çevrim içi ödeme işlemi yapılmaz.",
            "İletişim formu, WhatsApp veya telefon aracılığıyla bizimle paylaştığınız bilgiler yalnızca talebinizi yanıtlamak için kullanılır.",
          ],
        },
        {
          heading: "Bilgilerin Kullanımı",
          body: [
            "Toplanan bilgiler; kampanya bilgilendirmesi, teklif hazırlanması ve mağaza hizmetlerinin sunulması amacıyla kullanılır. Üçüncü taraflara pazarlama amacıyla satılmaz.",
          ],
        },
        {
          heading: "Güvenlik",
          body: [
            "Bilgilerinizi yetkisiz erişime karşı korumak için makul teknik ve idari tedbirler alınır.",
          ],
        },
        {
          heading: "İletişim",
          body: [
            "Gizlilik uygulamalarımıza ilişkin sorularınız için iletişim sayfamızdaki kanalları kullanabilirsiniz.",
          ],
        },
      ]}
    />
  );
}
