import { Check, HardHat, Hotel, Plane, Shield, UserRound } from "lucide-react";
import { useI18n } from "../i18nContext";

const inclusionIcons = {
  insurance: Shield,
  helmet: HardHat,
  passengerHelmet: UserRound,
  airportDelivery: Plane,
  hotelDelivery: Hotel,
  hotelReturn: Hotel,
};

const inclusionKeys = [
  "insurance",
  "helmet",
  "passengerHelmet",
  "airportDelivery",
  "hotelDelivery",
  "hotelReturn",
];

export default function RentalInclusions({ compact = false }) {
  const { t } = useI18n();

  return (
    <section className="rounded-3xl border border-white/10 bg-night p-6">
      <p className="text-2xl font-semibold text-white">
        {t.rentalsIncluded.title}
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
        {t.rentalsIncluded.subtitle}
      </p>

      <div
        className={`mt-6 grid gap-4 ${
          compact ? "sm:grid-cols-2" : "md:grid-cols-2"
        }`}
      >
        {inclusionKeys.map((key) => {
          const Icon = inclusionIcons[key];

          return (
            <div
              key={key}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-ink/60 px-4 py-4"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200">
                <Icon size={20} />
              </span>
              <div className="flex flex-1 items-center justify-between gap-3">
                <span className="text-sm text-slate-200">
                  {t.rentalsIncluded[key]}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-green-400">
                  <Check size={16} />
                  {t.rentalsIncluded.free}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
