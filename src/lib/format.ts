import type { Lang } from "./i18n";

export const money = (n: number, lang: Lang) =>
  new Intl.NumberFormat(lang === "th" ? "th-TH" : "en-US", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(n);
