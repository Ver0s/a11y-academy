import { PathProgressTracker } from "@/components/path-progress-tracker";
import { LessonCard } from "@/components/lesson-card";
import {
	getAllLearningPathSlugs,
	getLessonsForPath,
	getPathMetadata,
} from "@/lib/contentLoaders";
import { getCompletedLessonsForPath } from "@/lib/progress";
import { getCurrentUser } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
	const learningPaths = await getAllLearningPathSlugs();
	return learningPaths.map((path) => ({
		"path-slug": path,
	}));
}

export default async function LearningPathPage({
	params,
}: {
	params: Promise<{ "path-slug": string }>;
}) {
	const { "path-slug": pathSlug } = await params;
	const user = await getCurrentUser();

	const [pathMetadata, lessons, completedLessons] = await Promise.all([
		getPathMetadata(pathSlug),
		getLessonsForPath(pathSlug),
		user
			? getCompletedLessonsForPath(user.id, pathSlug)
			: Promise.resolve(new Set()),
	]);

	if (!pathMetadata || !lessons) {
		notFound();
	}

	return (
		<div className="container mx-auto min-h-screen max-w-3xl px-4 py-8">
			<div className="flex flex-col gap-2">
				<Link
					href="/learning-paths"
					className="text-primary-foreground hover:text-primary/80 mb-4 inline-block text-sm"
				>
					← Back to Learning Paths
				</Link>
				<h1 className="text-3xl font-bold">{pathMetadata.title}</h1>
				<p className="text-muted-foreground">
					{pathMetadata.description}
				</p>
				{user && (
					<PathProgressTracker
						userId={user.id}
						pathSlug={pathSlug}
						totalLessonsInPath={lessons.length}
					/>
				)}
			</div>

			<div className="space-y-4 pt-8">
				{lessons.map((lesson, index) => (
					<LessonCard
						key={lesson.id}
						lesson={lesson}
						index={index}
						isCompleted={completedLessons.has(lesson.id)}
						pathSlug={pathSlug}
					/>
				))}
			</div>

			{lessons.length === 0 && (
				<div className="py-12 text-center">
					<p className="text-muted-foreground">
						No lessons found for this path.
					</p>
				</div>
			)}
		</div>
	);
}
