import Image from "next/image";
import FoodMark from "@/components/FoodMark";

export default function CakeCard({ cake, priority = false }) {
  return (
    <article>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface">
        <Image
          src={cake.image}
          alt={cake.name}
          fill
          sizes="(min-width: 1024px) 260px, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
          priority={priority}
        />
      </div>
      <div className="mt-3 flex items-start gap-2">
        <FoodMark eggless={cake.eggless} className="mt-[3px]" />
        <h3 className="line-clamp-2 font-display text-[17px] font-medium leading-[1.25] text-ganache">
          {cake.name}
        </h3>
      </div>
    </article>
  );
}
