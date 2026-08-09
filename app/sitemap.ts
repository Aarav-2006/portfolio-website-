import type { MetadataRoute } from "next";
import { projects } from "../lib/data";

const BASE_URL = "https://aaravjhawar.is-a.dev";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/work/${p.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      priority: 1,
    },
    ...projectUrls,
  ];
}
