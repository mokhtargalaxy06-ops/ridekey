const imgSportClose =
  "https://images.unsplash.com/photo-1762012507757-b18cdd13791b?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000";
const imgTrack =
  "https://images.unsplash.com/photo-1623785419758-7d48241054a4?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000";
const imgMountain =
  "https://images.unsplash.com/photo-1755772896130-1fc7686f0d39?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000";
const imgSunset =
  "https://images.unsplash.com/photo-1759838494954-cefce6aded20?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000";

const dr650 =
  "https://www.suzuki.ca/wp-content/uploads/DR650SEM3-black-Diagonal-1500x1000.jpg";

export const bikes = [
  {
    id: "volt-x9",
    name: "Volt X9 Electric",
    brand: "Voltstream",
    type: "Electric",
    price: 18499,
    rentalRate: 420,
    engine: "EV 120 kW",
    displacement: "0cc",
    torque: "205 Nm",
    topSpeed: "124 mph",
    image: imgSportClose,
    gallery: [imgMountain, imgTrack, imgSunset],
    description:
      "Instant torque and zero emissions with a carbon monocoque chassis and adaptive ride control.",
  },
  {
    id: "dr650",
    name: "DR650 SE",
    brand: "Suzuki",
    type: "Dual-Sport",
    price: 800,
    rentalRate: 800,
    engine: "Single-cylinder, 4-stroke, air/oil-cooled",
    displacement: "644cc",
    torque: "54 Nm",
    topSpeed: "105 mph",
    image: dr650,
    gallery: [imgMountain, imgTrack, imgSunset],
    description:
      "Legendary reliability and simplicity with a torquey 644cc single-cylinder engine, long-travel suspension, and go-anywhere versatility on-road and off-road.",
  },
  {
    id: "aurora-gt",
    name: "Aurora GT 1200",
    brand: "Aurora",
    type: "Touring",
    price: 22999,
    rentalRate: 520,
    engine: "Inline-4",
    displacement: "1200cc",
    torque: "124 Nm",
    topSpeed: "165 mph",
    image: imgSunset,
    gallery: [imgSunset, imgMountain, imgTrack],
    description:
      "Long-range comfort with adaptive suspension and a cockpit built for cross-country precision.",
  },
  {
    id: "onyx-r",
    name: "Onyx R SuperSport",
    brand: "Onyx",
    type: "Sport",
    price: 19450,
    rentalRate: 480,
    engine: "V4",
    displacement: "998cc",
    torque: "118 Nm",
    topSpeed: "186 mph",
    image: imgTrack,
    gallery: [imgTrack, imgSportClose, imgMountain],
    description:
      "Track-focused geometry, winglets, and race-tuned electronics with a lightweight chassis.",
  },
  {
    id: "sierra-cr",
    name: "Sierra CR 850",
    brand: "Sierra",
    type: "Cruiser",
    price: 16995,
    rentalRate: 390,
    engine: "V-Twin",
    displacement: "850cc",
    torque: "98 Nm",
    topSpeed: "132 mph",
    image: imgMountain,
    gallery: [imgMountain, imgSunset, imgSportClose],
    description:
      "Classic silhouette with modern ride-by-wire controls and premium leather finishes.",
  },
  {
    id: "vortex-700",
    name: "Vortex 700R",
    brand: "Vortex",
    type: "Sport",
    price: 14499,
    rentalRate: 340,
    engine: "Parallel Twin",
    displacement: "700cc",
    torque: "86 Nm",
    topSpeed: "152 mph",
    image: imgSportClose,
    gallery: [imgTrack, imgSportClose, imgMountain],
    description:
      "Agile midweight sport bike with rider modes and an aluminum twin-spar frame.",
  },
  {
    id: "atlas-tx",
    name: "Atlas TX Explorer",
    brand: "Atlas",
    type: "Touring",
    price: 20999,
    rentalRate: 500,
    engine: "Boxer Twin",
    displacement: "1250cc",
    torque: "129 Nm",
    topSpeed: "170 mph",
    image: imgSunset,
    gallery: [imgSunset, imgMountain, imgTrack],
    description:
      "All-road touring with adaptive cruise, 3-piece luggage, and 280-mile range.",
  },
];

export const brands = [
  "All",
  "Voltstream",
  "Aurora",
  "Onyx",
  "Sierra",
  "Vortex",
  "Atlas",
];
export const types = ["All", "Sport", "Cruiser", "Electric", "Touring"];
