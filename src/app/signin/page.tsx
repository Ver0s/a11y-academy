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
import Link from "next/link";
import { useTransition } from "react";
import { signIn } from "../actions/auth";

export default function SignInPage() {
	const [isPending, startTransition] = useTransition();

	const handleSignIn = async (formData: FormData) => {
		startTransition(async () => {
			const email = formData.get("email") as string;
			const password = formData.get("password") as string;
			await signIn(email, password);
		});
	};

	return (
		<Card className="mx-auto w-full max-w-sm">
			<CardHeader>
				<CardTitle>Login to your account</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form action={handleSignIn}>
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
							loading={isPending}
						>
							Sign in
						</Button>
						<CardDescription>
							Don&apos;t have an account?{" "}
							<Link href="/signup" className="text-primary">
								Sign in
							</Link>
						</CardDescription>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
