import Link from "next/link";
import { Sparkles, ChevronRight } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-white">
      <div className="container-page flex h-10 items-center justify-center gap-2 text-center text-[13px] font-medium">
        <Sparkles className="h-3.5 w-3.5 text-brand" strokeWidth={2.5} />
        <span className="truncate">
          Mağazamıza özel güncel fırsatları keşfedin.
        </span>
        <Link
          href="/kampanyalar"
          className="hidden items-center gap-0.5 font-semibold text-white underline-offset-4 hover:underline sm:inline-flex"
        >
          Kampanyalar
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
