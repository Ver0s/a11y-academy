"use client";

import Link from "next/link";
import { BookOpen, Loader2 } from "lucide-react";
import { ThemeToggle } from "../theme/theme-toggle";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
	const user = false;
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSignOut = async () => {
		setLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const error = undefined;

		if (!error) {
			router.push("/");
		}

		setLoading(false);
	};

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
				{user ? (
					<Button
						variant="outline"
						size="sm"
						onClick={handleSignOut}
						disabled={loading}
						className="w-20"
					>
						{loading ? (
							<Loader2 className="animate-spin" />
						) : (
							"Sign out"
						)}
					</Button>
				) : (
					<div className="flex items-center gap-6">
						<Button asChild variant="outline" size="sm">
							<Link href="/signin">Sign in</Link>
						</Button>
						<Button asChild variant="default" size="sm">
							<Link href="/signup">Sign up</Link>
						</Button>
					</div>
				)}
				<ThemeToggle />
			</nav>
		</header>
	);
}
