import { Helmet } from "react-helmet-async";
import { pageMeta } from "../seo/meta";
import { business, seoDefaults } from "../seo/siteConfig";

export default function SEO(props) {
  const meta = pageMeta(props);

  return (
    <Helmet prioritizeSeoTags>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <meta name="robots" content={meta.robots} />
      <meta name="author" content={business.name} />
      <meta name="publisher" content={business.name} />
      <meta name="application-name" content={business.name} />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="geo.region" content="MA-MAR" />
      <meta name="geo.placename" content="Marrakech, Morocco" />
      <meta name="geo.position" content={`${business.geo.latitude};${business.geo.longitude}`} />
      <meta name="ICBM" content={`${business.geo.latitude}, ${business.geo.longitude}`} />
      <meta name="contact" content={business.email} />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <link rel="canonical" href={meta.canonical} />
      <link rel="alternate" hrefLang="en" href={meta.canonical} />
      <link rel="alternate" hrefLang="fr" href={meta.canonical} />
      <link rel="alternate" hrefLang="es" href={meta.canonical} />
      <link rel="alternate" hrefLang="ar" href={meta.canonical} />
      <link rel="alternate" hrefLang="x-default" href={meta.canonical} />

      <meta property="og:site_name" content={business.name} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:url" content={meta.canonical} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:image:secure_url" content={meta.image} />
      <meta property="og:image:alt" content={`${business.name} motorcycle rental Marrakech Morocco`} />
      <meta property="og:locale" content={seoDefaults.locale} />
      <meta property="og:locale:alternate" content="fr_FR" />
      <meta property="og:locale:alternate" content="es_ES" />
      <meta property="business:contact_data:locality" content={business.address.addressLocality} />
      <meta property="business:contact_data:region" content={business.address.addressRegion} />
      <meta property="business:contact_data:country_name" content="Morocco" />
      <meta property="place:location:latitude" content={String(business.geo.latitude)} />
      <meta property="place:location:longitude" content={String(business.geo.longitude)} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={seoDefaults.twitterHandle} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      <meta name="twitter:image:alt" content={`${business.name} motorcycle rental Marrakech Morocco`} />
    </Helmet>
  );
}
