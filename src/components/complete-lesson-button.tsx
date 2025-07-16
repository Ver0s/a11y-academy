"use client";

import { Button } from "@/components/ui/button";
import { updateLessonProgress } from "@/lib/progress";
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
		<Button onClick={handleClick} disabled={isPending} loading={isPending}>
			{completed ? "Lesson Completed" : "Mark Complete"}
		</Button>
	);
}
