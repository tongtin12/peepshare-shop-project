export type ProductType = "physical" | "digital";

export interface Variant {
  size?: string;
  color?: { name: { th: string; en: string }; hex: string };
  style?: { th: string; en: string };
  stock: number;
}

export interface Product {
  id: string;
  merchant_id: string;
  product_type: ProductType;
  name: { th: string; en: string };
  price: number;
  rating: number;
  reviewCount: number;
  category: string;
  image: string;
  images: string[];
  description: { th: string; en: string };
  sizes: string[];
  colors: { name: { th: string; en: string }; hex: string }[];
  styles: { th: string; en: string }[];
  variants: Variant[];
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: { th: string; en: string };
  image: string;
  count: number;
}

const img = (id: string) => `https://images.unsplash.com/${id}?w=800&q=80&auto=format&fit=crop`;

export const categories: Category[] = [
  { id: "jackets", name: { th: "แจ็คเก็ต", en: "Jackets" }, image: img("photo-1551028719-00167b16eac5"), count: 24 },
  { id: "tshirts", name: { th: "เสื้อยืด", en: "T-Shirts" }, image: img("photo-1521572163474-6864f9cf17ab"), count: 48 },
  { id: "hoodies", name: { th: "เสื้อฮู้ด", en: "Hoodies" }, image: img("photo-1556821840-3a63f95609a7"), count: 32 },
  { id: "shoes", name: { th: "รองเท้า", en: "Shoes" }, image: img("photo-1542291026-7eec264c27ff"), count: 56 },
  { id: "bags", name: { th: "กระเป๋า", en: "Bags" }, image: img("photo-1548036328-c9fa89d128fa"), count: 18 },
  { id: "accessories", name: { th: "เครื่องประดับ", en: "Accessories" }, image: img("photo-1611923134239-b9be5816e23f"), count: 22 },
];

const baseColors = [
  { name: { th: "ดำ", en: "Black" }, hex: "#111111" },
  { name: { th: "ขาว", en: "White" }, hex: "#FFFFFF" },
  { name: { th: "เทา", en: "Grey" }, hex: "#9CA3AF" },
  { name: { th: "ครีม", en: "Cream" }, hex: "#EFE6D6" },
  { name: { th: "เขียวมะกอก", en: "Olive" }, hex: "#5D6B3E" },
];

const baseSizes = ["XS", "S", "M", "L", "XL"];
const baseStyles = [
  { th: "เรียบ", en: "Plain" },
  { th: "พิมพ์ลาย", en: "Printed" },
  { th: "โอเวอร์ไซส์", en: "Oversize" },
];

const makeVariants = (sizes: string[], colors: typeof baseColors): Variant[] =>
  sizes.flatMap((size) => colors.map((c) => ({ size, color: c, stock: Math.floor(Math.random() * 12) })));

const e29Products: Product[] = [
  {
    id: "p1",
    merchant_id: "e29",
    product_type: "physical",
    name: { th: "เสื้อโค้ทโอเวอร์ไซส์", en: "Oversized Wool Coat" },
    price: 2890,
    rating: 4.8,
    reviewCount: 124,
    category: "jackets",
    image: img("photo-1591047139829-d91aecb6caea"),
    images: [img("photo-1591047139829-d91aecb6caea"), img("photo-1539109136881-3be0616acf4b"), img("photo-1544022613-e87ca75a784a")],
    description: { th: "โค้ทผ้าวูลทรงโอเวอร์ไซส์ สไตล์มินิมอล ใส่ได้ทุกโอกาส", en: "Minimalist oversized wool coat. Effortless layering for every season." },
    sizes: baseSizes,
    colors: baseColors.slice(0, 3),
    styles: baseStyles.slice(0, 2),
    variants: makeVariants(baseSizes, baseColors.slice(0, 3)),
    isNew: true,
  },
  {
    id: "p2",
    merchant_id: "e29",
    product_type: "physical",
    name: { th: "เสื้อยืดคอตตอนพรีเมียม", en: "Premium Cotton Tee" },
    price: 590,
    rating: 4.7,
    reviewCount: 312,
    category: "tshirts",
    image: img("photo-1521572163474-6864f9cf17ab"),
    images: [img("photo-1521572163474-6864f9cf17ab"), img("photo-1576566588028-4147f3842f27"), img("photo-1583743814966-8936f5b7be1a")],
    description: { th: "เสื้อยืดคอตตอน 100% เนื้อนุ่ม สวมใส่สบาย", en: "100% cotton tee with a relaxed fit and luxe feel." },
    sizes: baseSizes,
    colors: baseColors,
    styles: baseStyles,
    variants: makeVariants(baseSizes, baseColors),
    isNew: true,
  },
  {
    id: "p3",
    merchant_id: "e29",
    product_type: "physical",
    name: { th: "เสื้อฮู้ดกราฟิก", en: "Graphic Hoodie" },
    price: 1290,
    rating: 4.6,
    reviewCount: 87,
    category: "hoodies",
    image: img("photo-1556821840-3a63f95609a7"),
    images: [img("photo-1556821840-3a63f95609a7"), img("photo-1620799140408-edc6dcb6d633"), img("photo-1614975059251-992f11792b9f")],
    description: { th: "เสื้อฮู้ดผ้าหนานุ่ม พิมพ์ลายสไตล์สตรีท", en: "Heavyweight cotton hoodie with a street-inspired graphic." },
    sizes: baseSizes,
    colors: baseColors.slice(0, 4),
    styles: baseStyles,
    variants: makeVariants(baseSizes, baseColors.slice(0, 4)),
    isNew: true,
  },
  {
    id: "p4",
    merchant_id: "e29",
    product_type: "physical",
    name: { th: "สนีกเกอร์มินิมอล", en: "Minimal Sneakers" },
    price: 2450,
    rating: 4.9,
    reviewCount: 256,
    category: "shoes",
    image: img("photo-1542291026-7eec264c27ff"),
    images: [img("photo-1542291026-7eec264c27ff"), img("photo-1600185365483-26d7a4cc7519"), img("photo-1595950653106-6c9ebd614d3a")],
    description: { th: "รองเท้าสนีกเกอร์หนังแท้ ดีไซน์เรียบ", en: "Leather sneakers with a clean silhouette for every outfit." },
    sizes: ["40", "41", "42", "43", "44"],
    colors: baseColors.slice(0, 3),
    styles: baseStyles.slice(0, 2),
    variants: makeVariants(["40", "41", "42", "43", "44"], baseColors.slice(0, 3)),
    isNew: true,
  },
  {
    id: "p5",
    merchant_id: "e29",
    product_type: "physical",
    name: { th: "กระเป๋าหนังคลาสสิก", en: "Classic Leather Bag" },
    price: 3490,
    rating: 4.8,
    reviewCount: 64,
    category: "bags",
    image: img("photo-1548036328-c9fa89d128fa"),
    images: [img("photo-1548036328-c9fa89d128fa"), img("photo-1590874103328-eac38a683ce7"), img("photo-1584917865442-de89df76afd3")],
    description: { th: "กระเป๋าหนังแท้ ดีไซน์คลาสสิก ใช้ได้ทุกวัน", en: "Genuine leather bag with a timeless silhouette." },
    sizes: ["ONE"],
    colors: baseColors.slice(0, 4),
    styles: baseStyles.slice(0, 1),
    variants: makeVariants(["ONE"], baseColors.slice(0, 4)),
  },
  {
    id: "p6",
    merchant_id: "e29",
    product_type: "physical",
    name: { th: "เสื้อแจ็คเก็ตเดนิม", en: "Denim Jacket" },
    price: 1890,
    rating: 4.5,
    reviewCount: 98,
    category: "jackets",
    image: img("photo-1551028719-00167b16eac5"),
    images: [img("photo-1551028719-00167b16eac5"), img("photo-1604644401890-0bd678c83788"), img("photo-1543076447-215ad9ba6923")],
    description: { th: "แจ็คเก็ตเดนิมทรงคลาสสิก ใส่ได้ทุกฤดู", en: "Classic denim jacket built to last." },
    sizes: baseSizes,
    colors: baseColors.slice(2, 5),
    styles: baseStyles.slice(0, 2),
    variants: makeVariants(baseSizes, baseColors.slice(2, 5)),
  },
];

type ProductSpec = {
  name: { th: string; en: string };
  price: number;
  category: string;
  imgs: string[];
  desc: { th: string; en: string };
  sizes?: string[];
  colorRange?: [number, number];
  isNew?: boolean;
};

const makeProducts = (merchantId: string, specs: ProductSpec[]): Product[] =>
  specs.map((s, i) => {
    const sizes = s.sizes ?? baseSizes;
    const colors = baseColors.slice(s.colorRange?.[0] ?? 0, s.colorRange?.[1] ?? 4);
    return {
      id: `${merchantId}-${i + 1}`,
      merchant_id: merchantId,
      product_type: "physical",
      name: s.name,
      price: s.price,
      rating: 4.6,
      reviewCount: 0,
      category: s.category,
      image: img(s.imgs[0]),
      images: s.imgs.map(img),
      description: s.desc,
      sizes,
      colors,
      styles: baseStyles,
      variants: makeVariants(sizes, colors),
      isNew: s.isNew,
    };
  });

// Shared known-good Unsplash image sets, reused across the sample merchants.
const IMG = {
  coat: ["photo-1591047139829-d91aecb6caea", "photo-1539109136881-3be0616acf4b", "photo-1544022613-e87ca75a784a"],
  tee: ["photo-1521572163474-6864f9cf17ab", "photo-1576566588028-4147f3842f27", "photo-1583743814966-8936f5b7be1a"],
  hoodie: ["photo-1556821840-3a63f95609a7", "photo-1620799140408-edc6dcb6d633", "photo-1614975059251-992f11792b9f"],
  sneakers: ["photo-1542291026-7eec264c27ff", "photo-1600185365483-26d7a4cc7519", "photo-1595950653106-6c9ebd614d3a"],
  bag: ["photo-1548036328-c9fa89d128fa", "photo-1590874103328-eac38a683ce7", "photo-1584917865442-de89df76afd3"],
  denim: ["photo-1551028719-00167b16eac5", "photo-1604644401890-0bd678c83788", "photo-1543076447-215ad9ba6923"],
  accessories: ["photo-1611923134239-b9be5816e23f", "photo-1584917865442-de89df76afd3", "photo-1590874103328-eac38a683ce7"],
};

export const products: Product[] = [
  ...e29Products,
  ...makeProducts("maison", [
    { name: { th: "เสื้อยืดเทเลอร์ด", en: "Tailored Basic Tee" }, price: 690, category: "tshirts", imgs: IMG.tee, desc: { th: "เสื้อยืดงานคราฟต์ เนื้อผ้าแน่น ทรงสวย", en: "Crafted tee with a structured, refined fit." }, isNew: true },
    { name: { th: "แจ็คเก็ตซิงเกิลเบรสต์", en: "Single-breasted Jacket" }, price: 3290, category: "jackets", imgs: IMG.coat, desc: { th: "แจ็คเก็ตดีเทลประณีต ตัดเย็บเนี้ยบ", en: "Finely tailored jacket with refined details." } },
    { name: { th: "กระเป๋าหนังโทท", en: "Minimal Leather Tote" }, price: 2890, category: "bags", imgs: IMG.bag, desc: { th: "กระเป๋าหนังเรียบหรู ใช้ได้ทุกวัน", en: "Understated leather tote for everyday." }, sizes: ["ONE"] },
    { name: { th: "ฮู้ดดี้เนื้อหนา", en: "Heavyweight Hoodie" }, price: 1490, category: "hoodies", imgs: IMG.hoodie, desc: { th: "ฮู้ดดี้ผ้าหนา ทรงเรียบ", en: "Heavyweight hoodie, clean cut." } },
  ]),
  ...makeProducts("atelier", [
    { name: { th: "โค้ทขนแกะทำมือ", en: "Handmade Wool Coat" }, price: 4290, category: "jackets", imgs: IMG.coat, desc: { th: "โค้ททำมือทุกตัว เนื้อผ้าพรีเมียม", en: "Handmade coat in premium wool." }, isNew: true },
    { name: { th: "แจ็คเก็ตเดนิมวินเทจ", en: "Vintage Denim Jacket" }, price: 1990, category: "jackets", imgs: IMG.denim, desc: { th: "เดนิมฟอกสไตล์วินเทจ", en: "Washed vintage-style denim." } },
    { name: { th: "เสื้อยืดสกรีนลายมือ", en: "Hand-printed Tee" }, price: 790, category: "tshirts", imgs: IMG.tee, desc: { th: "สกรีนลายมือทีละตัว", en: "Each tee hand-printed in studio." } },
  ]),
  ...makeProducts("nord", [
    { name: { th: "เสื้อยืดทรงกล่อง", en: "Boxy Tee" }, price: 650, category: "tshirts", imgs: IMG.tee, desc: { th: "เสื้อยืดทรงกล่อง สไตล์นอร์ดิก", en: "Boxy-fit tee, Nordic clean." }, isNew: true },
    { name: { th: "ฮู้ดดี้สีพื้น", en: "Solid Hoodie" }, price: 1390, category: "hoodies", imgs: IMG.hoodie, desc: { th: "ฮู้ดดี้สีพื้น เรียบ สะอาด", en: "Solid-tone hoodie, minimal." } },
    { name: { th: "สนีกเกอร์สีขาว", en: "White Sneakers" }, price: 2290, category: "shoes", imgs: IMG.sneakers, desc: { th: "สนีกเกอร์สีขาวล้วน เรียบง่าย", en: "All-white minimalist sneakers." }, sizes: ["40", "41", "42", "43", "44"] },
    { name: { th: "แจ็คเก็ตเดนิมโอเวอร์ไซส์", en: "Oversized Denim Jacket" }, price: 2190, category: "jackets", imgs: IMG.denim, desc: { th: "เดนิมโอเวอร์ไซส์ ทรงสวย", en: "Relaxed oversized denim." } },
  ]),
  ...makeProducts("aura", [
    { name: { th: "ต่างหูมินิมอล", en: "Minimal Earrings" }, price: 490, category: "accessories", imgs: IMG.accessories, desc: { th: "ต่างหูดีไซน์มินิมอล ใส่ได้ทุกวัน", en: "Minimal everyday earrings." }, sizes: ["ONE"], isNew: true },
    { name: { th: "กระเป๋าคลัตช์", en: "Leather Clutch" }, price: 1690, category: "bags", imgs: IMG.bag, desc: { th: "คลัตช์หนังใบเล็ก เรียบหรู", en: "Compact leather clutch." }, sizes: ["ONE"] },
    { name: { th: "สร้อยคอเลเยอร์", en: "Layered Necklace" }, price: 690, category: "accessories", imgs: IMG.accessories, desc: { th: "สร้อยคอเลเยอร์ เพิ่มลุค", en: "Layered necklace to finish any look." }, sizes: ["ONE"] },
  ]),
  ...makeProducts("kinfolk", [
    { name: { th: "สนีกเกอร์รันนิ่ง", en: "Everyday Runners" }, price: 2590, category: "shoes", imgs: IMG.sneakers, desc: { th: "รองเท้าใส่สบายทุกวัน", en: "Comfortable everyday runners." }, sizes: ["40", "41", "42", "43", "44"], isNew: true },
    { name: { th: "กระเป๋าสะพายข้าง", en: "Crossbody Bag" }, price: 1490, category: "bags", imgs: IMG.bag, desc: { th: "กระเป๋าสะพายข้างไลฟ์สไตล์", en: "Lifestyle crossbody bag." }, sizes: ["ONE"] },
    { name: { th: "เสื้อยืดโลโก้", en: "Logo Tee" }, price: 620, category: "tshirts", imgs: IMG.tee, desc: { th: "เสื้อยืดโลโก้คลาสสิก", en: "Classic logo tee." } },
    { name: { th: "ฮู้ดดี้ซิป", en: "Zip Hoodie" }, price: 1590, category: "hoodies", imgs: IMG.hoodie, desc: { th: "ฮู้ดดี้ซิปหน้า ใส่ง่าย", en: "Easy full-zip hoodie." } },
  ]),
  ...makeProducts("mono", [
    { name: { th: "เสื้อยืดสีขาว", en: "White Basic Tee" }, price: 450, category: "tshirts", imgs: IMG.tee, desc: { th: "เสื้อยืดเบสิกสีขาว", en: "White wardrobe staple tee." }, isNew: true },
    { name: { th: "เสื้อยืดสีดำ", en: "Black Basic Tee" }, price: 450, category: "tshirts", imgs: IMG.tee, desc: { th: "เสื้อยืดเบสิกสีดำ", en: "Black wardrobe staple tee." } },
    { name: { th: "ฮู้ดดี้โทนเดียว", en: "Monochrome Hoodie" }, price: 1290, category: "hoodies", imgs: IMG.hoodie, desc: { th: "ฮู้ดดี้โทนขาวดำ", en: "Monochrome essential hoodie." } },
  ]),
  ...makeProducts("luxe", [
    { name: { th: "กระเป๋าหนังพรีเมียม", en: "Premium Leather Bag" }, price: 5990, category: "bags", imgs: IMG.bag, desc: { th: "กระเป๋าหนังแท้ระดับพรีเมียม", en: "Premium genuine-leather bag." }, sizes: ["ONE"], isNew: true },
    { name: { th: "โค้ทแคชเมียร์", en: "Cashmere Coat" }, price: 7490, category: "jackets", imgs: IMG.coat, desc: { th: "โค้ทแคชเมียร์เนื้อนุ่ม", en: "Soft cashmere-blend coat." } },
    { name: { th: "กระเป๋าถือทรงเหลี่ยม", en: "Structured Handbag" }, price: 4290, category: "bags", imgs: IMG.bag, desc: { th: "กระเป๋าถือทรงเหลี่ยม ดูหรู", en: "Structured handbag with a luxe finish." }, sizes: ["ONE"] },
  ]),
];

export const banner = {
  title: { th: "ซื้อ 1 แถม 3", en: "Buy 1 Get 3" },
  subtitle: { th: "คอลเลกชันใหม่ ลดสูงสุด 50%", en: "New collection. Up to 50%" },
  image: img("photo-1483985988355-763728e1935b"),
};

export const heroCategories = [
  { id: "women", name: { th: "ผู้หญิง", en: "Women" }, image: img("photo-1492707892479-7bc8d5a4ee93") },
  { id: "men", name: { th: "ผู้ชาย", en: "Men" }, image: img("photo-1488161628813-04466f872be2") },
];

export interface Merchant {
  id: string;
  name: { th: string; en: string };
  handle: string;
  /** Short monogram shown inside the circular logo (≤3 chars). */
  mark: string;
  /** Brand accent color for the monogram. */
  accent: string;
  cover: string;
  tagline: { th: string; en: string };
  rating: number;
  followers: string;
  verified?: boolean;
}

export const merchants: Merchant[] = [
  {
    id: "e29",
    name: { th: "E29", en: "E29" },
    handle: "@e29.official",
    mark: "E29",
    accent: "#FF676C",
    cover: img("photo-1483985988355-763728e1935b"),
    tagline: { th: "แฟชั่นมินิมอลร่วมสมัย ใส่ได้ทุกวัน", en: "Contemporary minimal apparel for everyday." },
    rating: 4.9,
    followers: "18.2k",
    verified: true,
  },
  {
    id: "maison",
    name: { th: "Maison", en: "Maison" },
    handle: "@maison",
    mark: "M",
    accent: "#1E293B",
    cover: img("photo-1551028719-00167b16eac5"),
    tagline: { th: "เสื้อผ้างานคราฟต์ ดีเทลประณีต", en: "Crafted essentials, refined details." },
    rating: 4.8,
    followers: "9.4k",
    verified: true,
  },
  {
    id: "atelier",
    name: { th: "Atelier", en: "Atelier" },
    handle: "@atelier.bkk",
    mark: "A",
    accent: "#B45309",
    cover: img("photo-1556821840-3a63f95609a7"),
    tagline: { th: "สตูดิโอแฟชั่น ทำมือทุกชิ้น", en: "A studio of handmade fashion." },
    rating: 4.7,
    followers: "6.1k",
  },
  {
    id: "nord",
    name: { th: "Nord", en: "Nord" },
    handle: "@nord.studio",
    mark: "N",
    accent: "#0F766E",
    cover: img("photo-1488161628813-04466f872be2"),
    tagline: { th: "สไตล์สแกนดิเนเวียน เรียบ สะอาด", en: "Scandinavian-clean wardrobe." },
    rating: 4.8,
    followers: "12.7k",
    verified: true,
  },
  {
    id: "aura",
    name: { th: "Aura", en: "Aura" },
    handle: "@aura.label",
    mark: "AU",
    accent: "#BE185D",
    cover: img("photo-1492707892479-7bc8d5a4ee93"),
    tagline: { th: "เครื่องประดับและของแต่งตัว", en: "Jewelry and finishing touches." },
    rating: 4.6,
    followers: "4.9k",
  },
  {
    id: "kinfolk",
    name: { th: "Kinfolk", en: "Kinfolk" },
    handle: "@kinfolk.co",
    mark: "K",
    accent: "#4338CA",
    cover: img("photo-1542291026-7eec264c27ff"),
    tagline: { th: "รองเท้าและของใช้ไลฟ์สไตล์", en: "Footwear and lifestyle goods." },
    rating: 4.7,
    followers: "7.8k",
  },
  {
    id: "mono",
    name: { th: "Mono", en: "Mono" },
    handle: "@mono.wear",
    mark: "MO",
    accent: "#111111",
    cover: img("photo-1521572163474-6864f9cf17ab"),
    tagline: { th: "เบสิกโทนขาวดำ", en: "Monochrome basics, done right." },
    rating: 4.5,
    followers: "3.3k",
  },
  {
    id: "luxe",
    name: { th: "Luxe", en: "Luxe" },
    handle: "@luxe.atelier",
    mark: "L",
    accent: "#A16207",
    cover: img("photo-1548036328-c9fa89d128fa"),
    tagline: { th: "กระเป๋าและเครื่องหนังพรีเมียม", en: "Premium bags and leather." },
    rating: 4.9,
    followers: "15.0k",
    verified: true,
  },
];

export const getMerchant = (id: string) => merchants.find((m) => m.id === id);
