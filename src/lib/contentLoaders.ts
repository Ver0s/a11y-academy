import fs from "fs";
import matter from "gray-matter";
import path from "path";

export interface PathMetadata {
	title: string;
	description: string;
	order: number;
}

export interface Lesson {
	/* Composite: pathSlug/lessonSlug */
	id: string;
	lessonSlug: string;
	pathSlug: string;
	title: string;
	order: number;
}

export interface LearningPath extends PathMetadata {
	slug: string;
	lessonCount: number;
}

export async function getAllLearningPaths(): Promise<LearningPath[]> {
	const learningPathsDir = path.join(
		process.cwd(),
		"src/content/learning-paths",
	);

	try {
		const pathDirectories = fs
			.readdirSync(learningPathsDir, { withFileTypes: true })
			.filter((dirent) => dirent.isDirectory())
			.map((dirent) => dirent.name);

		const learningPaths: LearningPath[] = [];

		for (const dirName of pathDirectories) {
			const pathDir = path.join(learningPathsDir, dirName);
			const metadataPath = path.join(pathDir, "path-metadata.json");

			// Check if metadata file exists
			if (!fs.existsSync(metadataPath)) {
				console.warn(`No path-metadata.json found for ${dirName}`);
				continue;
			}

			// Read and parse metadata
			const metadataContent = fs.readFileSync(metadataPath, "utf-8");
			const metadata: PathMetadata = JSON.parse(metadataContent);

			// Count lesson files (.mdx files, excluding path-metadata.json)
			const files = fs.readdirSync(pathDir);
			const lessonCount = files.filter(
				(file) =>
					file.endsWith(".mdx") && file !== "path-metadata.json",
			).length;

			learningPaths.push({
				...metadata,
				slug: dirName,
				lessonCount,
			});
		}

		// Sort by order property
		return learningPaths.sort((a, b) => a.order - b.order);
	} catch (error) {
		console.error("Error loading learning paths:", error);
		return [];
	}
}

export async function getLessonsForPath(pathSlug: string): Promise<Lesson[]> {
	const pathsDir = path.join(process.cwd(), "learning-paths");
	const pathDir = path.join(pathsDir, pathSlug);

	if (!fs.existsSync(pathDir)) {
		throw new Error(`Path not found: ${pathSlug}`);
	}

	const lessonFiles = fs
		.readdirSync(pathDir)
		.filter(
			(file) =>
				(file.endsWith(".mdx") || file.endsWith(".md")) &&
				file !== "path-metadata.json",
		);

	const lessons: Lesson[] = lessonFiles
		.map((lessonFile) => {
			const filePath = path.join(pathDir, lessonFile);
			const fileContent = fs.readFileSync(filePath, "utf8");
			const { data } = matter(fileContent);

			const lessonSlug = lessonFile.replace(/\.mdx?$/, "");

			if (!data.title || data.order === undefined) {
				throw new Error(
					`Missing required fields (title, order) in ${pathSlug}/${lessonFile}`,
				);
			}

			return {
				lessonSlug,
				pathSlug,
				id: `${pathSlug}/${lessonSlug}`,
				title: data.title,
				order: data.order,
				description: data.description,
			};
		})
		.sort((a, b) => a.order - b.order);

	return lessons;
}
