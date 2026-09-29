import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const smoothBehavior = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

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
        className="group relative flex min-w-[84px] flex-col items-center gap-2 rounded-xl px-2.5 pt-3 pb-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ganache lg:min-w-[88px] lg:px-2"
      >
        <span className="relative h-16 w-16 overflow-hidden rounded-full bg-surface lg:h-[72px] lg:w-[72px]">
          <Image src={section.image} alt="" fill sizes="72px" className="object-cover" />
        </span>
        <span
          className={`whitespace-nowrap text-[13.5px] leading-none transition-colors lg:text-sm ${
            active ? "font-semibold text-ganache" : "font-medium text-muted group-hover:text-ganache"
          }`}
        >
          {section.name}
        </span>
        <span
          aria-hidden="true"
          className={`absolute inset-x-2.5 bottom-0 h-[3px] rounded-full transition-colors ${
            active ? "bg-ganache" : "bg-transparent group-hover:bg-ganache/15"
          }`}
        />
      </a>
    </li>
  );
}

function ScrollButton({ direction, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction < 0 ? "Scroll categories left" : "Scroll categories right"}
      className={`group absolute inset-y-0 hidden w-20 items-center md:flex ${
        direction < 0
          ? "left-0 justify-start bg-gradient-to-r from-white via-white/90 to-white/0 pl-3"
          : "right-0 justify-end bg-gradient-to-l from-white via-white/90 to-white/0 pr-3"
      } focus-visible:outline-none`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ganache/15 bg-white text-ganache shadow-sm transition-colors hover:border-ganache/40 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-ganache">
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none">
          <path
            d={direction < 0 ? "M12.5 4.5 7 10l5.5 5.5" : "M7.5 4.5 13 10l-5.5 5.5"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}

// Sticky row of every section on the page: occasions, a divider, then flavours. The item
// for the section being read is underlined and kept in view as the page scrolls. When the
// row is wider than the screen, laptops get arrow buttons; phones swipe.
export default function CategoryBar({ occasions, flavours, active, onSelect }) {
  const navRef = useRef(null);
  const [overflow, setOverflow] = useState({ left: false, right: false });

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return undefined;
    const update = () =>
      setOverflow({
        left: nav.scrollLeft > 4,
        right: nav.scrollLeft + nav.clientWidth < nav.scrollWidth - 4,
      });
    update();
    nav.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(nav);
    return () => {
      nav.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [occasions.length, flavours.length]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !active) return;
    const item = nav.querySelector(`[data-category="${CSS.escape(active)}"]`);
    if (!item) return;
    const bar = nav.getBoundingClientRect();
    const box = item.getBoundingClientRect();
    // Keep clear of the arrow buttons on laptops.
    const margin = window.matchMedia("(min-width: 768px)").matches ? 72 : 16;
    if (box.left < bar.left + margin) nav.scrollBy({ left: box.left - bar.left - margin, behavior: smoothBehavior() });
    else if (box.right > bar.right - margin)
      nav.scrollBy({ left: box.right - bar.right + margin, behavior: smoothBehavior() });
  }, [active]);

  const scrollBar = (direction) => {
    const nav = navRef.current;
    if (nav) nav.scrollBy({ left: direction * nav.clientWidth * 0.6, behavior: smoothBehavior() });
  };

  return (
    <div className="relative">
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
            <span aria-hidden="true" className="mx-2 my-6 w-px shrink-0 bg-ganache/10" />
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
      {overflow.left && <ScrollButton direction={-1} onClick={() => scrollBar(-1)} />}
      {overflow.right && <ScrollButton direction={1} onClick={() => scrollBar(1)} />}
    </div>
  );
}
