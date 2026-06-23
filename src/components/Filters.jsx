import { useCatalog } from '../catalogContext'
import { useI18n } from '../i18nContext'
import { formatMADOnly } from '../utils/formatCurrency'
// Component: Filters

export default function Filters({ filters, setFilters }) {
  const { t, lang } = useI18n()
  const { bikeFilters } = useCatalog()
  const { brands, displacements, priceRanges, types } = bikeFilters
  const getPriceLabel = (range) => {
    if (range.key === 'All') return t.filters.all
    if (range.min === range.max) return formatMADOnly(range.min, lang)
    return `${formatMADOnly(range.min, lang)} - ${formatMADOnly(range.max, lang)}`
  }

  return (
    <div className="grid gap-4 rounded-2xl border border-white/10 bg-night p-5 text-sm md:grid-cols-5">
      <select
        className="rounded-lg border-white/10 bg-ink text-white"
        value={filters.brand}
        onChange={(event) => setFilters({ ...filters, brand: event.target.value })}
      >
        {brands.map((brand) => (
          <option key={brand}>{brand === 'All' ? t.filters.all : brand}</option>
        ))}
      </select>
      <select
        className="rounded-lg border-white/10 bg-ink text-white"
        value={filters.type}
        onChange={(event) => setFilters({ ...filters, type: event.target.value })}
      >
        {types.map((type) => (
          <option key={type}>{type === 'All' ? t.filters.all : type}</option>
        ))}
      </select>
      <select
        className="rounded-lg border-white/10 bg-ink text-white"
        value={filters.engine}
        onChange={(event) => setFilters({ ...filters, engine: event.target.value })}
      >
        {displacements.map((engine) => (
          <option key={engine}>
            {engine === 'All' ? t.filters.all : engine}
          </option>
        ))}
      </select>
      <select
        className="rounded-lg border-white/10 bg-ink text-white"
        value={filters.price}
        onChange={(event) => setFilters({ ...filters, price: event.target.value })}
      >
        {priceRanges.map((range) => (
          <option key={range.key} value={range.key}>
            {getPriceLabel(range)}
          </option>
        ))}
      </select>
      <select
        className="rounded-lg border-white/10 bg-ink text-white"
        value={filters.sort}
        onChange={(event) => setFilters({ ...filters, sort: event.target.value })}
      >
        {[
          { key: 'Newest', label: t.filters.newest },
          { key: 'Price: Low to High', label: t.filters.lowHigh },
          { key: 'Price: High to Low', label: t.filters.highLow }
        ].map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
