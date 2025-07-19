"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		// Return a placeholder button that matches the expected structure
		// but doesn't depend on theme state
		return (
			<div className="flex items-center gap-2">
				<Button
					aria-label="Toggle theme"
					variant="outline"
					className="rounded-full border-none shadow-none"
					size="icon"
					disabled
				>
					<Sun className="h-[1.2rem] w-[1.2rem]" />
				</Button>
			</div>
		);
	}

	const sun = <Sun className="h-[1.2rem] w-[1.2rem]" />;
	const moon = <Moon className="h-[1.2rem] w-[1.2rem]" />;

	return (
		<div className="flex items-center gap-2">
			<Button
				aria-label="Toggle theme"
				variant="outline"
				className="rounded-full border-none shadow-none"
				size="icon"
				onClick={() =>
					setTheme(resolvedTheme === "dark" ? "light" : "dark")
				}
			>
				{resolvedTheme === "dark" ? sun : moon}
			</Button>
		</div>
	);
}
