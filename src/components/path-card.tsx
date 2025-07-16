import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Presentation } from "lucide-react";
import { pluralize } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import { LearningPath } from "@/lib/contentLoaders";

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
			<CardContent className="flex items-center justify-between">
				<div className="text-muted-foreground flex items-center gap-2 text-sm">
					<span className="inline-flex items-center gap-1">
						<Presentation className="h-4 w-4" /> {path.lessonCount}{" "}
						{pluralize("lesson", path.lessonCount)}
					</span>
				</div>
				<Button asChild>
					<Link href={`/learning-paths/${path.slug}`}>
						Start Learning
					</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
