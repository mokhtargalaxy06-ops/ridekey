export const formatMAD = (value, lang = "fr-MA") => {
  if (Number.isNaN(Number(value))) return value;
  return new Intl.NumberFormat(lang, {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 2,
  }).format(value);
};
