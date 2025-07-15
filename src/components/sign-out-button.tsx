"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { signOut } from "@/app/actions/auth";

export default function SignOutButton() {
	const [loading, setLoading] = useState(false);

	const handleSignOut = async () => {
		setLoading(true);
		await signOut();

		setLoading(false);
	};

	return (
		<Button
			variant="outline"
			size="sm"
			onClick={handleSignOut}
			disabled={loading}
			className="w-20"
		>
			{loading ? <Loader2 className="animate-spin" /> : "Sign out"}
		</Button>
	);
}
