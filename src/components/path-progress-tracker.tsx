import { getPathProgress } from "@/lib/progress";
import { Progress } from "./ui/progress";
import { pluralize } from "@/lib/utils";
import { getCurrentUser } from "@/lib/supabase/server";
import { LearningPath } from "@/lib/contentLoaders";
import { Presentation } from "lucide-react";

export function LoadingSkeleton() {
	return (
		<div role="status" className="flex animate-pulse flex-col gap-2">
			<div className="h-3.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700" />
			<div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700" />
		</div>
	);
}

export async function PathProgressTracker({
	pathSlug,
	totalLessonsInPath,
}: {
	pathSlug: string;
	totalLessonsInPath: number;
}) {
	const user = await getCurrentUser();

	if (!user) {
		return null;
	}

	const pathProgress = await getPathProgress(
		user.id,
		pathSlug,
		totalLessonsInPath,
	);

	return (
		<div>
			<p className="text-accent-foreground pb-2 text-sm font-bold">
				{pathProgress.completedLessons} out of{" "}
				{pathProgress.totalLessons}{" "}
				{pluralize("lesson", pathProgress.totalLessons)} completed
			</p>
			<Progress value={pathProgress.completionPercentage} />
		</div>
	);
}

export async function PathCardProgressTrackerSkeleton() {
	return (
		<div role="status" className="flex animate-pulse flex-col gap-2">
			<div className="h-3.5 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
			<div className="h-2.5 w-52 rounded-full bg-gray-200 dark:bg-gray-700" />
		</div>
	);
}

export async function PathCardProgressTracker({
	path,
}: {
	path: LearningPath;
}) {
	const user = await getCurrentUser();

	if (!user) {
		return (
			<div className="text-muted-foreground flex items-center gap-2 text-sm">
				<span className="inline-flex items-center gap-1">
					<Presentation className="h-4 w-4" /> {path.lessonCount}{" "}
					{pluralize("lesson", path.lessonCount)}
				</span>
			</div>
		);
	}

	const pathProgress = await getPathProgress(
		user.id,
		path.slug,
		path.lessonCount,
	);

	return (
		<div className="flex-1">
			<p className="text-accent-foreground pb-2 text-sm font-bold">
				{pathProgress.completedLessons} / {path.lessonCount} completed
			</p>
			<Progress value={pathProgress.completionPercentage} />
		</div>
	);
}
