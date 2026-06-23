<?php

namespace App\Support;

class RideKeyCatalog
{
    public static function all(): array
    {
        return [
            'bikes' => self::bikes(),
            'bikeFilters' => self::bikeFilters(),
            'gear' => self::gear(),
            'rides' => self::rides(),
            'rideShowcase' => self::rideShowcase(),
            'ridesPage' => self::ridesPage(),
            'blogs' => self::blogs(),
            'pages' => self::pages(),
        ];
    }

    public static function pages(): array
    {
        return [
            [
                'id' => 'home',
                'title' => 'Home',
                'path' => '/',
                'seoTitle' => 'Ridekey Motocycles',
                'seoDescription' => 'Book motorcycle rental in Marrakech with Ridekey Motocycles.',
                'heroImage' => '/images/ktm390.webp',
                'isPublished' => true,
                'content' => [
                    'sections' => ['hero', 'featured bikes', 'rides', 'why RideKey', 'journal'],
                    'notes' => 'Main public landing page.',
                ],
            ],
            [
                'id' => 'bikes',
                'title' => 'Motorcycles',
                'path' => '/bikes',
                'seoTitle' => 'Adventure Motorcycle Rentals in Marrakech',
                'seoDescription' => 'Compare RideKey adventure motorcycles for rent in Marrakech.',
                'heroImage' => '/images/DR650.jpg',
                'isPublished' => true,
                'content' => ['notes' => 'Inventory page. Bikes and gear are managed in their own tabs.'],
            ],
            [
                'id' => 'rentals',
                'title' => 'Rentals',
                'path' => '/rentals',
                'seoTitle' => 'Motorbike Rental Marrakech Booking',
                'seoDescription' => 'Reserve a motorbike rental in Marrakech with gear and WhatsApp booking.',
                'heroImage' => '/images/ktm390.jpg',
                'isPublished' => true,
                'content' => ['notes' => 'Rental booking page. Form logic remains in React.'],
            ],
            [
                'id' => 'rides',
                'title' => 'Rides',
                'path' => '/rides',
                'seoTitle' => 'Motorcycle Tours Morocco',
                'seoDescription' => 'Plan guided motorcycle tours in Morocco with RideKey.',
                'heroImage' => '/images/agafay.jfif',
                'isPublished' => true,
                'content' => ['notes' => 'Rides page. Ride cards are managed in the Rides tab.'],
            ],
            [
                'id' => 'about',
                'title' => 'About',
                'path' => '/about',
                'seoTitle' => 'About RideKey Morocco',
                'seoDescription' => 'Marrakech motorcycle rental and adventure tour team.',
                'heroImage' => '/logo/Logo.png',
                'isPublished' => true,
                'content' => ['notes' => 'Company/about page content.'],
            ],
            [
                'id' => 'blog',
                'title' => 'Blog',
                'path' => '/blog',
                'seoTitle' => 'Morocco Motorcycle Rental Blog',
                'seoDescription' => 'RideKey guides for motorcycle rental, tours and Morocco riding tips.',
                'heroImage' => '/images/YAMAHA.webp',
                'isPublished' => true,
                'content' => ['notes' => 'Blog index. Blog posts are managed in the Blogs tab.'],
            ],
            [
                'id' => 'contact',
                'title' => 'Contact',
                'path' => '/contact',
                'seoTitle' => 'Contact RideKey Marrakech',
                'seoDescription' => 'Contact RideKey Morocco for motorcycle rental in Marrakech.',
                'heroImage' => '/images/vestrom800.jpeg',
                'isPublished' => true,
                'content' => ['notes' => 'Contact page and request form.'],
            ],
            [
                'id' => 'dashboard',
                'title' => 'Dashboard',
                'path' => '/dashboard',
                'seoTitle' => 'RideKey Dashboard',
                'seoDescription' => 'Private RideKey content dashboard.',
                'heroImage' => '/logo/Logo.png',
                'isPublished' => false,
                'content' => ['notes' => 'Private admin dashboard page.'],
            ],
        ];
    }

    public static function bikes(): array
    {
        return [
            [
                'id' => 'ktm-390-adventure-r',
                'name' => '390 Adventure R',
                'brand' => 'KTM',
                'type' => 'Adventure',
                'price' => 700,
                'rentalRate' => 700,
                'engine' => 'Single-cylinder, liquid-cooled',
                'displacement' => '399cc',
                'torque' => '39 Nm',
                'topSpeed' => '170 km/h',
                'image' => 'https://www.ktm.ma/wp-content/uploads/2025/08/663132_MY25-KTM-390-Adventure-R-White-45-right_04_STUDIO_EUROPE-_-GLOBAL.jpg',
                'gallery' => [
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCpxT5-pt-3kEWGY8i0FgcTFlmKHZAhKqonA&s',
                    'https://outbackmotortek.fr/wp-content/uploads/2025/10/Image-02-10-2025-at-13.40.jpg',
                    'https://images.medialinksonline.com/imagestream/18510/7774112x1024x0_FFFFFF_L_0.jpg',
                ],
                'description' => 'Light adventure motorcycle prepared for Marrakech, Agafay and Atlas routes.',
            ],
            [
                'id' => 'dr650',
                'name' => 'DR650 SE',
                'brand' => 'Suzuki',
                'type' => 'Dual-Sport',
                'price' => 700,
                'rentalRate' => 700,
                'engine' => 'Single-cylinder, 4-stroke, air/oil-cooled',
                'displacement' => '644cc',
                'torque' => '54 Nm',
                'topSpeed' => '169 km/h',
                'image' => 'https://www.suzuki.ca/wp-content/uploads/DR650SEM3-black-Diagonal-1500x1000.jpg',
                'gallery' => [
                    'https://www.webbikeworld.com/2021-suzuki-dr650s/2021-suzuki-dr650s-hero-image/',
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-8O8KMaIjFlySWxXcc8GMTRz-uuRHnGLLxA&s',
                    'https://cdn.dealerspike.com/imglib/v1/800x600/imglib/Assets/Inventory/CC/74/CC74EBC6-D766-4391-BBFE-628087D243D8.jpg',
                ],
                'description' => 'Simple, reliable dual-sport for gravel, mountain roads and mixed Moroccan terrain.',
            ],
            [
                'id' => 'vstrom-800de',
                'name' => 'Suzuki V-Strom 800DE',
                'brand' => 'Suzuki',
                'type' => 'Adventure Touring',
                'price' => 900,
                'rentalRate' => 900,
                'engine' => 'Parallel-Twin',
                'displacement' => '776cc',
                'torque' => '78 Nm',
                'topSpeed' => '209 km/h',
                'image' => 'https://medias.la-becanerie.com/cache/images_articles/d/3840_2160/sacoches-laterales-sw-motech-sysbag-wp-l-27-40-l-453609.jpg',
                'gallery' => [
                    'https://medias.la-becanerie.com/cache/images_articles/3840_2160/sacoches-laterales-sw-motech-sysbag-wp-l-27-40-l-453609.jpg',
                    'https://www.sport-classic.com/325210-large_default/crashbars-suzuki-v-strom-800de-sw-motech-black.jpg',
                    'https://motorcycle-soul.com/37349-thickbox_default/sabot-moteur-noir-sw-motech-suzuki-v-strom-800de-22.jpg',
                ],
                'description' => 'Comfortable adventure touring bike for long Atlas and coast transfers.',
            ],
            [
                'id' => 'himalayan-450',
                'name' => 'Royal Enfield Himalayan 450',
                'brand' => 'Royal Enfield',
                'type' => 'Adventure',
                'price' => 700,
                'rentalRate' => 700,
                'engine' => 'Single-Cylinder',
                'displacement' => '452cc',
                'torque' => '40 Nm',
                'topSpeed' => '153 km/h',
                'image' => 'https://cdn.powergo.ca/media/inventory/2024/20/78eccd2d4cf845ecb7c4cf06d819caf9_1024x768_webp/2026-royal-enfield-himalayan-450-0.webp',
                'gallery' => [
                    'https://cdpcdn.dx1app.com/products-private/prod/9f30c4cd-222a-4f63-aec6-958454b1d449/8f42de38-7a50-460f-95b5-a8d900f1e555/00000000-0000-0000-0000-000000000000/841997bf-b600-4f61-8b29-b1e20021ce60/ef845861-1c4e-4f8c-9ae7-b221013b5eb4/6000000017_480px.jpg',
                    'https://static.ncr.re/img/580x326/df/df77ccda44239169f0fe911e6d5f04c0.jpg',
                    'https://cafe-racer-only.com/IMG/jpg/hymalayan-450-hanle-black-1.jpg',
                ],
                'description' => 'Accessible adventure bike for relaxed exploring and mountain roads.',
            ],
            [
                'id' => 'x-adv',
                'name' => 'X-ADV 750',
                'brand' => 'Honda',
                'type' => 'Adventure Scooter / Crossover',
                'price' => 1000,
                'rentalRate' => 1000,
                'engine' => 'Parallel-Twin',
                'displacement' => '745cc',
                'torque' => '69 Nm',
                'topSpeed' => '168 km/h',
                'image' => 'https://www.motoplanete.com/honda/11466-750-X-ADV-DCT-2026_380px.webp',
                'gallery' => [
                    'https://mobiwisy.fr/wp-content/uploads/541447_26YM_HONDA_X-ADV.jpg',
                    'https://motorz.tn/wp-content/uploads/2025/09/Honda-X-ADV-Scooter-Tunisie-png-1080x577.webp',
                    'https://media.motoservices.com/media/cache/vehicle_detail/media/vehicle/2971/s1-211215-816037.jpg',
                ],
                'description' => 'Crossover comfort for city pickup, paved routes and light adventure use.',
            ],
            [
                'id' => 'tenere 700',
                'name' => 'Ténéré 700',
                'brand' => 'Yamaha',
                'type' => 'Adventure',
                'price' => 1100,
                'rentalRate' => 1100,
                'engine' => 'Parallel Twin',
                'displacement' => '689cc',
                'torque' => '68 Nm',
                'power' => '73 hp',
                'topSpeed' => '185 km/h',
                'weight' => '205 kg',
                'image' => 'https://mifa-motors.ma/wp-content/uploads/2021/04/2025-Yamaha-XTZ700-EU-Icon_Blue-360-Degrees-001-03.jpg',
                'gallery' => [
                    'https://www.motoplanete.com/yamaha/zoom-700px/11008-700-Tnr-2025-1000px.webp',
                    'https://monsieurvintage.com/photos/2024/11/yamaha-xtz-700-tenere-sky-blue-2025-une.jpg',
                    'https://www.cyclenews.com/wp-content/uploads/2024/11/T7.jpg',
                ],
                'description' => 'Midweight adventure motorcycle for riders who want range and off-road confidence.',
            ],
            [
                'id' => 'cfmoto-450',
                'name' => 'CF Moto 450 Touring',
                'brand' => 'CF Moto',
                'type' => 'Touring',
                'price' => 700,
                'rentalRate' => 700,
                'engine' => 'Parallel Twin',
                'displacement' => '449cc',
                'torque' => '44 Nm',
                'topSpeed' => '180 km/h',
                'image' => 'https://www.cfmoto.co.uk/wp-content/uploads/2025/05/450MT_Zephyr-Blue_Left-45.webp',
                'gallery' => [
                    'https://cdn.bikedekho.com/processedimages/cfmoto/450-mt/source/450-mt6985c091221bb.jpg',
                    'https://cfmotobenelux.com/wp-content/uploads/2023/11/450MT-Galerij-Galerie-5.jpg',
                    'https://listing-images.motoscout24.ch/listing/136/20378136/250580677.jpg?w=1920&q=90',
                ],
                'description' => 'Compact touring bike with friendly handling and daily rental value.',
            ],
        ];
    }

    public static function gear(): array
    {
        return [
            ['id' => 'casque airoh.scorpion.nexx.agv', 'name' => 'casque airoh.scorpion.nexx.agv', 'category' => 'On/Off Road', 'rating' => 5, 'price' => 'MAD 0', 'priceValue' => 0, 'image' => 'https://data.outletmoto.eu/imgprodotto/casque-de-moto-airoh-adventure-commander-2-couleur-noir-mat_227939_zoom.jpg'],
            ['id' => 'gopro hero 11', 'name' => 'gopro hero 11', 'category' => 'camera', 'rating' => 4, 'price' => 'MAD 70', 'priceValue' => 70, 'image' => 'https://kamerty.ma/wp-content/uploads/2022/12/GOPRO-HERO-11-BLACK-Kamerty-1.jpeg'],
            ['id' => 'jacket alpinsat', 'name' => 'jacket alpinsat', 'category' => 'On/Off Road', 'rating' => 5, 'price' => 'MAD 70', 'priceValue' => 70, 'image' => 'https://www.motoexpert.fr/227216-large_default/blouson-moto-textile-alpinestars-viper-v3-air.jpg'],
            ['id' => 'sacoche lateralle sw motech', 'name' => 'sacoche lateralle sw motech/only for vestrom 800 DE', 'category' => 'off road / touring', 'rating' => 5, 'price' => 'MAD 100', 'priceValue' => 100, 'image' => 'https://medias.la-becanerie.com/cache/images_articles/3840_2160/sacoche-laterale-sw-motech-sysbag-wp-l-24-40-l-398045.jpg'],
            ['id' => 'top caisse givi', 'name' => 'top caisse givi', 'category' => 'touring', 'rating' => 4, 'price' => 'MAD 70', 'priceValue' => 70, 'image' => 'https://m.media-amazon.com/images/I/81WOdlWGZEL._AC_UF1000,1000_QL80_.jpg'],
            ['id' => 'air-carbon-v2-gloves', 'name' => 'Air Carbon V2 Gloves', 'category' => 'On/Off Road', 'rating' => 5, 'price' => 'MAD 37.00 - 45.00', 'priceValue' => 37, 'image' => 'https://commons.wikimedia.org/wiki/Special:FilePath/MotorcycleRacingGlove.jpg'],
            ['id' => 'mountain-bike-glove', 'name' => 'Mountain Bike Glove', 'category' => 'On Road', 'rating' => 5, 'price' => 'MAD 75.00', 'priceValue' => 75, 'image' => 'https://commons.wikimedia.org/wiki/Special:FilePath/Metal_Motorcycle_Gloves.jpg'],
            ['id' => 'drystar-riding-shoes', 'name' => 'Drystar Riding Shoes', 'category' => 'On Road', 'rating' => 4, 'price' => 'MAD 68.00', 'priceValue' => 68, 'image' => 'https://commons.wikimedia.org/wiki/Special:FilePath/Motorcycle_racing_boot.jpeg'],
        ];
    }

    public static function rides(): array
    {
        return [
            [
                'id' => 'agafay',
                'title' => 'Agafay',
                'price' => '1000 MAD',
                'startDate' => 'Everyday',
                'startTime' => '09:00/15:00',
                'endDate' => 'Everyday',
                'endTime' => '13:00/19:00',
                'image' => '/images/agafay.jfif',
                'video' => ['src' => '/videos/circuit-agafay.mov', 'poster' => '/images/DR650.jpg'],
            ],
        ];
    }

    public static function rideShowcase(): array
    {
        return [
            'badge' => 'Ride Show',
            'title' => 'Ride Show',
            'description' => 'Watch a quick RideKey rides showcase so visitors can feel the routes, pace, and atmosphere before booking.',
            'youtubeId' => 'iL5TXkfgeWc',
            'ctaLabel' => 'Watch on YouTube',
            'youtubeUrl' => 'https://www.youtube.com/watch?v=iL5TXkfgeWc',
        ];
    }

    public static function ridesPage(): array
    {
        return [
            'heroImage' => '/images/vestrom800de.jpg',
            'heroAlt' => 'RideKey Morocco rides',
            'requestDefaults' => [
                'duration' => '3',
                'riders' => '4',
                'motorcycles' => '4',
                'route' => 'Atlas Mountains',
                'startDate' => '',
                'skillLevel' => 'intermediate',
                'accommodation' => 'yes',
                'supportVehicle' => 'no',
                'note' => '',
            ],
        ];
    }

    public static function blogs(): array
    {
        return [
            [
                'id' => 'best-motorcycle-roads-morocco',
                'title' => 'Best Motorcycle Roads in Morocco for Adventure Riders',
                'seoTitle' => 'Best Motorcycle Roads in Morocco | RideKey Adventure Guide',
                'date' => 'May 16, 2026',
                'publishedAt' => '2026-05-16',
                'updatedAt' => '2026-05-16',
                'tag' => 'Morocco Routes',
                'image' => '/images/YAMAHA.webp',
                'excerpt' => 'A practical guide to Morocco strong motorcycle roads, from Marrakech to the Atlas Mountains, Agafay desert and coastal touring routes.',
                'keywords' => ['best motorcycle roads in Morocco', 'motorcycle tour Morocco', 'adventure motorcycle Morocco'],
                'sections' => [
                    ['heading' => 'Marrakech to the High Atlas', 'body' => 'The High Atlas roads near Marrakech are ideal for riders who want fast access to mountain passes, villages and technical corners.'],
                    ['heading' => 'Agafay Desert and Stone Tracks', 'body' => 'Agafay gives visitors a desert-style motorcycle experience close to Marrakech with hardpack tracks and wide horizons.'],
                    ['heading' => 'Route Planning Tip', 'body' => 'Choose the bike around surface, luggage and pace. Lighter dual-sport motorcycles are easier off-road.'],
                ],
            ],
            [
                'id' => 'atlas-mountains-motorcycle-tours',
                'title' => 'Atlas Mountains Motorcycle Tours from Marrakech',
                'seoTitle' => 'Atlas Mountains Motorcycle Tour Morocco | RideKey Marrakech',
                'date' => 'May 10, 2026',
                'publishedAt' => '2026-05-10',
                'updatedAt' => '2026-05-16',
                'tag' => 'Atlas Mountains',
                'image' => '/images/vestrom800de.jpg',
                'excerpt' => 'How to plan an Atlas Mountains motorcycle tour from Marrakech with the right rental bike, route timing, gear and local riding expectations.',
                'keywords' => ['Atlas mountains motorcycle tour', 'motorcycle rental Marrakech', 'moto adventure Maroc'],
                'sections' => [
                    ['heading' => 'Why Start in Marrakech', 'body' => 'Marrakech is the most efficient launch point for Atlas Mountains motorcycle tours.'],
                    ['heading' => 'Best Bikes for the Atlas', 'body' => 'KTM Adventure, Suzuki DR650, Yamaha Tenere and BMW GS-style adventure bikes cover common Atlas routes well.'],
                    ['heading' => 'Tour Duration', 'body' => 'A single day can reach scenic mountain roads, while two to four days gives more time for passes and valleys.'],
                ],
            ],
            [
                'id' => 'desert-motorcycle-adventure-morocco',
                'title' => 'Desert Motorcycle Adventure Morocco: What to Know Before You Ride',
                'seoTitle' => 'Desert Motorcycle Tour Morocco | RideKey Adventure Rental',
                'date' => 'May 04, 2026',
                'publishedAt' => '2026-05-04',
                'updatedAt' => '2026-05-16',
                'tag' => 'Desert Tours',
                'image' => '/images/agafay.jfif',
                'excerpt' => 'A rider-focused guide to desert motorcycle tours in Morocco, including Agafay, Sahara approaches, bike choice, hydration and support planning.',
                'keywords' => ['desert motorcycle tour Morocco', 'motorcycle tour Morocco', 'location moto Maroc'],
                'sections' => [
                    ['heading' => 'Agafay vs Sahara', 'body' => 'Agafay is close to Marrakech and works well for short rides, while deeper Sahara routes need more planning.'],
                    ['heading' => 'Rental Setup', 'body' => 'For desert terrain, prioritize tires, standing comfort, luggage security and simple reliability.'],
                    ['heading' => 'Riding Conditions', 'body' => 'Heat, dust and changing surfaces make early starts and hydration essential.'],
                ],
            ],
            [
                'id' => 'ktm-390-adventure-morocco',
                'title' => 'KTM 390 Adventure Rental in Morocco: Is It Enough for the Atlas?',
                'seoTitle' => 'KTM 390 Adventure Morocco Rental | RideKey Marrakech',
                'date' => 'Apr 27, 2026',
                'publishedAt' => '2026-04-27',
                'updatedAt' => '2026-05-16',
                'tag' => 'KTM Rental',
                'image' => '/images/ktm390.webp',
                'excerpt' => 'Why the KTM 390 Adventure is a strong Marrakech rental choice for solo riders, Atlas roads and light off-road routes.',
                'keywords' => ['KTM rental Morocco', 'KTM 390 Adventure Morocco', 'motorbike rental Marrakech'],
                'sections' => [
                    ['heading' => 'Where the KTM 390 Adventure Works Best', 'body' => 'The KTM 390 Adventure is light, efficient and easy to manage.'],
                    ['heading' => 'Who Should Rent It', 'body' => 'It suits solo riders and travelers who value control on smaller roads.'],
                    ['heading' => 'When to Choose a Bigger Bike', 'body' => 'For two-up touring or heavy luggage, a larger adventure motorcycle may be more comfortable.'],
                ],
            ],
            [
                'id' => 'marrakech-motorcycle-rental-guide',
                'title' => 'Marrakech Motorcycle Rental Guide for First-Time Visitors',
                'seoTitle' => 'Motorcycle Rental Marrakech Guide | RideKey Morocco',
                'date' => 'Apr 20, 2026',
                'publishedAt' => '2026-04-20',
                'updatedAt' => '2026-05-16',
                'tag' => 'Rental Guide',
                'image' => '/images/DR650.jpg',
                'excerpt' => 'Everything tourists should know before booking motorcycle rental in Marrakech: licenses, deposits, routes, gear and timing.',
                'keywords' => ['motorcycle rental Marrakech', 'motorbike rental Marrakech', 'location moto Marrakech'],
                'sections' => [
                    ['heading' => 'Documents and Booking', 'body' => 'Bring a valid motorcycle license, passport details and enough time for a handover.'],
                    ['heading' => 'Choosing Your Bike', 'body' => 'Pick a motorcycle for the route, not just the brand.'],
                    ['heading' => 'Local Search Terms', 'body' => 'Visitors often search in English and French, so RideKey supports both motorcycle rental Marrakech and location moto Marrakech intent.'],
                ],
            ],
        ];
    }

    public static function bikeFilters(): array
    {
        return self::bikeFiltersFor(self::bikes());
    }

    public static function bikeFiltersFor(array $bikes): array
    {

        return [
            'brands' => self::unique($bikes, 'brand'),
            'types' => self::unique($bikes, 'type'),
            'displacements' => self::unique($bikes, 'displacement'),
            'priceRanges' => self::priceRanges($bikes),
        ];
    }

    private static function unique(array $items, string $key): array
    {
        $values = array_values(array_unique(array_filter(array_column($items, $key))));
        sort($values);

        return array_merge(['All'], $values);
    }

    private static function priceRanges(array $items): array
    {
        $prices = array_values(array_unique(array_map(fn ($item) => (int) $item['price'], $items)));
        sort($prices);
        $chunkSize = max(1, (int) ceil(count($prices) / 3));
        $ranges = [['key' => 'All']];

        foreach (array_chunk($prices, $chunkSize) as $values) {
            $ranges[] = [
                'key' => $values[0].'-'.$values[count($values) - 1],
                'min' => $values[0],
                'max' => $values[count($values) - 1],
            ];
        }

        return $ranges;
    }
}
