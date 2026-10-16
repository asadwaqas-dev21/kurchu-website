import {
  Caveat,
  Inter,
  Inter_Tight,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Handwriting is only used in the "Idea to product" sketch, far below the fold, so it isn't
// preloaded: the browser fetches it when that text first renders.
const caveat = Caveat({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-caveat",
  display: "swap",
  preload: false,
});

/** Class names that declare every font variable the page stylesheet reads. */
export const fontVariables = [
  inter.variable,
  interTight.variable,
  instrumentSerif.variable,
  jetbrainsMono.variable,
  caveat.variable,
].join(" ");
