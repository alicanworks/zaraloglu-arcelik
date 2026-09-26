import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page max-w-xl text-center">
        <span className="eyebrow justify-center">404</span>
        <h1 className="mt-3 text-[26px] font-black md:text-[36px]">Sayfa bulunamadı</h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Güncel
          kampanyalarımıza göz atabilirsiniz.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/">Ana Sayfa</Button>
          <Button href="/kampanyalar" variant="outline">
            Kampanyalar
          </Button>
        </div>
      </div>
    </section>
  );
}
