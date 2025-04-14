import { useCallback, useRef, useEffect } from "react";

import Image from "next/image";
import { useAudio, useKey } from "react-use";
import { challenges } from "@/drizzle/schema";
import { cn } from "@/shared/lib/utils";

type LessonCardProps = {
  id: number;
  text: string;
  imageSrc: string | null;
  audioSrc: string | null;
  shortcut: string;
  selected?: boolean;
  onClick: () => void;
  status?: "correct" | "wrong" | "none";
  disabled?: boolean;
  type: (typeof challenges.$inferSelect)["type"];
};

export const LessonCard = ({
  text,
  imageSrc,
  audioSrc,
  shortcut,
  selected,
  onClick,
  status,
  disabled,
  type,
}: LessonCardProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [audio, _, controls] = useAudio({ src: audioSrc || "" });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    if (disabled) return;

    void controls.play();
    onClick();
  }, [disabled, onClick, controls]);

  useKey(shortcut, handleClick, {}, [handleClick]);
  
  // Scroll into view when selected with status
  useEffect(() => {
    if (selected && status && cardRef.current) {
      cardRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      });
    }
  }, [selected, status]);

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className={cn(
        "h-full cursor-pointer rounded-xl border-2 border-b-4 p-4 transition-all duration-200 hover:bg-black/5 active:border-b-2 active:translate-y-0.5 lg:p-6",
        selected && "border-sky-300 bg-sky-100 hover:bg-sky-100 shadow-md",
        selected &&
          status === "correct" &&
          "border-green-300 bg-green-100 hover:bg-green-100 shadow-md shadow-green-200",
        selected &&
          status === "wrong" &&
          "border-rose-300 bg-rose-100 hover:bg-rose-100 shadow-md shadow-rose-200",
        disabled && "pointer-events-none opacity-70 hover:bg-white",
        type === "ASSIST" && "w-full lg:p-3"
      )}
      aria-selected={selected}
      role="option"
    >
        
      {audio}
      {imageSrc && (
        <div className="relative mb-4 aspect-square max-h-[80px] w-full overflow-hidden rounded-lg lg:max-h-[150px]">
          <img 
            src={imageSrc} 
            alt={text} 
            className="object-contain"
          />
        </div>
      )}

      <div
        className={cn(
          "flex items-center justify-between",
          type === "ASSIST" && "flex-row-reverse"
        )}
      >
        {type === "ASSIST" && <div aria-hidden />}
        <p
          className={cn(
            "text-sm font-medium text-neutral-700 transition-colors lg:text-base",
            selected && "text-sky-600 font-semibold",
            selected && status === "correct" && "text-green-600 font-semibold",
            selected && status === "wrong" && "text-rose-600 font-semibold"
          )}
        >
          {text}
        </p>

        <div
          className={cn(
            "flex h-[20px] w-[20px] items-center justify-center rounded-lg border-2 text-xs font-semibold text-neutral-500 transition-colors lg:h-[30px] lg:w-[30px] lg:text-[15px]",
            selected && "border-sky-400 text-sky-600 bg-sky-50",
            selected &&
              status === "correct" &&
              "border-green-500 text-green-600 bg-green-50",
            selected &&
              status === "wrong" &&
              "border-rose-500 text-rose-600 bg-rose-50"
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>
  );
};