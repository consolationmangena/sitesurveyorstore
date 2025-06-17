import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppGrid from "@/components/AppGrid";
import { ArrowRight, Code, Globe, Users, Zap, Star, Heart, Crown, Sparkles, Shield } from "lucide-react";

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
		app_type: "open_source",
		price: 0
	},
	{
		name: "Survey Report Generator",
		description:
			"Automated report generation from survey data with customizable templates and export options.",
		repoUrl: "https://github.com/sitesurveyor/survey-reports",
		icon: "database",
		tags: ["Reports", "Automation", "PDF"],
		download_count: 890,
		updated_at: "2024-06-08",
		category: "Reports",
		app_type: "open_source",
		price: 0
	},
	{
		name: "Coordinate Converter Pro",
		description:
			"Professional-grade coordinate system converter with advanced precision calculations and batch processing.",
		repoUrl: null,
		homepage_url: "https://geotools.africa/coord-converter-pro",
		icon: "database",
		tags: ["Coordinates", "Conversion", "Professional"],
		download_count: 156,
		updated_at: "2024-06-12",
		category: "Tools",
		app_type: "pro",
		price: 149.99,
		trial_available: true,
		trial_days: 14
	},
];

const features = [
	{
		icon: Code,
		title: "Open Source First",
		description:
			"Free tools with full source code access. No vendor lock-in, complete transparency.",
		color: "from-green-500 to-emerald-500"
	},
	{
		icon: Crown,
		title: "Professional Solutions",
		description:
			"Premium applications with advanced features, priority support, and enterprise capabilities.",
		color: "from-purple-500 to-yellow-500"
	},
	{
		icon: Globe,
		title: "Built for Africa",
		description:
			"Designed specifically for African geomatics challenges and workflows, globally accessible.",
		color: "from-blue-500 to-indigo-500"
	},
	{
		icon: Users,
		title: "Community Driven",
		description:
			"Developed by professionals, for professionals. Your contributions and feedback matter.",
		color: "from-orange-500 to-red-500"
	},
];

const stats = [
	{ label: "Free Tools", value: "12+", color: "text-green-600" },
	{ label: "Pro Apps", value: "8+", color: "text-purple-600" },
	{ label: "Downloads", value: "25K+", color: "text-blue-600" },
	{ label: "Countries", value: "15+", color: "text-orange-600" },
];

export default function Index() {
	return (
		<div className="min-h-screen bg-gradient-to-tl from-background via-secondary/5 to-primary/5">
			<div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-primary/30" />
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_10%,theme(colors.primary/25),transparent_60%)] opacity-60 pointer-events-none" />
			</div>
			<div className="relative">
				<Header
					title="SiteSurveyor"
					subtitle="Professional Geomatics Solutions"
				/>

				{/* Hero Section */}
				<section className="relative isolate pt-14">
					<div className="mx-auto py-24 sm:py-32 container">
						<div className="mx-auto max-w-7xl px-6 lg:px-8">
							<div className="mx-auto max-w-4xl text-center flex flex-col items-center justify-center">
								<div className="w-fit mx-auto pb-3">
									<span className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary/80 to-secondary/90 text-white font-bold uppercase rounded-full text-xs tracking-widest shadow-md">
										<Sparkles className="w-4 h-4" />
										Free & Professional Tools
									</span>
								</div>
								<h1 className="text-5xl md:text-7xl font-extrabold gradient-text bg-gradient-to-r from-primary via-purple-600 to-secondary text-transparent bg-clip-text mb-5 drop-shadow">
									Complete Geomatics Ecosystem
								</h1>
								<p className="text-lg md:text-xl text-gray-700 font-medium mb-10 leading-relaxed max-w-3xl mx-auto">
									From free open-source tools to premium professional solutions. 
									Everything you need for modern surveying, GIS, and spatial analysis - 
									built by African professionals for the global community.
								</p>
								<div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
									<a
										href="/appstore"
										className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200"
									>
										Explore All Apps
										<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
									</a>
									<a
										href="https://github.com/consolationmangena/sitesurveyor"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-3 px-10 py-4 border border-secondary bg-white font-bold text-lg rounded-full text-secondary hover:border-accent shadow-lg hover:shadow-xl transition-all hover:scale-105"
									>
										<Code className="w-5 h-5" />
										View Source
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Enhanced Stats Section */}
				<section className="py-20 sm:py-28">
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<div className="bg-white/80 rounded-3xl shadow-xl mx-auto max-w-5xl px-10 py-10">
							<div className="text-center mb-8">
								<h2 className="text-2xl font-bold text-slate-800 mb-2">Platform Overview</h2>
								<p className="text-slate-600">Comprehensive solutions for every need and budget</p>
							</div>
							<div className="flex flex-wrap justify-center gap-8">
								{stats.map((stat, i) => (
									<div key={i} className="flex flex-col items-center w-36">
										<dt className="text-base text-gray-500 mb-2">{stat.label}</dt>
										<dd className={`text-4xl md:text-5xl font-black ${stat.color} drop-shadow mb-2`}>
											{stat.value}
										</dd>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Enhanced Features Section */}
				<section className="py-24 sm:py-32 relative">
					<div className="absolute inset-0 -z-10 bg-white opacity-10 pointer-events-none" />
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<div className="mx-auto max-w-3xl text-center mb-16">
							<h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-4">
								Why Choose SiteSurveyor?
							</h2>
							<p className="text-lg leading-8 text-slate-600 font-medium">
								The only platform offering both free open-source tools and premium professional solutions 
								for the geomatics industry.
							</p>
						</div>
						<div className="mx-auto mt-16 max-w-6xl">
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
								{features.map((feature, index) => (
									<div key={index} className="group flex flex-col bg-white rounded-3xl shadow-lg p-8 items-center hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 border border-slate-100">
										<div className={`relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
											<feature.icon className="w-8 h-8 text-white" />
										</div>
										<h3 className="text-xl font-bold text-slate-900 mb-3 text-center">{feature.title}</h3>
										<p className="text-base text-slate-600 text-center leading-relaxed">{feature.description}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Enhanced Featured Apps Section */}
				<section className="py-24 sm:py-32">
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<div className="mx-auto max-w-3xl text-center lg:max-w-5xl mb-16">
							<h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-purple-600 to-secondary bg-clip-text text-transparent sm:text-6xl mb-4">
								Featured Applications
							</h2>
							<p className="text-lg leading-8 text-slate-600 mb-8">
								Discover our most popular tools - from free open-source solutions to premium professional applications.
							</p>
							<div className="flex items-center justify-center gap-6 flex-wrap">
								<div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
									<Sparkles className="w-4 h-4 text-green-600" />
									<span className="text-green-700 font-semibold">Free & Open Source</span>
								</div>
								<div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200">
									<Crown className="w-4 h-4 text-purple-600" />
									<span className="text-purple-700 font-semibold">Professional Solutions</span>
								</div>
							</div>
						</div>
						<div className="mx-auto max-w-7xl">
							<AppGrid apps={apps} />
						</div>
						<div className="mt-16 flex justify-center">
							<a
								href="/appstore"
								className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary via-purple-600 to-secondary px-12 py-4 text-lg font-bold text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
							>
								View All Apps
								<ArrowRight className="w-5 h-5" />
							</a>
						</div>
					</div>
				</section>

				{/* Enhanced Community Section */}
				<section className="py-24 sm:py-32 relative isolate">
					<div className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
						<div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary via-purple-600 to-secondary opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
							style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
					</div>

					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-16 sm:py-24 lg:px-8 shadow-2xl relative overflow-hidden">
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,theme(colors.blue.500/20),transparent_50%)]"></div>
							<div className="mx-auto max-w-3xl text-center relative">
								<h2 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-yellow-200 sm:text-6xl">
									Join the Revolution
								</h2>
								<p className="mt-6 text-lg leading-8 text-gray-300">
									Whether you need free tools or professional solutions, we have you covered. 
									Join thousands of professionals already using SiteSurveyor applications worldwide.
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