export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <label htmlFor="cake-search" className="sr-only">
        Search cakes
      </label>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="none"
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
      >
        <circle cx="9" cy="9" r="6.25" stroke="currentColor" strokeWidth="1.8" />
        <path d="m13.75 13.75 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <input
        id="cake-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search cakes"
        autoComplete="off"
        enterKeyHint="search"
        className="h-12 w-full rounded-full border border-transparent bg-surface pl-12 pr-12 text-base text-ganache transition-colors placeholder:text-muted focus:border-ganache focus:bg-white focus:outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-ganache/[0.07] text-ganache hover:bg-ganache/[0.12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ganache"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5">
            <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
