import { useEffect, useRef } from "react";
import Image from "next/image";

function CategoryItem({ section, active, onSelect }) {
  return (
    <li className="shrink-0">
      <a
        href={`#${section.id}`}
        onClick={(event) => {
          event.preventDefault();
          onSelect(section.name);
        }}
        aria-current={active ? "location" : undefined}
        data-category={section.name}
        className="group relative flex min-w-[70px] flex-col items-center gap-2 rounded-xl px-2 pt-3 pb-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ganache lg:px-1.5"
      >
        <span className="relative h-11 w-11 overflow-hidden rounded-full bg-surface">
          <Image src={section.image} alt="" fill sizes="44px" className="object-cover" />
        </span>
        <span
          className={`whitespace-nowrap text-[12.5px] leading-none transition-colors ${
            active ? "font-semibold text-ganache" : "font-medium text-muted group-hover:text-ganache"
          }`}
        >
          {section.name}
        </span>
        <span
          aria-hidden="true"
          className={`absolute inset-x-2 bottom-0 h-[2.5px] rounded-full transition-colors ${
            active ? "bg-ganache" : "bg-transparent group-hover:bg-ganache/15"
          }`}
        />
      </a>
    </li>
  );
}

// Sticky row of every section on the page: occasions, a divider, then flavours. The item
// for the section being read is underlined and kept in view as the page scrolls.
export default function CategoryBar({ occasions, flavours, active, onSelect }) {
  const navRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !active) return;
    const item = nav.querySelector(`[data-category="${CSS.escape(active)}"]`);
    if (!item) return;
    const bar = nav.getBoundingClientRect();
    const box = item.getBoundingClientRect();
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    if (box.left < bar.left + 16) nav.scrollBy({ left: box.left - bar.left - 16, behavior });
    else if (box.right > bar.right - 16) nav.scrollBy({ left: box.right - bar.right + 16, behavior });
  }, [active]);

  return (
    <nav ref={navRef} aria-label="Cake categories" className="no-scrollbar overflow-x-auto">
      <div className="mx-auto flex w-max px-2 sm:px-4">
        <ul aria-label="Occasions" className="flex">
          {occasions.map((section) => (
            <CategoryItem
              key={section.id}
              section={section}
              active={active === section.name}
              onSelect={onSelect}
            />
          ))}
        </ul>
        {occasions.length > 0 && flavours.length > 0 && (
          <span aria-hidden="true" className="mx-2 my-5 w-px shrink-0 bg-ganache/10" />
        )}
        <ul aria-label="Flavours" className="flex">
          {flavours.map((section) => (
            <CategoryItem
              key={section.id}
              section={section}
              active={active === section.name}
              onSelect={onSelect}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}
