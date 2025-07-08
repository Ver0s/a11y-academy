import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<main>
			<section className="from-background to-muted/20 flex justify-center bg-gradient-to-b px-4 py-20 text-center">
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
		</main>
	);
}
