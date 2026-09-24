import tulip from "../assets/tulip.png";
import loveNote from "../assets/love-note.png";
import type { ReactNode } from "react";

/** Full-page backdrop: pastel sky scene + swaying tulips at the bottom. */
export function PageBackdrop({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-scene font-sans text-foreground">
      {children}
      <Tulips />
    </div>
  );
}

export function Tulips() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-96 select-none"
    >
      <img
        src={tulip}
        alt=""
        loading="lazy"
        className="animate-sway absolute bottom-0 left-8 h-96 w-auto opacity-90"
        style={{ animationDelay: "0s" }}
      />
      <img
        src={tulip}
        alt=""
        loading="lazy"
        className="animate-sway absolute bottom-0 left-32 h-56 w-auto opacity-75"
        style={{ animationDelay: "0.8s" }}
      />
      <img
        src={tulip}
        alt=""
        loading="lazy"
        className="animate-sway absolute bottom-0 right-10 h-72 w-auto"
        style={{ animationDelay: "0.4s" }}
      />
      <img
        src={tulip}
        alt=""
        loading="lazy"
        className="animate-sway absolute bottom-0 right-44 h-48 w-auto opacity-70"
        style={{ animationDelay: "1.2s" }}
      />
    </div>
  );
}

/** Small drifting envelopes used as page decoration. */
export function FloatingNotes() {
  return (
    <>
      <img
        aria-hidden="true"
        src={loveNote}
        alt=""
        loading="lazy"
        className="animate-float absolute left-1/4 top-24 h-16 w-auto select-none opacity-90"
      />
      <img
        aria-hidden="true"
        src={loveNote}
        alt=""
        loading="lazy"
        className="animate-float absolute right-1/4 top-40 h-12 w-auto select-none opacity-80"
        style={{ animationDelay: "1s" }}
      />
    </>
  );
}