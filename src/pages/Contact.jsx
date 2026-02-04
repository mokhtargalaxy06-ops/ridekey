import { useMemo, useState } from "react";
import { useI18n } from "../i18nContext";

export default function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState({
    name: "",
    email: "",
    model: "",
    message: "",
  });

  const whatsappNumber = "212608188138";
  const whatsappUrl = useMemo(() => {
    const intro = t.contact.messageIntro || "Hi! I want to book a test ride.";
    const nameLabel = t.contact.nameLabel || "Name";
    const emailLabel = t.contact.emailLabel || "Email";
    const modelLabel = t.contact.modelLabel || "Preferred model";
    const messageLabel = t.contact.messageLabel || "Message";
    const lines = [
      intro,
      `${nameLabel}: ${form.name || "-"}`,
      `${emailLabel}: ${form.email || "-"}`,
      `${modelLabel}: ${form.model || "-"}`,
      `${messageLabel}: ${form.message || "-"}`,
    ];
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [form, t]);
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-28">
      <p className="section-subtitle">{t.nav.contact}</p>
      <h1 className="section-title mt-3">{t.contact.title}</h1>
      <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <form
          className="rounded-3xl border border-white/10 bg-night p-8"
          onSubmit={(event) => {
            event.preventDefault();
            window.open(whatsappUrl, "_blank", "noreferrer");
          }}
        >
          <div className="grid gap-4">
            <input
              className="rounded-lg border-white/10 bg-ink text-white"
              placeholder={t.contact.namePlaceholder}
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
            <input
              className="rounded-lg border-white/10 bg-ink text-white"
              placeholder={t.contact.emailPlaceholder}
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
            />
            <input
              className="rounded-lg border-white/10 bg-ink text-white"
              placeholder={t.contact.modelPlaceholder}
              value={form.model}
              onChange={(event) =>
                setForm({ ...form, model: event.target.value })
              }
            />
            <textarea
              className="h-32 rounded-lg border-white/10 bg-ink text-white"
              placeholder={t.contact.messagePlaceholder}
              value={form.message}
              onChange={(event) =>
                setForm({ ...form, message: event.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white"
          >
            {t.contact.sendWhatsapp}
          </button>
        </form>
        <div className="rounded-3xl border border-white/10 bg-night p-8 text-sm text-slate-300">
          <h3 className="text-lg font-semibold text-white">
            {t.contact.hoursTitle}
          </h3>
          <p className="mt-2">{t.contact.hoursWeek}</p>
          <p className="mt-2">{t.contact.hoursWeekend}</p>
          <div className="mt-6">
            <h4 className="text-white">{t.contact.showroomTitle}</h4>
            <p className="mt-2">415 Riveline Avenue</p>
            <p>San Francisco, CA 94107</p>
          </div>
          <div className="mt-6">
            <h4 className="text-white">{t.contact.contactTitle}</h4>
            <p className="mt-2">hello@riveline.studio</p>
            <p>+1 (415) 555-0188</p>
          </div>
        </div>
      </div>
    </div>
  );
}
