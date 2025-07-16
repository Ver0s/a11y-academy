"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { signOut } from "@/app/actions/auth";

export default function SignOutButton() {
	const [isPending, startTransition] = useTransition();

	const handleSignOut = async () => {
		startTransition(async () => {
			await signOut();
		});
	};

	return (
		<Button
			variant="outline"
			size="sm"
			onClick={handleSignOut}
			disabled={isPending}
			loading={isPending}
		>
			Sign out
		</Button>
	);
}
