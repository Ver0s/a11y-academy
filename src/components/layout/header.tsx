import Link from "next/link";
import { BookOpen } from "lucide-react";
import { ThemeToggle } from "../theme/theme-toggle";

export default function Header() {
	return (
		<header className="bg-background sticky top-0 z-50 flex w-full justify-between border-b px-6 py-4">
			<Link href="/" className="flex items-center gap-2">
				<BookOpen className="h-6 w-6" />
				<span className="text-xl font-bold">a11y academy</span>
			</Link>

			<nav className="hidden items-center gap-6 md:flex">
				<Link
					href="/learning-paths"
					className="hover:text-primary text-sm font-medium"
				>
					Learning Paths
				</Link>
				<ThemeToggle />
			</nav>
		</header>
	);
}
