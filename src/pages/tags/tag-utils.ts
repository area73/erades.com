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
  return Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);
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
