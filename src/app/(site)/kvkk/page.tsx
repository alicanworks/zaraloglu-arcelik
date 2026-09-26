import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { store } from "@/data/store";

export const metadata: Metadata = { title: "KVKK Aydınlatma Metni" };

export default function KvkkPage() {
  return (
    <LegalPage
      title="KVKK Aydınlatma Metni"
      intro="6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinizin işlenmesine ilişkin bilgilendirme."
      sections={[
        {
          heading: "Veri Sorumlusu",
          body: [
            `${store.legalName} (“Mağaza”) olarak, veri sorumlusu sıfatıyla kişisel verilerinizi aşağıda açıklanan kapsamda işlemekteyiz.`,
          ],
        },
        {
          heading: "İşlenen Kişisel Veriler ve Amaçları",
          body: [
            "Kampanya bilgilendirmesi, ürün danışmanlığı, teklif oluşturma, teslimat ve satış sonrası hizmetlerin yürütülmesi amacıyla ad-soyad, iletişim (telefon, e-posta) ve talep bilgileriniz işlenebilir.",
            "WhatsApp veya telefon üzerinden ilettiğiniz talepler, yalnızca ilgili talebin karşılanması amacıyla kullanılır.",
          ],
        },
        {
          heading: "Verilerin Aktarımı",
          body: [
            "Kişisel verileriniz; yasal yükümlülüklerin yerine getirilmesi, yetkili servis ve lojistik süreçlerinin yürütülmesi amacıyla sınırlı olarak iş ortaklarımıza aktarılabilir.",
          ],
        },
        {
          heading: "Haklarınız",
          body: [
            "KVKK’nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini talep etme ve işleme faaliyetine itiraz etme haklarına sahipsiniz.",
            `Taleplerinizi ${store.email} adresine iletebilirsiniz.`,
          ],
        },
      ]}
    />
  );
}
