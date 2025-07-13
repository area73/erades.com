/**
 * Utility functions for sorting blog posts and similar content.
 * Supports sorting by date (asc/desc), title, and can be extended.
 */

export type SortBy = "date-asc" | "date-desc" | "title";

export interface SortablePost {
  pubDate?: string | Date;
  data?: {
    pubDate?: string | Date;
    title?: string;
  };
  title?: string;
}

export const SORT_BY_OPTIONS = ["date-asc", "date-desc", "title"] as const;

/**
 * Sorts an array of posts by the given sortBy criteria.
 * @param posts Array of posts to sort
 * @param sortBy Sorting criteria
 * @returns Sorted array
 */
export function sortPosts<T extends SortablePost>(
  posts: T[],
  sortBy: SortBy
): T[] {
  const getDate = (post: T): number => {
    const date = post.pubDate || post.data?.pubDate;
    return date ? new Date(date).valueOf() : 0;
  };
  const getTitle = (post: T): string => post.title || post.data?.title || "";

  switch (sortBy) {
    case "date-asc":
      return [...posts].sort((a, b) => getDate(a) - getDate(b));
    case "date-desc":
      return [...posts].sort((a, b) => getDate(b) - getDate(a));
    case "title":
      return [...posts].sort((a, b) => getTitle(a).localeCompare(getTitle(b)));
    default:
      return posts;
  }
}
