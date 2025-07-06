// @ts-expect-error TS7016: React 19 types are built-in, ignore missing declaration error
import { useEffect, useState } from "react";
import { Document } from "flexsearch";

type Doc = {
  path: string;
  title: string;
  description: string;
  heroImage?: string;
};

export default function SearchBox() {
  const [results, setResults] = useState<Doc[]>([]);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<any>(null);
  const [docs, setDocs] = useState<Doc[]>([]);

  useEffect(() => {
    fetch("/search-index.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("[SearchBox] Loaded docs:", data);
        setDocs(data);
        const idx = new Document({
          id: "path",
          index: ["title", "description", "tags", "categories", "content"],
          tokenize: "forward",
        });
        data.forEach((doc: Doc) => idx.add(doc));
        setIndex(idx);
        console.log("[SearchBox] Index created and data added");
      });
  }, []);

  useEffect(() => {
    if (!index || !query) {
      setResults([]);
      return;
    }
    (async () => {
      let found = await index.search(query, { limit: 12 });
      console.log("[SearchBox] Raw search result:", found);
      if (Array.isArray(found[0])) {
        found = found.flat();
      }
      const unique = Array.from(
        new Map(found.map((doc: Doc) => [doc.path, doc])).values()
      );
      console.log("[SearchBox] Unique search result:", unique);
      setResults(unique);
    })();
  }, [query, index]);
  return (
    <div>
      <input
        type="text"
        placeholder="Type to search..."
        className="border rounded px-2 py-1 w-full max-w-md mb-6"
        autoFocus
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
      />
      <ul className="grid grid-cols-3 gap-8 sm:gap-2 list-none m-0 p-0">
        {results.length === 0 && query ? (
          <p>No posts found matching your search.</p>
        ) : (
          <>
            {console.log("[SearchBox] Results to render:", results)}
            {results.flatMap((doc: { result: string[] }) =>
              doc.result.map((path) => {
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
                      <h4 className="m-0 text-black leading-none group-hover:text-accent">
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
          </>
        )}
      </ul>
    </div>
  );
}
