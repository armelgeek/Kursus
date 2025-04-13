import { LessonButton } from "@/features/lesson/components/molecules/lesson-button";
import { UnitBanner } from "./unit-banner";
import { lessons, units } from "@/drizzle/schema";

type UnitProps = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
  })[];
  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
      })
    | undefined;
  activeLessonPercentage: number;
};

export const Unit = ({
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: UnitProps) => {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="relative flex flex-col items-center">
        {lessons.map((lesson, i) => {
          const isCurrent = lesson.id === activeLesson?.id;
          
          // Trouver la dernière leçon complétée
          const lastCompletedIndex = lessons.findIndex((l, index) => {
            return index < i && !l.completed;
          }) - 1;
          
          // Une leçon est verrouillée si elle n'est pas la première ET
          // qu'aucune leçon précédente n'est complétée
          const isLocked = i > 0 && lastCompletedIndex < 0;
        
          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              title={lesson.title}
              index={i}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
            />
          );
        })}
      </div>
    </>
  );
};
