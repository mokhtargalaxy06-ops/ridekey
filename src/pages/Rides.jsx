import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { rides } from "../data/rides";
import { useI18n } from "../i18nContext";

// Page: Rides

export default function Rides() {
  const { t } = useI18n();
  const scrollerRef = useRef(null);

  const scrollByAmount = (direction) => {
    const container = scrollerRef.current;
    if (!container) return;
    const card = container.querySelector("[data-ride-card]");
    const cardWidth = card?.getBoundingClientRect().width || 320;
    const gap = 24;
    container.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <div className="space-y-16 pb-24 pt-28">
      <section className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-night">
          <img
            src="/images/img3sliderHeroSection.jpg"
            alt="RideKey Morocco rides"
            className="h-[420px] w-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
          <div className="absolute inset-0 flex flex-col justify-center px-10">
            <p className="section-subtitle">{t.home.ridesHeroBadge}</p>
            <h1 className="mt-4 text-4xl font-semibold text-white md:text-6xl">
              {t.home.ridesHeroTitle}
            </h1>
            <p className="mt-4 max-w-xl text-sm text-slate-200 md:text-base">
              {t.home.ridesHeroCopy}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="section-subtitle">{t.home.ridesCarouselBadge}</p>
            <h2 className="section-title mt-3">
              {t.home.ridesCarouselTitle}
            </h2>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => scrollByAmount(-1)}
              className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm text-white"
              aria-label="Previous rides"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(1)}
              className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm text-white"
              aria-label="Next rides"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-8 flex gap-6 overflow-x-auto pb-2"
        >
          {rides.map((ride) => (
            <article
              key={ride.id}
              data-ride-card
              className="min-w-[260px] flex-1 rounded-2xl border border-white/10 bg-night transition hover:border-white/30 md:min-w-[320px]"
            >
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <img
                  src={ride.image}
                  alt={ride.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">
                    {t.home.ridesCardLabel}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {ride.title}
                  </h3>
                </div>
              </div>
              <div className="space-y-4 p-5 text-sm text-slate-300">
                <div className="flex items-center justify-between text-white">
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {t.common.price}
                  </span>
                  <span className="text-base font-semibold">{ride.price}</span>
                </div>
                <div className="grid gap-3 text-xs text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>{t.common.start}</span>
                    <span className="text-slate-200">
                      {ride.startDate} · {ride.startTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t.common.end}</span>
                    <span className="text-slate-200">
                      {ride.endDate} · {ride.endTime}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
