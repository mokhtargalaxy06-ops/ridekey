import { absoluteUrl, seoDefaults } from "./siteConfig";

export const buildCanonical = (path = "/") => {
  const cleanPath = path.split("?")[0].split("#")[0] || "/";
  return absoluteUrl(cleanPath === "/" ? "/" : cleanPath.replace(/\/$/, ""));
};

export const buildTitle = (title) => title || seoDefaults.title;

export const mergeKeywords = (keywords = []) =>
  Array.from(new Set([...seoDefaults.keywords, ...keywords])).join(", ");

export const pageMeta = ({
  title,
  description,
  path,
  image,
  keywords,
  type = "website",
  noindex = false,
} = {}) => ({
  title: buildTitle(title),
  description: description || seoDefaults.description,
  canonical: buildCanonical(path || "/"),
  image: absoluteUrl(image || seoDefaults.image),
  keywords: mergeKeywords(keywords),
  type,
  robots: noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
});
