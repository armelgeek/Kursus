"use client";
import Link from "next/link";
import { Quiz } from "./Quiz";
import { useState } from "react";

const LessonTabs = ({ lesson, userProgress, initialPercentage }) => {
    const [activeTab, setActiveTab] = useState("chapters");
    console.log('lesson.chapters',lesson.chapters);
    return (
        <div>
            <div className="tabs">
                <button
                    className={activeTab === "chapters" ? "active" : ""}
                    onClick={() => setActiveTab("chapters")}
                >
                    Chapters
                </button>
                <button
                    className={activeTab === "quiz" ? "active" : ""}
                    onClick={() => setActiveTab("quiz")}
                >
                    Quiz
                </button>
            </div>
            <div className="tab-content">
                {activeTab === "chapters" && (
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-4">Leçon {lesson.id}</h1>
                        <ul className="space-y-2">
                            {lesson.chapters.map((chapter: any) => {
                                const isCompleted = chapter.completed;
                                console.log('chapter',chapter);
                                return (
                                    <li key={chapter.id}>
                                        <Link href={`/chapter/${chapter.id}`} className="text-blue-600 underline">
                                            {chapter.title} {isCompleted ? "✅" : "🔓"}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
                {activeTab === "quiz" && (
                    <Quiz
                        initialLessonId={lesson.id}
                        initialLessonChallenges={lesson.challenges}
                        initialHearts={userProgress.hearts}
                        initialPercentage={initialPercentage}
                    />
                )}
            </div>
        </div>
    );
};
export default LessonTabs;