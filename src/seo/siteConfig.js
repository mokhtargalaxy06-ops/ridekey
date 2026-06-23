export const SITE_URL = "https://ridekey.ma";

export const business = {
  name: "Ridekey Motocycles",
  legalName: "Ridekey Motocycles",
  brand: "Ridekey Motocycles",
  url: SITE_URL,
  email: "ridekey.ma@gmail.com",
  phones: ["+212 608 188 138", "+212 624 843 746"],
  whatsapp: "https://wa.me/212608188138",
  address: {
    streetAddress: "Marrakech",
    addressLocality: "Marrakech",
    addressRegion: "Marrakech-Safi",
    postalCode: "40000",
    addressCountry: "MA",
  },
  geo: {
    latitude: 31.6295,
    longitude: -7.9811,
  },
  openingHours: ["Mo-Su 09:00-19:00"],
  sameAs: [
    "https://www.instagram.com/ridekey.ma",
    "https://www.facebook.com/ridekey.ma",
    "https://www.youtube.com/@ridekey",
    "https://www.linkedin.com/company/ridekey-morocco",
  ],
  priceRange: "$$",
  foundingLocation: "Marrakech, Morocco",
  currenciesAccepted: "MAD, EUR, USD",
  paymentAccepted: "Cash, bank transfer, card on request",
  serviceArea: [
    "Marrakech",
    "Marrakech Medina",
    "Marrakech Menara Airport",
    "Agafay Desert",
    "Atlas Mountains",
    "Imlil",
    "Ouarzazate",
    "Essaouira",
    "Morocco",
  ],
};

export const seoDefaults = {
  title: "Motorcycle Rental Marrakech | Ridekey Motocycles Morocco",
  description:
    "Rent adventure motorcycles in Marrakech with Ridekey Motocycles. KTM, Suzuki, Yamaha, Honda and Royal Enfield rentals for Atlas Mountains, Agafay desert and Morocco tours.",
  keywords: [
    "motorcycle rental Marrakech",
    "motorcycle rental Marrakech Morocco",
    "motorcycle rental Morocco",
    "motorbike rental Marrakech",
    "motorbike rental Morocco",
    "Marrakech motorcycle rental",
    "Marrakech motorbike rental",
    "adventure motorcycle rental Marrakech",
    "adventure bike rental Marrakech",
    "enduro rental Marrakech",
    "dual sport rental Marrakech",
    "KTM rental Morocco",
    "KTM rental Marrakech",
    "Suzuki DR650 rental Marrakech",
    "Yamaha Tenere rental Marrakech",
    "Honda X ADV rental Marrakech",
    "Royal Enfield Himalayan rental Marrakech",
    "BMW GS rental Morocco",
    "adventure motorcycle Morocco",
    "motorcycle tour Morocco",
    "motorcycle tours Marrakech",
    "guided motorcycle tours Morocco",
    "Atlas motorcycle tours",
    "Atlas Mountains motorcycle rental",
    "Agafay desert motorcycle tour",
    "desert motorcycle tour Morocco",
    "location moto Marrakech",
    "location moto Maroc",
    "location moto trail Marrakech",
    "location moto adventure Marrakech",
    "location KTM Marrakech",
    "moto adventure Maroc",
    "Atlas mountains motorcycle tour",
    "RideKey",
  ],
  image: "/images/vestrom800de.jpg",
  locale: "en_US",
  twitterHandle: "@ridekey",
};

export const routeSeo = {
  home: {
    path: "/",
    title: "Motorcycle Rental Marrakech | Ridekey Motocycles Morocco",
    description:
      "Book motorcycle rental in Marrakech with Ridekey Motocycles. Rent KTM, Suzuki DR650, Yamaha Tenere, Honda X-ADV and adventure bikes for Atlas Mountains, Agafay desert and Morocco routes.",
    image: "/images/ktm390.webp",
  },
  bikes: {
    path: "/bikes",
    title: "Adventure Motorcycle Rentals Marrakech | KTM, Suzuki, Yamaha",
    description:
      "Compare RideKey motorcycles for rent in Marrakech: KTM Adventure, Suzuki DR650, Yamaha Tenere, Honda X-ADV, Royal Enfield Himalayan and touring bikes for Morocco.",
    image: "/images/DR650.jpg",
  },
  rentals: {
    path: "/rentals",
    title: "Motorbike Rental Marrakech Booking | Ridekey Morocco",
    description:
      "Reserve a motorbike rental in Marrakech with helmets, riding gear, pickup times, airport or city handover and WhatsApp booking for Morocco motorcycle travel.",
    image: "/images/ktm390.jpg",
  },
  rides: {
    path: "/rides",
    title: "Motorcycle Tours Morocco | Atlas Mountains & Desert Rides",
    description:
      "Plan guided motorcycle tours in Morocco with RideKey. Ride Atlas Mountains, Agafay desert, Marrakech day routes, Sahara approaches and custom moto adventure itineraries.",
    image: "/images/agafay.jfif",
  },
  about: {
    path: "/about",
    title: "About RideKey Morocco | Marrakech Motorcycle Rental Experts",
    description:
      "RideKey Morocco is a Marrakech motorcycle rental and adventure tour team helping travelers explore Atlas, Agafay and Morocco by reliable adventure motorcycle.",
    image: "/logo/Logo.png",
  },
  blog: {
    path: "/blog",
    title: "Morocco Motorcycle Rental Blog | RideKey Guides",
    description:
      "SEO-ready RideKey guides for motorcycle rental Marrakech, Atlas Mountains motorcycle tours, desert adventures and Morocco riding tips.",
    image: "/images/YAMAHA.webp",
  },
  contact: {
    path: "/contact",
    title: "Contact RideKey Marrakech | Motorcycle Rental Morocco",
    description:
      "Contact RideKey Morocco for motorcycle rental in Marrakech, KTM adventure rentals, Atlas tours, Agafay desert rides, airport handover and Morocco trip planning.",
    image: "/images/vestrom800.jpeg",
  },
};

export const absoluteUrl = (path = "/") => {
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
};
