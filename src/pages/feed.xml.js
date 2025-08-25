import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from "../consts";

export async function GET(context) {
  const posts = await getCollection("blog");

  // Obtener todos los posts (español e inglés) que no estén en draft
  const allPosts = posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate));

  const rssContent = await rss({
    title: `${SITE_TITLE} - RSS Feed`,
    description: `${SITE_DESCRIPTION} - RSS Feed con posts en español e inglés`,
    site: SITE_URL,
    items: allPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      updatedDate: post.data.updatedDate,
      link: `/${post.id.startsWith("es/") ? "es" : "en"}/blog/${post.id.replace(
        /^(es|en)\//,
        ""
      )}/`,
      categories: [...post.data.tags, ...post.data.categories],
    })),
    customData: `<language>es-ES</language>`,
    stylesheet: "/rss/styles.xsl",
  });

  return new Response(rssContent, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "max-age=300, must-revalidate",
    },
  });
}
