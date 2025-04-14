import Image from "next/image";
import { redirect } from "next/navigation";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { StickyWrapper } from "@/shared/components/atoms/sticky-wrapper";
import { UserProgress } from "@/shared/components/molecules/user-progress";
import { Quests } from "@/features/course/components/molecules/quests";
import { FeedWrapper } from "@/shared/components/atoms/feed-wrapper";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { getUserProgress } from '../../../features/course/domain/use-cases/get-user-progress.use-case';
import { getTopUsers } from "@/features/course/domain/use-cases/get-top-users.use-case";


const LeaderboardPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user.id || null;
    const userProgressData = getUserProgress(userId);
    const leaderboardData = getTopUsers(userId);

    const [userProgress, leaderboard] = await Promise.all([
        userProgressData,
        leaderboardData,
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
                <Quests points={userProgress.points} />
            </StickyWrapper>

            <FeedWrapper>
                <div className="flex w-full flex-col items-center">
                    <Image
                        src="/leaderboard.svg"
                        alt="Leaderboard"
                        height={90}
                        width={90}
                    />

                    <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
                        Leaderboard
                    </h1>
                    <p className="mb-6 text-center text-lg text-muted-foreground">
                        See where you stand among other learners in the community.
                    </p>

                    <Separator className="mb-4 h-0.5 rounded-full" />
                    {leaderboard.map((userProgress, i) => (
                        <div
                            key={userProgress.userId}
                            className="flex w-full items-center rounded-xl p-2 px-4 hover:bg-gray-200/50"
                        >
                            <p className="mr-4 font-bold text-lime-700">{i + 1}</p>

                            <Avatar className="ml-3 mr-6 h-12 w-12 border bg-green-500">
                                <AvatarImage
                                    src={userProgress.userImageSrc}
                                    className="object-cover"
                                />
                            </Avatar>

                            <p className="flex-1 font-bold text-neutral-800">
                                {userProgress.userName}
                            </p>
                            <p className="text-muted-foreground">{userProgress.points} XP</p>
                        </div>
                    ))}
                </div>
            </FeedWrapper>
        </div>
    );
};

export default LeaderboardPage;
