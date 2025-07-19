import PathCard from "@/components/path-card";
import { getAllLearningPaths } from "@/lib/contentLoaders";

export default async function LearningPaths() {
	const learningPaths = await getAllLearningPaths();

	return (
		<div className="container mx-auto flex flex-1 flex-col px-4 py-8">
			<div className="mb-8">
				<h1 className="mb-4 text-3xl font-bold">Learning Paths</h1>
				<p className="text-muted-foreground">
					Choose a learning path to start your accessibility journey
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{learningPaths.map((path) => (
					<PathCard key={path.slug} path={path} />
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
