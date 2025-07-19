"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
	const { setTheme, theme } = useTheme();
	const sun = <Sun className="h-[1.2rem] w-[1.2rem]" />;
	const moon = <Moon className="h-[1.2rem] w-[1.2rem]" />;

	return (
		<div className="flex items-center gap-2">
			<Button
				aria-label="Toggle theme"
				variant="outline"
				className="rounded-full border-none shadow-none"
				size="icon"
				onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			>
				{theme === "dark" ? sun : moon}
			</Button>
		</div>
	);
}
