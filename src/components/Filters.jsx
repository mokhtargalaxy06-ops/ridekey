import { brands, types } from '../data/bikes'
import { useI18n } from '../i18nContext'
// Component: Filters

export default function Filters({ filters, setFilters }) {
  const { t, lang } = useI18n()
  const formatNumber = (value) => new Intl.NumberFormat(lang).format(value)
  const underLabel = t.filters.under15000.replace('15000', formatNumber(15000))
  const betweenLabel = t.filters.between15000
    .replace('15000', formatNumber(15000))
    .replace('20000', formatNumber(20000))
  const aboveLabel = t.filters.above20000.replace('20000', formatNumber(20000))
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
        {['All', '0cc', '700cc', '850cc', '998cc', '1200cc', '1250cc'].map((engine) => (
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
        {[
          { key: 'All', label: 'All' },
          { key: 'Under 15000', label: underLabel },
          { key: '15000 - 20000', label: betweenLabel },
          { key: '20000+', label: aboveLabel }
        ].map((range) => (
          <option key={range.key} value={range.key}>
            {range.label}
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
