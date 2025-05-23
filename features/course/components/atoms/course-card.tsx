import { cn } from "@/shared/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";


type CourseCardProps = {
  title: string;
  id: number;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  isActive?: boolean;
};

export const CourseCard = ({
  title,
  id,
  imageSrc,
  onClick,
  disabled,
  isActive,
}: CourseCardProps) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "flex h-full min-h-[217px] min-w-[200px] cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-b-[4px] p-3 pb-6 hover:bg-black/5 active:border-b-2",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      <div className="flex min-h-[24px] w-full items-center justify-end">
        {isActive && (
          <div className="flex items-center justify-center rounded-md bg-green-600 p-1.5">
            <Check className="h-4 w-4 stroke-[4] text-white" />
          </div>
        )}
      </div>

      <img
        src={imageSrc}
        alt={title}
        height={70}
        width={93.33}
        className="rounded-lg border object-cover drop-shadow-md"
      />

      <p className="mt-3 text-center font-bold text-neutral-700">{title}</p>
    </div>
  );
};
