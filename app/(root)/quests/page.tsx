import Image from "next/image";
import { redirect } from "next/navigation";

import { Progress } from "@/components/ui/progress";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { getUserProgress } from "@/features/course/domain/use-cases/get-user-progress.use-case";
import { StickyWrapper } from "@/shared/components/atoms/sticky-wrapper";
import { UserProgress } from "@/shared/components/molecules/user-progress";
import { FeedWrapper } from "@/shared/components/atoms/feed-wrapper";
import { QUESTS } from "@/shared/lib/constants/app.constant";

const QuestsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user.id || null;
    const userProgressData = getUserProgress(userId);

    const [userProgress] = await Promise.all([
        userProgressData
    ]);

    if (!userProgress || !userProgress.activeCourse) redirect("/courses");

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                />
            </StickyWrapper>

            <FeedWrapper>
                <div className="flex w-full flex-col items-center">
                    <Image src="/quests.svg" alt="Quests" height={90} width={90} />

                    <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
                        Quests
                    </h1>
                    <p className="mb-6 text-center text-lg text-muted-foreground">
                        Complete quests by earning points.
                    </p>

                    <ul className="w-full">
                        {QUESTS.map((quest) => {
                            const progress = (userProgress.points / quest.value) * 100;

                            return (
                                <div
                                    className="flex w-full items-center gap-x-4 border-t-2 p-4"
                                    key={quest.title}
                                >
                                    <Image
                                        src="/points.svg"
                                        alt="Points"
                                        width={60}
                                        height={60}
                                    />

                                    <div className="flex w-full flex-col gap-y-2">
                                        <p className="text-xl font-bold text-neutral-700">
                                            {quest.title}
                                        </p>

                                        <Progress value={progress} className="h-3" />
                                    </div>
                                </div>
                            );
                        })}
                    </ul>
                </div>
            </FeedWrapper>
        </div>
    );
};

export default QuestsPage;
