import Link from "next/link";
import { BookOpen } from "lucide-react";
import { ThemeToggle } from "../theme/theme-toggle";
import { Button } from "../ui/button";
import SignOutButton from "../sign-out-button";
import { getCurrentUser } from "@/lib/supabase/server";

export default async function Header() {
	const user = await getCurrentUser();

	return (
		<header className="bg-background sticky top-0 z-50 flex w-full justify-between border-b px-6 py-4">
			<Link href="/" className="flex items-center gap-2">
				<BookOpen className="h-6 w-6" />
				<span className="text-xl font-bold">a11y academy</span>
			</Link>

			<nav className="hidden items-center gap-4 md:flex">
				<Link
					href="/learning-paths"
					className="hover:text-primary text-sm font-medium"
				>
					Learning Paths
				</Link>
				<ThemeToggle />
				{user ? (
					<SignOutButton />
				) : (
					<div className="flex items-center gap-4">
						<Button asChild variant="outline" size="sm">
							<Link href="/signin">Sign in</Link>
						</Button>
						<Button asChild variant="default" size="sm">
							<Link href="/signup">Sign up</Link>
						</Button>
					</div>
				)}
			</nav>
		</header>
	);
}
