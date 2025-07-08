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
		<main className="px-6">
			<section className="from-background to-muted/20 flex justify-center bg-gradient-to-b py-16 text-center">
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
			<section className="py-16">
				<div className="container mx-auto max-w-7xl">
					<h2 className="mb-12 text-center text-3xl font-bold">
						Why Choose a11y academy?
					</h2>
					<div className="grid gap-8 md:grid-cols-3">
						<Card>
							<CardHeader>
								<BookOpen className="text-primary mb-4 h-10 w-10" />
								<CardTitle>Structured Learning</CardTitle>
								<CardDescription>
									Progressive modules covering WCAG
									guidelines, best practices, and real-world
									implementation techniques.
								</CardDescription>
							</CardHeader>
						</Card>
						<Card>
							<CardHeader>
								<Users className="text-primary mb-4 h-10 w-10" />
								<CardTitle>Community Driven</CardTitle>
								<CardDescription>
									Content created and maintained by
									accessibility experts and practitioners from
									around the world.
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
				</div>
			</section>
			<section className="bg-muted/20 py-16">
				<div className="container mx-auto max-w-6xl">
					<div className="mb-12 text-center">
						<h2 className="mb-6 text-3xl font-bold">
							What You&apos;ll Learn
						</h2>
						<p className="text-muted-foreground text-lg">
							Master practical accessibility skills through
							hands-on learning and real-world examples.
						</p>
					</div>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						<div className="bg-background rounded-lg border p-6">
							<h3 className="mb-3 text-lg font-semibold">
								Semantic HTML Structure
							</h3>
							<p className="text-muted-foreground mb-3 text-sm">
								Learn to use proper HTML elements like headings,
								landmarks, and lists to create meaningful
								document structure.
							</p>
							<ul className="space-y-1 text-sm">
								<li>• Using h1-h6 for logical hierarchy</li>
								<li>• Navigation and main content areas</li>
								<li>• When to use articles vs sections</li>
							</ul>
						</div>

						<div className="bg-background rounded-lg border p-6">
							<h3 className="mb-3 text-lg font-semibold">
								ARIA Labels & Roles
							</h3>
							<p className="text-muted-foreground mb-3 text-sm">
								Master ARIA attributes to make complex
								interfaces accessible to screen readers and
								assistive technologies.
							</p>
							<ul className="space-y-1 text-sm">
								<li>• aria-label for descriptive names</li>
								<li>• aria-expanded for dropdowns</li>
								<li>• Custom component roles</li>
							</ul>
						</div>

						<div className="bg-background rounded-lg border p-6">
							<h3 className="mb-3 text-lg font-semibold">
								Keyboard Navigation
							</h3>
							<p className="text-muted-foreground mb-3 text-sm">
								Ensure your websites work perfectly for users
								who navigate with keyboards instead of mice.
							</p>
							<ul className="space-y-1 text-sm">
								<li>• Focus management and indicators</li>
								<li>• Tab order and skip links</li>
								<li>• Modal and dropdown patterns</li>
							</ul>
						</div>

						<div className="bg-background rounded-lg border p-6">
							<h3 className="mb-3 text-lg font-semibold">
								Color & Contrast
							</h3>
							<p className="text-muted-foreground mb-3 text-sm">
								Design with sufficient contrast ratios and avoid
								relying solely on color to convey information.
							</p>
							<ul className="space-y-1 text-sm">
								<li>• WCAG contrast requirements</li>
								<li>• Color blindness considerations</li>
								<li>• Testing tools and techniques</li>
							</ul>
						</div>

						<div className="bg-background rounded-lg border p-6">
							<h3 className="mb-3 text-lg font-semibold">
								Form Accessibility
							</h3>
							<p className="text-muted-foreground mb-3 text-sm">
								Create forms that are easy to understand and
								complete for all users, including those using
								assistive technology.
							</p>
							<ul className="space-y-1 text-sm">
								<li>• Proper labels and descriptions</li>
								<li>• Error handling and validation</li>
								<li>• Fieldset and legend usage</li>
							</ul>
						</div>

						<div className="bg-background rounded-lg border p-6">
							<h3 className="mb-3 text-lg font-semibold">
								Testing & Tools
							</h3>
							<p className="text-muted-foreground mb-3 text-sm">
								Learn to test your work with automated tools,
								manual testing, and real assistive technologies.
							</p>
							<ul className="space-y-1 text-sm">
								<li>• Screen reader testing</li>
								<li>• Automated accessibility scanners</li>
								<li>• Manual testing checklists</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
