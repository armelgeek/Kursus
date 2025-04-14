
import { auth } from "@/auth";
import { getLesson } from "@/features/course/domain/use-cases/get-lesson.use-case";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUserProgress } from '@/features/course/domain/use-cases/get-user-progress.use-case';
import { getChaptersByLessonId } from "@/features/chapter/domain/use-cases/chapter.action";
import LessonTabs from "@/features/lesson/components/molecules/lesson-tabs";

const Page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user.id || null;
    const lessonData = getLesson(userId);
    const userProgressData = getUserProgress(userId);
    
    const [lesson, userProgress] = await Promise.all([
        lessonData,
        userProgressData
    ]);
    
    if (!lesson || !userProgress) return redirect("/");

    const initialPercentage =
        (lesson.challenges.filter((challenge) => challenge.completed).length /
            lesson.challenges.length) *
        100;

    return (
        <LessonTabs
            lesson={lesson}
            userProgress={userProgress}
            initialPercentage={initialPercentage}
        />
    );
};

export default Page;
