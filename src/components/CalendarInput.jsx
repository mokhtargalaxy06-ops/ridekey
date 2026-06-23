import { useRef } from "react";
import { CalendarDays } from "lucide-react";

export default function CalendarInput({
  value,
  onChange,
  min,
  className = "",
}) {
  const inputRef = useRef(null);

  const openPicker = () => {
    if (typeof inputRef.current?.showPicker === "function") {
      inputRef.current.showPicker();
      return;
    }
    inputRef.current?.focus();
    inputRef.current?.click();
  };

  return (
    <div className={`relative ${className}`.trim()}>
      <input
        ref={inputRef}
        type="date"
        min={min}
        className="mt-2 w-full rounded-lg border-white/10 bg-ink pr-12 text-white"
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        onClick={openPicker}
        aria-label="Open calendar"
        className="absolute right-3 top-[calc(50%+0.25rem)] -translate-y-1/2 text-slate-300 transition hover:text-white"
      >
        <CalendarDays className="h-5 w-5" />
      </button>
    </div>
  );
}
