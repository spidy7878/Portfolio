import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
}

function setMeta(selector: string, attr: string, value: string) {
  document.querySelector(selector)?.setAttribute(attr, value);
}

export function useSEO({ title, description }: SEOProps) {
  useEffect(() => {
    const prevTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute("content") ?? "";

    document.title = title;
    metaDesc?.setAttribute("content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);

    return () => {
      document.title = prevTitle;
      metaDesc?.setAttribute("content", prevDesc);
      setMeta('meta[property="og:title"]', "content", prevTitle);
      setMeta('meta[property="og:description"]', "content", prevDesc);
      setMeta('meta[name="twitter:title"]', "content", prevTitle);
      setMeta('meta[name="twitter:description"]', "content", prevDesc);
    };
  }, [title, description]);
}
