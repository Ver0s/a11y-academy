"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { signUp } from "../actions/auth";

export default function SignUpPage() {
	const [isPending, startTransition] = useTransition();

	const handleSignUp = async (formData: FormData) => {
		startTransition(async () => {
			const email = formData.get("email") as string;
			const password = formData.get("password") as string;
			await signUp(email, password);
		});
	};

	return (
		<Card className="mx-auto w-full max-w-sm">
			<CardHeader>
				<CardTitle>Create an account</CardTitle>
				<CardDescription>
					Enter your email below to create an account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form action={handleSignUp}>
					<div className="flex flex-col gap-6">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								required
								name="email"
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								<a
									href="#"
									className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
								>
									Forgot your password?
								</a>
							</div>
							<Input
								id="password"
								type="password"
								required
								name="password"
							/>
						</div>
						<Button
							type="submit"
							className="w-full"
							disabled={isPending}
						>
							{isPending ? (
								<Loader2 className="animate-spin" />
							) : (
								"Sign up"
							)}
						</Button>
						<CardDescription>
							Already have an account?{" "}
							<Link href="/signin" className="text-primary">
								Sign in
							</Link>
						</CardDescription>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
