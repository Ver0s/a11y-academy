"use client";

import { Button } from "@/components/ui/button";
import { isLessonCompleted, updateLessonProgress } from "@/lib/progress";
import { getCurrentUser } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

interface LessonCompleteButtonProps {
	lessonId: string;
}

function SignInButton() {
	return (
		<Button asChild variant="outline">
			<Link href="/signin">Sign in to track progress</Link>
		</Button>
	);
}

export function LessonCompleteButton({ lessonId }: LessonCompleteButtonProps) {
	const [isPending, startTransition] = useTransition();
	const [user, setUser] = useState<User | null>(null);
	const [isCompleted, setIsCompleted] = useState(false);

	// Get user once on mount
	useEffect(() => {
		async function getUser() {
			const user = await getCurrentUser();
			setUser(user);
		}
		getUser();
	}, []);

	// Check lesson completion when user or lessonId changes
	useEffect(() => {
		async function getIsLessonCompleted() {
			if (!user) return;
			const isCompleted = await isLessonCompleted(user.id, lessonId);
			setIsCompleted(isCompleted);
		}
		getIsLessonCompleted();
		// Keep user here since this effect needs to run when user changes
	}, [user, lessonId]);

	if (!user) {
		return <SignInButton />;
	}

	const handleClick = () => {
		startTransition(async () => {
			try {
				const newCompletedState = !isCompleted;
				await updateLessonProgress(user.id, lessonId, !isCompleted);
				setIsCompleted(newCompletedState);
			} catch (error) {
				console.error("Failed to update lesson progress:", error);
				setIsCompleted(isCompleted);
			}
		});
	};

	return (
		<Button
			onClick={handleClick}
			disabled={isPending}
			loading={isPending}
			className={
				isCompleted
					? "border-primary bg-background text-primary border-2 font-bold"
					: "border-accent border-2"
			}
			variant={isCompleted ? "secondary" : "ghost"}
		>
			{isCompleted ? "Lesson Completed" : "Mark Complete"}
			{isCompleted && <CircleCheck className="h-4 w-4" />}
		</Button>
	);
}
