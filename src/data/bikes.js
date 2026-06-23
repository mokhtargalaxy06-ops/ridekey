const imgSportClose =
  "https://mifa-motors.ma/wp-content/uploads/2021/04/2025-Yamaha-XTZ700-EU-Icon_Blue-360-Degrees-001-03.jpg";
const imgTrack =
  "https://cdn.powergo.ca/media/inventory/2024/20/78eccd2d4cf845ecb7c4cf06d819caf9_1024x768_webp/2026-royal-enfield-himalayan-450-0.webp";
const imgMountain =
  "https://www.motoplanete.com/honda/11466-750-X-ADV-DCT-2026_380px.webp";
const imgSunset =
  "https://medias.la-becanerie.com/cache/images_articles/d/3840_2160/sacoches-laterales-sw-motech-sysbag-wp-l-27-40-l-453609.jpg";

const dr650 =
  "https://www.suzuki.ca/wp-content/uploads/DR650SEM3-black-Diagonal-1500x1000.jpg";

const imgSportClos=
  "https://www.ktm.ma/wp-content/uploads/2025/08/663132_MY25-KTM-390-Adventure-R-White-45-right_04_STUDIO_EUROPE-_-GLOBAL.jpg";

  const cfmoto450mt=
  "https://www.cfmoto.co.uk/wp-content/uploads/2025/05/450MT_Zephyr-Blue_Left-45.webp";
  
// gallery dr650
const dr650GalleryImg1= "https://www.webbikeworld.com/2021-suzuki-dr650s/2021-suzuki-dr650s-hero-image/";
const dr650GalleryImg2= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-8O8KMaIjFlySWxXcc8GMTRz-uuRHnGLLxA&s";
const dr650GalleryImg3= "https://cdn.dealerspike.com/imglib/v1/800x600/imglib/Assets/Inventory/CC/74/CC74EBC6-D766-4391-BBFE-628087D243D8.jpg";

// gallery ktm 390 
const ktm390GalleryImg1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCpxT5-pt-3kEWGY8i0FgcTFlmKHZAhKqonA&s";
const ktm390GalleryImg2 = "https://outbackmotortek.fr/wp-content/uploads/2025/10/Image-02-10-2025-at-13.40.jpg";
const ktm390GalleryImg3 = "https://images.medialinksonline.com/imagestream/18510/7774112x1024x0_FFFFFF_L_0.jpg";

// galery vestrom 800 de
const vestromGalleryimg1="https://medias.la-becanerie.com/cache/images_articles/3840_2160/sacoches-laterales-sw-motech-sysbag-wp-l-27-40-l-453609.jpg";
const vestromGalleryimg2="https://www.sport-classic.com/325210-large_default/crashbars-suzuki-v-strom-800de-sw-motech-black.jpg";
const vestromGalleryimg3="https://motorcycle-soul.com/37349-thickbox_default/sabot-moteur-noir-sw-motech-suzuki-v-strom-800de-22.jpg";

// galery royal enfield himalayan
const royalenfieldhimalayangalleryimg1="https://cdpcdn.dx1app.com/products-private/prod/9f30c4cd-222a-4f63-aec6-958454b1d449/8f42de38-7a50-460f-95b5-a8d900f1e555/00000000-0000-0000-0000-000000000000/841997bf-b600-4f61-8b29-b1e20021ce60/ef845861-1c4e-4f8c-9ae7-b221013b5eb4/6000000017_480px.jpg";
const royalenfieldhimalayangalleryimg2="https://static.ncr.re/img/580x326/df/df77ccda44239169f0fe911e6d5f04c0.jpg";
const royalenfieldhimalayangalleryimg3="https://cafe-racer-only.com/IMG/jpg/hymalayan-450-hanle-black-1.jpg";

// galery x-adv honda
const xadvhondagalleryimg1="https://mobiwisy.fr/wp-content/uploads/541447_26YM_HONDA_X-ADV.jpg";
const xadvhondagalleryimg2="https://motorz.tn/wp-content/uploads/2025/09/Honda-X-ADV-Scooter-Tunisie-png-1080x577.webp";
const xadvhondagalleryimg3="https://media.motoservices.com/media/cache/vehicle_detail/media/vehicle/2971/s1-211215-816037.jpg";

// galery tenere 700 yamaha
const yamahatenere700galleryimg1="https://www.motoplanete.com/yamaha/zoom-700px/11008-700-Tnr-2025-1000px.webp";
const yamahatenere700galleryimg2="https://monsieurvintage.com/photos/2024/11/yamaha-xtz-700-tenere-sky-blue-2025-une.jpg";
const yamahatenere700galleryimg3="https://www.cyclenews.com/wp-content/uploads/2024/11/T7.jpg";

// galery cfmoto 450 mt
const cfmoto450mtgalleryimg1="https://cdn.bikedekho.com/processedimages/cfmoto/450-mt/source/450-mt6985c091221bb.jpg";
const cfmoto450mtgalleryimg2="https://cfmotobenelux.com/wp-content/uploads/2023/11/450MT-Galerij-Galerie-5.jpg";
const cfmoto450mtgalleryimg3="https://listing-images.motoscout24.ch/listing/136/20378136/250580677.jpg?w=1920&q=90";
export const bikes = [
  {
     id: "ktm-390-adventure-r",
    name: "390 Adventure R",
    brand: "KTM",
    type: "Adventure",
    price: 700,
    rentalRate: 700,
    engine: "Single-cylinder, liquid-cooled",
    displacement: "399cc",
    torque: "39 Nm",
    topSpeed: "170 km/h",
    image: imgSportClos,
    gallery: [ktm390GalleryImg1, ktm390GalleryImg2, ktm390GalleryImg3],
    description:
      "Instant torque and zero emissions with a carbon monocoque chassis and adaptive ride control.",
  },
  {
    id: "dr650",
    name: "DR650 SE",
    brand: "Suzuki",
    type: "Dual-Sport",
    price: 700,
    rentalRate: 700,
    engine: "Single-cylinder, 4-stroke, air/oil-cooled",
    displacement: "644cc",
    torque: "54 Nm",
    topSpeed: "169 km/h",
    image: dr650,
    gallery: [dr650GalleryImg1, dr650GalleryImg2, dr650GalleryImg3],
    description:
      "Legendary reliability and simplicity with a torquey 644cc single-cylinder engine, long-travel suspension, and go-anywhere versatility on-road and off-road.",
  },
  {
     "id": "vstrom-800de",
  "name": "Suzuki V-Strom 800DE",
  "brand": "Suzuki",
  "type": "Adventure Touring",
  "price": 900,
  "rentalRate": 900,
  "engine": "Parallel-Twin",
  "displacement": "776cc",
  "torque": "78 Nm",
  "topSpeed": "209 km/h",
    image: imgSunset,
    gallery: [vestromGalleryimg1, vestromGalleryimg2, vestromGalleryimg3],
    description:
      "Long-range comfort with adaptive suspension and a cockpit built for cross-country precision.",
  },
  {
    "id": "himalayan-450",
  "name": "Royal Enfield Himalayan 450",
  "brand": "Royal Enfield",
  "type": "Adventure",
  "price": 700,
  "rentalRate": 700,
  "engine": "Single-Cylinder",
  "displacement": "452cc",
  "torque": "40 Nm",
  "topSpeed": "153 km/h",
    image: imgTrack,
    gallery: [royalenfieldhimalayangalleryimg1, royalenfieldhimalayangalleryimg2, royalenfieldhimalayangalleryimg3],
    description:
      "Track-focused geometry, winglets, and race-tuned electronics with a lightweight chassis.",
  },
  {
    "id": "x-adv",
  "name": "X-ADV 750",
  "brand": "Honda",
  "type": "Adventure Scooter / Crossover",
  "price": 1000,
  "rentalRate": 1000,
  "engine": "Parallel-Twin",
  "displacement": "745cc",
  "torque": "69 Nm",
  "topSpeed": "168 km/h",
    image: imgMountain,
    gallery: [xadvhondagalleryimg1, xadvhondagalleryimg2, xadvhondagalleryimg3],
    description:
      "Classic silhouette with modern ride-by-wire controls and premium leather finishes.",
  },
  {
     "id": "tenere 700",
  "name": "Ténéré 700",
  "brand": "Yamaha",
  "type": "Adventure",
  "price": 1100,
  "rentalRate": 1100,
  "engine": "Parallel Twin",
  "displacement": "689cc",
  "torque": "68 Nm",
  "power": "73 hp",
  "topSpeed": "185 km/h",
  "weight": "205 kg",
    image: imgSportClose,
    gallery: [yamahatenere700galleryimg1, yamahatenere700galleryimg2, yamahatenere700galleryimg3],
    description:
      "Agile midweight sport bike with rider modes and an aluminum twin-spar frame.",
  },
  {
    "id": "cfmoto-450",
  "name": "CF Moto 450 Touring",
  "brand": "CF Moto",
  "type": "Touring",
  "price": 700,
  "rentalRate":700 ,
  "engine": "Parallel Twin",
  "displacement": "449cc",
  "torque": "44 Nm",
  "topSpeed": "180 km/h",
    image: cfmoto450mt,
    gallery: [cfmoto450mtgalleryimg1, cfmoto450mtgalleryimg2, cfmoto450mtgalleryimg3],
    description:
      "All-road touring with adaptive cruise, 3-piece luggage, and 280-mile range.",
  },
];

const uniqueValues = (items, key) => [
  "All",
  ...Array.from(
    new Set(
      items
        .map((item) => item[key])
        .filter(Boolean),
    ),
  ).sort((a, b) => a.localeCompare(b)),
];

export const brands = uniqueValues(bikes, "brand");
export const types = uniqueValues(bikes, "type");
export const displacements = uniqueValues(bikes, "displacement");

const uniquePrices = Array.from(
  new Set(
    bikes
      .map((bike) => Number(bike.price))
      .filter((price) => !Number.isNaN(price)),
  ),
).sort((a, b) => a - b);

const priceChunkSize = Math.max(1, Math.ceil(uniquePrices.length / 3));

export const priceRanges = [
  { key: "All" },
  ...Array.from({ length: Math.ceil(uniquePrices.length / priceChunkSize) }, (_, index) => {
    const values = uniquePrices.slice(
      index * priceChunkSize,
      (index + 1) * priceChunkSize,
    );

    if (!values.length) return null;

    return {
      key: `${values[0]}-${values[values.length - 1]}`,
      min: values[0],
      max: values[values.length - 1],
    };
  }).filter(Boolean),
];
