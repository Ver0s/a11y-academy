import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Lesson } from "@/lib/contentLoaders";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface LessonCardProps {
	lesson: Lesson;
	index: number;
	isCompleted: boolean;
	pathSlug: string;
}

export function LessonCard({
	lesson,
	index,
	isCompleted,
	pathSlug,
}: LessonCardProps) {
	return (
		<Card
			className={`transition-shadow hover:shadow-lg ${
				isCompleted ? "border-primary bg-primary/10" : ""
			}`}
		>
			<CardHeader>
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<CardTitle className="flex items-center gap-2">
							<span
								className={`flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium ${
									isCompleted
										? "bg-primary text-primary-foreground"
										: "bg-primary/10 text-primary-foreground"
								}`}
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
					{isCompleted && (
						<CheckCircle2 className="text-primary ml-2 h-5 w-5" />
					)}
				</div>
			</CardHeader>
			<CardContent>
				<Button asChild variant={isCompleted ? "outline" : "default"}>
					<Link
						href={`/learning-paths/${pathSlug}/${lesson.lessonSlug}`}
					>
						{isCompleted ? "Review Lesson" : "Start Lesson"}
					</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
