import { Fraunces, Figtree } from "next/font/google";
import "@/styles/globals.css";

// Fraunces with its soft axis turned up echoes the rounded, retro logo.
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${fraunces.variable} ${figtree.variable} font-body`}>
      <Component {...pageProps} />
    </div>
  );
}
