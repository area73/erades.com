type SearchInputProps = {
  query: string;
  onQueryChange: (q: string) => void;
};

export function SearchInput({ query, onQueryChange }: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder="Type to search..."
      className="border rounded px-2 py-1 w-full max-w-md mb-6"
      autoFocus
      value={query}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onQueryChange(e.target.value)
      }
    />
  );
}
