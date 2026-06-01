import { Icon as Iconify } from "@iconify/react";

/**
 * Central icon mapping for the app. Uses the Solar icon set (via Iconify).
 * Swap a value here to re-skin an icon everywhere it's used.
 */
const MAP = {
  back: "solar:alt-arrow-left-linear",
  chevronRight: "solar:alt-arrow-right-linear",
  heart: "solar:heart-linear",
  heartFill: "solar:heart-bold",
  bag: "solar:bag-4-linear",
  bagFill: "solar:bag-4-bold",
  close: "solar:close-circle-linear",
  home: "solar:home-2-linear",
  homeFill: "solar:home-2-bold",
  grid: "solar:widget-2-linear",
  gridFill: "solar:widget-2-bold",
  receipt: "solar:bill-list-linear",
  receiptFill: "solar:bill-list-bold",
  minus: "solar:minus-circle-linear",
  plus: "solar:add-circle-linear",
  trash: "solar:trash-bin-minimalistic-linear",
  search: "solar:magnifer-linear",
  checkCircle: "solar:check-circle-bold",
  verified: "solar:verified-check-bold",
  filter: "solar:tuning-2-linear",
  sort: "solar:sort-vertical-linear",
  box: "solar:box-minimalistic-linear",
  card: "solar:card-linear",
  qr: "solar:qr-code-linear",
  mapPin: "solar:map-point-linear",
  copy: "solar:copy-linear",
  delivery: "solar:delivery-linear",
  shop: "solar:shop-2-linear",
  ticket: "solar:ticket-sale-linear",
  phone: "solar:phone-linear",
} as const;

export type IconName = keyof typeof MAP;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return <Iconify icon={MAP[name]} className={className} />;
}
