import { getPathProgress } from "@/lib/progress";
import { Progress } from "./ui/progress";
import { pluralize } from "@/lib/utils";

export async function PathProgressTracker({
	userId,
	pathSlug,
	totalLessonsInPath,
}: {
	userId: string;
	pathSlug: string;
	totalLessonsInPath: number;
}) {
	const pathProgress = await getPathProgress(
		userId,
		pathSlug,
		totalLessonsInPath,
	);

	return (
		<div>
			<p className="text-muted-foreground pb-2 text-sm">
				{pathProgress.completedLessons} out of{" "}
				{pathProgress.totalLessons}{" "}
				{pluralize("lesson", pathProgress.totalLessons)} completed
			</p>
			<Progress value={pathProgress.completionPercentage} />
		</div>
	);
}
