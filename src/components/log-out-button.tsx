"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LogOutButton() {
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
