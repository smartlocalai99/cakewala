import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const AUTOPLAY_MS = 5000;

// Banner size, shared with the loading placeholder in pages/index.js.
export const bannerAspect = "aspect-[16/10] min-h-[228px] sm:aspect-[16/7] lg:aspect-[16/5.5]";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Chevron({ direction }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none">
      <path
        d={direction === "left" ? "M12.5 4.5 7 10l5.5 5.5" : "M7.5 4.5 13 10l-5.5 5.5"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SpecialsCarousel({ slides, onSelect }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [interacting, setInteracting] = useState(false);
  const count = slides.length;

  useEffect(() => {
    if (prefersReducedMotion()) setPlaying(false);
  }, []);

  const goTo = useCallback(
    (index) => {
      const track = trackRef.current;
      if (!track) return;
      const target = (index + count) % count;
      track.scrollTo({
        left: target * track.clientWidth,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    },
    [count],
  );

  // Advance every few seconds, but hold while the visitor hovers, focuses or swipes.
  useEffect(() => {
    if (!playing || interacting || count < 2) return undefined;
    const timer = setTimeout(() => goTo(active + 1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [active, playing, interacting, count, goTo]);

  // Swipes and programmatic scrolls both land here, so the dots always match.
  const handleScroll = () => {
    const track = trackRef.current;
    if (track) setActive(Math.round(track.scrollLeft / track.clientWidth));
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-labelledby="specials-title"
      className="relative"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false);
      }}
      onTouchStart={() => setInteracting(true)}
      onTouchEnd={() => setInteracting(false)}
    >
      <h2 id="specials-title" className="sr-only">
        Offers and today's specials
      </h2>

      <div className="relative">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          aria-live={playing ? "off" : "polite"}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-3xl bg-ganache"
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
              inert={index !== active}
              className={`relative w-full shrink-0 snap-start ${bannerAspect}`}
            >
              <Image
                src={slide.image}
                alt=""
                fill
                priority={index === 0}
                sizes="(min-width: 1168px) 1120px, 100vw"
                className="object-cover"
                style={slide.imagePosition ? { objectPosition: slide.imagePosition } : undefined}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2B140F]/90 via-[#2B140F]/55 to-[#2B140F]/0 sm:via-[#2B140F]/45" />
              <div className="relative flex h-full max-w-[36rem] flex-col justify-center px-5 py-6 sm:px-10 lg:px-14">
                <p className="text-[13px] font-semibold text-white/80 sm:text-sm">{slide.label}</p>
                <h3 className="mt-1.5 font-display text-[28px] font-semibold leading-[1.05] text-white sm:text-[40px] lg:text-[52px]">
                  {slide.title}
                </h3>
                <p className="mt-2 max-w-[18rem] text-sm leading-snug text-white/85 sm:max-w-none sm:text-base">
                  {slide.text}
                </p>
                {slide.show && (
                  <button
                    type="button"
                    onClick={() => onSelect(slide.show)}
                    className="mt-4 self-start rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ganache transition-colors hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:mt-6"
                  >
                    {slide.button}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {count > 1 && (
          <div className="absolute bottom-5 right-5 hidden gap-2 lg:flex">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ganache shadow-md transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ganache shadow-md transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <Chevron direction="right" />
            </button>
          </div>
        )}
      </div>

      {count > 1 && (
        <div className="mt-3 flex h-6 items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? "Pause slides" : "Play slides"}
            className="flex h-6 w-6 items-center justify-center rounded-full text-muted hover:text-ganache focus-visible:outline focus-visible:outline-2 focus-visible:outline-ganache"
          >
            {playing ? (
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
                <rect x="3.5" y="2.5" width="3" height="11" rx="1" />
                <rect x="9.5" y="2.5" width="3" height="11" rx="1" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
                <path d="M4.5 2.8v10.4a.8.8 0 0 0 1.2.7l8.4-5.2a.8.8 0 0 0 0-1.4L5.7 2.1a.8.8 0 0 0-1.2.7Z" />
              </svg>
            )}
          </button>
          <div className="flex items-center gap-1.5">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show slide ${index + 1}: ${slide.title}`}
                aria-current={index === active}
                className="flex h-6 items-center justify-center px-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ganache"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    index === active ? "w-6 bg-ganache" : "w-1.5 bg-ganache/25"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
