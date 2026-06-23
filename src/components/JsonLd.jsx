import { Helmet } from "react-helmet-async";
import { absoluteUrl, business } from "../seo/siteConfig";

const json = (data) => JSON.stringify(data);

export function JsonLd({ data }) {
  return (
    <Helmet>
      <script type="application/ld+json">{json(data)}</script>
    </Helmet>
  );
}

export function LocalBusinessJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "MotorcycleDealer", "TravelAgency"],
        "@id": `${business.url}/#localbusiness`,
        name: business.name,
        legalName: business.legalName,
        url: business.url,
        image: absoluteUrl("/logo/Logo.png"),
        logo: absoluteUrl("/logo/Logo.png"),
        description:
          "Adventure motorcycle rental and guided motorcycle tour operator based in Marrakech, Morocco.",
        telephone: business.phones,
        email: business.email,
        priceRange: business.priceRange,
        currenciesAccepted: business.currenciesAccepted,
        paymentAccepted: business.paymentAccepted,
        address: {
          "@type": "PostalAddress",
          ...business.address,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: business.geo.latitude,
          longitude: business.geo.longitude,
        },
        openingHours: business.openingHours,
        sameAs: business.sameAs,
        areaServed: business.serviceArea.map((name) => ({
          "@type": "Place",
          name,
        })),
        knowsAbout: [
          "Motorcycle rental Marrakech",
          "Motorbike rental Morocco",
          "Adventure motorcycle rental",
          "Atlas Mountains motorcycle tours",
          "Agafay desert motorcycle rides",
          "KTM rental Marrakech",
          "Suzuki DR650 rental Morocco",
          "Yamaha Tenere rental Morocco",
          "Location moto Marrakech",
          "Location moto Maroc",
        ],
        hasMap: `https://www.google.com/maps/search/?api=1&query=${business.geo.latitude},${business.geo.longitude}`,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: business.phones[0],
            contactType: "customer service",
            areaServed: "MA",
            availableLanguage: ["English", "French", "Arabic", "Spanish"],
          },
          {
            "@type": "ContactPoint",
            telephone: business.phones[1],
            contactType: "WhatsApp booking",
            areaServed: "MA",
            availableLanguage: ["English", "French", "Arabic", "Spanish"],
          },
        ],
        makesOffer: [
          {
            "@type": "Offer",
            name: "Motorcycle rental Marrakech",
            url: absoluteUrl("/bikes"),
            priceCurrency: "MAD",
            itemOffered: {
              "@type": "Service",
              name: "Adventure motorcycle rental in Marrakech",
              serviceType: "Motorcycle rental",
              provider: {
                "@id": `${business.url}/#localbusiness`,
              },
              areaServed: {
                "@type": "City",
                name: "Marrakech",
              },
            },
          },
          {
            "@type": "Offer",
            name: "Motorcycle tour Morocco",
            url: absoluteUrl("/rides"),
            priceCurrency: "MAD",
            itemOffered: {
              "@type": "Service",
              name: "Atlas Mountains and desert motorcycle tours",
              serviceType: "Guided motorcycle tour",
              provider: {
                "@id": `${business.url}/#localbusiness`,
              },
              areaServed: {
                "@type": "Country",
                name: "Morocco",
              },
            },
          },
        ],
      }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${business.url}/#website`,
        name: business.name,
        alternateName: [
          "RideKey Morocco",
          "RideKey Motorcycle Rental Marrakech",
          "RideKey Moto Marrakech",
        ],
        url: business.url,
        inLanguage: ["en", "fr", "es", "ar"],
        publisher: {
          "@id": `${business.url}/#localbusiness`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${business.url}/bikes?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function RentalServiceJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${business.url}/#motorcycle-rental-service`,
        name: "Motorcycle rental in Marrakech",
        alternateName: [
          "Motorbike rental Marrakech",
          "Adventure motorcycle rental Morocco",
          "Location moto Marrakech",
          "Location moto Maroc",
        ],
        serviceType: "Adventure motorcycle rental",
        provider: {
          "@id": `${business.url}/#localbusiness`,
        },
        areaServed: business.serviceArea.map((name) => ({
          "@type": "Place",
          name,
        })),
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: absoluteUrl("/rentals"),
          servicePhone: business.phones[1],
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "MAD",
          lowPrice: "700",
          highPrice: "1100",
          offerCount: "7",
          url: absoluteUrl("/bikes"),
        },
        termsOfService: absoluteUrl("/rentals"),
      }}
    />
  );
}

export function SeoFaqJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Where can I rent a motorcycle in Marrakech?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ridekey Motocycles rents adventure motorcycles in Marrakech for city pickup, Atlas Mountains routes, Agafay desert rides and Morocco touring.",
            },
          },
          {
            "@type": "Question",
            name: "What motorcycles can I rent in Marrakech?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "RideKey offers adventure and touring motorcycles such as KTM Adventure, Suzuki DR650, Yamaha Tenere, Honda X-ADV, Royal Enfield Himalayan and similar Morocco-ready bikes.",
            },
          },
          {
            "@type": "Question",
            name: "Do you offer guided motorcycle tours in Morocco?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. RideKey plans guided motorcycle tours from Marrakech to the Atlas Mountains, Agafay desert, coastal routes and custom Morocco itineraries.",
            },
          },
          {
            "@type": "Question",
            name: "Can tourists book motorbike rental in Marrakech by WhatsApp?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Travelers can compare motorcycles, choose rental dates and contact RideKey by WhatsApp for booking details, gear and pickup arrangements.",
            },
          },
        ],
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}

export function ProductJsonLd({ bike }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: `${bike.brand} ${bike.name} motorcycle rental Marrakech`,
        brand: {
          "@type": "Brand",
          name: bike.brand,
        },
        image: absoluteUrl(bike.image),
        description: bike.description,
        category: "Adventure motorcycle rental",
        offers: {
          "@type": "Offer",
          priceCurrency: "MAD",
          price: bike.rentalRate || bike.price,
          availability: "https://schema.org/InStock",
          url: absoluteUrl(`/bikes/${bike.id}`),
          seller: {
            "@id": `${business.url}/#localbusiness`,
          },
        },
      }}
    />
  );
}

export function BlogPostingJsonLd({ post }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: absoluteUrl(post.image),
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        author: {
          "@type": "Organization",
          name: business.name,
        },
        publisher: {
          "@type": "Organization",
          name: business.name,
          logo: {
            "@type": "ImageObject",
            url: absoluteUrl("/logo/Logo.png"),
          },
        },
        mainEntityOfPage: absoluteUrl(`/blog/${post.id}`),
      }}
    />
  );
}
