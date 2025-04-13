"use client";

import { Check, Crown, Star } from "lucide-react";
import Link from "next/link";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { Button } from "@/components/ui/button";
import "react-circular-progressbar/dist/styles.css";
import { cn } from "@/shared/lib/utils";

type LessonButtonProps = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
  title: string
};

export const LessonButton = ({
  id,
  index,
  totalCount,
  title,
  locked = false,
  current = false,
  percentage = 0,
}: LessonButtonProps) => {
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;
  
  const indentationLevel = 
    cycleIndex <= 2 ? cycleIndex :
    cycleIndex <= 6 ? 4 - cycleIndex :
    cycleIndex - 8;
  
  const rightPosition = indentationLevel * 40;

  const isFirst = index === 0;
  const isLast = index === totalCount - 1; 
  const isCompleted = !current && !locked;

  const Icon = isCompleted ? Check : isLast ? Crown : Star;

  const href = isCompleted ? `/lesson/${id}` : "/lesson";
  
  return (
    <Link
      href={href}
      aria-disabled={locked}
      style={{ pointerEvents: locked ? "none" : "auto" }}
      className="block w-full"
    >
      <div 
        className={cn(
          "group relative flex items-center gap-6 rounded-xl p-4 transition-all duration-300 ease-in-out",
          "hover:bg-accent/10",
          "before:absolute before:left-0 before:top-1/2 before:h-[2px] before:w-full before:bg-accent/20 before:-translate-y-1/2 before:transform",
          locked ? "opacity-50" : "hover:scale-[1.02]"
        )}
      >
        <div
          className="relative z-10"
          style={{
            right: `${rightPosition}px`,
            marginTop: isFirst && !isCompleted ? 60 : 24,
          }}
        >
          {current ? (
            <div className="relative h-[76px] w-[76px]">
              <div className={cn(
                "absolute -top-6 left-1/2 z-10 -translate-x-1/2",
                "rounded-xl border-2 border-green-500 bg-background px-3 py-2.5",
                "font-bold uppercase tracking-wide text-green-500",
                "animate-bounce shadow-lg"
              )}>
                Start
                <div
                  className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 transform border-x-8 border-t-8 border-x-transparent border-t-green-500"
                  aria-hidden
                />
              </div>
              <CircularProgressbarWithChildren
                value={Number.isNaN(percentage) ? 0 : percentage}
                styles={{
                  path: {
                    stroke: "#4ade80",
                    strokeLinecap: "round",
                    transition: "all 0.5s ease 0s",
                  },
                  trail: {
                    stroke: "#e5e7eb",
                  },
                }}
              >
                <Button
                  variant={locked ? "outline" : "secondary"}
                  className={cn(
                    "h-[70px] w-[70px]",
                    "border-b-8 shadow-lg transition-all duration-300",
                    "group-hover:shadow-xl group-hover:translate-y-[-2px]"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-10 w-10 transition-transform duration-300",
                      "group-hover:scale-110 group-hover:rotate-12",
                      locked
                        ? "fill-neutral-400 stroke-neutral-400 text-neutral-400"
                        : "fill-primary-foreground text-primary-foreground",
                      isCompleted && "fill-none stroke-[4]"
                    )}
                  />
                </Button>
              </CircularProgressbarWithChildren>
            </div>
          ) : (
            <Button
              variant={locked ? "destructive" : "secondary"}
              className={cn(
                "h-[70px] w-[70px]",
                "border-b-8 shadow-lg transition-all duration-300",
                "group-hover:shadow-xl group-hover:translate-y-[-2px]"
              )}
            >
              <Icon
                className={cn(
                  "h-10 w-10 transition-transform duration-300",
                  "group-hover:scale-110 group-hover:rotate-12",
                  locked
                    ? "fill-neutral-400 stroke-neutral-400 text-neutral-400"
                    : "fill-primary-foreground text-primary-foreground",
                  isCompleted && "fill-none stroke-[4]"
                )}
              />
            </Button>
          )}
        </div>
        
        <div className={cn(
          "relative z-10 flex flex-col bg-background px-4",
          "transition-all duration-300",
          locked ? "text-neutral-400" : "text-foreground",
          "group-hover:text-primary"
        )}>
          <span className={cn(
            "text-sm font-semibold",
            "bg-background px-2 py-1 rounded-md",
            "transition-colors duration-300",
            "group-hover:bg-primary group-hover:text-primary-foreground"
          )}>
            Leçon {index + 1}
          </span>
          <h3 className="mt-2 text-lg font-medium">
            {title}
          </h3>
          <span className={cn(
            "text-xs",
            "mt-1 inline-flex items-center gap-2 rounded-full px-3 py-1",
            locked ? "bg-destructive/10 text-destructive" : 
            current ? "bg-green-500/10 text-green-500" :
            isCompleted ? "bg-primary/10 text-primary" :
            "bg-accent/10 text-accent-foreground"
          )}>
            {locked ? "🔒 Verrouillé" : 
             current ? `🎯 ${percentage}% complété` : 
             isCompleted ? "✅ Terminé" : 
             "🚀 À commencer"}
          </span>
        </div>
      </div>
    </Link>
  );
};