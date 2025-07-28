import { LessonCompleteButton } from "@/components/complete-lesson-button";
import { Button } from "@/components/ui/button";
import {
	getAllLessonSlugs,
	getLessonContent,
	getLessonsForPath,
	getPathMetadata,
} from "@/lib/contentLoaders";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import rehypeHighlight from "rehype-highlight";

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
		<div className="container mx-auto min-h-screen max-w-3xl px-4 py-8">
			<nav className="text-muted-foreground flex gap-2 text-sm">
				<Link
					href="/learning-paths"
					className="hover:text-primary truncate"
				>
					Learning Paths
				</Link>
				<span>→</span>
				<Link
					href={`/learning-paths/${pathSlug}`}
					className="hover:text-primary truncate"
				>
					{pathMetadata.title}
				</Link>
				<span>→</span>
				<span className="text-foreground truncate">
					{lessonContent.metadata.title}
				</span>
			</nav>
			<article className="prose prose-neutral dark:prose-invert max-w-3xl py-8">
				<MDXRemote
					source={lessonContent.content}
					options={{
						mdxOptions: {
							rehypePlugins: [rehypeHighlight],
						},
					}}
				/>
			</article>
			<div className="flex flex-col items-center justify-center gap-4">
				<div className="flex flex-col gap-4 sm:flex-row">
					{previousLesson && (
						<Button variant="outline" asChild>
							<Link
								href={`/learning-paths/${pathSlug}/${previousLesson.lessonSlug}`}
							>
								← {previousLesson.title}
							</Link>
						</Button>
					)}
					<LessonCompleteButton lessonId={lessonContent.id} />
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
				<Button variant="ghost" asChild>
					<Link href={`/learning-paths/${pathSlug}`}>
						← Back to {pathMetadata.title}
					</Link>
				</Button>
			</div>
		</div>
	);
}
