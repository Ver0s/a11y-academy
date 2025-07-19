"use client";

import { Button } from "@/components/ui/button";
import { updateLessonProgress } from "@/lib/progress";
import { CircleCheck } from "lucide-react";
import { useTransition } from "react";

interface LessonCompleteButtonProps {
	userId: string;
	lessonId: string;
	completed: boolean;
}

export function LessonCompleteButton({
	userId,
	lessonId,
	completed,
}: LessonCompleteButtonProps) {
	const [isPending, startTransition] = useTransition();

	const handleClick = () => {
		startTransition(async () => {
			await updateLessonProgress(userId, lessonId, !completed);
		});
	};

	return (
		<Button
			onClick={handleClick}
			disabled={isPending}
			loading={isPending}
			className={
				completed
					? "border-primary bg-background text-primary border-2 font-bold"
					: "border-accent border-2"
			}
			variant={completed ? "secondary" : "ghost"}
		>
			{completed ? "Lesson Completed" : "Mark Complete"}
			{completed && <CircleCheck className="h-4 w-4" />}
		</Button>
	);
}
