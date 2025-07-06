import React from "react";

type SearchInputProps = {
  query: string;
  onQueryChange: (q: string) => void;
};

export function SearchInput({ query, onQueryChange }: SearchInputProps) {
  return (
    <div className="relative flex items-center max-w-md w-full mx-8">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
        {/* Lupa SVG accesible */}
        <svg
          className="h-4 w-4 text-muted-foreground"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <title>Buscar</title>
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
          <line
            x1="21"
            y1="21"
            x2="16.65"
            y2="16.65"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <input
        type="text"
        placeholder="Buscar en el blog..."
        className="pl-10 pr-4 h-11 w-full rounded-md border bg-background/80 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-200"
        autoFocus
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onQueryChange(e.target.value)
        }
        aria-label="Buscar en el blog"
      />
    </div>
  );
}
