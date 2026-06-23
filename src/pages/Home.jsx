import { Compass, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Rentals from "./Rentals";
import Contact from "./Contact";

import BikeCard from "../components/BikeCard";
import SEO from "../components/SEO";
import { JsonLd } from "../components/JsonLd";
import { useCatalog } from "../catalogContext";
import { usePageSeo } from "../seo/usePageSeo";
import { motion } from "framer-motion";
import { useI18n } from "../i18nContext";
import { formatMadStringWithEuro } from "../utils/formatCurrency";
// Page: Home

const HeroSlider = lazy(() => import("../components/HeroSlider"));

const brands = [ "Suzuki",
  "KTM",
  "Royal Enfield",
  "Honda",
  "Yamaha",
  "Atlas"     ];




export default function Home() {
  const { t, lang } = useI18n();
  const { bikes, blogs, rides, rideShowcase } = useCatalog();
  const seo = usePageSeo("home");
  const [featuredActive, setFeaturedActive] = useState(0);
  const [ridesActive, setRidesActive] = useState(0);
  const getFeaturedPerView = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };
  const [featuredPerView, setFeaturedPerView] = useState(getFeaturedPerView);

  const testimonials = [
    {
      name: "Yassine Benjelloun",
      role: "V-Strom 800DE rider",
      quote:
        "I rented the V-Strom 800DE for an Atlas Mountains loop from Marrakech. It felt stable on fast roads, comfortable all day, and perfectly prepared for Moroccan terrain.",
      image: "/images/vestrom800de.jpg",
    },
    {
      name: "Hicham El Fassi",
      role: "DR650 rider",
      quote:
        "The DR650 was exactly what I needed for Agafay gravel tracks and small mountain roads. Simple, light, and easy to trust when the route got rough.",
      image: "/images/DR650.jpg",
    },
    {
      name: "Salma El Amrani",
      role: "KTM 390 Adventure rider",
      quote:
        "I chose the KTM 390 Adventure for a day ride outside Marrakech. It was light in traffic, fun in the bends, and perfect for a confident first adventure rental.",
      image: "/images/ktm390.webp",
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

  // Respect data saver/slow connections by disabling autoplay.
  const shouldAutoplayVideo = () => {
    const connection = navigator?.connection;
    if (!connection) return true;
    if (connection.saveData) return false;
    const fastTypes = ["4g", "wifi"];
    return fastTypes.includes(connection.effectiveType);
  };

  return (
    <div className="space-y-24 pb-24">
      <SEO
        {...seo}
        keywords={[
          "motorcycle rental Marrakech",
          "motorbike rental Marrakech",
          "adventure motorcycle Morocco",
          "location moto Marrakech",
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Ridekey Motocycles",
          alternateName: ["RideKey Morocco", "RideKey"],
          url: "https://ridekey.ma",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://ridekey.ma/bikes?search={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }}
      />
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
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 hover:bg-accent/90"
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

            <button
              type="button"
              className="absolute left-4 top-1/2 z-40 -translate-y-1/2 rounded-full p-1 focus:outline-none"
              data-carousel-prev
              onClick={() => goFeatured(featuredActive - 1)}
              aria-label={t.common.previous}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 text-white shadow-lg shadow-black/30 transition hover:bg-white/50">
                <span className="sr-only">{t.common.previous}</span>
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
              className="absolute right-4 top-1/2 z-40 -translate-y-1/2 rounded-full p-1 focus:outline-none"
              data-carousel-next
              onClick={() => goFeatured(featuredActive + 1)}
              aria-label={t.common.next}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 text-white shadow-lg shadow-black/30 transition hover:bg-white/50">
                <span className="sr-only">{t.common.next}</span>
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

        </div>
      </section>

      {/* <section className="mx-auto max-w-6xl px-6">
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
      </section> */}

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
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 hover:bg-accent/90"
          >
            View all
          </Link>
        </div>
        <div
          id="rides-carousel"
          className="relative mt-8 w-full"
          data-carousel="slide"
        >
          <div className="relative h-[540px] overflow-hidden rounded-2xl md:h-[420px]">
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
                <article className="grid h-full w-full min-h-[420px] grid-cols-[1fr_1fr] overflow-hidden rounded-2xl border border-white/10 bg-night">
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
                  </div>
                  <div className="col-start-2 row-span-2 h-full border-l border-white/10 bg-black">
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
            aria-label={t.common.previous}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40">
              <span className="sr-only">{t.common.previous}</span>
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
            aria-label={t.common.next}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40">
              <span className="sr-only">{t.common.next}</span>
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
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-night">
          <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="section-subtitle">{t.common.rideFilms}</p>
              <h2 className="section-title mt-3">{t.home.rideShowTitle}</h2>
              <p className="mt-4 text-sm text-slate-300">
                {t.home.rideShowDescription}
              </p>
              <a
                href={`https://www.youtube.com/watch?v=${rideShowcase.youtubeId}`}
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
                  src={`https://www.youtube.com/embed/${rideShowcase.youtubeId}?rel=0&modestbranding=1&playsinline=1`}
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

      {/* <section className="mx-auto max-w-6xl px-6">
        <Newsletter />
      </section> */}
    </div>
  );
}
