import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getAllLearningPaths } from "@/lib/contentLoaders";
import { pluralize } from "@/lib/utils";
import Link from "next/link";

export default async function LearningPaths() {
	const learningPaths = await getAllLearningPaths();

	return (
		<div className="container mx-auto min-h-screen px-4 py-8">
			<div className="mb-8">
				<h1 className="mb-4 text-3xl font-bold">Learning Paths</h1>
				<p className="text-muted-foreground">
					Choose a learning path to start your accessibility journey
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{learningPaths.map((path) => (
					<Card
						key={path.slug}
						className="transition-shadow hover:shadow-lg"
					>
						<CardHeader>
							<CardTitle>{path.title}</CardTitle>
							<CardDescription>
								{path.description}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="text-muted-foreground flex items-center gap-2 text-sm">
								<span className="inline-flex items-center gap-1">
									📚 {path.lessonCount}{" "}
									{pluralize("lesson", path.lessonCount)}
								</span>
							</div>
						</CardContent>
						<CardFooter>
							<Button asChild>
								<Link href={`/learning-paths/${path.slug}`}>
									Start Learning
								</Link>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>

			{learningPaths.length === 0 && (
				<div className="py-12 text-center">
					<p className="text-muted-foreground">
						No learning paths found.
					</p>
				</div>
			)}
		</div>
	);
}
