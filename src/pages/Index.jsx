import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppGrid from "@/components/AppGrid";
import { ArrowRight, Code, Globe, Users, Zap, Star, Download, Heart } from "lucide-react";

const apps = [
	{
		name: "GeoDataCollector",
		description:
			"A mobile-first data collection tool for field surveys with offline capabilities and GPS integration.",
		repoUrl: "https://github.com/sitesurveyor/geodatacollector",
		icon: "map",
		tags: ["Mobile", "GPS", "Survey"],
		download_count: 1250,
		updated_at: "2024-06-10",
		category: "Data Collection",
	},
	{
		name: "Survey Report Generator",
		description:
			"Automated report generation from survey data with customizable templates and export options.",
		repoUrl: "https://github.com/sitesurveyor/survey-reports",
		icon: "book",
		tags: ["Reports", "Automation", "PDF"],
		download_count: 890,
		updated_at: "2024-06-08",
		category: "Reports",
	},
	{
		name: "Coordinate Converter",
		description:
			"Convert between different coordinate systems and datums with high precision calculations.",
		repoUrl: "https://github.com/sitesurveyor/coord-converter",
		icon: "database",
		tags: ["Coordinates", "Conversion", "Precision"],
		download_count: 2100,
		updated_at: "2024-06-12",
		category: "Tools",
	},
];

const features = [
	{
		icon: Code,
		title: "Open Source First",
		description:
			"All tools are completely open source and free to use, modify, and distribute.",
	},
	{
		icon: Globe,
		title: "Built for Africa",
		description:
			"Designed specifically for African geomatics challenges and workflows.",
	},
	{
		icon: Users,
		title: "Community Driven",
		description:
			"Developed by the community, for the community. Your contributions matter.",
	},
	{
		icon: Zap,
		title: "Production Ready",
		description:
			"Enterprise-grade tools that are battle-tested in real-world scenarios.",
	},
];

const stats = [
	{ label: "Active Tools", value: "15+" },
	{ label: "Downloads", value: "10K+" },
	{ label: "Contributors", value: "50+" },
	{ label: "Countries", value: "12+" },
];

export default function Index() {
	return (
		<div className="min-h-screen">
			<div className="absolute inset-0 -z-10 h-full w-full">
				{/* Play Store inspired gradient – UPDATED: removed yellow, used more green/blue and white */}
				<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-white opacity-95" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,theme(colors.primary/40),white_60%)] opacity-80 pointer-events-none" />
			</div>
			<div className="relative">
				<Header
					title="SiteSurveyor"
					subtitle="Africa's Open-Source Geomatics Appstore"
				/>

				{/* Hero Section */}
				<section className="relative isolate pt-14">
					<div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
						{/* Play green/blue gradient accent */}
						<div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
					</div>
					<div className="py-24 sm:py-32 container mx-auto">
						<div className="mx-auto max-w-7xl px-6 lg:px-8">
							<div className="mx-auto max-w-4xl text-center">
								<h1 className="text-4xl font-black sm:text-7xl bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text mb-6 transition-colors">
									Revolutionizing African Geomatics
								</h1>
								<p className="text-lg md:text-xl text-foreground font-medium mx-auto mb-8 leading-relaxed max-w-2xl">
									Discover, contribute, and innovate with our growing
									collection of open-source geomatics tools. Built by
									African professionals, for the global community.
								</p>
								<div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
									<a
										href="/appstore"
										className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
									>
										Explore Apps
										<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
									</a>
									<a
										href="https://github.com/consolationmangena/sitesurveyor"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-3 bg-white text-foreground px-8 py-4 rounded-2xl font-bold text-lg border-2 border-secondary hover:border-accent shadow-lg hover:shadow-xl transition-all hover:scale-105"
									>
										<Code className="w-5 h-5" />
										View Source
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Stats Section */}
				<section className="py-24 sm:py-32">
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<div className="mx-auto max-w-2xl lg:max-w-none">
							<div className="grid grid-cols-2 lg:grid-cols-4 text-center gap-8">
								{stats.map((stat, index) => (
									<div
										key={index}
										className="mx-auto flex max-w-xs flex-col gap-y-4"
									>
										<dt className="text-base leading-7 text-slate-600 order-last">
											{stat.label}
										</dt>
										<dd className="order-first text-3xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
											{stat.value}
										</dd>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section className="py-24 sm:py-32 relative">
					<div className="absolute inset-0 -z-10 bg-white opacity-20" />
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<div className="mx-auto max-w-2xl text-center">
							<h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl mb-4">
								Why Choose SiteSurveyor?
							</h2>
							<p className="text-lg leading-8 text-slate-600 font-medium">
								We're not just another app store. We're a movement to
								democratize geomatics technology across Africa.
							</p>
						</div>

						<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
							<div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
								{features.map((feature, index) => (
									<div key={index} className="group flex flex-col">
										<div className="relative mb-6">
											<div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 opacity-25 blur transition group-hover:opacity-75" />
											<div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-900 p-6">
												<feature.icon className="h-8 w-8 text-white" />
												<div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,theme(colors.blue.500/30),theme(colors.indigo.600/30))]" />
											</div>
										</div>
										<h3 className="text-xl font-bold text-slate-900 mb-3">
											{feature.title}
										</h3>
										<p className="text-base leading-7 text-slate-600 mb-4 flex-auto">
											{feature.description}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Featured Apps Section */}
				<section className="py-24 sm:py-32">
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
							<h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent sm:text-6xl transition-colors">
								Featured Applications
							</h2>
							<p className="mt-6 text-lg leading-8 text-slate-600">
								Explore our most popular tools that are transforming how
								professionals work with spatial data.
							</p>
						</div>

						<div className="mx-auto mt-16 max-w-7xl">
							<AppGrid apps={apps} />
						</div>

						<div className="mt-16 flex justify-center">
							<a
								href="/appstore"
								className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-secondary px-10 py-4 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
							>
								View All Apps
								<ArrowRight className="w-5 h-5" />
							</a>
						</div>
					</div>
				</section>

				{/* Community Section */}
				<section className="py-24 sm:py-32 relative isolate">
					<div className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
						<div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-secondary opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
							style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
					</div>

					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-16 sm:py-24 lg:px-8 shadow-2xl relative overflow-hidden">
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,theme(colors.blue.500/20),transparent_50%)]"></div>
							<div className="mx-auto max-w-2xl text-center relative">
								<h2 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200 sm:text-6xl">
									Join the Revolution
								</h2>
								<p className="mt-6 text-lg leading-8 text-gray-300">
									Having an idea for a geomatics tool? Found a problem that
									needs solving? Be part of building the future of African
									geomatics technology.
								</p>
								<div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
									<a
										href="/request-solution"
										className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all hover:-translate-y-0.5"
									>
										<Heart className="w-5 h-5" />
										Request a Solution
									</a>
									<a
										href="https://github.com/consolationmangena/sitesurveyor"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-semibold text-white ring-1 ring-inset ring-white/20 hover:ring-white/30 hover:bg-white/10 transition-all hover:-translate-y-0.5"
									>
										<Star className="w-5 h-5" />
										Contribute on GitHub
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>

				<Footer />
			</div>
		</div>
	);
}
