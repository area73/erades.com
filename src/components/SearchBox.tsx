// @ts-expect-error TS7016: React 19 types are built-in, ignore missing declaration error
import { useEffect, useState } from "react";
import { Document } from "flexsearch";

type Doc = {
  path: string;
  title: string;
  description: string;
  heroImage?: string;
};

type SearchBoxProps = {
  query: string;
};

export default function SearchBox({ query }: SearchBoxProps) {
  const [results, setResults] = useState<any[]>([]);
  const [index, setIndex] = useState<any>(null);
  const [docs, setDocs] = useState<Doc[]>([]);

  useEffect(() => {
    fetch("/search-index.json")
      .then((res) => res.json())
      .then((data) => {
        setDocs(data);
        const idx = new Document({
          id: "path",
          index: ["title", "description", "tags", "categories", "content"],
          tokenize: "forward",
        });
        data.forEach((doc: Doc) => idx.add(doc));
        setIndex(idx);
      });
  }, []);

  useEffect(() => {
    if (!index || !query) {
      setResults([]);
      return;
    }
    (async () => {
      let found = await index.search(query, { limit: 12 });
      if (Array.isArray(found[0])) {
        found = found.flat();
      }
      setResults(found);
    })();
  }, [query, index]);

  // Extrae todos los paths de los resultados y elimina duplicados
  const uniquePaths = Array.from(
    new Set(results.flatMap((doc: { result: string[] }) => doc.result))
  );

  return (
    <ul className="grid grid-cols-3 gap-8 sm:gap-2 list-none m-0 p-0">
      {uniquePaths.length === 0 && query ? (
        <p>No posts found matching your search.</p>
      ) : (
        uniquePaths.map((path) => {
          const fullDoc = docs.find((d: Doc) => d.path === path);
          if (!fullDoc) return null;
          return (
            <li key={fullDoc.path}>
              <a href={fullDoc.path} className="block group">
                {fullDoc.heroImage && (
                  <img
                    width="100%"
                    src={fullDoc.heroImage}
                    alt=""
                    className="mb-2 rounded-xl group-hover:shadow-lg transition-all"
                  />
                )}
                <h4 className="m-0 text-foreground leading-none group-hover:text-accent">
                  {fullDoc.title}
                </h4>
                <p className="m-0 group-hover:text-accent">
                  {fullDoc.description}
                </p>
              </a>
            </li>
          );
        })
      )}
    </ul>
  );
}
