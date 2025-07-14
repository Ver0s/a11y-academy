import fs from "fs";
import matter from "gray-matter";
import path from "path";

export type PathMetadata = {
	title: string;
	description: string;
	order: number;
};

type LessonMetadata = {
	title: string;
	description: string;
	order: number;
};

export type Lesson = {
	/* Composite: pathSlug/lessonSlug */
	id: string;
	lessonSlug: string;
	pathSlug: string;
} & LessonMetadata;

export interface LearningPath extends PathMetadata {
	slug: string;
	lessonCount: number;
}

export type LessonContent = {
	content: string;
	metadata: LessonMetadata;
	pathSlug: string;
	lessonSlug: string;
	id: string;
};

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

export async function getLessonsForPath(
	pathSlug: string,
): Promise<Lesson[] | undefined> {
	const pathsDir = path.join(process.cwd(), "src/content/learning-paths");
	const pathDir = path.join(pathsDir, pathSlug);

	if (!fs.existsSync(pathDir)) {
		return undefined;
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
			const { data } = matter(fileContent) as unknown as {
				data: LessonMetadata;
			};

			const lessonSlug = lessonFile.replace(/\.mdx?$/, "");

			if (!data.title || !data.order) {
				console.warn(
					`Missing required fields (title, order) in ${pathSlug}/${lessonFile}`,
				);
				return undefined;
			}

			return {
				id: `${pathSlug}/${lessonSlug}`,
				lessonSlug,
				pathSlug,
				title: data.title,
				order: data.order,
				description: data.description,
			};
		})
		.filter((lesson): lesson is Lesson => lesson !== undefined)
		.sort((a, b) => a.order - b.order);

	return lessons;
}

export async function getPathMetadata(
	pathSlug: string,
): Promise<PathMetadata | undefined> {
	const pathsDir = path.join(process.cwd(), "src/content/learning-paths");
	const pathDir = path.join(pathsDir, pathSlug);
	const metadataPath = path.join(pathDir, "path-metadata.json");

	if (!fs.existsSync(metadataPath)) {
		return undefined;
	}

	try {
		const metadataContent = fs.readFileSync(metadataPath, "utf-8");
		const metadata: PathMetadata = JSON.parse(metadataContent);
		return metadata;
	} catch (error) {
		console.error(`Error parsing metadata for ${pathSlug}:`, error);
		return undefined;
	}
}

export async function getAllLearningPathSlugs(): Promise<string[]> {
	const learningPathsDir = path.join(
		process.cwd(),
		"src/content/learning-paths",
	);

	try {
		const pathDirectories = fs
			.readdirSync(learningPathsDir, { withFileTypes: true })
			.filter((dirent) => dirent.isDirectory())
			.map((dirent) => dirent.name);

		return pathDirectories;
	} catch (error) {
		console.error("Error loading learning path slugs:", error);
		return [];
	}
}

export async function getLessonContent(
	pathSlug: string,
	lessonSlug: string,
): Promise<LessonContent | undefined> {
	const pathsDir = path.join(process.cwd(), "src/content/learning-paths");
	const pathDir = path.join(pathsDir, pathSlug);
	const lessonPath = path.join(pathDir, `${lessonSlug}.mdx`);

	// Try .mdx first, then .md
	if (!fs.existsSync(lessonPath)) {
		const mdPath = path.join(pathDir, `${lessonSlug}.md`);
		if (!fs.existsSync(mdPath)) {
			return undefined;
		}
		const fileContent = fs.readFileSync(mdPath, "utf8");
		const { data, content } = matter(fileContent) as unknown as {
			data: LessonMetadata;
			content: string;
		};

		if (!data.title || !data.order) {
			console.warn(
				`Missing required fields (title, order) in ${pathSlug}/${lessonSlug}.md`,
			);
			return undefined;
		}

		return {
			content,
			metadata: data,
			pathSlug,
			lessonSlug,
			id: `${pathSlug}/${lessonSlug}`,
		};
	}

	const fileContent = fs.readFileSync(lessonPath, "utf8");
	const { data, content } = matter(fileContent) as unknown as {
		data: LessonMetadata;
		content: string;
	};

	if (!data.title || !data.order) {
		console.warn(
			`Missing required fields (title, order) in ${pathSlug}/${lessonSlug}.mdx`,
		);
		return undefined;
	}

	return {
		content,
		metadata: data,
		pathSlug,
		lessonSlug,
		id: `${pathSlug}/${lessonSlug}`,
	};
}

export async function getAllLessonSlugs(): Promise<
	Array<{ pathSlug: string; lessonSlug: string }>
> {
	const pathsDir = path.join(process.cwd(), "src/content/learning-paths");
	const pathDirectories = fs
		.readdirSync(pathsDir, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	const lessonSlugs: Array<{ pathSlug: string; lessonSlug: string }> = [];

	for (const pathSlug of pathDirectories) {
		const pathDir = path.join(pathsDir, pathSlug);
		const lessonFiles = fs
			.readdirSync(pathDir)
			.filter(
				(file) =>
					(file.endsWith(".mdx") || file.endsWith(".md")) &&
					file !== "path-metadata.json",
			);

		for (const lessonFile of lessonFiles) {
			const lessonSlug = lessonFile.replace(/\.mdx?$/, "");
			lessonSlugs.push({ pathSlug, lessonSlug });
		}
	}

	return lessonSlugs;
}
