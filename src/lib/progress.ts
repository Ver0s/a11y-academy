"use server";

import { createClient } from "./supabase/server";

export async function isLessonCompleted(
	userId: string,
	lessonId: string,
): Promise<boolean> {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("lesson_progress")
		.select("completed")
		.eq("user_id", userId)
		.eq("lesson_id", lessonId)
		.single();

	if (error && error.code !== "PGRST116") {
		// PGRST116 = no rows found
		console.error("Error checking lesson completion:", error);
		return false;
	}

	return data?.completed || false;
}

export type PathProgress = {
	pathSlug: string;
	totalLessons: number;
	completedLessons: number;
	completionPercentage: number;
};

export async function getPathProgress(
	userId: string,
	pathSlug: string,
	totalLessonsInPath: number,
): Promise<PathProgress> {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("lesson_progress")
		.select("lesson_id, completed, completed_at")
		.eq("user_id", userId)
		.like("lesson_id", `${pathSlug}/%`) // Match all lessons in this path
		.eq("completed", true);

	if (error) {
		console.error("Error getting path progress:", error);
		return {
			pathSlug,
			totalLessons: totalLessonsInPath,
			completedLessons: 0,
			completionPercentage: 0,
		};
	}

	const completedLessons = data.length;
	const completionPercentage =
		totalLessonsInPath > 0
			? Math.round((completedLessons / totalLessonsInPath) * 100)
			: 0;

	return {
		pathSlug,
		totalLessons: totalLessonsInPath,
		completedLessons,
		completionPercentage,
	};
}

export async function updateLessonProgress(
	userId: string,
	lessonId: string,
	completed: boolean,
): Promise<void> {
	const supabase = await createClient();

	const { error } = await supabase.from("lesson_progress").upsert({
		user_id: userId,
		lesson_id: lessonId,
		completed,
		completed_at: completed ? new Date().toISOString() : null,
		updated_at: new Date().toISOString(),
	});

	if (error) {
		console.error("Error updating lesson progress:", error);
		throw new Error("Failed to update lesson progress");
	}
}

export async function getCompletedLessonsForPath(
	userId: string,
	pathSlug: string,
): Promise<Set<string>> {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("lesson_progress")
		.select("lesson_id")
		.eq("user_id", userId)
		.like("lesson_id", `${pathSlug}/%`)
		.eq("completed", true);

	if (error) {
		console.error("Error getting completed lessons:", error);
		return new Set();
	}

	return new Set(data.map((row) => row.lesson_id));
}
