#!/usr/bin/env tsx
import { promises as fs } from "fs";
import matter from "gray-matter";
import path from "path";

// Types for validation
interface PathMetadata {
	title: string;
	description: string;
	order: number;
}

interface LessonMetadata {
	title: string;
	description: string;
	order: number;
}

interface ValidationError {
	file: string;
	message: string;
}

interface ValidationResult {
	errors: ValidationError[];
	success: boolean;
}

class ContentValidator {
	private contentDir: string;
	private errors: ValidationError[] = [];

	constructor() {
		this.contentDir = path.join(
			process.cwd(),
			"src/content/learning-paths",
		);
	}

	private addError(file: string, message: string): void {
		this.errors.push({ file, message });
	}

	private async fileExists(filePath: string): Promise<boolean> {
		try {
			await fs.access(filePath);
			return true;
		} catch {
			return false;
		}
	}

	private isValidSlug(slug: string): boolean {
		// Check if slug is kebab-case (lowercase letters, numbers, hyphens only)
		return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug);
	}

	private isValidOrder(order: number): boolean {
		return Number.isInteger(order) && order > 0;
	}

	private isNonEmptyString(value: string): boolean {
		return typeof value === "string" && value.trim().length > 0;
	}

	private async validatePathMetadata(
		pathSlug: string,
		metadataPath: string,
	): Promise<PathMetadata | null> {
		if (!(await this.fileExists(metadataPath))) {
			this.addError(pathSlug, "Missing path-metadata.json file");
			return null;
		}

		try {
			const content = await fs.readFile(metadataPath, "utf-8");
			const metadata = JSON.parse(content) as PathMetadata;

			// Validate required fields
			if (!this.isNonEmptyString(metadata.title)) {
				this.addError(
					`${pathSlug}/path-metadata.json`,
					"Missing or empty 'title' field",
				);
			}

			if (!this.isNonEmptyString(metadata.description)) {
				this.addError(
					`${pathSlug}/path-metadata.json`,
					"Missing or empty 'description' field",
				);
			}

			if (!this.isValidOrder(metadata.order)) {
				this.addError(
					`${pathSlug}/path-metadata.json`,
					"Missing or invalid 'order' field (must be positive integer)",
				);
			}

			return metadata;
		} catch (error) {
			this.addError(
				`${pathSlug}/path-metadata.json`,
				`Invalid JSON format: ${error instanceof Error ? error.message : "Unknown error"}`,
			);
			return null;
		}
	}

	private async validateLessonFrontmatter(
		pathSlug: string,
		lessonFile: string,
	): Promise<LessonMetadata | null> {
		const lessonPath = path.join(this.contentDir, pathSlug, lessonFile);

		try {
			const content = await fs.readFile(lessonPath, "utf-8");
			const { data } = matter(content);

			const lessonMetadata = data as LessonMetadata;
			const fileRef = `${pathSlug}/${lessonFile}`;

			// Validate required fields
			if (!this.isNonEmptyString(lessonMetadata.title)) {
				this.addError(
					fileRef,
					"Missing or empty 'title' field in frontmatter",
				);
			}

			if (!this.isNonEmptyString(lessonMetadata.description)) {
				this.addError(
					fileRef,
					"Missing or empty 'description' field in frontmatter",
				);
			}

			if (!this.isValidOrder(lessonMetadata.order)) {
				this.addError(
					fileRef,
					"Missing or invalid 'order' field in frontmatter (must be positive integer)",
				);
			}

			return lessonMetadata;
		} catch (error) {
			this.addError(
				`${pathSlug}/${lessonFile}`,
				`Invalid frontmatter: ${error instanceof Error ? error.message : "Unknown error"}`,
			);
			return null;
		}
	}

	private async validatePathDirectory(pathSlug: string): Promise<{
		metadata: PathMetadata | null;
		lessons: Array<{ file: string; metadata: LessonMetadata | null }>;
	}> {
		const pathDir = path.join(this.contentDir, pathSlug);

		// Validate path slug format
		if (!this.isValidSlug(pathSlug)) {
			this.addError(
				pathSlug,
				"Path slug must be in kebab-case (lowercase letters, numbers, hyphens only)",
			);
		}

		const files = await fs.readdir(pathDir);
		const metadataPath = path.join(pathDir, "path-metadata.json");

		// Validate path metadata
		const pathMetadata = await this.validatePathMetadata(
			pathSlug,
			metadataPath,
		);

		// Find lesson files
		const lessonFiles = files.filter((file) => file.endsWith(".md"));
		const lessons: Array<{
			file: string;
			metadata: LessonMetadata | null;
		}> = [];

		// Validate each lesson
		for (const lessonFile of lessonFiles) {
			const lessonSlug = lessonFile.replace(/\.md$/, "");

			// Validate lesson slug format
			if (!this.isValidSlug(lessonSlug)) {
				this.addError(
					`${pathSlug}/${lessonFile}`,
					"Lesson slug must be in kebab-case (lowercase letters, numbers, hyphens only)",
				);
			}

			const lessonMetadata = await this.validateLessonFrontmatter(
				pathSlug,
				lessonFile,
			);
			lessons.push({ file: lessonFile, metadata: lessonMetadata });
		}

		// Check for unexpected files
		const expectedFiles = [...lessonFiles, "path-metadata.json"];
		const unexpectedFiles = files.filter(
			(file) => !expectedFiles.includes(file),
		);

		for (const unexpectedFile of unexpectedFiles) {
			this.addError(
				`${pathSlug}/${unexpectedFile}`,
				"Unexpected file in path directory (only .md lesson files and path-metadata.json are expected)",
			);
		}

		return { metadata: pathMetadata, lessons };
	}

	private validateOrderSequences(
		paths: Array<{ slug: string; metadata: PathMetadata | null }>,
		allLessons: Map<
			string,
			Array<{ file: string; metadata: LessonMetadata | null }>
		>,
	): void {
		// Validate path order uniqueness and sequence
		const pathOrders = new Map<number, string>();
		const validPathOrders: number[] = [];

		for (const { slug, metadata } of paths) {
			if (metadata && this.isValidOrder(metadata.order)) {
				if (pathOrders.has(metadata.order)) {
					this.addError(
						slug,
						`Duplicate path order ${metadata.order} (also used by ${pathOrders.get(metadata.order)})`,
					);
				} else {
					pathOrders.set(metadata.order, slug);
					validPathOrders.push(metadata.order);
				}
			}
		}

		// Check if path orders are sequential (1, 2, 3, ...)
		validPathOrders.sort((a, b) => a - b);
		for (let i = 0; i < validPathOrders.length; i++) {
			if (validPathOrders[i] !== i + 1) {
				this.addError(
					"paths",
					`Path orders are not sequential. Expected order ${i + 1}, but found ${validPathOrders[i]}. Orders should be 1, 2, 3, etc.`,
				);
				break;
			}
		}

		// Validate lesson order uniqueness and sequence within each path
		for (const [pathSlug, lessons] of allLessons.entries()) {
			const lessonOrders = new Map<number, string>();
			const validLessonOrders: number[] = [];

			for (const { file, metadata } of lessons) {
				if (metadata && this.isValidOrder(metadata.order)) {
					if (lessonOrders.has(metadata.order)) {
						this.addError(
							`${pathSlug}/${file}`,
							`Duplicate lesson order ${metadata.order} within path (also used by ${lessonOrders.get(metadata.order)})`,
						);
					} else {
						lessonOrders.set(metadata.order, file);
						validLessonOrders.push(metadata.order);
					}
				}
			}

			// Check if lesson orders are sequential within the path
			validLessonOrders.sort((a, b) => a - b);
			for (let i = 0; i < validLessonOrders.length; i++) {
				if (validLessonOrders[i] !== i + 1) {
					this.addError(
						`${pathSlug}`,
						`Lesson orders are not sequential within path. Expected order ${i + 1}, but found ${validLessonOrders[i]}. Orders should be 1, 2, 3, etc.`,
					);
					break;
				}
			}
		}
	}

	private validateUniqueSlugs(
		paths: Array<{ slug: string; metadata: PathMetadata | null }>,
		allLessons: Map<
			string,
			Array<{ file: string; metadata: LessonMetadata | null }>
		>,
	): void {
		// Check for duplicate path slugs (should not happen due to directory structure, but good to verify)
		const pathSlugs = new Set<string>();
		for (const { slug } of paths) {
			if (pathSlugs.has(slug)) {
				this.addError(slug, `Duplicate path slug: ${slug}`);
			} else {
				pathSlugs.add(slug);
			}
		}

		// Check for duplicate lesson slugs across all paths
		const lessonSlugMap = new Map<string, string[]>();
		for (const [pathSlug, lessons] of allLessons.entries()) {
			for (const { file } of lessons) {
				const lessonSlug = file.replace(/\.md$/, "");
				if (!lessonSlugMap.has(lessonSlug)) {
					lessonSlugMap.set(lessonSlug, []);
				}
				lessonSlugMap.get(lessonSlug)!.push(pathSlug);
			}
		}

		for (const [lessonSlug, pathsUsingSlug] of lessonSlugMap.entries()) {
			if (pathsUsingSlug.length > 1) {
				this.addError(
					"lessons",
					`Duplicate lesson slug '${lessonSlug}' found in paths: ${pathsUsingSlug.join(", ")}`,
				);
			}
		}
	}

	private async validateContentDirectoryStructure(): Promise<void> {
		// Check that only learning path directories exist in content/
		const contentRoot = path.dirname(this.contentDir);
		const contentItems = await fs.readdir(contentRoot, {
			withFileTypes: true,
		});

		for (const item of contentItems) {
			if (item.name !== "learning-paths") {
				this.addError(
					`content/${item.name}`,
					"Unexpected item in content directory. Only 'learning-paths' directory should exist.",
				);
			}
		}

		// Check that no files exist in the root of learning-paths/
		const learningPathsItems = await fs.readdir(this.contentDir, {
			withFileTypes: true,
		});
		for (const item of learningPathsItems) {
			if (item.isFile()) {
				this.addError(
					`learning-paths/${item.name}`,
					"Files should not exist in the root of learning-paths directory. Only path directories are allowed.",
				);
			}
		}
	}

	async validate(): Promise<ValidationResult> {
		console.log("🔍 Starting content validation...\n");

		try {
			// Validate directory structure
			await this.validateContentDirectoryStructure();

			// Get all path directories
			const pathDirectories = (
				await fs.readdir(this.contentDir, { withFileTypes: true })
			)
				.filter((dirent) => dirent.isDirectory())
				.map((dirent) => dirent.name);

			if (pathDirectories.length === 0) {
				this.addError(
					"learning-paths",
					"No learning paths found in content directory",
				);
				return {
					errors: this.errors,
					success: false,
				};
			}

			const paths: Array<{
				slug: string;
				metadata: PathMetadata | null;
			}> = [];
			const allLessons = new Map<
				string,
				Array<{ file: string; metadata: LessonMetadata | null }>
			>();

			// Validate each path
			for (const pathSlug of pathDirectories) {
				const { metadata, lessons } =
					await this.validatePathDirectory(pathSlug);
				paths.push({ slug: pathSlug, metadata });
				allLessons.set(pathSlug, lessons);
			}

			// Validate order sequences and uniqueness
			this.validateOrderSequences(paths, allLessons);
			this.validateUniqueSlugs(paths, allLessons);

			const success = this.errors.length === 0;
			return { errors: this.errors, success };
		} catch (error) {
			this.addError(
				"validation",
				`Unexpected error during validation: ${error instanceof Error ? error.message : "Unknown error"}`,
			);
			return {
				errors: this.errors,
				success: false,
			};
		}
	}
}

// CLI execution
async function main() {
	const validator = new ContentValidator();
	const result = await validator.validate();

	// Print results
	if (result.errors.length > 0) {
		console.log("❌ Errors:");
		for (const error of result.errors) {
			console.log(`   ${error.file}: ${error.message}`);
		}
		console.log();
	}

	if (result.success) {
		console.log("✅ All content validation checks passed!");
	} else {
		console.log(
			`❌ Content validation failed with ${result.errors.length} error(s)`,
		);
		process.exit(1);
	}
}

if (require.main === module) {
	main().catch(console.error);
}

export { ContentValidator };
export type { ValidationResult, ValidationError };
