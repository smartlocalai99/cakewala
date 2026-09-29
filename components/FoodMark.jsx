// FSSAI food marks: green square with a filled circle for eggless (veg), brown square
// with a filled triangle for cakes that contain egg (non-veg).
export default function FoodMark({ eggless, solid = false, className = "" }) {
  return (
    <span
      role="img"
      aria-label={eggless ? "Eggless" : "Contains egg"}
      className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border-[1.5px] ${
        eggless ? "border-veg text-veg" : "border-nonveg text-nonveg"
      } ${solid ? "bg-white" : ""} ${className}`}
    >
      {eggless ? (
        <span className="h-2 w-2 rounded-full bg-current" />
      ) : (
        <svg viewBox="0 0 8 7" className="h-2 w-2" aria-hidden="true">
          <path d="M4 0 8 7H0z" fill="currentColor" />
        </svg>
      )}
    </span>
  );
}
