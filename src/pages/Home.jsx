import { motion } from 'framer-motion'
import { Bike, Clock, Shield, Sparkles } from 'lucide-react'
import HeroSlider from '../components/HeroSlider'
import BikeCard from '../components/BikeCard'
import Newsletter from '../components/Newsletter'
import { bikes } from '../data/bikes'
import { blogs } from '../data/blogs'
import { useI18n } from '../i18nContext'

const brands = ['Voltstream', 'Aurora', 'Onyx', 'Sierra', 'Vortex', 'Atlas']

export default function Home() {
  const { t } = useI18n()
  const rideFilms = [
    {
      title: t.home.rideFilm1Title,
      src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Harley-Davidson.webmhd.webm',
      poster:
        'https://images.unsplash.com/photo-1762012507757-b18cdd13791b?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000'
    },
    {
      title: t.home.rideFilm2Title,
      src:
        'https://commons.wikimedia.org/wiki/Special:FilePath/Riding_on_the_road_shoulder_on_a_motorcycle_in_Queensland.webm',
      poster:
        'https://images.unsplash.com/photo-1759838494954-cefce6aded20?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000'
    }
  ]
  const testimonials = [
    {
      name: t.home.testimonial1Name,
      role: t.home.testimonial1Role,
      quote: t.home.testimonial1Quote,
      image:
        'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&fm=jpg&q=80&w=400'
    },
    {
      name: t.home.testimonial2Name,
      role: t.home.testimonial2Role,
      quote: t.home.testimonial2Quote,
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&fm=jpg&q=80&w=400'
    },
    {
      name: t.home.testimonial3Name,
      role: t.home.testimonial3Role,
      quote: t.home.testimonial3Quote,
      image:
        'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&fm=jpg&q=80&w=400'
    }
  ]
  const categories = [
    { label: t.home.categorySport, count: t.home.categorySportCount },
    { label: t.home.categoryCruiser, count: t.home.categoryCruiserCount },
    { label: t.home.categoryElectric, count: t.home.categoryElectricCount },
    { label: t.home.categoryTouring, count: t.home.categoryTouringCount }
  ]

  const reasons = [
    {
      icon: Sparkles,
      title: t.home.reason1Title,
      text: t.home.reason1Text
    },
    {
      icon: Shield,
      title: t.home.reason2Title,
      text: t.home.reason2Text
    },
    {
      icon: Bike,
      title: t.home.reason3Title,
      text: t.home.reason3Text
    },
    {
      icon: Clock,
      title: t.home.reason4Title,
      text: t.home.reason4Text
    }
  ]

  return (
    <div className="space-y-24 pb-24">
      <section className="pt-28">
        <HeroSlider />
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="section-subtitle">{t.common.featured}</p>
            <h2 className="section-title mt-3">{t.home.featuredTitle}</h2>
          </div>
          <button className="hidden rounded-full border border-white/15 px-5 py-2 text-sm md:block">
            {t.home.viewAll}
          </button>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {bikes.slice(0, 3).map((bike) => (
            <motion.div
              key={bike.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <BikeCard bike={bike} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <p className="section-subtitle">{t.common.categories}</p>
        <h2 className="section-title mt-3">{t.home.categoriesTitle}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 transition hover:border-white/20"
            >
              <h3 className="text-lg font-semibold text-white">{category.label}</h3>
              <p className="mt-2 text-xs text-slate-400">{category.count}</p>
            </motion.div>
          ))}
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
              <h3 className="mt-4 text-lg font-semibold text-white">{reason.title}</h3>
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
              <p className="text-xs uppercase tracking-[0.2em] text-accent">{blog.tag}</p>
              <h3 className="mt-3 text-lg font-semibold text-white">{blog.title}</h3>
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
          {rideFilms.map((film) => (
            <div key={film.title} className="overflow-hidden rounded-3xl border border-white/10">
              <video
                className="h-72 w-full object-cover"
                src={film.src}
                poster={film.poster}
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="bg-night px-6 py-4">
                <h3 className="text-lg font-semibold text-white">{film.title}</h3>
                <p className="text-xs text-slate-400">{t.home.rideFilmsNote}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <p className="section-subtitle">{t.common.testimonials}</p>
        <h2 className="section-title mt-3">{t.home.testimonialsTitle}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-2xl border border-white/10 bg-night p-6">
              <p className="text-sm text-slate-300">“{item.quote}”</p>
              <div className="mt-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{item.name}</p>
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
        <Newsletter />
      </section>
    </div>
  )
}
