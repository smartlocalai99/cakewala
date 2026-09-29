import FoodMark from "@/components/FoodMark";

export default function EgglessToggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex shrink-0 items-center gap-2 rounded-full bg-surface py-1.5 pl-3 pr-1.5 text-[15px] font-semibold text-ganache transition-colors hover:bg-[#ECE8E6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ganache"
    >
      <span aria-hidden="true" className="flex">
        <FoodMark eggless />
      </span>
      Eggless
      <span
        className={`relative ml-0.5 h-6 w-10 rounded-full transition-colors duration-200 ${
          checked ? "bg-veg" : "bg-[#CFC8C5]"
        }`}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ease-out ${
            checked ? "translate-x-4" : ""
          }`}
        />
      </span>
    </button>
  );
}
