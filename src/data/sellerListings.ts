export type SellerListingStatus = "active" | "paused" | "pending_review" | "sold";

export type SellerListing = {
  carId: string; // references carListings id
  status: SellerListingStatus;
  listedDaysAgo: number;
  views: number;
  saves: number;
  inquiries: number;
  testDrives: number;
  promoted: boolean;
  marketAvgPrice: number; // MMK — to compute price competitiveness
  recentInquiries: { name: string; message: string; hoursAgo: number; verified: boolean }[];
  viewsTrend: number[]; // last 7 days
};

export const sellerListings: SellerListing[] = [
  {
    carId: "byd-atto-3",
    status: "active",
    listedDaysAgo: 9,
    views: 1842,
    saves: 73,
    inquiries: 21,
    testDrives: 4,
    promoted: true,
    marketAvgPrice: 142_500_000,
    recentInquiries: [
      { name: "U Kyaw Min", message: "Is this still available? Can I test drive on Saturday?", hoursAgo: 3, verified: true },
      { name: "Daw Thiri", message: "What's the lowest price for cash payment?", hoursAgo: 11, verified: true },
      { name: "Aung Aung", message: "Does it come with home charger?", hoursAgo: 26, verified: false },
    ],
    viewsTrend: [180, 210, 245, 198, 312, 289, 408],
  },
  {
    carId: "wuling-air-ev",
    status: "active",
    listedDaysAgo: 4,
    views: 921,
    saves: 38,
    inquiries: 14,
    testDrives: 2,
    promoted: false,
    marketAvgPrice: 51_000_000,
    recentInquiries: [
      { name: "Ma Hnin", message: "Hello, is the battery health 100%?", hoursAgo: 5, verified: true },
      { name: "U Min Thein", message: "Can deliver to Bago?", hoursAgo: 18, verified: true },
    ],
    viewsTrend: [80, 120, 145, 168, 192, 110, 106],
  },
  {
    carId: "byd-dolphin",
    status: "pending_review",
    listedDaysAgo: 1,
    views: 142,
    saves: 6,
    inquiries: 1,
    testDrives: 0,
    promoted: false,
    marketAvgPrice: 102_000_000,
    recentInquiries: [
      { name: "U Soe Lin", message: "Interested! Please share service records.", hoursAgo: 7, verified: true },
    ],
    viewsTrend: [0, 0, 0, 0, 0, 0, 142],
  },
  {
    carId: "tesla-model-3",
    status: "active",
    listedDaysAgo: 22,
    views: 4280,
    saves: 198,
    inquiries: 47,
    testDrives: 9,
    promoted: true,
    marketAvgPrice: 225_000_000,
    recentInquiries: [
      { name: "Mr. Park", message: "Cash buyer, can pickup tomorrow.", hoursAgo: 1, verified: true },
      { name: "Daw Su Su", message: "Trade-in for BYD Atto 3 possible?", hoursAgo: 9, verified: true },
      { name: "U Aung Ko", message: "Please send VIN and import documents.", hoursAgo: 14, verified: true },
    ],
    viewsTrend: [320, 410, 388, 502, 461, 598, 715],
  },
  {
    carId: "byd-seal",
    status: "active",
    listedDaysAgo: 6,
    views: 1356,
    saves: 89,
    inquiries: 18,
    testDrives: 3,
    promoted: false,
    marketAvgPrice: 182_000_000,
    recentInquiries: [
      { name: "U Zaw Win", message: "Performance variant in stock?", hoursAgo: 4, verified: true },
      { name: "Ma Khine", message: "Available colors please", hoursAgo: 20, verified: false },
    ],
    viewsTrend: [120, 145, 168, 210, 245, 232, 236],
  },
  {
    carId: "hongqi-e-hs9",
    status: "paused",
    listedDaysAgo: 31,
    views: 612,
    saves: 24,
    inquiries: 6,
    testDrives: 1,
    promoted: false,
    marketAvgPrice: 318_000_000,
    recentInquiries: [
      { name: "U Tin Maung", message: "Is the 7-seater config available?", hoursAgo: 72, verified: true },
    ],
    viewsTrend: [0, 0, 12, 18, 22, 14, 8],
  },
  {
    carId: "mg-zs-ev",
    status: "sold",
    listedDaysAgo: 18,
    views: 2104,
    saves: 102,
    inquiries: 28,
    testDrives: 6,
    promoted: false,
    marketAvgPrice: 91_000_000,
    recentInquiries: [],
    viewsTrend: [180, 220, 195, 168, 142, 88, 42],
  },
  {
    carId: "neta-v",
    status: "active",
    listedDaysAgo: 3,
    views: 488,
    saves: 21,
    inquiries: 7,
    testDrives: 1,
    promoted: false,
    marketAvgPrice: 43_500_000,
    recentInquiries: [
      { name: "U Nyein", message: "Fleet purchase — 5 units, what's the discount?", hoursAgo: 6, verified: true },
    ],
    viewsTrend: [0, 0, 0, 0, 88, 168, 232],
  },
];
