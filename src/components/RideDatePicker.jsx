import { useMemo, useState } from "react";
import CalendarInput from "./CalendarInput";
import { useI18n } from "../i18nContext";

const toIsoDate = (value) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString().split("T")[0];
  }
  return parsed.toISOString().split("T")[0];
};

const addDays = (iso, days) => {
  const date = new Date(iso);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};

export default function RideDatePicker({ ride }) {
  const { t } = useI18n();
  const [dates, setDates] = useState(() => ({
    startDate: toIsoDate(ride.startDate),
    endDate: toIsoDate(ride.endDate),
  }));

  const minEndDate = useMemo(
    () => addDays(dates.startDate, 1),
    [dates.startDate],
  );

  return (
    <div className="grid gap-3 text-xs text-slate-400 sm:grid-cols-2">
      <label className="flex flex-col gap-2">
        <span>{t.rentals.startDate || "Start date"}</span>
        <CalendarInput
          className="mt-0"
          value={dates.startDate}
          min={undefined}
          onChange={(event) =>
            setDates((prev) => {
              const nextStart = event.target.value;
              const nextEnd =
                prev.endDate <= nextStart ? addDays(nextStart, 1) : prev.endDate;
              return {
                startDate: nextStart,
                endDate: nextEnd,
              };
            })
          }
        />
      </label>
      <label className="flex flex-col gap-2">
        <span>{t.rentals.endDate || "End date"}</span>
        <CalendarInput
          value={dates.endDate}
          min={minEndDate}
          onChange={(event) =>
            setDates((prev) => ({ ...prev, endDate: event.target.value }))
          }
        />
      </label>
    </div>
  );
}
