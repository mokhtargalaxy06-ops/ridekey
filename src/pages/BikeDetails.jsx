import { Link, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { bikes } from '../data/bikes'
import { gearItems } from '../data/gear'
import { CalendarCheck, PhoneCall } from 'lucide-react'
import { motion } from 'framer-motion'
import { useI18n } from '../i18nContext'
import { formatMAD } from '../utils/formatCurrency'
// Page: BikeDetails

export default function BikeDetails() {
  const { t, lang } = useI18n()
  const { id } = useParams()
  const bike = bikes.find((item) => item.id === id)
  const [selectedGearIds, setSelectedGearIds] = useState([])
  const [rental, setRental] = useState({
    name: "",
    phone: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    pickupTime: "10:00",
    returnTime: "18:00",
  })

  const addDays = (iso, days) => {
    const date = new Date(iso)
    date.setDate(date.getDate() + days)
    return date.toISOString().split("T")[0]
  }

  const minEndDate = addDays(rental.startDate, 1)

  const gearParam = useMemo(() => {
    if (!selectedGearIds.length) return ''
    return `&gear=${selectedGearIds.join(',')}`
  }, [selectedGearIds])

  // Pass rental details into checkout so WhatsApp is prefilled.
  const rentalParams = useMemo(() => {
    const params = new URLSearchParams({
      renterName: rental.name,
      renterPhone: rental.phone,
      startDate: rental.startDate,
      endDate: rental.endDate,
      pickupTime: rental.pickupTime,
      returnTime: rental.returnTime
    })
    return `&${params.toString()}`
  }, [rental])

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
            <img
              src={bike.image}
              alt={bike.name}
              loading="eager"
              decoding="async"
              width="1200"
              height="800"
              className="h-[420px] w-full object-cover"
            />
          </motion.div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {bike.gallery.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`${bike.name} ${index + 1}`}
                loading="lazy"
                decoding="async"
                width="1200"
                height="800"
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
          <div className="rounded-2xl border border-white/10 p-4 text-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              {t.rentals.badge || "Rentals"}
            </p>
            <p className="mt-2 text-sm text-slate-300">
              {t.rentals.title || "Book a motorcycle rental."}
            </p>
            <div className="mt-4 grid gap-4">
              <label className="text-slate-300">
                {t.rentals.renterName}
                <input
                  className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
                  value={rental.name}
                  onChange={(event) =>
                    setRental({ ...rental, name: event.target.value })
                  }
                />
              </label>
              <label className="text-slate-300">
                {t.rentals.renterPhone}
                <input
                  className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
                  value={rental.phone}
                  onChange={(event) =>
                    setRental({ ...rental, phone: event.target.value })
                  }
                />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-slate-300">
                  {t.rentals.startDate}
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
                    value={rental.startDate}
                    onChange={(event) =>
                      setRental({ ...rental, startDate: event.target.value })
                    }
                  />
                </label>
                <label className="text-slate-300">
                  {t.rentals.endDate}
                  <input
                    type="date"
                    min={minEndDate}
                    className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
                    value={rental.endDate}
                    onChange={(event) =>
                      setRental({ ...rental, endDate: event.target.value })
                    }
                  />
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-slate-300">
                  {t.rentals.pickupTime}
                  <input
                    type="time"
                    className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
                    value={rental.pickupTime}
                    onChange={(event) =>
                      setRental({ ...rental, pickupTime: event.target.value })
                    }
                  />
                </label>
                <label className="text-slate-300">
                  {t.rentals.returnTime}
                  <input
                    type="time"
                    className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
                    value={rental.returnTime}
                    onChange={(event) =>
                      setRental({ ...rental, returnTime: event.target.value })
                    }
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 p-4 text-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              {t.bikes.accessoriesTitle}
            </p>
            <p className="mt-2 text-sm text-slate-300">
              {t.bikes.accessoriesNote}
            </p>
            <div className="mt-4 grid gap-3">
              {gearItems.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                    <div>
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-200 transition hover:text-accent"
                        >
                          {item.name}
                        </a>
                      ) : (
                        <span className="text-slate-200">{item.name}</span>
                      )}
                      <p className="text-xs text-slate-400">{item.price}</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedGearIds.includes(item.id)}
                    onChange={() =>
                      setSelectedGearIds((prev) =>
                        prev.includes(item.id)
                          ? prev.filter((gearId) => gearId !== item.id)
                          : [...prev, item.id],
                      )
                    }
                    className="h-4 w-4 rounded border-white/30 bg-white/90 text-ink"
                  />
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              to={`/bikes?select=${bike.id}${gearParam}${rentalParams}#whatsapp-checkout`}
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
