/**
 * Counts the occurrences of each tag in the given posts.
 */
export function getTagCounts(
  posts: { data: { tags?: string[] } }[]
): Record<string, number> {
  return posts
    .map((post) => post.data.tags || [])
    .flat()
    .reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
}

/**
 * Returns the tags sorted by count descending.
 */
export function getSortedTags(tagCounts: Record<string, number>): string[] {
  // Orden determinista: primero por cantidad desc, luego alfabético asc para empates
  return Object.keys(tagCounts).sort((a, b) => {
    const diff = tagCounts[b] - tagCounts[a];
    return diff !== 0 ? diff : a.localeCompare(b);
  });
}

/**
 * Maps a tag count to a font size string (em units).
 */
export function getFontSize(
  count: number,
  minCount: number,
  maxCount: number
): string {
  if (maxCount === minCount) return "1.5em";
  const minFont = 1;
  const maxFont = 2.5;
  return `${
    minFont + ((count - minCount) / (maxCount - minCount)) * (maxFont - minFont)
  }em`;
}

/**
 * Filters posts by a given tag.
 */
export function filterPostsByTag<T extends { data: { tags?: string[] } }>(
  posts: T[],
  tag: string
): T[] {
  return posts.filter((post) => (post.data.tags || []).includes(tag));
}

/**
 * Counts the occurrences of each category in the given posts.
 */
export function getCategoryCounts(
  posts: { data: { categories?: string[] } }[]
): Record<string, number> {
  return posts
    .map((post) => post.data.categories || [])
    .flat()
    .reduce((acc, category) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
}

/**
 * Returns the categories sorted by count descending.
 */
export function getSortedCategories(
  categoryCounts: Record<string, number>
): string[] {
  // Orden determinista: primero por cantidad desc, luego alfabético asc para empates
  return Object.keys(categoryCounts).sort((a, b) => {
    const diff = categoryCounts[b] - categoryCounts[a];
    return diff !== 0 ? diff : a.localeCompare(b);
  });
}

/**
 * Returns the most recent tags based on post publication date.
 */
export function getRecentTags(
  posts: { data: { tags?: string[]; pubDate?: string } }[],
  limit: number = 10
): string[] {
  // Ordenar posts por fecha descendente
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.data.pubDate || 0).getTime();
    const dateB = new Date(b.data.pubDate || 0).getTime();
    return dateB - dateA;
  });
  // Extraer etiquetas en orden de aparición reciente
  const seen = new Set<string>();
  const recentTags: string[] = [];
  for (const post of sortedPosts) {
    for (const tag of post.data.tags || []) {
      if (!seen.has(tag)) {
        seen.add(tag);
        recentTags.push(tag);
        if (recentTags.length >= limit) return recentTags;
      }
    }
  }
  return recentTags;
}

/**
 * Returns the trending tags (top N by count).
 */
export function getTrendingTags(
  tagCounts: Record<string, number>,
  limit: number = 8
): string[] {
  // Orden determinista: primero por cantidad desc, luego alfabético asc para empates
  return Object.keys(tagCounts)
    .sort((a, b) => {
      const diff = tagCounts[b] - tagCounts[a];
      return diff !== 0 ? diff : a.localeCompare(b);
    })
    .slice(0, limit);
}
