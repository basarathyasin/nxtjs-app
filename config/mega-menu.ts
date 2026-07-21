export type MegaMenuIconName =
	| "barChart"
	| "bookOpen"
	| "bot"
	| "building"
	| "chartLine"
	| "clipboardList"
	| "contact"
	| "creditCard"
	| "fileText"
	| "gauge"
	| "handshake"
	| "heartPulse"
	| "home"
	| "layers"
	| "network"
	| "packageSearch"
	| "scale"
	| "scanLine"
	| "settings"
	| "shieldCheck"
	| "sparkles"
	| "stickyNote"
	| "users";

export type MegaMenuLink = {
	title: string;
	href: string;
	description?: string;
	icon?: MegaMenuIconName;
};

export type MegaMenuPanel = {
	id: string;
	title: string;
	href?: string;
	eyebrow?: string;
	items: MegaMenuLink[];
};

export type MegaMenuPromo = {
	eyebrow: string;
	title: string;
	description: string;
	href: string;
};

export type MegaMenuItem = {
	title: string;
	href?: string;
	layout?: "wide" | "medium" | "compact";
	panels?: MegaMenuPanel[];
	promo?: MegaMenuPromo;
};

export type MegaMenuConfig = {
	brand: {
		name: string;
		href: string;
	};
	items: MegaMenuItem[];
	actions: {
		signIn: MegaMenuLink;
		getStarted: MegaMenuLink;
	};
};

const springReleasePromo: MegaMenuPromo = {
	eyebrow: "Spring Release",
	title: "Faster & Flexible",
	description: "If you ask most dental clinics",
	href: "/spring-release",
};

export const megaMenuConfig: MegaMenuConfig = {
	brand: {
		name: "Dentira",
		href: "/",
	},
	items: [
		{
			title: "Platform",
			layout: "wide",
			panels: [
				{
					id: "dentira-supplies",
					title: "Dentira Supplies",
					href: "/platform/dentira-supplies",
					eyebrow: "Dentira Supplies",
					items: [
						{ title: "Overview", href: "/platform/dentira-supplies", icon: "home" },
						{ title: "How It Works", href: "/platform/dentira-supplies/how-it-works", icon: "settings" },
						{ title: "Marketplace Intelligence", href: "/platform/dentira-supplies/marketplace-intelligence", icon: "barChart" },
						{ title: "Procurement Operations", href: "/platform/dentira-supplies/procurement", icon: "clipboardList" },
						{ title: "Inventory tracking & Data Analytics", href: "/platform/dentira-supplies/inventory-analytics", icon: "chartLine" },
						{ title: "Integrations", href: "/platform/dentira-supplies/integrations", icon: "network" },
					],
				},
				{
					id: "dentira-labs",
					title: "Dentira Labs",
					href: "/platform/dentira-labs",
					eyebrow: "Dentira Labs",
					items: [
						{ title: "Overview", href: "/platform/dentira-labs", icon: "home" },
						{ title: "How it works", href: "/platform/dentira-labs/how-it-works", icon: "settings" },
						{ title: "Labs & Price Comparison", href: "/platform/dentira-labs/price-comparison", icon: "scale" },
						{ title: "Universal Dentira RX", href: "/platform/dentira-labs/universal-rx", icon: "fileText" },
						{ title: "Scanner & LMS Integrations", href: "/platform/dentira-labs/integrations", icon: "scanLine" },
						{ title: "Automated PO Generations", href: "/platform/dentira-labs/automated-po", icon: "packageSearch" },
					],
				},
				{
					id: "dentira-ap-intelligence",
					title: "Dentira AP Intelligence",
					href: "/platform/ap-intelligence",
					eyebrow: "Dentira AP Intelligence",
					items: [
						{ title: "Overview", href: "/platform/ap-intelligence", icon: "home" },
						{ title: "How It Works", href: "/platform/ap-intelligence/how-it-works", icon: "settings" },
						{ title: "Invoice to Payment", href: "/platform/ap-intelligence/invoice-to-payment", icon: "fileText" },
						{ title: "AI Powered Matching", href: "/platform/ap-intelligence/ai-matching", icon: "bot" },
						{ title: "Approval Workflows", href: "/platform/ap-intelligence/approval-workflows", icon: "shieldCheck" },
						{ title: "Business Values", href: "/platform/ap-intelligence/business-values", icon: "chartLine" },
					],
				},
				{
					id: "dentira-beyond",
					title: "Dentira Beyond",
					href: "/platform/dentira-beyond",
					eyebrow: "Dentira Beyond",
					items: [
						{ title: "Overview", href: "/platform/dentira-beyond", icon: "home" },
						{ title: "Dentira Care", href: "/platform/dentira-beyond/care", icon: "heartPulse" },
						{ title: "Dentira Assist", href: "/platform/dentira-beyond/assist", icon: "sparkles" },
						{ title: "Dentira Contracts", href: "/platform/dentira-beyond/contracts", icon: "fileText" },
						{ title: "Dentira Reporting", href: "/platform/dentira-beyond/reporting", icon: "barChart" },
						{ title: "Dentira Sourcing", href: "/platform/dentira-beyond/sourcing", icon: "packageSearch" },
					],
				},
			],
			promo: springReleasePromo,
		},
		{
			title: "Solutions",
			layout: "medium",
			panels: [
				{
					id: "for-organizations",
					title: "For Organizations",
					href: "/solutions/organizations",
					eyebrow: "For Organizations",
					items: [
						{ title: "Dental Groups", href: "/solutions/organizations/dental-groups", icon: "building" },
						{ title: "Individual Clinics", href: "/solutions/organizations/individual-clinics", icon: "home" },
					],
				},
				{
					id: "for-usecases",
					title: "For Usecases",
					href: "/solutions/usecases",
					eyebrow: "For Usecases",
					items: [
						{ title: "Spend Control", href: "/solutions/usecases/spend-control", icon: "gauge" },
						{ title: "Vendor & Price Optimization", href: "/solutions/usecases/vendor-price-optimization", icon: "shieldCheck" },
						{ title: "Invoice & AP Automation", href: "/solutions/usecases/invoice-ap-automation", icon: "fileText" },
						{ title: "Inventory Optimization", href: "/solutions/usecases/inventory-optimization", icon: "packageSearch" },
						{ title: "Advanced Analytics & Intelligence", href: "/solutions/usecases/analytics-intelligence", icon: "barChart" },
						{ title: "Lab Workflow Management", href: "/solutions/usecases/lab-workflow-management", icon: "network" },
					],
				},
			],
			promo: springReleasePromo,
		},
		{
			title: "Resources",
			layout: "compact",
			panels: [
				{
					id: "resources",
					title: "Resources",
					items: [
						{ title: "Blog", href: "/blogs", icon: "stickyNote" },
						{ title: "Case studies", href: "/case-studies", icon: "bookOpen" },
						{ title: "Guides", href: "/guides", icon: "fileText" },
					],
				},
			],
			promo: springReleasePromo,
		},
		{
			title: "Company",
			layout: "compact",
			panels: [
				{
					id: "company",
					title: "Company",
					items: [
						{ title: "About Us", href: "/about", icon: "users" },
						{ title: "Careers", href: "/careers", icon: "contact" },
						{ title: "Contact", href: "/contact", icon: "handshake" },
					],
				},
			],
			promo: springReleasePromo,
		},
	],
	actions: {
		signIn: {
			title: "Sign In",
			href: "/login",
		},
		getStarted: {
			title: "Get Started",
			href: "/signup",
		},
	},
};
