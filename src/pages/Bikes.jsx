import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import BikeCard from "../components/BikeCard";
import Filters from "../components/Filters";
import { bikes, types } from "../data/bikes";
import { gearItems } from "../data/gear";
import { useI18n } from "../i18nContext";
import { formatMAD } from "../utils/formatCurrency";
// Page: Bikes

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
  const location = useLocation();
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedBikeIds, setSelectedBikeIds] = useState([]);
  const [selectedGearIds, setSelectedGearIds] = useState([]);
  const [rental, setRental] = useState({
    name: "",
    phone: "",
    startDate: "",
    endDate: "",
    pickupTime: "10:00",
    returnTime: "18:00",
  });
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

  const whatsappNumber = "+212608188138";
  const whatsappNumberClean = whatsappNumber.replace(/\D/g, "");
  const emailAddress = "hello@riveline.studio";

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

  // Rental duration in days (min 1 day).
  const rentalDays = useMemo(() => {
    if (!rental.startDate || !rental.endDate) return 0;
    const start = new Date(rental.startDate);
    const end = new Date(rental.endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return Math.max(1, diff);
  }, [rental.startDate, rental.endDate]);

  // Rental total includes bike daily rates + accessory daily rates.
  const rentalTotal = useMemo(() => {
    if (!rentalDays) return 0;
    const bikesTotal = selectedBikes.reduce(
      (sum, bike) => sum + (bike.rentalRate || 0) * rentalDays,
      0,
    );
    const gearDailyTotal = selectedGear.reduce(
      (sum, item) => sum + (item.priceValue || 0),
      0,
    );
    const gearTotal = gearDailyTotal * rentalDays;
    return bikesTotal + gearTotal;
  }, [selectedBikes, selectedGear, rentalDays]);

  const todayIso = () => new Date().toISOString().split("T")[0];
  const addDays = (iso, days) => {
    const date = new Date(iso);
    date.setDate(date.getDate() + days);
    return date.toISOString().split("T")[0];
  };

  const minEndDate = rental.startDate
    ? addDays(rental.startDate, 1)
    : addDays(todayIso(), 1);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectId = params.get("select");
    const typeParam = params.get("type");
    const gearParam = params.get("gear");
    const renterName = params.get("renterName");
    const renterPhone = params.get("renterPhone");
    const startDate = params.get("startDate");
    const endDate = params.get("endDate");
    const pickupTime = params.get("pickupTime");
    const returnTime = params.get("returnTime");
    if (selectId && bikes.some((bike) => bike.id === selectId)) {
      setSelectedBikeIds((prev) =>
        prev.includes(selectId) ? prev : [...prev, selectId],
      );
    }
    if (typeParam && types.includes(typeParam)) {
      setFilters((prev) => ({ ...prev, type: typeParam }));
    }
    if (gearParam) {
      const gearIds = gearParam
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      if (gearIds.length) {
        setSelectedGearIds((prev) => {
          const next = new Set(prev);
          gearIds.forEach((gearId) => {
            if (gearItems.some((item) => item.id === gearId)) {
              next.add(gearId);
            }
          });
          return Array.from(next);
        });
      }
    }
    if (
      renterName ||
      renterPhone ||
      startDate ||
      endDate ||
      pickupTime ||
      returnTime
    ) {
      setRental((prev) => ({
        ...prev,
        name: renterName ?? prev.name,
        phone: renterPhone ?? prev.phone,
        startDate: startDate ?? prev.startDate,
        endDate: endDate ?? prev.endDate,
        pickupTime: pickupTime ?? prev.pickupTime,
        returnTime: returnTime ?? prev.returnTime,
      }));
    }
  }, [location.search]);

  const total = useMemo(() => {
    const bikesTotal = selectedBikes.reduce((sum, bike) => sum + bike.price, 0);
    const gearTotal = selectedGear.reduce(
      (sum, item) => sum + item.priceValue,
      0,
    );
    return bikesTotal + gearTotal + rentalTotal;
  }, [selectedBikes, selectedGear, rentalTotal]);

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

  // Build the WhatsApp payload so users can review before sending.
  const buildMessage = () => {
    const bikeLines = selectedBikes.map(
      (bike) => `• ${bike.name} — ${formatMAD(bike.price, lang)}`,
    );
    const gearLines = selectedGear.map(
      (item) => `• ${item.name} — ${item.price} / day`,
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
    lines.push("", `${t.rentals.messageLabel || "Rental details"}:`);
    lines.push(
      `• ${t.rentals.renterName || "Renter name"}: ${rental.name || "-"}`,
    );
    lines.push(
      `• ${t.rentals.renterPhone || "Phone number"}: ${rental.phone || "-"}`,
    );
    lines.push(
      `• ${t.rentals.startDate || "Start date"}: ${rental.startDate || "-"}`,
    );
    lines.push(
      `• ${t.rentals.endDate || "End date"}: ${rental.endDate || "-"}`,
    );
    lines.push(
      `• ${t.rentals.pickupTime || "Pickup time"}: ${rental.pickupTime || "-"}`,
    );
    lines.push(
      `• ${t.rentals.returnTime || "Return time"}: ${rental.returnTime || "-"}`,
    );
    if (rentalDays && selectedBikes.length) {
      lines.push(
        `• ${t.rentals.badge || "Rentals"}: ${rentalDays} day(s)`,
      );
      selectedBikes.forEach((bike) => {
        lines.push(
          `• ${bike.name} — ${formatMAD(bike.rentalRate || 0, lang)} / day`,
        );
      });
      if (selectedGear.length) {
        lines.push(`• ${t.bikes.accessoriesTitle}:`);
        selectedGear.forEach((item) => {
          lines.push(`• ${item.name} — ${item.price} / day`);
        });
      }
      lines.push(
        `• ${t.common.total} (${t.rentals.badge || "Rentals"}): ${formatMAD(rentalTotal, lang)}`,
      );
    }
    lines.push("", `${t.bikes.messageTotal}: ${formatMAD(total, lang)}`);
    return lines.join("\n");
  };

  const whatsappUrl = `https://wa.me/${whatsappNumberClean}?text=${encodeURIComponent(buildMessage())}`;
  const emailUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(t.bikes.emailSubject)}&body=${encodeURIComponent(buildMessage())}`;

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

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
            <BikeCard
              bike={bike}
              selected={selectedBikeIds.includes(bike.id)}
              onSelect={toggleBike}
            />
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
                <button
                  type="button"
                  aria-pressed={selectedGearIds.includes(item.id)}
                  onClick={() => toggleGear(item.id)}
                  className={`relative h-full w-full ${
                    selectedGearIds.includes(item.id) ? 'ring-2 ring-accent' : ''
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    width="1200"
                    height="800"
                    className="h-full w-full object-cover"
                  />
                </button>
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
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="transition hover:text-accent"
                    >
                      {item.name}
                    </a>
                  ) : (
                    item.name
                  )}
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  {t.bikes.rated} {item.rating.toFixed(2)} {t.bikes.outOf}
                </p>
                <p className="mt-2 text-sm text-slate-400">{item.price}</p>
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex rounded-full border border-white/20 px-4 py-2 text-xs text-white transition hover:border-white/40"
                  >
                    {item.cta}
                  </a>
                ) : (
                  <button
                    className="mt-4 rounded-full border border-white/20 px-4 py-2 text-xs text-white"
                    type="button"
                    disabled
                  >
                    {item.cta}
                  </button>
                )}
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
            <p className="text-xs text-slate-400">
              {t.rentals.badge}: {formatMAD(rentalTotal, lang)}
            </p>
            <p className="text-sm text-slate-400">{t.common.total}</p>
            <p className="text-3xl font-semibold text-accent">
              {formatMAD(total, lang)}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 text-sm md:grid-cols-2">
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
          <label className="text-slate-300">
            {t.rentals.startDate}
            <input
              type="date"
              min={todayIso()}
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

        <div className="mt-6 rounded-2xl border border-white/10 bg-ink/60 p-4 text-sm text-slate-300">
          <pre className="whitespace-pre-wrap font-sans">{buildMessage()}</pre>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white"
            onClick={() => {
              setToast(t.bikes.sendWhatsapp);
              if (toastTimerRef.current) {
                clearTimeout(toastTimerRef.current);
              }
              toastTimerRef.current = setTimeout(() => {
                window.open(whatsappUrl, "_blank", "noreferrer");
                setToast(null);
              }, 700);
            }}
          >
            {t.bikes.sendWhatsapp}
          </button>
          <a
            href={emailUrl}
            className="inline-flex items-center justify-center rounded-full bg-slate-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-500"
          >
            {t.bikes.sendEmail}
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

      {toast && (
        <div className="fixed bottom-24 right-6 z-50 rounded-2xl bg-night px-4 py-3 text-sm text-slate-200 shadow-glow">
          {t.bikes.sendWhatsapp}…
        </div>
      )}
    </div>
  );
}
