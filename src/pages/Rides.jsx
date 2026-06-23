import { useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import { JsonLd } from "../components/JsonLd";
import { useCatalog } from "../catalogContext";
import { useI18n } from "../i18nContext";
import { usePageSeo } from "../seo/usePageSeo";
import { formatMadStringWithEuro } from "../utils/formatCurrency";

// Page: Rides

export default function Rides() {
  const { t, lang } = useI18n();
  const { rides, ridesPage, rideShowcase } = useCatalog();
  const seo = usePageSeo("rides");
  const scrollerRef = useRef(null);
  const [rideRequest, setRideRequest] = useState(ridesPage.requestDefaults);
  const shouldAutoplayVideo = () => {
    const connection = navigator?.connection;
    if (!connection) return true;
    if (connection.saveData) return false;
    const fastTypes = ["4g", "wifi"];
    return fastTypes.includes(connection.effectiveType);
  };
  const youtubeId = rideShowcase.youtubeId;
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1`;
  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
  const rideRequestWhatsappUrl = useMemo(() => {
    const lines = [
      t.ridesRequest.whatsappIntro,
      `${t.ridesRequest.duration}: ${rideRequest.duration} ${t.ridesRequest.durationDays}`,
      `${t.ridesRequest.users}: ${rideRequest.riders}`,
      `${t.ridesRequest.motorcycles}: ${rideRequest.motorcycles}`,
      `${t.ridesRequest.route}: ${rideRequest.route || "-"}`,
      `${t.ridesRequest.preferredStartDate}: ${rideRequest.startDate || "-"}`,
      `${t.ridesRequest.skillLevel}: ${t.ridesRequest[rideRequest.skillLevel]}`,
      `${t.ridesRequest.accommodation}: ${t.ridesRequest[rideRequest.accommodation]}`,
      `${t.ridesRequest.supportVehicle}: ${t.ridesRequest[rideRequest.supportVehicle]}`,
      `${t.ridesRequest.extraNotes}: ${rideRequest.note || "-"}`,
    ];
    return `https://wa.me/212624843746?text=${encodeURIComponent(
      lines.join("\n"),
    )}`;
  }, [rideRequest, t]);

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
      <SEO
        {...seo}
        keywords={[
          "motorcycle tour Morocco",
          "desert motorcycle tour Morocco",
          "Atlas mountains motorcycle tour",
          "moto adventure Maroc",
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Motorcycle tours Morocco",
          provider: {
            "@id": "https://ridekey.ma/#localbusiness",
          },
          areaServed: ["Marrakech", "Atlas Mountains", "Agafay Desert", "Morocco"],
          serviceType: "Adventure motorcycle tours and guided rides",
        }}
      />
      <section className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-night">
          <img
            src={ridesPage.heroImage}
            alt={ridesPage.heroAlt}
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
            <h2 className="section-title mt-3">{t.home.ridesTitle}</h2>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => scrollByAmount(-1)}
              className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm text-white"
              aria-label={t.common.previous}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(1)}
              className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm text-white"
              aria-label={t.common.next}
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
              className="min-w-[560px] flex-1 overflow-hidden rounded-2xl border border-white/10 bg-night transition hover:border-white/30"
            >
              <div className="grid h-full min-h-[420px] grid-cols-[1fr_1fr]">
                <div className="grid grid-rows-[minmax(260px,1fr)_auto]">
                  <div className="relative overflow-hidden">
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
                      <h3 className="mt-2 text-xl font-semibold text-white">
                        {ride.title}
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-4 border-t border-white/10 p-5 text-sm text-slate-300">
                    <div className="flex items-center justify-between text-white">
                      <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        {t.common.price}
                      </span>
                      <span className="text-base font-semibold">
                        {formatMadStringWithEuro(ride.price, lang)}
                      </span>
                    </div>
                    <div className="grid gap-3 text-xs text-slate-400">
                      <div className="flex items-center justify-between gap-4">
                        <span>{t.common.start}</span>
                        <span className="text-right text-slate-200">
                          {ride.startDate} - {ride.startTime}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>{t.common.end}</span>
                        <span className="text-right text-slate-200">
                          {ride.endDate} - {ride.endTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-l border-white/10 bg-black">
                  <video
                    className="h-full w-full object-cover"
                    src={ride.video?.src || "/videos/ride-480p.mp4"}
                    poster={ride.video?.poster || ride.image}
                    autoPlay={shouldAutoplayVideo()}
                    muted
                    loop
                    playsInline
                    preload={shouldAutoplayVideo() ? "metadata" : "none"}
                    controls={!shouldAutoplayVideo()}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl border border-white/10 bg-night p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-subtitle">{t.ridesRequest.badge}</p>
              <h2 className="section-title mt-3">{t.ridesRequest.title}</h2>
              <p className="mt-3 max-w-2xl text-sm text-slate-400">
                {t.ridesRequest.description}
              </p>
            </div>
            <a
              href={rideRequestWhatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
            >
              {t.ridesRequest.sendWhatsapp}
            </a>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <label className="text-sm text-slate-300">
              {t.ridesRequest.duration}
              <input
                type="number"
                min="1"
                className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
                value={rideRequest.duration}
                onChange={(event) =>
                  setRideRequest((prev) => ({
                    ...prev,
                    duration: event.target.value,
                  }))
                }
              />
            </label>

            <label className="text-sm text-slate-300">
              {t.ridesRequest.users}
              <input
                type="number"
                min="1"
                className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
                value={rideRequest.riders}
                onChange={(event) =>
                  setRideRequest((prev) => ({
                    ...prev,
                    riders: event.target.value,
                  }))
                }
              />
            </label>

            <label className="text-sm text-slate-300">
              {t.ridesRequest.motorcycles}
              <input
                type="number"
                min="1"
                className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
                value={rideRequest.motorcycles}
                onChange={(event) =>
                  setRideRequest((prev) => ({
                    ...prev,
                    motorcycles: event.target.value,
                  }))
                }
              />
            </label>

            <label className="text-sm text-slate-300">
              {t.ridesRequest.route}
              <input
                className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
                placeholder={t.ridesRequest.routePlaceholder}
                value={rideRequest.route}
                onChange={(event) =>
                  setRideRequest((prev) => ({
                    ...prev,
                    route: event.target.value,
                  }))
                }
              />
            </label>

            <label className="text-sm text-slate-300">
              {t.ridesRequest.preferredStartDate}
              <input
                type="date"
                className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
                value={rideRequest.startDate}
                onChange={(event) =>
                  setRideRequest((prev) => ({
                    ...prev,
                    startDate: event.target.value,
                  }))
                }
              />
            </label>

            <label className="text-sm text-slate-300">
              {t.ridesRequest.skillLevel}
              <select
                className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
                value={rideRequest.skillLevel}
                onChange={(event) =>
                  setRideRequest((prev) => ({
                    ...prev,
                    skillLevel: event.target.value,
                  }))
                }
              >
                <option value="beginner">{t.ridesRequest.beginner}</option>
                <option value="intermediate">{t.ridesRequest.intermediate}</option>
                <option value="advanced">{t.ridesRequest.advanced}</option>
              </select>
            </label>

            <label className="text-sm text-slate-300">
              {t.ridesRequest.accommodation}
              <select
                className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
                value={rideRequest.accommodation}
                onChange={(event) =>
                  setRideRequest((prev) => ({
                    ...prev,
                    accommodation: event.target.value,
                  }))
                }
              >
                <option value="yes">{t.ridesRequest.yes}</option>
                <option value="no">{t.ridesRequest.no}</option>
              </select>
            </label>

            <label className="text-sm text-slate-300">
              {t.ridesRequest.supportVehicle}
              <select
                className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
                value={rideRequest.supportVehicle}
                onChange={(event) =>
                  setRideRequest((prev) => ({
                    ...prev,
                    supportVehicle: event.target.value,
                  }))
                }
              >
                <option value="no">{t.ridesRequest.no}</option>
                <option value="yes">{t.ridesRequest.yes}</option>
              </select>
            </label>

            <label className="text-sm text-slate-300 md:col-span-2 xl:col-span-3">
              {t.ridesRequest.extraNotes}
              <textarea
                rows="4"
                className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
                placeholder={t.ridesRequest.notesPlaceholder}
                value={rideRequest.note}
                onChange={(event) =>
                  setRideRequest((prev) => ({
                    ...prev,
                    note: event.target.value,
                  }))
                }
              />
            </label>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-night">
          <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="section-subtitle">{t.common.rideFilms}</p>
              <h2 className="section-title mt-3">{t.home.rideShowTitle}</h2>
              <p className="mt-4 text-sm text-slate-300">
                {t.home.rideShowDescription}
              </p>
              <a
                href={youtubeWatchUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
              >
                {t.home.rideShowCta}
              </a>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black">
              <div className="aspect-video">
                <iframe
                  className="h-full w-full"
                  src={youtubeEmbedUrl}
                  title="RideKey rides showcase"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
