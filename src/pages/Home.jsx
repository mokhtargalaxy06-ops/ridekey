import { Compass, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Rentals from "./Rentals";
import Contact from "./Contact";

import BikeCard from "../components/BikeCard";
import Newsletter from "../components/Newsletter";
import { bikes } from "../data/bikes";
import { blogs } from "../data/blogs";
import { rides } from "../data/rides";
import { motion } from "framer-motion";
import { useI18n } from "../i18nContext";
// Page: Home

const HeroSlider = lazy(() => import("../components/HeroSlider"));

const brands = ["Voltstream", "Aurora", "Onyx", "Sierra", "Vortex", "Atlas"];

export default function Home() {
  const { t } = useI18n();
  const [copiedKey, setCopiedKey] = useState(null);
  const [loadedFilms, setLoadedFilms] = useState({});
  const [featuredActive, setFeaturedActive] = useState(0);
  const [ridesActive, setRidesActive] = useState(0);
  const getFeaturedPerView = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };
  const [featuredPerView, setFeaturedPerView] = useState(getFeaturedPerView);
  const youtubeId = "5B9F0tx5ERA";
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0&playsinline=1`;
  const paymentMethods = [
    {
      id: "cih",
      name: "CIH Bank",
      logoText: "CIH",
      url: "https://www.cihbank.ma/",
      merchantName: "Autobike SARL",
      accountLabel: t.payments.ribLabel,
      accountValue: "230 780 0000000000001234",
    },
    {
      id: "attijari",
      name: "Attijariwafa Bank",
      logoText: "AWB",
      url: "https://www.attijariwafabank.com/en",
      merchantName: "Autobike SARL",
      accountLabel: t.payments.ribLabel,
      accountValue: "230 810 0000000000005678",
    },
    {
      id: "bcp",
      name: "Banque Populaire",
      logoText: "BP",
      url: "https://www.gbp.ma/",
      merchantName: "Autobike SARL",
      accountLabel: t.payments.ribLabel,
      accountValue: "230 820 0000000000004321",
    },
    {
      id: "orange",
      name: "Orange Money",
      logoText: "OM",
      url: "https://www.orange.ma/",
      merchantName: "Autobike SARL",
      accountLabel: t.payments.walletLabel,
      accountValue: "OM-212-600-555-666",
    },
    {
      id: "inwi",
      name: "Inwi Money",
      logoText: "IN",
      url: "https://www.inwi.ma/",
      merchantName: "Autobike SARL",
      accountLabel: t.payments.walletLabel,
      accountValue: "IW-212-600-777-888",
    },
    {
      id: "mtcash",
      name: "Maroc Telecom (MT Cash)",
      logoText: "MT",
      url: "https://www.iam.ma/",
      merchantName: "Autobike SARL",
      accountLabel: t.payments.walletLabel,
      accountValue: "MT-212-600-999-000",
    },
  ];

  const rideFilms = [
    {
      title: t.home.rideFilm1Title,
      type: "youtube",
      src: youtubeEmbedUrl,
      poster: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
    },
    {
      title: t.home.rideFilm2Title,
      highSrc:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Riding_on_the_road_shoulder_on_a_motorcycle_in_Queensland.webm",
      lowSrc: "/videos/ride-480p.mp4",
      poster:
        "https://images.unsplash.com/photo-1759838494954-cefce6aded20?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
    },
  ];
  const testimonials = [
    {
      name: t.home.testimonial1Name,
      role: t.home.testimonial1Role,
      quote: t.home.testimonial1Quote,
      image:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&fm=jpg&q=80&w=400",
    },
    {
      name: t.home.testimonial2Name,
      role: t.home.testimonial2Role,
      quote: t.home.testimonial2Quote,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&fm=jpg&q=80&w=400",
    },
    {
      name: t.home.testimonial3Name,
      role: t.home.testimonial3Role,
      quote: t.home.testimonial3Quote,
      image:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&fm=jpg&q=80&w=400",
    },
  ];
  const categories = [
    {
      label: t.home.categorySport,
      count: t.home.categorySportCount,
      image: "/images/2025-KTM-390-Adventure-R-19.webp",
      type: "Sport",
    },
    {
      label: t.home.categoryCruiser,
      count: t.home.categoryCruiserCount,
      image: "/images/suzUki800.avif",
      type: "Cruiser",
    },
    {
      label: t.home.categoryElectric,
      count: t.home.categoryElectricCount,
      image: "/images/img3sliderHeroSection.jpg",
      type: "Electric",
    },
    {
      label: t.home.categoryTouring,
      count: t.home.categoryTouringCount,
      image: "/images/YAMAHA.webp",
      type: "Touring",
    },
  ];

  const reasons = [
    {
      icon: Compass,
      title: t.home.reason1Title,
      text: t.home.reason1Text,
    },
    {
      icon: Users,
      title: t.home.reason2Title,
      text: t.home.reason2Text,
    },
    {
      icon: Sparkles,
      title: t.home.reason3Title,
      text: t.home.reason3Text,
    },
    {
      icon: ShieldCheck,
      title: t.home.reason4Title,
      text: t.home.reason4Text,
    },
  ];

  useEffect(() => {
    const onResize = () => setFeaturedPerView(getFeaturedPerView());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const featuredGroups = useMemo(() => {
    const groups = [];
    for (let i = 0; i < bikes.length; i += featuredPerView) {
      groups.push(bikes.slice(i, i + featuredPerView));
    }
    return groups.length ? groups : [bikes];
  }, [featuredPerView]);

  useEffect(() => {
    setFeaturedActive(0);
  }, [featuredPerView]);

  const goFeatured = (index) => {
    setFeaturedActive(
      (index + featuredGroups.length) % featuredGroups.length,
    );
  };

  useEffect(() => {
    const id = setInterval(() => {
      setFeaturedActive((prev) => (prev + 1) % featuredGroups.length);
    }, 4500);
    return () => clearInterval(id);
  }, [featuredGroups.length]);

  const ridesSlides = rides;
  const goRides = (index) => {
    setRidesActive((index + ridesSlides.length) % ridesSlides.length);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setRidesActive((prev) => (prev + 1) % ridesSlides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [ridesSlides.length]);

  const copyText = async (value, key) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 1400);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  // Respect data saver/slow connections by disabling autoplay.
  const shouldAutoplayVideo = () => {
    const connection = navigator?.connection;
    if (!connection) return true;
    if (connection.saveData) return false;
    const fastTypes = ["4g", "wifi"];
    return fastTypes.includes(connection.effectiveType);
  };

  // Pick a lower-quality source on slow connections or data saver.
  const selectVideoSrc = (film) => {
    const connection = navigator?.connection;
    if (!film.lowSrc || !film.highSrc) return film.src;
    if (!connection) return film.highSrc;
    if (connection.saveData) return film.lowSrc;
    const slowTypes = ["slow-2g", "2g", "3g"];
    return slowTypes.includes(connection.effectiveType)
      ? film.lowSrc
      : film.highSrc;
  };

  return (
    <div className="space-y-24 pb-24">
      <section className="pt-28">
        <Suspense
          fallback={
            <div className="rounded-3xl border border-white/10 bg-night p-10 text-sm text-slate-300">
              Loading…
            </div>
          }
        >
          <HeroSlider />
        </Suspense>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="section-subtitle">{t.common.featured}</p>
            <h2 className="section-title mt-3">{t.home.featuredTitle}</h2>
          </div>
          <Link
            to="/bikes"
            className="rounded-full border border-white/15 px-5 py-2 text-sm"
          >
            {t.home.viewAll}
          </Link>
        </div>
        <div
          id="default-carousel"
          className="relative mt-10 w-full"
          data-carousel="slide"
        >
          <div className="relative h-[520px] overflow-hidden rounded-3xl">
            {featuredGroups.map((group, index) => (
              <div
                key={index}
                className={`absolute inset-0 duration-700 ease-in-out ${
                  index === featuredActive
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
                data-carousel-item
                aria-hidden={index !== featuredActive}
              >
                <div className="grid h-full w-full gap-6 p-2 md:grid-cols-2 md:p-6 lg:grid-cols-3">
                  {group.map((bike) => (
                    <div key={bike.id} className="h-full">
                      <BikeCard bike={bike} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
            {featuredGroups.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`h-3 w-3 rounded-full ${
                  index === featuredActive ? "bg-accent" : "bg-white/40"
                }`}
                aria-current={index === featuredActive}
                aria-label={`Slide ${index + 1}`}
                onClick={() => goFeatured(index)}
                data-carousel-slide-to={index}
              />
            ))}
          </div>

          <button
            type="button"
            className="absolute start-0 top-0 z-30 flex h-full items-center justify-center px-4 focus:outline-none"
            data-carousel-prev
            onClick={() => goFeatured(featuredActive - 1)}
            aria-label="Previous featured bikes"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40">
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m15 19-7-7 7-7"
                />
              </svg>
            </span>
          </button>
          <button
            type="button"
            className="absolute end-0 top-0 z-30 flex h-full items-center justify-center px-4 focus:outline-none"
            data-carousel-next
            onClick={() => goFeatured(featuredActive + 1)}
            aria-label="Next featured bikes"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40">
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <p className="section-subtitle">{t.common.categories}</p>
        <h2 className="section-title mt-3">{t.home.categoriesTitle}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.label}
              to={`/bikes?type=${encodeURIComponent(category.type)}`}
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card relative overflow-hidden rounded-2xl p-6 transition hover:border-white/20"
              >
                <img
                  src={category.image}
                  alt={category.label}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                <div className="relative">
                  <h3 className="text-lg font-semibold text-white">
                    {category.label}
                  </h3>
                  <p className="mt-2 text-xs text-slate-300">
                    {category.count}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="section-subtitle">{t.common.rides}</p>
            <h2 className="section-title mt-3">
              {t.home.ridesTitle}
            </h2>
          </div>
          <Link
            to="/rides"
            className="rounded-full border border-white/15 px-5 py-2 text-sm"
          >
            View all
          </Link>
        </div>
        <div
          id="rides-carousel"
          className="relative mt-8 w-full"
          data-carousel="slide"
        >
          <div className="relative h-[360px] overflow-hidden rounded-3xl">
            {ridesSlides.map((ride, index) => (
              <div
                key={ride.id}
                className={`absolute inset-0 duration-700 ease-in-out ${
                  index === ridesActive
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
                data-carousel-item
                aria-hidden={index !== ridesActive}
              >
                <article className="h-full w-full rounded-2xl border border-white/10 bg-night">
                  <div className="relative h-48 overflow-hidden rounded-t-2xl md:h-56">
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
                      <span className="text-base font-semibold">
                        {ride.price}
                      </span>
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
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
            {ridesSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`h-3 w-3 rounded-full ${
                  index === ridesActive ? "bg-accent" : "bg-white/40"
                }`}
                aria-current={index === ridesActive}
                aria-label={`Slide ${index + 1}`}
                onClick={() => goRides(index)}
                data-carousel-slide-to={index}
              />
            ))}
          </div>

          <button
            type="button"
            className="absolute start-0 top-0 z-30 flex h-full items-center justify-center px-4 focus:outline-none"
            data-carousel-prev
            onClick={() => goRides(ridesActive - 1)}
            aria-label="Previous rides"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40">
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m15 19-7-7 7-7"
                />
              </svg>
            </span>
          </button>
          <button
            type="button"
            className="absolute end-0 top-0 z-30 flex h-full items-center justify-center px-4 focus:outline-none"
            data-carousel-next
            onClick={() => goRides(ridesActive + 1)}
            aria-label="Next rides"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40">
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <p className="section-subtitle">{t.common.why}</p>
        <h2 className="section-title mt-3">{t.home.whyTitle}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-white/5 bg-night p-6"
            >
              <reason.icon className="text-accent" />
              <h3 className="mt-4 text-lg font-semibold text-white">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm text-slate-400">{reason.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <p className="section-subtitle">{t.common.journal}</p>
        <h2 className="section-title mt-3">{t.home.journalTitle}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-white/5 bg-night p-6"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-accent">
                {blog.tag}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {blog.title}
              </h3>
              <p className="mt-2 text-sm text-slate-400">{blog.excerpt}</p>
              <p className="mt-4 text-xs text-slate-500">{blog.date}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <p className="section-subtitle">{t.common.rideFilms}</p>
        <h2 className="section-title mt-3">{t.home.rideFilmsTitle}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {rideFilms.map((film, index) => (
            <div
              key={film.title}
              className="overflow-hidden rounded-3xl border border-white/10"
            >
              {film.type === "youtube" ? (
                <div className="relative h-72 w-full bg-black/60">
                  {loadedFilms[film.title] || shouldAutoplayVideo() ? (
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={film.src}
                      title={film.title}
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setLoadedFilms((prev) => ({
                          ...prev,
                          [film.title]: true,
                        }))
                      }
                      className="relative h-full w-full"
                      aria-label={`Play ${film.title}`}
                    >
                      <img
                        src={film.poster}
                        alt={film.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-white text-sm">
                        Play
                      </span>
                    </button>
                  )}
                </div>
              ) : (
                <video
                  className="h-72 w-full object-cover"
                  src={selectVideoSrc(film)}
                  poster={film.poster}
                  autoPlay={shouldAutoplayVideo()}
                  muted
                  loop
                  playsInline
                  preload={shouldAutoplayVideo() ? "metadata" : "none"}
                  controls={!shouldAutoplayVideo()}
                />
              )}
              <div className="bg-night px-6 py-4">
                <h3 className="text-lg font-semibold text-white">
                  {film.title}
                </h3>
                <p className="text-xs text-slate-400">{t.home.rideFilmsNote}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6" id="payments">
        <p className="section-subtitle">{t.payments.badge}</p>
        <h2 className="section-title mt-3">{t.payments.title}</h2>
        <div className="mt-6 rounded-3xl border border-white/10 bg-night p-6 text-sm text-slate-300">
          <p className="text-base font-semibold text-white">
            {t.payments.noticeTitle}
          </p>
          <p className="mt-2 text-slate-400">{t.payments.noticeBody}</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="rounded-3xl border border-white/10 bg-night p-6"
            >
              <a
                href={method.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-ink">
                  {method.logo ? (
                    <img
                      src={method.logo}
                      alt={method.name}
                      loading="lazy"
                      decoding="async"
                      className="h-8 w-8 object-contain"
                    />
                  ) : (
                    <span className="text-xs font-semibold">
                      {method.logoText}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    {t.payments.officialSite}
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {method.name}
                  </p>
                </div>
              </a>

              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-ink/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      {t.payments.merchantLabel}
                    </p>
                    <p className="mt-1 text-white">{method.merchantName}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyText(method.merchantName, `${method.id}-merchant`)
                    }
                    className="rounded-full border border-white/20 px-4 py-2 text-xs text-white"
                  >
                    {copiedKey === `${method.id}-merchant`
                      ? t.payments.copied
                      : t.payments.copy}
                  </button>
                </div>

                <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-ink/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      {method.accountLabel}
                    </p>
                    <p className="mt-1 text-white">{method.accountValue}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyText(method.accountValue, `${method.id}-account`)
                    }
                    className="rounded-full border border-white/20 px-4 py-2 text-xs text-white"
                  >
                    {copiedKey === `${method.id}-account`
                      ? t.payments.copied
                      : t.payments.copy}
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="rounded-3xl border border-white/10 bg-night p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-ink">
                <span className="text-xs font-semibold">COD</span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  {t.payments.manualLabel}
                </p>
                <p className="text-lg font-semibold text-white">
                  {t.payments.codTitle}
                </p>
              </div>
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-ink/70 p-4 text-sm text-slate-300">
              {t.payments.codBody}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <p className="section-subtitle">{t.common.testimonials}</p>
        <h2 className="section-title mt-3">{t.home.testimonialsTitle}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-white/10 bg-night p-6"
            >
              <p className="text-sm text-slate-300">“{item.quote}”</p>
              <div className="mt-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="400"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-400">{item.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <p className="section-subtitle">{t.common.partners}</p>
        <h2 className="section-title mt-3">{t.home.partnersTitle}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-6">
          {brands.map((brand) => (
            <div
              key={brand}
              className="rounded-2xl border border-white/5 bg-night px-4 py-6 text-center text-sm text-slate-300"
            >
              {brand}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <Rentals embedded />
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <Contact embedded />
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <Newsletter />
      </section>
    </div>
  );
}
