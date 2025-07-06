// @ts-expect-error TS7016: React 19 types are built-in, ignore missing declaration error
import { useEffect, useState } from "react";
import SearchBox from "./SearchBox";

export default function SearchPageWrapper() {
  const [query, setQuery] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") || "");
  }, []);
  return <SearchBox query={query} />;
}
