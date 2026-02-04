import { useMemo, useState } from "react";

import BikeCard from "../components/BikeCard";
import Filters from "../components/Filters";
import { bikes } from "../data/bikes";
import { gearItems } from "../data/gear";
import { useI18n } from "../i18nContext";
import { formatMAD } from "../utils/formatCurrency";

const defaultFilters = {
  brand: "All",
  type: "All",
  engine: "All",
  price: "All",
  sort: "Newest",
};

const priceCheck = (price, range) => {
  if (range === "Under 15000") return price < 15000;
  if (range === "15000 - 20000") return price >= 15000 && price <= 20000;
  if (range === "20000+") return price > 20000;
  return true;
};

export default function Bikes() {
  const { t, lang } = useI18n();
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedBikeIds, setSelectedBikeIds] = useState([]);
  const [selectedGearIds, setSelectedGearIds] = useState([]);

  const whatsappNumber = "+212608188138";
  const whatsappNumberClean = whatsappNumber.replace(/\D/g, "");

  const filtered = useMemo(() => {
    const byFilters = bikes.filter((bike) => {
      const matchesBrand =
        filters.brand === "All" || bike.brand === filters.brand;
      const matchesType = filters.type === "All" || bike.type === filters.type;
      const matchesEngine =
        filters.engine === "All" || bike.displacement === filters.engine;
      const matchesPrice = priceCheck(bike.price, filters.price);
      return matchesBrand && matchesType && matchesEngine && matchesPrice;
    });

    const sorted = [...byFilters];
    if (filters.sort === "Price: Low to High") {
      sorted.sort((a, b) => a.price - b.price);
    }
    if (filters.sort === "Price: High to Low") {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [filters]);

  const selectedBikes = bikes.filter((bike) =>
    selectedBikeIds.includes(bike.id),
  );
  const selectedGear = gearItems.filter((item) =>
    selectedGearIds.includes(item.id),
  );

  const total = useMemo(() => {
    const bikesTotal = selectedBikes.reduce((sum, bike) => sum + bike.price, 0);
    const gearTotal = selectedGear.reduce(
      (sum, item) => sum + item.priceValue,
      0,
    );
    return bikesTotal + gearTotal;
  }, [selectedBikes, selectedGear]);

  const toggleBike = (id) => {
    setSelectedBikeIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleGear = (id) => {
    setSelectedGearIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const buildMessage = () => {
    const bikeLines = selectedBikes.map(
      (bike) => `• ${bike.name} — ${formatMAD(bike.price, lang)}`,
    );
    const gearLines = selectedGear.map(
      (item) => `• ${item.name} — ${item.price}`,
    );
    const lines = [t.bikes.messageIntro, "", t.bikes.messageMotorcycles];
    if (bikeLines.length) {
      lines.push(...bikeLines);
    } else {
      lines.push(`• ${t.bikes.messageNone}`);
    }
    lines.push("", t.bikes.messageAccessories);
    if (gearLines.length) {
      lines.push(...gearLines);
    } else {
      lines.push(`• ${t.bikes.messageNone}`);
    }
    lines.push("", `${t.bikes.messageTotal}: ${formatMAD(total, lang)}`);
    return lines.join("\n");
  };

  const whatsappUrl = `https://wa.me/${whatsappNumberClean}?text=${encodeURIComponent(buildMessage())}`;

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-28">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-subtitle">{t.common.inventory}</p>
          <h1 className="section-title mt-3">{t.bikes.title}</h1>
        </div>
        <p className="text-sm text-slate-400">
          {filtered.length} {t.bikes.modelsAvailable}
        </p>
      </div>
      <div className="mt-6 rounded-2xl border border-white/10 bg-night px-5 py-4 text-sm text-slate-300">
        {t.bikes.selectPrompt}
      </div>

      <div className="mt-8">
        <Filters filters={filters} setFilters={setFilters} />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {filtered.map((bike) => (
          <div key={bike.id} className="relative">
            <label className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white shadow-glow">
              <input
                type="checkbox"
                checked={selectedBikeIds.includes(bike.id)}
                onChange={() => toggleBike(bike.id)}
                className="h-4 w-4 rounded border-white/30 bg-white/90 text-ink"
              />
              {t.common.select}
            </label>
            <BikeCard bike={bike} />
          </div>
        ))}
      </div>

      <section className="mt-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="section-subtitle">{t.common.accessories}</p>
            <h2 className="section-title mt-3">{t.bikes.accessoriesTitle}</h2>
          </div>
          <p className="text-sm text-slate-400">{t.bikes.accessoriesNote}</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {gearItems.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-night"
            >
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">
                    {item.category}
                  </p>
                  <label className="flex items-center gap-2 text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={selectedGearIds.includes(item.id)}
                      onChange={() => toggleGear(item.id)}
                      className="h-4 w-4 rounded border-white/30 bg-white/90 text-ink"
                    />
                    {t.common.select}
                  </label>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  {t.bikes.rated} {item.rating.toFixed(2)} {t.bikes.outOf}
                </p>
                <p className="mt-2 text-sm text-slate-400">{item.price}</p>
                <button className="mt-4 rounded-full border border-white/20 px-4 py-2 text-xs text-white">
                  {item.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="whatsapp-checkout"
        className="mt-16 rounded-3xl border border-white/10 bg-night p-8"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="section-subtitle">{t.common.whatsappCheckout}</p>
            <h2 className="section-title mt-3">{t.bikes.whatsappTitle}</h2>
            <p className="mt-2 text-sm text-slate-400">
              {t.bikes.whatsappNote}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">{t.common.total}</p>
            <p className="text-3xl font-semibold text-accent">
              {formatMAD(total, lang)}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-ink/60 p-4 text-sm text-slate-300">
          <pre className="whitespace-pre-wrap font-sans">{buildMessage()}</pre>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white"
          >
            {t.bikes.sendWhatsapp}
          </a>
          <button
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm text-white"
            onClick={() => {
              setSelectedBikeIds([]);
              setSelectedGearIds([]);
            }}
          >
            {t.bikes.clear}
          </button>
        </div>
      </section>
    </div>
  );
}
