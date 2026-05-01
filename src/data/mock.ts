// Mock data for the EVCharge Myanmar marketplace.
// All MMK prices are illustrative.

export type Station = {
  id: string;
  name: string;
  city: string;
  operator: string;
  connectors: string[];
  maxKw: number;
  pricePerKwh: number; // MMK
  available: number;
  total: number;
  hours: string;
  lat: number;
  lng: number;
};

export const stations: Station[] = [
  { id: "s1", name: "Junction City Mall", city: "Yangon", operator: "EVOLT", connectors: ["CCS2", "Type 2"], maxKw: 120, pricePerKwh: 350, available: 4, total: 6, hours: "24/7", lat: 16.7795, lng: 96.1561 },
  { id: "s2", name: "Myanmar Plaza", city: "Yangon", operator: "Green Charge", connectors: ["CCS2", "CHAdeMO"], maxKw: 60, pricePerKwh: 320, available: 2, total: 4, hours: "11:00 AM – 11:00 PM", lat: 16.8350, lng: 96.1480 },
  { id: "s3", name: "Inya Lake Hotel", city: "Yangon", operator: "EVOLT", connectors: ["Type 2"], maxKw: 22, pricePerKwh: 280, available: 0, total: 3, hours: "24/7", lat: 16.8470, lng: 96.1410 },
  { id: "s4", name: "Mandalay Hill Resort", city: "Mandalay", operator: "MyanCharge", connectors: ["CCS2", "GB/T"], maxKw: 150, pricePerKwh: 380, available: 3, total: 4, hours: "24/7", lat: 22.0050, lng: 96.1080 },
  { id: "s5", name: "Yadanabon Mall", city: "Mandalay", operator: "Green Charge", connectors: ["CCS2"], maxKw: 50, pricePerKwh: 330, available: 1, total: 2, hours: "11:00 AM – 11:00 PM", lat: 21.9710, lng: 96.0830 },
  { id: "s6", name: "Capital Hyper", city: "Naypyidaw", operator: "EVOLT", connectors: ["CCS2", "Type 2", "CHAdeMO"], maxKw: 180, pricePerKwh: 360, available: 5, total: 6, hours: "24/7", lat: 19.7450, lng: 96.1290 },
  { id: "s7", name: "Bagan Junction", city: "Bagan", operator: "MyanCharge", connectors: ["Type 2"], maxKw: 22, pricePerKwh: 300, available: 2, total: 2, hours: "06:00 – 22:00", lat: 21.1717, lng: 94.8574 },
  { id: "s8", name: "Taunggyi Center", city: "Shan State", operator: "Green Charge", connectors: ["CCS2"], maxKw: 60, pricePerKwh: 340, available: 1, total: 3, hours: "11:00 AM – 11:00 PM", lat: 20.7860, lng: 97.0380 },
  { id: "s9", name: "Pyay Highway Stop", city: "Pyay", operator: "EVOLT", connectors: ["CCS2", "Type 2"], maxKw: 120, pricePerKwh: 370, available: 4, total: 4, hours: "24/7", lat: 18.8230, lng: 95.2200 },
  { id: "s10", name: "Mawlamyine Riverside", city: "Mawlamyine", operator: "MyanCharge", connectors: ["Type 2"], maxKw: 22, pricePerKwh: 290, available: 1, total: 2, hours: "07:00 – 21:00", lat: 16.4910, lng: 97.6280 },
];

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readMin: number;
  hue: number; // for cover gradient
  body?: string[];
};

export const articles: Article[] = [
  {
    id: "a1",
    title: "BYD opens first official showroom in Yangon",
    excerpt: "The Chinese EV giant brings its Atto 3, Dolphin and Seal lineup to Myanmar with full warranty and local service.",
    category: "Industry",
    author: "Hnin Wai",
    date: "Apr 28, 2026",
    readMin: 4,
    hue: 295,
  },
  {
    id: "a2",
    title: "Myanmar's EV import tariffs cut by 30% — what it means for you",
    excerpt: "A government policy update is making electric vehicles significantly more affordable. We break down the new pricing.",
    category: "Policy",
    author: "Kyaw Min",
    date: "Apr 25, 2026",
    readMin: 6,
    hue: 155,
  },
  {
    id: "a3",
    title: "Reviewed: Wuling Air EV — the perfect Yangon city car?",
    excerpt: "We drove the compact Wuling Air through 5 days of Yangon traffic. Here's the honest verdict on range, comfort and value.",
    category: "Reviews",
    author: "Su Su Aye",
    date: "Apr 22, 2026",
    readMin: 8,
    hue: 240,
  },
  {
    id: "a4",
    title: "Top 5 home charger setups for Myanmar households",
    excerpt: "From basic Type 2 wall boxes to smart solar-integrated systems — what works best with our local grid.",
    category: "Guides",
    author: "Aung Kyaw",
    date: "Apr 18, 2026",
    readMin: 5,
    hue: 195,
  },
  {
    id: "a5",
    title: "EV insurance in Myanmar: what's actually covered?",
    excerpt: "Battery damage, charging accidents, third-party claims — we compare offerings from 4 major insurers.",
    category: "Insurance",
    author: "Thiri Aung",
    date: "Apr 15, 2026",
    readMin: 7,
    hue: 25,
  },
  {
    id: "a6",
    title: "Mandalay to Yangon in an EV: a 700km road trip diary",
    excerpt: "Three drivers, two BYDs, one Wuling. Charging logistics, costs and what we learned about Myanmar's growing network.",
    category: "Travel",
    author: "Hnin Wai",
    date: "Apr 10, 2026",
    readMin: 10,
    hue: 130,
  },
];
