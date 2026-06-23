import { Link } from 'react-router-dom'
import { useI18n } from '../i18nContext'
import { formatMAD } from '../utils/formatCurrency'
// Component: BikeCard

export default function BikeCard({ bike, onSelect, selected }) {
  const { t, lang } = useI18n()
  const ImageWrapper = onSelect ? 'button' : Link
  const imageWrapperProps = onSelect
    ? {
        type: 'button',
        'aria-pressed': Boolean(selected),
        onClick: () => onSelect?.(bike.id)
      }
    : {
        to: `/bikes/${bike.id}`,
        'aria-label': `${t.details.viewDetails || 'View Details'}: ${bike.name}`
      }

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/5 bg-night">
      <div className="relative h-48 overflow-hidden">
        <ImageWrapper
          {...imageWrapperProps}
          className={`absolute inset-0 h-full w-full ${selected ? 'ring-2 ring-accent' : ''}`}
        >
          <img
            src={bike.image}
            alt={`${bike.brand} ${bike.name} adventure motorcycle rental in Marrakech Morocco`}
            loading="lazy"
            decoding="async"
            width="1200"
            height="800"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
        </ImageWrapper>
        <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
          {bike.type}
        </span>
      </div>
      <div className="space-y-3 p-5">
        <div>
          <h3 className="text-lg font-semibold text-white">{bike.name}</h3>
          <p className="text-xs text-slate-400">{bike.engine} · {bike.displacement}</p>
        </div>
        <p className="text-sm text-slate-300">{formatMAD(bike.price, lang)}</p>
        <Link
          to={`/bikes/${bike.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
        >
          {t.details.viewDetails || 'View Details'}
        </Link>
      </div>
    </div>
  )
}
