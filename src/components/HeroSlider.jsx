import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useI18n } from "../i18nContext";

// Component: HeroSlider

export default function HeroSlider() {
  const { t } = useI18n();
  const slides = [
    {
      title: t.home.heroTitle3,
      subtitle: t.home.heroSub3,
      image: "/images/2025-KTM-390-Adventure-R-19.webp",
    },
    {
      title: t.home.heroTitle1,
      subtitle: t.home.heroSub1,
      image: "/images/suzUki800.avif",
    },
    {
      title: t.home.heroTitle2,
      subtitle: t.home.heroSub2,
      image: "/images/img3sliderHeroSection.jpg",
    },
    {
      title: t.home.heroTitle3,
      subtitle: t.home.heroSub3,
      image: "/images/YAMAHA.webp",
    },
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(id);
  }, [slides.length]);

  const goTo = (index) => setActive(index);
  const prev = () =>
    setActive((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  const next = () => setActive((prevIndex) => (prevIndex + 1) % slides.length);

  return (
    <div className="relative h-[520px] overflow-hidden rounded-3xl">
      {slides.map((slide, index) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === active ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={index !== active}
        >
          <img
            src={slide.image}
            alt={slide.title}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            width="3000"
            height="2000"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
          <div className="absolute inset-0 flex flex-col justify-center px-12">
            <p className="section-subtitle">{t.home.heroBadge}</p>
            <h1 className="mt-4 text-4xl font-semibold text-white md:text-6xl">
              {slide.title}
            </h1>
            <p className="mt-4 max-w-md text-sm text-slate-200">
              {slide.subtitle}
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                to="/bikes"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white"
              >
                {t.home.ctaExplore}
              </Link>
              <Link
                to="/bikes#whatsapp-checkout"
                className="rounded-full border border-white/40 px-6 py-3 text-sm text-white"
              >
                {t.home.ctaBook}
              </Link>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-sm text-white"
      >
        Prev
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-sm text-white"
      >
        Next
      </button>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 w-6 rounded-full transition ${
              index === active ? "bg-accent" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
