import AppGrid from "@/components/AppGrid";
import { ArrowRight, Code, Globe, Users, Zap, Star, Heart, Crown, Sparkles, Shield, CheckCircle, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const apps = [
	{
		id: "1",
		name: "Site Survey Tool",
		description:
			"A comprehensive tool for site surveying and mapping in the field with GPS integration and offline capabilities.",
		repoUrl: "https://github.com/sitesurveyor/survey-tool",
		icon: "map",
		tags: ["surveying", "mapping", "gis", "field-work"],
		download_count: 1250,
		updated_at: "2024-06-10",
		category: "Field Tools",
		app_type: "open_source",
		price: 0
	},
	{
		id: "2",
		name: "GIS Data Viewer",
		description:
			"View and analyze GIS data with this powerful viewer application supporting multiple file formats.",
		repoUrl: "https://github.com/sitesurveyor/gis-viewer",
		icon: "database",
		tags: ["gis", "data", "visualization", "analysis"],
		download_count: 890,
		updated_at: "2024-06-08",
		category: "Data Analysis",
		app_type: "open_source",
		price: 0
	},
	{
		id: "3",
		name: "Coordinate Converter Pro",
		description:
			"Professional-grade coordinate system converter with advanced precision calculations and batch processing capabilities.",
		repoUrl: null,
		homepage_url: "https://geotools.africa/coord-converter-pro",
		icon: "database",
		tags: ["coordinates", "conversion", "precision", "surveying", "professional"],
		download_count: 156,
		updated_at: "2024-06-12",
		category: "Utilities",
		app_type: "pro",
		price: 149.99,
		trial_available: true,
		trial_days: 14
	},
];

const features = [
	{
		icon: Code,
		title: "Open Source Foundation",
		description:
			"Transparent, community-driven development with full source code access and no vendor lock-in.",
		color: "from-emerald-600 to-emerald-700"
	},
	{
		icon: Crown,
		title: "Professional Solutions",
		description:
			"Enterprise-grade applications with advanced features, priority support, and commercial licensing.",
		color: "from-blue-600 to-blue-700"
	},
	{
		icon: Globe,
		title: "Global Standards",
		description:
			"Built for African challenges while maintaining compatibility with international geomatics standards.",
		color: "from-purple-600 to-purple-700"
	},
	{
		icon: Users,
		title: "Expert Community",
		description:
			"Developed by geomatics professionals for professionals, with continuous feedback and improvement.",
		color: "from-orange-600 to-orange-700"
	},
];

const stats = [
	{ label: "Open Source Tools", value: "12+", color: "text-emerald-600", icon: Code },
	{ label: "Professional Apps", value: "8+", color: "text-blue-600", icon: Crown },
	{ label: "Total Downloads", value: "25K+", color: "text-purple-600", icon: TrendingUp },
	{ label: "Countries Served", value: "15+", color: "text-orange-600", icon: Globe },
];

const benefits = [
	{
		title: "Cost Effective",
		description: "Reduce software licensing costs by up to 80% with our open-source alternatives",
		icon: CheckCircle
	},
	{
		title: "Industry Standard",
		description: "Full compatibility with established geomatics workflows and data formats",
		icon: Award
	},
	{
		title: "Continuous Innovation",
		description: "Regular updates and new features driven by real-world professional needs",
		icon: Sparkles
	},
	{
		title: "Expert Support",
		description: "Professional support options and comprehensive documentation available",
		icon: Shield
	}
];

export default function Index() {
	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="section-professional border-b border-border/40">
				<div className="container-professional">
					<div className="mx-auto max-w-4xl text-center space-professional-lg">
						<div className="space-professional-md">
							<div className="inline-flex items-center space-x-2 rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground">
								<Sparkles className="h-4 w-4" />
								<span>Professional Geomatics Platform</span>
							</div>
							<h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
								Advanced Geomatics Solutions for{" "}
								<span className="gradient-text-professional">Modern Professionals</span>
							</h1>
							<p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
								Comprehensive platform offering both open-source tools and premium professional applications 
								for surveying, GIS, and spatial analysis. Built by experts, trusted by professionals worldwide.
							</p>
						</div>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button size="lg" className="btn-professional-primary h-12 px-8 text-base" asChild>
								<a href="/appstore">
									Explore Applications
									<ArrowRight className="ml-2 h-4 w-4" />
								</a>
							</Button>
							<Button variant="outline" size="lg" className="btn-professional-outline h-12 px-8 text-base" asChild>
								<a href="https://github.com/consolationmangena/sitesurveyor" target="_blank" rel="noopener noreferrer">
									<Code className="mr-2 h-4 w-4" />
									View Source Code
								</a>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="section-professional bg-muted/30">
				<div className="container-professional">
					<div className="grid grid-cols-2 gap-8 md:grid-cols-4">
						{stats.map((stat, index) => (
							<div key={index} className="text-center space-professional-xs">
								<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-background shadow-professional">
									<stat.icon className={`h-6 w-6 ${stat.color}`} />
								</div>
								<div className={`text-3xl font-bold ${stat.color}`}>
									{stat.value}
								</div>
								<div className="text-sm font-medium text-muted-foreground">
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="section-professional">
				<div className="container-professional">
					<div className="mx-auto max-w-3xl text-center space-professional-md">
						<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
							Why Choose SiteSurveyor?
						</h2>
						<p className="text-lg text-muted-foreground">
							The only platform offering both open-source tools and premium professional solutions 
							for the geomatics industry.
						</p>
					</div>
					<div className="mx-auto mt-16 max-w-6xl">
						<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
							{features.map((feature, index) => (
								<div key={index} className="card-professional-hover p-6 text-center">
									<div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${feature.color} shadow-professional`}>
										<feature.icon className="h-6 w-6 text-white" />
									</div>
									<h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="section-professional bg-muted/30">
				<div className="container-professional">
					<div className="mx-auto max-w-3xl text-center space-professional-md">
						<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
							Professional Advantages
						</h2>
						<p className="text-lg text-muted-foreground">
							Measurable benefits for your organization and projects.
						</p>
					</div>
					<div className="mx-auto mt-16 max-w-4xl">
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
							{benefits.map((benefit, index) => (
								<div key={index} className="flex items-start space-x-4 rounded-lg bg-background p-6 shadow-professional">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
										<benefit.icon className="h-5 w-5 text-primary" />
									</div>
									<div>
										<h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3>
										<p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Featured Applications Section */}
			<section className="section-professional">
				<div className="container-professional">
					<div className="mx-auto max-w-3xl text-center space-professional-md">
						<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
							Featured Applications
						</h2>
						<p className="text-lg text-muted-foreground">
							Discover our most popular professional-grade geomatics tools.
						</p>
						<div className="flex items-center justify-center gap-6 mt-6">
							<div className="flex items-center space-x-2 text-sm text-muted-foreground">
								<div className="h-2 w-2 rounded-full bg-emerald-500"></div>
								<span>Open Source</span>
							</div>
							<div className="flex items-center space-x-2 text-sm text-muted-foreground">
								<div className="h-2 w-2 rounded-full bg-blue-500"></div>
								<span>Professional</span>
							</div>
						</div>
					</div>
					<div className="mx-auto mt-16 max-w-7xl">
						<AppGrid apps={apps} />
					</div>
					<div className="mt-12 text-center">
						<Button size="lg" className="btn-professional-primary h-12 px-8 text-base" asChild>
							<a href="/appstore">
								View All Applications
								<ArrowRight className="ml-2 h-4 w-4" />
							</a>
						</Button>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="section-professional bg-foreground text-background">
				<div className="container-professional">
					<div className="mx-auto max-w-4xl text-center space-professional-md">
						<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
							Ready to Transform Your Workflow?
						</h2>
						<p className="text-xl text-background/80">
							Join thousands of geomatics professionals already using SiteSurveyor applications worldwide.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button size="lg" variant="secondary" className="h-12 px-8 text-base" asChild>
								<a href="/request-solution">
									<Heart className="mr-2 h-4 w-4" />
									Request Solution
								</a>
							</Button>
							<Button size="lg" variant="outline" className="h-12 px-8 text-base border-background/20 text-background hover:bg-background/10" asChild>
								<a href="https://github.com/consolationmangena/sitesurveyor" target="_blank" rel="noopener noreferrer">
									<Star className="mr-2 h-4 w-4" />
									Contribute on GitHub
								</a>
							</Button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}