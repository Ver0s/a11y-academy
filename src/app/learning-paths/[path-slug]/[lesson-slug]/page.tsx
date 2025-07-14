import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	getAllLessonSlugs,
	getLessonContent,
	getLessonsForPath,
	getPathMetadata,
} from "@/lib/contentLoaders";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
	const lessonSlugs = await getAllLessonSlugs();
	return lessonSlugs.map(({ pathSlug, lessonSlug }) => ({
		"path-slug": pathSlug,
		"lesson-slug": lessonSlug,
	}));
}

export default async function LessonPage({
	params,
}: {
	params: Promise<{ "path-slug": string; "lesson-slug": string }>;
}) {
	const { "path-slug": pathSlug, "lesson-slug": lessonSlug } = await params;

	const [lessonContent, pathMetadata, lessons] = await Promise.all([
		getLessonContent(pathSlug, lessonSlug),
		getPathMetadata(pathSlug),
		getLessonsForPath(pathSlug),
	]);

	if (!lessonContent || !pathMetadata || !lessons) {
		notFound();
	}

	const currentLessonIndex = lessons.findIndex(
		(lesson) => lesson.lessonSlug === lessonSlug,
	);
	const previousLesson =
		currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : null;
	const nextLesson =
		currentLessonIndex < lessons.length - 1
			? lessons[currentLessonIndex + 1]
			: null;

	return (
		<div className="container mx-auto min-h-screen px-4 py-8">
			{/* Breadcrumb Navigation */}
			<div className="mb-8">
				<nav className="text-muted-foreground flex space-x-2 text-sm">
					<Link href="/learning-paths" className="hover:text-primary">
						Learning Paths
					</Link>
					<span>→</span>
					<Link
						href={`/learning-paths/${pathSlug}`}
						className="hover:text-primary"
					>
						{pathMetadata.title}
					</Link>
					<span>→</span>
					<span className="text-foreground">
						{lessonContent.metadata.title}
					</span>
				</nav>
			</div>

			{/* Main Content */}
			<article className="mx-auto max-w-4xl">
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">
							{lessonContent.metadata.title}
						</CardTitle>
						{lessonContent.metadata.description && (
							<p className="text-muted-foreground">
								{lessonContent.metadata.description}
							</p>
						)}
					</CardHeader>
					<CardContent>
						<div className="prose prose-neutral dark:prose-invert max-w-none">
							<MDXRemote source={lessonContent.content} />
						</div>
					</CardContent>
				</Card>

				{/* Navigation */}
				<div className="mt-8 flex justify-between">
					<div>
						{previousLesson && (
							<Button variant="outline" asChild>
								<Link
									href={`/learning-paths/${pathSlug}/${previousLesson.lessonSlug}`}
								>
									← {previousLesson.title}
								</Link>
							</Button>
						)}
					</div>
					<div>
						{nextLesson && (
							<Button asChild>
								<Link
									href={`/learning-paths/${pathSlug}/${nextLesson.lessonSlug}`}
								>
									{nextLesson.title} →
								</Link>
							</Button>
						)}
					</div>
				</div>

				{/* Back to Path */}
				<div className="mt-4 text-center">
					<Button variant="ghost" asChild>
						<Link href={`/learning-paths/${pathSlug}`}>
							← Back to {pathMetadata.title}
						</Link>
					</Button>
				</div>
			</article>
		</div>
	);
}
