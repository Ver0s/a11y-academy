import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Lesson } from "@/lib/contentLoaders";
import Link from "next/link";
import CompletionStatus from "./lesson-completion-status";
import { Suspense } from "react";

interface LessonCardProps {
	lesson: Lesson;
	index: number;
	pathSlug: string;
}

export function LessonCard({ lesson, index, pathSlug }: LessonCardProps) {
	return (
		<Link href={`/learning-paths/${pathSlug}/${lesson.lessonSlug}`}>
			<Card className={`transition-shadow hover:shadow-lg`}>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="flex-1">
							<CardTitle className="flex items-center gap-2">
								<span
									className={`bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium`}
								>
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
						<Suspense fallback={<div className="h-8 w-8" />}>
							<CompletionStatus lessonId={lesson.id} />
						</Suspense>
					</div>
				</CardHeader>
			</Card>
		</Link>
	);
}
