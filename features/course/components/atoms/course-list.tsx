"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Course } from "../../config/course.type";
import { userProgress } from "@/drizzle/schema";
import { upsertUserProgress } from "../../domain/use-cases/get-user-progress";
import { CourseCard } from "./course-card";

type ListProps = {
  courses: Course[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export const List = ({ courses, activeCourseId }: ListProps) => {
  const router = useRouter();
  const onClick = (id: number) => {
    if (id === activeCourseId) return router.push("/");
    upsertUserProgress(id).catch((e) => {
      console.log('error',e);
      toast.error("Something went wrong.");
    });
    
  };

  return (
    <div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc || ""}
          onClick={onClick}
          disabled={false}
          isActive={course.id === activeCourseId}
        />
      ))}
    </div>
  );
};
