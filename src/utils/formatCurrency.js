const MAD_PER_EUR = 10;

const normalizeLocale = (lang = "fr-MA") => {
  if (lang === "en") return "en-US";
  if (lang === "fr") return "fr-FR";
  if (lang === "es") return "es-ES";
  return lang;
};

const formatCurrency = (value, currency, lang = "fr-MA") =>
  new Intl.NumberFormat(normalizeLocale(lang), {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);

export const convertMadToEuro = (value) => {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return value;
  return numeric / MAD_PER_EUR;
};

export const formatEUR = (value, lang = "fr-MA") => {
  if (Number.isNaN(Number(value))) return value;
  return formatCurrency(Number(value), "EUR", lang);
};

export const formatMADOnly = (value, lang = "fr-MA") => {
  if (Number.isNaN(Number(value))) return value;
  return formatCurrency(Number(value), "MAD", lang);
};

export const formatMAD = (value, lang = "fr-MA") => {
  if (Number.isNaN(Number(value))) return value;
  return `${formatMADOnly(value, lang)} / ${formatEUR(
    convertMadToEuro(value),
    lang,
  )}`;
};

const extractMadNumbers = (value) => {
  if (typeof value !== "string") return [];
  const matches = value.match(/\d+(?:[.,]\d+)?/g);
  if (!matches) return [];
  return matches
    .map((item) => Number(item.replace(",", ".")))
    .filter((item) => !Number.isNaN(item));
};

export const formatMadStringWithEuro = (value, lang = "fr-MA") => {
  const numbers = extractMadNumbers(value);
  if (!numbers.length) return value;
  if (numbers.length === 1) {
    return formatMAD(numbers[0], lang);
  }
  const [start, end] = numbers;
  return `${formatMADOnly(start, lang)} - ${formatMADOnly(
    end,
    lang,
  )} / ${formatEUR(convertMadToEuro(start), lang)} - ${formatEUR(
    convertMadToEuro(end),
    lang,
  )}`;
};
