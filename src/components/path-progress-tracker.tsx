import { getPathProgress } from "@/lib/progress";
import { Progress } from "./ui/progress";
import { pluralize } from "@/lib/utils";
import { getCurrentUser } from "@/lib/supabase/server";

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
