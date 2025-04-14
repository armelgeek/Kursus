import { challengeOptions, challenges } from "@/drizzle/schema";
import { LessonCard } from "@/features/lesson/components/molecules/lesson-card";
import { cn } from "@/shared/lib/utils";

type ChallengeListProps = {
    options: (typeof challengeOptions.$inferSelect)[];
    onSelect: (id: number) => void;
    status: "correct" | "wrong" | "none";
    selectedOption?: number;
    disabled?: boolean;
    type: (typeof challenges.$inferSelect)["type"];
};

export const ChallengeList = ({
    options,
    onSelect,
    status,
    selectedOption,
    disabled,
    type,
}: ChallengeListProps) => {
    return (
        <div
            className={cn(
                "grid gap-4",
                type === "ASSIST" && "grid-cols-1",
                type === "SELECT" && "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            )}
        >
            {options.map((option, i) => (
                <LessonCard
                    key={option.id}
                    id={option.id}
                    text={option.text}
                    imageSrc={option.imageSrc}
                    shortcut={`${i + 1}`}
                    selected={selectedOption === option.id}
                    onClick={() => onSelect(option.id)}
                    status={status}
                    audioSrc={option.audioSrc}
                    disabled={disabled}
                    type={type}
                />
            ))}
        </div>
    );
};
