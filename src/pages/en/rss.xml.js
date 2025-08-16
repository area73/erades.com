import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from "../../consts";
import { t } from "../../i18n";

export async function GET(context) {
  const posts = await getCollection("blog");

  // Filtrar posts en inglés (que no estén en draft)
  const englishPosts = posts
    .filter((post) => post.id.startsWith("en/") && !post.data.draft)
    .sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate));

  return rss({
    title: t("en", "rss.title").replace("{siteTitle}", SITE_TITLE),
    description: t("en", "rss.description"),
    site: SITE_URL,
    items: englishPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      updatedDate: post.data.updatedDate,
      link: `/en/blog/${post.id.replace("en/", "")}/`,
      categories: [...post.data.tags, ...post.data.categories],
    })),
    customData: `<language>en-US</language>`,
    stylesheet: "/rss/styles.xsl",
  });
}
