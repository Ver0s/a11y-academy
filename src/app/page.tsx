import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { BookOpen, Users, Award } from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<main>
			<section className="from-background to-muted/20 flex justify-center bg-gradient-to-b px-6 py-16 text-center">
				<div className="container max-w-4xl">
					<h1 className="mb-6 text-4xl font-bold md:text-6xl">
						Master Digital{" "}
						<span className="text-primary">Accessibility</span>
					</h1>
					<p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
						Learn to create inclusive digital experiences through
						interactive modules, quizzes, and hands-on practice.
						Built by the community, for the community.
					</p>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<Button size="lg" asChild>
							<Link href="/learning-paths">Start Learning</Link>
						</Button>
						<Button size="lg" variant="outline" asChild>
							<Link href="http://github.com/">Contribute</Link>
						</Button>
					</div>
				</div>
			</section>
			<section className="px-6 py-16">
				<h2 className="mb-12 text-center text-3xl font-bold">
					Why Choose a11y academy?
				</h2>
				<div className="grid gap-8 md:grid-cols-3">
					<Card>
						<CardHeader>
							<BookOpen className="text-primary mb-4 h-10 w-10" />
							<CardTitle>Structured Learning</CardTitle>
							<CardDescription>
								Progressive modules covering WCAG guidelines,
								best practices, and real-world implementation
								techniques.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<Users className="text-primary mb-4 h-10 w-10" />
							<CardTitle>Community Driven</CardTitle>
							<CardDescription>
								Content created and maintained by accessibility
								experts and practitioners from around the world.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<Award className="text-primary mb-4 h-10 w-10" />
							<CardTitle>Track Progress</CardTitle>
							<CardDescription>
								Monitor your learning journey with detailed
								progress tracking and achievement badges.
							</CardDescription>
						</CardHeader>
					</Card>
				</div>
			</section>
		</main>
	);
}
