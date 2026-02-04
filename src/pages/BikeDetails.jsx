import { Link, useParams } from 'react-router-dom'
import { bikes } from '../data/bikes'
import { CalendarCheck, PhoneCall } from 'lucide-react'
import { motion } from 'framer-motion'
import { useI18n } from '../i18nContext'
import { formatMAD } from '../utils/formatCurrency'

export default function BikeDetails() {
  const { t, lang } = useI18n()
  const { id } = useParams()
  const bike = bikes.find((item) => item.id === id)

  if (!bike) {
    return (
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-28">
        <h1 className="text-2xl font-semibold text-white">{t.details.notFound}</h1>
        <Link to="/bikes" className="mt-4 inline-block text-accent">
          {t.details.back}
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-28">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-3xl border border-white/10"
          >
            <img src={bike.image} alt={bike.name} className="h-[420px] w-full object-cover" />
          </motion.div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {bike.gallery.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`${bike.name} ${index + 1}`}
                className="h-32 w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        </div>
        <div className="space-y-6 rounded-3xl border border-white/10 bg-night p-8">
          <div>
            <p className="section-subtitle">{bike.brand}</p>
            <h1 className="section-title mt-3">{bike.name}</h1>
            <p className="mt-3 text-2xl font-semibold text-accent">
              {formatMAD(bike.price, lang)}
            </p>
          </div>
          <p className="text-sm text-slate-300">{bike.description}</p>
          <div className="rounded-2xl border border-white/10 p-4 text-sm">
            <div className="flex items-center justify-between border-b border-white/10 py-2">
              <span>{t.details.engine}</span>
              <span className="text-white">{bike.engine}</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 py-2">
              <span>{t.details.displacement}</span>
              <span className="text-white">{bike.displacement}</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 py-2">
              <span>{t.details.torque}</span>
              <span className="text-white">{bike.torque}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>{t.details.topSpeed}</span>
              <span className="text-white">{bike.topSpeed}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              to="/bikes#whatsapp-checkout"
              className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold"
            >
              <CalendarCheck size={18} />
              {t.details.book}
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm"
            >
              <PhoneCall size={18} />
              {t.details.contact}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
