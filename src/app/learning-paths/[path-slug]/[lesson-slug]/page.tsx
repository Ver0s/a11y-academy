import { LessonCompleteButton } from "@/components/complete-lesson-button";
import { Button } from "@/components/ui/button";
import {
	getAllLessonSlugs,
	getLessonContent,
	getLessonsForPath,
	getPathMetadata,
} from "@/lib/contentLoaders";
import { isLessonCompleted } from "@/lib/progress";
import { getCurrentUser } from "@/lib/supabase/server";
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

function SignInButton() {
	return (
		<Button asChild variant="outline">
			<Link href="/signin">Sign in to track progress</Link>
		</Button>
	);
}

export default async function LessonPage({
	params,
}: {
	params: Promise<{ "path-slug": string; "lesson-slug": string }>;
}) {
	const { "path-slug": pathSlug, "lesson-slug": lessonSlug } = await params;
	const user = await getCurrentUser();

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
			<article>
				<div className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl p-8">
					<MDXRemote source={lessonContent.content} />
				</div>

				{/* Navigation */}
				<div className="mt-8 flex flex-col items-center justify-center gap-4">
					<div className="flex gap-4">
						{previousLesson && (
							<Button variant="outline" asChild>
								<Link
									href={`/learning-paths/${pathSlug}/${previousLesson.lessonSlug}`}
								>
									← {previousLesson.title}
								</Link>
							</Button>
						)}
						{user ? (
							<LessonCompleteButton
								userId={user.id}
								lessonId={lessonContent.id}
								completed={await isLessonCompleted(
									user.id,
									lessonContent.id,
								)}
							/>
						) : (
							<SignInButton />
						)}
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
			</article>
		</div>
	);
}
