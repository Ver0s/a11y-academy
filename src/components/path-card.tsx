import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { LearningPath } from "@/lib/contentLoaders";
import {
	PathCardProgressTracker,
	PathCardProgressTrackerSkeleton,
} from "./path-progress-tracker";
import { Suspense } from "react";

export default function PathCard({ path }: { path: LearningPath }) {
	return (
		<Card
			key={path.slug}
			className="justify-between transition-shadow hover:shadow-lg"
		>
			<CardHeader>
				<CardTitle>{path.title}</CardTitle>
				<CardDescription>{path.description}</CardDescription>
			</CardHeader>
			<CardContent className="flex items-center justify-between gap-12">
				<Suspense fallback={<PathCardProgressTrackerSkeleton />}>
					<PathCardProgressTracker path={path} />
				</Suspense>
				<Button asChild>
					<Link href={`/learning-paths/${path.slug}`}>View</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
