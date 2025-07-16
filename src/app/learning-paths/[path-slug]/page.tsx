import { PathProgressTracker } from "@/components/path-progress-tracker";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	getAllLearningPathSlugs,
	getLessonsForPath,
	getPathMetadata,
} from "@/lib/contentLoaders";
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

	const [pathMetadata, lessons] = await Promise.all([
		getPathMetadata(pathSlug),
		getLessonsForPath(pathSlug),
	]);

	if (!pathMetadata || !lessons) {
		notFound();
	}

	return (
		<div className="container mx-auto min-h-screen max-w-3xl px-4 py-8">
			<div className="flex flex-col gap-2">
				<Link
					href="/learning-paths"
					className="text-primary hover:text-primary/80 mb-4 inline-block text-sm"
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
					<Card
						key={lesson.id}
						className="transition-shadow hover:shadow-lg"
					>
						<CardHeader>
							<div className="flex items-start justify-between">
								<div>
									<CardTitle className="flex items-center gap-2">
										<span className="bg-primary/10 text-primary flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium">
											{index + 1}
										</span>
										{lesson.title}
									</CardTitle>
									{lesson.description && (
										<CardDescription className="mt-2">
											{lesson.description}
										</CardDescription>
									)}
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<Button asChild>
								<Link
									href={`/learning-paths/${pathSlug}/${lesson.lessonSlug}`}
								>
									Start Lesson
								</Link>
							</Button>
						</CardContent>
					</Card>
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
