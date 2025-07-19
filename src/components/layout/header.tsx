import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { getCurrentUser } from "@/lib/supabase/server";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import SignOutButton from "../sign-out-button";
import { ThemeToggle } from "../theme/theme-toggle";
import { Fragment } from "react";

export default async function Component() {
	const user = await getCurrentUser();

	return (
		<header className="border-b px-4 md:px-6">
			<div className="flex h-16 items-center justify-between gap-4">
				<div className="flex items-center gap-2">
					<div className="flex items-center gap-6">
						<Link
							href="/"
							className="text-primary flex items-center gap-2"
						>
							<BookOpen className="h-6 w-6" aria-label="Home" />
							<span className="hidden text-xl font-bold md:block">
								a11y academy
							</span>
						</Link>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<NavigationMenu className="max-md:hidden">
						<NavigationMenuList className="gap-2">
							<NavigationMenuItem>
								<Link
									href="/learning-paths"
									className="hover:text-primary text-sm font-medium"
								>
									Learning Paths
								</Link>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
					<ThemeToggle />
					{user ? (
						<SignOutButton />
					) : (
						<Fragment>
							<Button asChild variant="outline" size="sm">
								<Link href="/signin">Sign in</Link>
							</Button>
							<Button asChild variant="default" size="sm">
								<Link href="/signup">Sign up</Link>
							</Button>
						</Fragment>
					)}
					<Popover>
						<PopoverTrigger asChild>
							<Button
								className="group size-8 md:hidden"
								variant="ghost"
								size="icon"
								aria-label="Menu"
							>
								<svg
									className="pointer-events-none"
									width={16}
									height={16}
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M4 12L20 12"
										className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
									/>
									<path
										d="M4 12H20"
										className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
									/>
									<path
										d="M4 12H20"
										className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
									/>
								</svg>
							</Button>
						</PopoverTrigger>
						<PopoverContent
							align="start"
							className="w-36 p-1 md:hidden"
						>
							<NavigationMenu className="max-w-none *:w-full">
								<NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
									<NavigationMenuItem className="pl-1">
										<Link
											href="/learning-paths"
											className="hover:text-primary text-sm font-medium"
										>
											Learning Paths
										</Link>
									</NavigationMenuItem>
								</NavigationMenuList>
							</NavigationMenu>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</header>
	);
}
