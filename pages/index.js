import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import CategoryBar from "@/components/CategoryBar";
import CakeRow from "@/components/CakeRow";
import SearchResults from "@/components/SearchResults";
import SpecialsCarousel, { bannerAspect } from "@/components/SpecialsCarousel";
import { cakes, occasions, flavours } from "@/data/cakes";
import { specials } from "@/data/specials";
import { shopToday, isShowingToday } from "@/lib/specials";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: "Cakewala",
  description:
    "Cakewala's freshly baked cakes for birthdays, anniversaries, weddings and every celebration.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kadapa",
    addressRegion: "Andhra Pradesh",
    addressCountry: "IN",
  },
  openingHours: "Mo-Su 10:00-21:00",
};

const slug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const flavourTitle = (flavour) =>
  flavour === "Cupcakes" || flavour === "Theme cakes" ? flavour : `${flavour} cakes`;

// Every occasion and flavour is a section on the one page; a cake appears in each
// section it belongs to. Sections left empty (e.g. by the eggless switch) are dropped.
function buildSections(group, key, pool, titleFor) {
  return group
    .map(({ name, image }) => ({
      name,
      image,
      id: slug(name),
      title: titleFor(name),
      cakes: pool.filter((cake) => cake[key].includes(name)),
    }))
    .filter((section) => section.cakes.length > 0);
}

const smoothBehavior = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [egglessOnly, setEgglessOnly] = useState(false);
  const [barStuck, setBarStuck] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  // null until mounted: the page is prerendered, so "today" must come from the visitor's clock.
  const [todaysSpecials, setTodaysSpecials] = useState(null);
  const [scrollTarget, setScrollTarget] = useState(null);

  const sentinelRef = useRef(null);
  const barRef = useRef(null);
  // While a tap-to-section glide is running, keep the tapped item highlighted.
  const spyPaused = useRef(false);

  const pool = useMemo(() => (egglessOnly ? cakes.filter((cake) => cake.eggless) : cakes), [egglessOnly]);
  const occasionSections = useMemo(
    () => buildSections(occasions, "occasions", pool, (name) => `${name} cakes`),
    [pool],
  );
  const flavourSections = useMemo(
    () => buildSections(flavours, "flavours", pool, flavourTitle),
    [pool],
  );

  const query = searchQuery.trim().toLowerCase();
  const searchResults = useMemo(() => {
    if (!query) return null;
    return pool.filter((cake) =>
      [cake.name, ...cake.flavours, ...cake.occasions].join(" ").toLowerCase().includes(query),
    );
  }, [query, pool]);

  // The sentinel sits right above the category bar; once it scrolls away the bar is stuck.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return undefined;
    const observer = new IntersectionObserver(([entry]) => setBarStuck(!entry.isIntersecting));
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const today = shopToday();
    setTodaysSpecials(specials.filter((special) => isShowingToday(special, today)));
  }, []);

  // Scroll-spy: the active section is the last one whose heading has reached the upper
  // third of the space below the bar, i.e. the section being read.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const bar = barRef.current;
      if (spyPaused.current || !bar) return;
      const barBottom = bar.getBoundingClientRect().bottom;
      const line = barBottom + (window.innerHeight - barBottom) * 0.3;
      const sections = [...document.querySelectorAll("[data-section]")];
      let current = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top > line) break;
        current = section.dataset.section;
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && sections.length) current = sections[sections.length - 1].dataset.section;
      setActiveSection(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resume = () => {
      spyPaused.current = false;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", resume, { passive: true });
    window.addEventListener("touchstart", resume, { passive: true });
    window.addEventListener("keydown", resume);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", resume);
      window.removeEventListener("touchstart", resume);
      window.removeEventListener("keydown", resume);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Glide to a section after the render that shows it (search may have just been cleared).
  useEffect(() => {
    const bar = barRef.current;
    if (!scrollTarget || !bar) return;
    const section = document.querySelector(
      scrollTarget.name ? `[data-section="${CSS.escape(scrollTarget.name)}"]` : "[data-section]",
    );
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY - bar.offsetHeight - 12;
    spyPaused.current = true;
    setActiveSection(section.dataset.section);
    window.scrollTo({ top, behavior: smoothBehavior() });
  }, [scrollTarget]);

  const goToSection = (name) => {
    setSearchQuery("");
    setScrollTarget({ name });
  };

  const showSpecial = ({ occasion, flavour, eggless }) => {
    if (eggless) setEgglessOnly(true);
    setSearchQuery("");
    setScrollTarget({ name: occasion || flavour || null });
  };

  const sections = [...occasionSections, ...flavourSections];

  return (
    <>
      <Head>
        <title>Cakewala | Cakes for Every Celebration</title>
        <meta
          name="description"
          content="Browse Cakewala's freshly baked cakes for birthdays, anniversaries, weddings, kids' parties and more, with eggless options."
        />
        <meta property="og:title" content="Cakewala | Cakes for Every Celebration" />
        <meta
          property="og:description"
          content="Browse Cakewala's freshly baked cakes for birthdays, anniversaries, weddings, kids' parties and more, with eggless options."
        />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#FFFFFF" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-white">
        <Header
          egglessOnly={egglessOnly}
          onToggleEggless={setEgglessOnly}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div ref={sentinelRef} aria-hidden="true" className="h-px" />
        <div
          ref={barRef}
          className={`sticky top-0 z-30 border-b bg-white transition-shadow duration-200 ${
            barStuck
              ? "border-ganache/10 shadow-[0_8px_24px_-16px_rgba(59,29,22,0.45)]"
              : "border-ganache/[0.07]"
          }`}
        >
          <CategoryBar
            occasions={occasionSections}
            flavours={flavourSections}
            active={searchResults ? null : activeSection}
            onSelect={goToSection}
          />
        </div>

        <main className="mx-auto max-w-shop px-4 pt-7 pb-20 sm:px-6 sm:pt-9">
          {searchResults ? (
            <SearchResults
              query={searchQuery.trim()}
              cakes={searchResults}
              egglessOnly={egglessOnly}
              onClear={() => setSearchQuery("")}
            />
          ) : (
            <>
              {todaysSpecials?.length !== 0 && (
                <div className="mb-12 sm:mb-14">
                  {todaysSpecials ? (
                    <SpecialsCarousel slides={todaysSpecials} onSelect={showSpecial} />
                  ) : (
                    <div aria-hidden="true">
                      <div className={`rounded-3xl bg-surface ${bannerAspect}`} />
                      <div className="mt-3 h-6" />
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-11 sm:space-y-14">
                {sections.map((section, index) => (
                  <Fragment key={section.id}>
                    {index === occasionSections.length && index > 0 && (
                      <hr className="border-ganache/10" />
                    )}
                    <CakeRow section={section} priority={index === 0} />
                  </Fragment>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}
