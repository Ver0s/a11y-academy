import {
	LoadingSkeleton,
	PathProgressTracker,
} from "@/components/path-progress-tracker";
import { LessonCard } from "@/components/lesson-card";
import {
	getAllLearningPathSlugs,
	getLessonsForPath,
	getPathMetadata,
} from "@/lib/contentLoaders";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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

	const [pathMetadata, lessons] = await Promise.all([
		getPathMetadata(pathSlug),
		getLessonsForPath(pathSlug),
	]);

	if (!pathMetadata || !lessons) {
		notFound();
	}

	return (
		<div className="container mx-auto flex max-w-3xl flex-1 flex-col px-4 py-8">
			<div className="flex flex-col gap-2">
				<Link
					href="/learning-paths"
					className="text-muted-foreground hover:text-primary/80 mb-4 inline-block text-sm"
				>
					← Back to Learning Paths
				</Link>
				<h1 className="text-3xl font-bold">{pathMetadata.title}</h1>
				<p className="text-muted-foreground">
					{pathMetadata.description}
				</p>
				<Suspense fallback={<LoadingSkeleton />}>
					<PathProgressTracker
						pathSlug={pathSlug}
						totalLessonsInPath={lessons.length}
					/>
				</Suspense>
			</div>

			<div className="flex flex-col gap-4 pt-8">
				{lessons.map((lesson, index) => (
					<LessonCard
						key={lesson.id}
						lesson={lesson}
						index={index}
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
