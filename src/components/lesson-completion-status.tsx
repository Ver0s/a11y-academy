import { isLessonCompleted } from "@/lib/progress";
import { getCurrentUser } from "@/lib/supabase/server";
import { CircleCheck } from "lucide-react";

export default async function CompletionStatus({
	lessonId,
}: {
	lessonId: string;
}) {
	const user = await getCurrentUser();

	if (!user) {
		return null;
	}

	const isCompleted = await isLessonCompleted(user.id, lessonId);

	if (!isCompleted) {
		return null;
	}

	return (
		<div className="text-primary flex items-center gap-2">
			<CircleCheck className="h-8 w-8" />
		</div>
	);
}
