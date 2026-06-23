import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarInput from "../components/CalendarInput";
import SEO from "../components/SEO";
import RentalInclusions from "../components/RentalInclusions";
import { useCatalog } from "../catalogContext";
import { useI18n } from "../i18nContext";
import { usePageSeo } from "../seo/usePageSeo";
import { formatMadStringWithEuro } from "../utils/formatCurrency";
// Page: Rentals

const todayIso = () => new Date().toISOString().split("T")[0];
const addDays = (iso, days) => {
  const date = new Date(iso);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};

export default function Rentals({ embedded = false }) {
  const { t, lang } = useI18n();
  const { bikes, gear: gearItems } = useCatalog();
  const seo = usePageSeo("rentals");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    bikeId: bikes[0]?.id ?? "",
    name: "",
    phone: "",
    startDate: todayIso(),
    endDate: addDays(todayIso(), 1),
    pickupTime: "10:00",
    returnTime: "18:00",
  });
  const [selectedGearIds, setSelectedGearIds] = useState([]);
  const [copiedEmailText, setCopiedEmailText] = useState(false);

  const minEndDate = useMemo(
    () => addDays(form.startDate, 1),
    [form.startDate],
  );

  const gearParam = useMemo(() => {
    if (!selectedGearIds.length) return "";
    return `&gear=${selectedGearIds.join(",")}`;
  }, [selectedGearIds]);

  const goToCheckout = () => {
    const params = new URLSearchParams({
      select: form.bikeId,
      renterName: form.name,
      renterPhone: form.phone,
      startDate: form.startDate,
      endDate: form.endDate,
      pickupTime: form.pickupTime,
      returnTime: form.returnTime,
    });
    navigate(`/bikes?${params.toString()}${gearParam}#whatsapp-checkout`);
  };

  const emailAddress = "ridekey.ma@gmail.com";
  const emailSubject =
    t.rentals.emailSubject || "RideKey rental request";
  const selectedGearNames = selectedGearIds
    .map((gearId) => gearItems.find((gear) => gear.id === gearId)?.name || gearId)
    .join(", ");
  const emailBody = [
    `${t.rentals.badge}: ${t.rentals.title}`,
    `${t.rentals.selectBike}: ${
      bikes.find((bike) => bike.id === form.bikeId)?.name || "-"
    }`,
    `${t.rentals.renterName}: ${form.name || "-"}`,
    `${t.rentals.renterPhone}: ${form.phone || "-"}`,
    `${t.rentals.startDate}: ${form.startDate}`,
    `${t.rentals.endDate}: ${form.endDate}`,
    `${t.rentals.pickupTime}: ${form.pickupTime}`,
    `${t.rentals.returnTime}: ${form.returnTime}`,
    `${t.bikes.accessoriesTitle}: ${
      selectedGearNames || t.bikes.messageNone
    }`,
  ].join("\n");
  const emailUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
    emailSubject,
  )}&body=${encodeURIComponent(emailBody)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    emailAddress,
  )}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(
    emailBody,
  )}`;
  const outlookUrl = `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(
    emailAddress,
  )}&subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(
    emailBody,
  )}`;
  const openRentalEmail = () => {
    window.open(gmailUrl, "_blank", "noreferrer");
  };
  const openOutlookEmail = () => {
    window.open(outlookUrl, "_blank", "noreferrer");
  };
  const copyRentalEmailText = async () => {
    const text = `To: ${emailAddress}\nSubject: ${emailSubject}\n\n${emailBody}`;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopiedEmailText(true);
      window.setTimeout(() => setCopiedEmailText(false), 1600);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <div
      className={
        embedded
          ? "mx-auto max-w-5xl px-6"
          : "mx-auto max-w-5xl px-6 pb-24 pt-28"
      }
    >
      {!embedded && (
        <SEO
          {...seo}
          keywords={[
            "motorcycle rental Marrakech booking",
            "motorbike rental Marrakech",
            "location moto Marrakech",
          ]}
        />
      )}
      <p className="section-subtitle">{t.rentals.badge}</p>
      {embedded ? (
        <h2 className="section-title mt-3">{t.rentals.title}</h2>
      ) : (
        <h1 className="section-title mt-3">{t.rentals.title}</h1>
      )}
      <div className="mt-8">
        <RentalInclusions />
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-night p-8">
          <div className="grid gap-4 text-sm">
            <label className="text-slate-300">
              {t.rentals.selectBike}
              <select
                className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
                value={form.bikeId}
                onChange={(event) =>
                  setForm({ ...form, bikeId: event.target.value })
                }
              >
                {bikes.map((bike) => (
                  <option key={bike.id} value={bike.id}>
                    {bike.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-slate-300">
              {t.rentals.renterName}
              <input
                className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
              />
            </label>
            <label className="text-slate-300">
              {t.rentals.renterPhone}
              <input
                className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
                value={form.phone}
                onChange={(event) =>
                  setForm({ ...form, phone: event.target.value })
                }
              />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-slate-300">
                {t.rentals.startDate}
                <CalendarInput
                  min={todayIso()}
                  value={form.startDate}
                  onChange={(event) =>
                    setForm({ ...form, startDate: event.target.value })
                  }
                />
              </label>
              <label className="text-slate-300">
                {t.rentals.endDate}
                <CalendarInput
                  min={minEndDate}
                  value={form.endDate}
                  onChange={(event) =>
                    setForm({ ...form, endDate: event.target.value })
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
                  value={form.pickupTime}
                  onChange={(event) =>
                    setForm({ ...form, pickupTime: event.target.value })
                  }
                />
              </label>
              <label className="text-slate-300">
                {t.rentals.returnTime}
                <input
                  type="time"
                  className="mt-2 w-full rounded-lg border-white/10 bg-ink text-white"
                  value={form.returnTime}
                  onChange={(event) =>
                    setForm({ ...form, returnTime: event.target.value })
                  }
                />
              </label>
            </div>
            <div className="rounded-2xl border border-white/10 bg-ink/60 p-4">
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
                        <p className="text-xs text-slate-400">
                          {formatMadStringWithEuro(item.price, lang)}
                        </p>
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
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white"
                onClick={goToCheckout}
              >
                {t.rentals.sendWhatsapp}
              </button>
              <button
                type="button"
                onClick={openRentalEmail}
                className="inline-flex items-center justify-center rounded-full bg-slate-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-500"
              >
                {t.contact.sendEmail}
              </button>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={openRentalEmail}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/40"
              >
                {t.rentalsEmail?.openGmail || "Open in Gmail"}
              </button>
              <button
                type="button"
                onClick={openOutlookEmail}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/40"
              >
                {t.rentalsEmail?.openOutlook || "Open in Outlook"}
              </button>
              <button
                type="button"
                onClick={copyRentalEmailText}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/40"
              >
                {copiedEmailText
                  ? t.rentalsEmail?.copied || "Copied"
                  : t.rentalsEmail?.copyText || "Copy email text"}
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-night p-8 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            {t.rentals.messageLabel}
          </p>
          <div className="mt-4 space-y-3">
            <p>
              {t.rentals.renterName}: {form.name || "-"}
            </p>
            <p>
              {t.rentals.renterPhone}: {form.phone || "-"}
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-slate-300">
                {t.rentals.startDate}
                <CalendarInput
                  min={todayIso()}
                  value={form.startDate}
                  onChange={(event) =>
                    setForm({ ...form, startDate: event.target.value })
                  }
                />
              </label>
              <label className="text-slate-300">
                {t.rentals.endDate}
                <CalendarInput
                  min={minEndDate}
                  value={form.endDate}
                  onChange={(event) =>
                    setForm({ ...form, endDate: event.target.value })
                  }
                />
              </label>
            </div>
            <p>
              {t.rentals.pickupTime}: {form.pickupTime}
            </p>
            <p>
              {t.rentals.returnTime}: {form.returnTime}
            </p>
            <p className="pt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
              {t.bikes.accessoriesTitle}
            </p>
            {selectedGearIds.length ? (
              selectedGearIds.map((gearId) => {
                const item = gearItems.find((gear) => gear.id === gearId);
                return (
                  <p key={gearId}>
                    • {item ? `${item.name} — ${formatMadStringWithEuro(item.price, lang)} / day` : gearId}
                  </p>
                );
              })
            ) : (
              <p>• {t.bikes.messageNone}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
