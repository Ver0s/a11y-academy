"use client";

import Link from "next/link";
import { BookOpen, LogOut, User } from "lucide-react";
import { ThemeToggle } from "../theme/theme-toggle";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function Header() {
	const user = undefined;

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
					<>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="relative h-8 w-8 rounded-full"
								>
									<Avatar className="h-8 w-8">
										<AvatarFallback>
											<User />
										</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-56"
								align="end"
								forceMount
							>
								<div className="flex items-center justify-start gap-2 p-2">
									<div className="flex flex-col space-y-1 leading-none">
										<p className="text-muted-foreground w-[200px] truncate text-sm">
											testmail@test.com
										</p>
									</div>
								</div>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={() => {}}>
									<LogOut className="mr-2 h-4 w-4" />
									Sign out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</>
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
