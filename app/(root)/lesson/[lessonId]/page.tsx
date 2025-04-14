import { auth } from "@/auth";
import { getLesson } from "@/features/course/domain/use-cases/get-lesson.use-case";
import { getUserProgress } from "@/features/course/domain/use-cases/get-user-progress.use-case";
import { Quiz } from "@/features/lesson/components/molecules/Quiz";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


type LessonIdPageProps = {
    params: {
        lessonId: number;
    };
};

const LessonIdPage = async ({ params }: LessonIdPageProps) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user.id || null;
    const lessonData = getLesson(userId, params.lessonId);
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
        <Quiz
            initialLessonId={lesson.id}
            initialLessonChallenges={lesson.challenges}
            initialHearts={userProgress.hearts}
            initialPercentage={initialPercentage}
        />
    );
};

export default LessonIdPage;
