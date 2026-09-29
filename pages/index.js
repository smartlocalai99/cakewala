import { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import CategoryBar from "@/components/CategoryBar";
import CakeMenu from "@/components/CakeMenu";
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

const flavourTitle = (flavour) =>
  flavour === "Cupcakes" || flavour === "Theme cakes" ? flavour : `${flavour} cakes`;

function menuTitle(occasion, flavour) {
  if (!flavour) return occasion === "All" ? "All cakes" : `${occasion} cakes`;
  return occasion === "All" ? flavourTitle(flavour) : `${flavourTitle(flavour)} for ${occasion}`;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeOccasion, setActiveOccasion] = useState("All");
  const [activeFlavour, setActiveFlavour] = useState(null);
  const [egglessOnly, setEgglessOnly] = useState(false);
  const [barStuck, setBarStuck] = useState(false);
  // null until mounted: the page is prerendered, so "today" must come from the visitor's clock.
  const [todaysSpecials, setTodaysSpecials] = useState(null);
  const [scrollRequest, setScrollRequest] = useState(null);

  const sentinelRef = useRef(null);
  const barRef = useRef(null);
  const resultsRef = useRef(null);

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

  const visibleCakes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return cakes.filter((cake) => {
      if (egglessOnly && !cake.eggless) return false;
      if (activeOccasion !== "All" && !cake.occasions.includes(activeOccasion)) return false;
      if (activeFlavour && !cake.flavours.includes(activeFlavour)) return false;
      if (!query) return true;
      return [cake.name, ...cake.flavours, ...cake.occasions].join(" ").toLowerCase().includes(query);
    });
  }, [searchQuery, activeOccasion, activeFlavour, egglessOnly]);

  // Runs after the filtered list has rendered (the carousel may have just hidden).
  // Category picks only scroll back up; carousel buttons always bring the results into view.
  useEffect(() => {
    const results = resultsRef.current;
    const bar = barRef.current;
    if (!scrollRequest || !results || !bar) return;
    const top = results.getBoundingClientRect().top + window.scrollY - bar.offsetHeight - 16;
    if (scrollRequest.always || window.scrollY > top) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
    }
  }, [scrollRequest]);

  const selectAll = () => {
    setActiveOccasion("All");
    setActiveFlavour(null);
    setScrollRequest({ always: false });
  };

  const selectOccasion = (name) => {
    setActiveOccasion((current) => (current === name ? "All" : name));
    setScrollRequest({ always: false });
  };

  const selectFlavour = (name) => {
    setActiveFlavour((current) => (current === name ? null : name));
    setScrollRequest({ always: false });
  };

  const showSpecial = ({ occasion, flavour, eggless }) => {
    if (occasion) setActiveOccasion(occasion);
    if (flavour) setActiveFlavour(flavour);
    if (eggless) setEgglessOnly(true);
    setScrollRequest({ always: true });
  };

  // The carousel belongs to the plain "All cakes" view; once browsing, results come first.
  const browsing = activeOccasion !== "All" || activeFlavour || searchQuery.trim();
  const showSpecials = !browsing && todaysSpecials?.length !== 0;

  const resetFilters = () => {
    setSearchQuery("");
    setActiveOccasion("All");
    setActiveFlavour(null);
    setEgglessOnly(false);
  };

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
            occasions={occasions}
            flavours={flavours}
            activeOccasion={activeOccasion}
            activeFlavour={activeFlavour}
            onSelectAll={selectAll}
            onSelectOccasion={selectOccasion}
            onSelectFlavour={selectFlavour}
          />
        </div>

        <main className="mx-auto max-w-shop px-4 pt-7 pb-16 sm:px-6 sm:pt-9">
          {showSpecials && (
            <div className="mb-10 sm:mb-12">
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
          <div ref={resultsRef}>
            <CakeMenu
              title={menuTitle(activeOccasion, activeFlavour)}
              cakes={visibleCakes}
              egglessOnly={egglessOnly}
              animationKey={`${activeOccasion}-${activeFlavour}-${egglessOnly}`}
              onReset={resetFilters}
            />
          </div>
        </main>
      </div>
    </>
  );
}
