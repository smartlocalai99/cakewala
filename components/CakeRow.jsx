import { useRef, useState } from "react";
import CakeCard from "@/components/CakeCard";

const ROW_SIZES = "(min-width: 1024px) 210px, (min-width: 640px) 30vw, 44vw";
const GRID_SIZES = "(min-width: 1024px) 210px, (min-width: 640px) 30vw, 46vw";
// Cakes that fit in the row without scrolling on a laptop (5 across).
const DESKTOP_ROW = 5;

function Chevron({ direction }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none">
      <path
        d={direction < 0 ? "M12.5 4.5 7 10l5.5 5.5" : "M7.5 4.5 13 10l-5.5 5.5"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// One category section: heading, "View all", and a row of cakes that swipes sideways.
// "View all" opens the whole section as a grid right here on the page.
export default function CakeRow({ section, priority = false }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const { id, name, title, cakes } = section;
  const listId = `${id}-cakes`;

  const scrollRow = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    track.scrollBy({ left: direction * track.clientWidth * 0.9, behavior });
  };

  const toggle = () => {
    setExpanded((open) => !open);
    // Closing a long grid shrinks the page; bring the heading back if it went off screen.
    if (expanded) {
      requestAnimationFrame(() => {
        const heading = sectionRef.current;
        if (heading && heading.getBoundingClientRect().top < 0) heading.scrollIntoView({ block: "start" });
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      data-section={name}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-36"
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id={`${id}-title`}
          className="font-display text-[24px] font-semibold leading-tight text-ganache sm:text-[28px]"
        >
          {title}
        </h2>
        <div className="flex shrink-0 items-center gap-2">
          {!expanded && cakes.length > DESKTOP_ROW && (
            <div className="hidden gap-2 lg:flex">
              {[-1, 1].map((direction) => (
                <button
                  key={direction}
                  type="button"
                  onClick={() => scrollRow(direction)}
                  aria-label={`${direction < 0 ? "Previous" : "More"} ${title.toLowerCase()}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ganache/15 text-ganache transition-colors hover:border-ganache/40 hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ganache"
                >
                  <Chevron direction={direction} />
                </button>
              ))}
            </div>
          )}
          {cakes.length > 2 && (
            <button
              type="button"
              onClick={toggle}
              aria-expanded={expanded}
              aria-controls={listId}
              className={`h-9 rounded-full border border-ganache/15 px-4 text-[13.5px] font-semibold text-ganache transition-colors hover:border-ganache/40 hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ganache ${
                cakes.length <= DESKTOP_ROW && !expanded ? "lg:hidden" : ""
              }`}
            >
              {expanded ? "Show less" : "View all"}
            </button>
          )}
        </div>
      </div>

      {expanded ? (
        <ul
          id={listId}
          className="mt-4 grid animate-fade-up grid-cols-2 gap-x-3.5 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-10"
        >
          {cakes.map((cake) => (
            <li key={cake.id}>
              <CakeCard cake={cake} sizes={GRID_SIZES} />
            </li>
          ))}
        </ul>
      ) : (
        <ul
          id={listId}
          ref={trackRef}
          aria-label={title}
          tabIndex={0}
          className="no-scrollbar -mx-4 mt-4 flex snap-x snap-mandatory scroll-px-4 gap-3.5 overflow-x-auto px-4 pb-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ganache sm:-mx-6 sm:scroll-px-6 sm:gap-5 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:gap-6 lg:px-0"
        >
          {cakes.map((cake, index) => (
            <li key={cake.id} className="w-[44%] shrink-0 snap-start sm:w-[29%] lg:w-[calc((100%-96px)/5)]">
              <CakeCard cake={cake} sizes={ROW_SIZES} priority={priority && index < 3} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
