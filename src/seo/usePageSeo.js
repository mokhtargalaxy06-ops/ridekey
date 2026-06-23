import { useMemo } from "react";
import { useCatalog } from "../catalogContext";
import { routeSeo } from "./siteConfig";

const seoFromPage = (page) => {
  if (!page) return {};

  return {
    path: page.path,
    title: page.seoTitle || page.title,
    description: page.seoDescription,
    image: page.heroImage,
    noindex: page.isPublished === false,
  };
};

export const usePageSeo = (key, fallback = routeSeo[key]) => {
  const { pages } = useCatalog();

  return useMemo(() => {
    const page = pages.find((item) => item.id === key || item.path === fallback?.path);

    return {
      ...fallback,
      ...seoFromPage(page),
    };
  }, [fallback, key, pages]);
};
