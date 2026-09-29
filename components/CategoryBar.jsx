import { useEffect, useRef } from "react";
import Image from "next/image";

function CakeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="h-6 w-6 text-brand">
      <path d="M16 4.5c1.2 1.3 1.2 2.7 0 3.8-1.2-1.1-1.2-2.5 0-3.8Z" fill="currentColor" />
      <path d="M16 9v3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="9" y="12.5" width="14" height="6" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="5.5" y="18.5" width="21" height="8" rx="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function CategoryItem({ label, image, active, onClick }) {
  return (
    <li className="shrink-0">
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        data-category={label}
        className="group relative flex min-w-[70px] flex-col items-center gap-2 rounded-xl px-2 pt-3 pb-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ganache lg:px-1.5"
      >
        <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-ganache">
          {image ? (
            <Image src={image} alt="" fill sizes="44px" className="object-cover" />
          ) : (
            <CakeIcon />
          )}
        </span>
        <span
          className={`whitespace-nowrap text-[12.5px] leading-none transition-colors ${
            active ? "font-semibold text-ganache" : "font-medium text-muted group-hover:text-ganache"
          }`}
        >
          {label}
        </span>
        <span
          aria-hidden="true"
          className={`absolute inset-x-2 bottom-0 h-[2.5px] rounded-full transition-colors ${
            active ? "bg-ganache" : "bg-transparent group-hover:bg-ganache/15"
          }`}
        />
      </button>
    </li>
  );
}

// One scrolling row: occasions, a divider, then flavours. It sticks to the top of the
// screen (see pages/index.js) so every category stays reachable while scrolling.
export default function CategoryBar({
  occasions,
  flavours,
  activeOccasion,
  activeFlavour,
  onSelectAll,
  onSelectOccasion,
  onSelectFlavour,
}) {
  const navRef = useRef(null);
  const previous = useRef({ occasion: activeOccasion, flavour: activeFlavour });

  // Filters can also change from the specials carousel, so scroll the bar sideways
  // until whichever item just changed is fully visible.
  useEffect(() => {
    const nav = navRef.current;
    const flavourChanged = activeFlavour !== previous.current.flavour;
    const occasionChanged = activeOccasion !== previous.current.occasion;
    previous.current = { occasion: activeOccasion, flavour: activeFlavour };
    if (!nav || (!flavourChanged && !occasionChanged)) return;

    let label = activeOccasion === "All" ? "All cakes" : activeOccasion;
    if (flavourChanged && activeFlavour) label = activeFlavour;
    const item = nav.querySelector(`[data-category="${CSS.escape(label)}"]`);
    if (!item) return;

    const bar = nav.getBoundingClientRect();
    const box = item.getBoundingClientRect();
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    if (box.left < bar.left + 16) nav.scrollBy({ left: box.left - bar.left - 16, behavior });
    else if (box.right > bar.right - 16) nav.scrollBy({ left: box.right - bar.right + 16, behavior });
  }, [activeOccasion, activeFlavour]);

  return (
    <nav ref={navRef} aria-label="Cake categories" className="no-scrollbar overflow-x-auto">
      <div className="mx-auto flex w-max px-2 sm:px-4">
        <ul aria-label="Occasions" className="flex">
          <CategoryItem
            label="All cakes"
            active={activeOccasion === "All" && !activeFlavour}
            onClick={onSelectAll}
          />
          {occasions.map((occasion) => (
            <CategoryItem
              key={occasion.name}
              label={occasion.name}
              image={occasion.image}
              active={activeOccasion === occasion.name}
              onClick={() => onSelectOccasion(occasion.name)}
            />
          ))}
        </ul>
        <span aria-hidden="true" className="mx-2 my-5 w-px shrink-0 bg-ganache/10" />
        <ul aria-label="Flavours" className="flex">
          {flavours.map((flavour) => (
            <CategoryItem
              key={flavour.name}
              label={flavour.name}
              image={flavour.image}
              active={activeFlavour === flavour.name}
              onClick={() => onSelectFlavour(flavour.name)}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}
