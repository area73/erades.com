// @ts-expect-error TS7016: React 19 types are built-in, ignore missing declaration error
import { useState } from "react";
import { SearchInput } from "./SearchInput";

export default function HeaderSearchBox() {
  const [query, setQuery] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <SearchInput query={query} onQueryChange={setQuery} />
    </form>
  );
}
