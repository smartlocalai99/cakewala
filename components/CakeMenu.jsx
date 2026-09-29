import CakeCard from "@/components/CakeCard";

export default function CakeMenu({ title, cakes, egglessOnly, animationKey, onReset }) {
  const countLabel = `${cakes.length} ${egglessOnly ? "eggless " : ""}${
    cakes.length === 1 ? "cake" : "cakes"
  }`;

  return (
    <section aria-labelledby="menu-title">
      <div className="flex items-baseline justify-between gap-3">
        <h2
          id="menu-title"
          className="font-display text-[26px] font-semibold leading-tight text-ganache sm:text-[30px]"
        >
          {title}
        </h2>
        <p className="shrink-0 text-sm font-medium text-muted" aria-live="polite">
          {cakes.length > 0 && countLabel}
        </p>
      </div>

      {cakes.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <p className="font-display text-xl font-medium text-ganache">No cakes found</p>
          <button
            type="button"
            onClick={onReset}
            className="mt-4 rounded-full bg-ganache px-5 py-2.5 text-sm font-semibold text-white hover:bg-ganache-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ganache"
          >
            Show all cakes
          </button>
        </div>
      ) : (
        <div
          key={animationKey}
          className="mt-5 grid animate-fade-up grid-cols-2 gap-x-3.5 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10"
        >
          {cakes.map((cake, index) => (
            <CakeCard key={cake.id} cake={cake} priority={index < 4} />
          ))}
        </div>
      )}
    </section>
  );
}
