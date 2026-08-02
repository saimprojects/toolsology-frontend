import { useEffect } from "react";

const SITE = "https://www.toolsology.shop";

function setMeta(selector, attributes) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement("meta");
    document.head.appendChild(node);
  }
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
}

export default function Seo({ title, description, path = "", image, type = "website", noindex = false, schema }) {
  useEffect(() => {
    const fullTitle = title.includes("Toolsology") ? title : `${title} | Toolsology`;
    const canonical = `${SITE}${path || window.location.pathname}`;
    document.title = fullTitle;
    setMeta('meta[name="description"]', { name: "description", content: description });
    setMeta('meta[name="robots"]', { name: "robots", content: noindex ? "noindex,nofollow" : "index,follow,max-image-preview:large" });
    setMeta('meta[property="og:title"]', { property: "og:title", content: fullTitle });
    setMeta('meta[property="og:description"]', { property: "og:description", content: description });
    setMeta('meta[property="og:type"]', { property: "og:type", content: type });
    setMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    if (image) setMeta('meta[property="og:image"]', { property: "og:image", content: image });

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = canonical;

    const id = "toolsology-structured-data";
    document.getElementById(id)?.remove();
    if (schema) {
      const script = document.createElement("script");
      script.id = id; script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [title, description, path, image, type, noindex, schema]);
  return null;
}
