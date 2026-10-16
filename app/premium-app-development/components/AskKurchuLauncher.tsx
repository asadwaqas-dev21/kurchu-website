"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MessageText1 } from "iconsax-react";

/**
 * The "Ask Kurchu" button, without the assistant's code. The full chat (AskKurchu.tsx) loads on
 * the first sign of intent — hover, focus or touch on the button — and opens on click, or when any
 * page asks for it (`data-ask-kurchu` click or "askkurchu:open"). Same markup as the closed
 * assistant, so nothing changes visually.
 */
const loadAssistant = () => import("./AskKurchu").then((m) => m.AskKurchu);

function Launcher({ onOpen, onIntent }: { onOpen?: () => void; onIntent?: () => void }) {
  return (
    <div className="ak">
      <button
        type="button"
        className="ak-launch"
        aria-haspopup="dialog"
        onClick={onOpen}
        onPointerEnter={onIntent}
        onFocus={onIntent}
        onTouchStart={onIntent}
      >
        <MessageText1 size={18} variant="Linear" color="currentColor" aria-hidden />
        Ask Kurchu
      </button>
    </div>
  );
}

// While the assistant's code downloads, keep showing the same button.
const AskKurchu = dynamic(loadAssistant, { ssr: false, loading: () => <Launcher /> });

export function AskKurchuLauncher() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) return;
    const openFromEvent = () => setOpen(true);
    const openFromClick = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest?.("[data-ask-kurchu]")) {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("askkurchu:open", openFromEvent);
    document.addEventListener("click", openFromClick);
    return () => {
      window.removeEventListener("askkurchu:open", openFromEvent);
      document.removeEventListener("click", openFromClick);
    };
  }, [open]);

  if (open) return <AskKurchu defaultOpen />;
  return <Launcher onOpen={() => setOpen(true)} onIntent={() => void loadAssistant()} />;
}
