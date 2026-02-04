import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18nContext'

export default function HeroSlider() {
  const { t } = useI18n()
  const slides = [
    {
      title: t.home.heroTitle1,
      subtitle: t.home.heroSub1,
      image:
        'https://images.unsplash.com/photo-1762012507757-b18cdd13791b?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000'
    },
    {
      title: t.home.heroTitle2,
      subtitle: t.home.heroSub2,
      image:
        'https://images.unsplash.com/photo-1759838494954-cefce6aded20?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000'
    },
    {
      title: t.home.heroTitle3,
      subtitle: t.home.heroSub3,
      image:
        'https://images.unsplash.com/photo-1623785419758-7d48241054a4?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000'
    }
  ]
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 4000 }}
      pagination={{ clickable: true }}
      loop
      className="rounded-3xl"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.title}>
          <div className="relative h-[520px] overflow-hidden rounded-3xl">
            <img
              src={slide.image}
              alt={slide.title}
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
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
