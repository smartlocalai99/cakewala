import Image from "next/image";
import { shopConfig } from "@/data/config";
import logo from "@/public/cakewala-logo.png";
import EgglessToggle from "@/components/EgglessToggle";
import SearchBar from "@/components/SearchBar";

export default function Header({ egglessOnly, onToggleEggless, searchQuery, onSearchChange }) {
  return (
    <header className="bg-white">
      {/* Mobile: logo + toggle, search on its own row. sm+: one row. */}
      <div className="mx-auto flex max-w-shop flex-wrap items-center gap-x-3 gap-y-4 px-4 pt-4 pb-3 sm:flex-nowrap sm:gap-x-8 sm:px-6 sm:py-5">
        <h1 className="order-1 shrink-0">
          <Image
            src={logo}
            alt={shopConfig.name}
            priority
            sizes="140px"
            className="h-14 w-auto sm:h-16"
          />
        </h1>
        <div className="order-3 w-full sm:order-2 sm:max-w-lg sm:flex-1">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>
        <div className="order-2 ml-auto sm:order-3">
          <EgglessToggle checked={egglessOnly} onChange={onToggleEggless} />
        </div>
      </div>
    </header>
  );
}
