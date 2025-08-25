import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from "../consts";
import { t } from "../i18n";

export async function GET(context) {
  const posts = await getCollection("blog");

  // Filtrar posts en español (que no estén en draft)
  const spanishPosts = posts
    .filter((post) => post.id.startsWith("es/") && !post.data.draft)
    .sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate));

  return rss({
    title: t("es", "rss.title").replace("{siteTitle}", SITE_TITLE),
    description: t("es", "rss.description"),
    site: SITE_URL,
    items: spanishPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      updatedDate: post.data.updatedDate,
      link: `/es/blog/${post.id.replace("es/", "")}/`,
      categories: [...post.data.tags, ...post.data.categories],
    })),
    customData: `<language>es-ES</language>`,
    stylesheet: "/rss/styles.xsl",
  });
}
