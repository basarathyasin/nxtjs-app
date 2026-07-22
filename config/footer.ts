export type FooterLink = {
	title: string;
	href: string;
};

export type FooterColumn = {
	title: string;
	links: FooterLink[];
};

export type FooterSocialLink = FooterLink & {
	icon: "facebook" | "instagram" | "x";
	label: string;
};

export type FooterConfig = {
	brand: {
		name: string;
		href: string;
		description: string;
	};
	socialLinks: FooterSocialLink[];
	columns: FooterColumn[];
	legal: {
		copyright: string;
		links: FooterLink[];
	};
};

export const footerConfig: FooterConfig = {
	brand: {
		name: "Dentira",
		href: "/",
		description:
			"Dentira brings together procurement, pricing, inventory, invoicing, and lab workflows into a single real-time platform purpose-built for dental organizations.",
	},
	socialLinks: [
		{ title: "X", icon: "x", label: "Follow Dentira on X", href: "/twitter" },
		{
			title: "Facebook",
			icon: "facebook",
			label: "Follow Dentira on Facebook",
			href: "/facebook",
		},
		{
			title: "Instagram",
			icon: "instagram",
			label: "Follow Dentira on Instagram",
			href: "/instagram",
		},
	],
	columns: [
		{
			title: "Dentira Supplies",
			links: [
				{ title: "Overview", href: "/platform/dentira-supplies" },
				{ title: "How It Works", href: "/platform/dentira-supplies/how-it-works" },
				{ title: "Marketplace Intelligence", href: "/platform/dentira-supplies/marketplace-intelligence" },
				{ title: "Procurement Operations", href: "/platform/dentira-supplies/procurement" },
				{ title: "Inventory tracking & Data Analytics", href: "/platform/dentira-supplies/inventory-analytics" },
				{ title: "Integrations", href: "/platform/dentira-supplies/integrations" },
			],
		},
		{
			title: "Dentira Labs",
			links: [
				{ title: "Overview", href: "/platform/dentira-labs" },
				{ title: "How it works", href: "/platform/dentira-labs/how-it-works" },
				{ title: "Labs & Price Comparison", href: "/platform/dentira-labs/price-comparison" },
				{ title: "Universal Dentira RX", href: "/platform/dentira-labs/universal-rx" },
				{ title: "Scanner & LMS Integrations", href: "/platform/dentira-labs/integrations" },
				{ title: "Automated PO Generations", href: "/platform/dentira-labs/automated-po" },
			],
		},
		{
			title: "Dentira AP Intelligence",
			links: [
				{ title: "Overview", href: "/platform/ap-intelligence" },
				{ title: "How It Works", href: "/platform/ap-intelligence/how-it-works" },
				{ title: "Dentira Assist", href: "/platform/dentira-beyond/assist" },
				{ title: "Invoice to Payment", href: "/platform/ap-intelligence/invoice-to-payment" },
				{ title: "AI Powered Matching", href: "/platform/ap-intelligence/ai-matching" },
				{ title: "Approval Workflows", href: "/platform/ap-intelligence/approval-workflows" },
				{ title: "Business Values", href: "/platform/ap-intelligence/business-values" },
			],
		},
		{
			title: "Dentira Beyond",
			links: [
				{ title: "Overview", href: "/platform/dentira-beyond" },
				{ title: "Dentira Care", href: "/platform/dentira-beyond/care" },
				{ title: "Dentira Assist", href: "/platform/dentira-beyond/assist" },
				{ title: "Dentira Contracts", href: "/platform/dentira-beyond/contracts" },
				{ title: "Dentira Reporting", href: "/platform/dentira-beyond/reporting" },
				{ title: "Dentira Sourcing", href: "/platform/dentira-beyond/sourcing" },
			],
		},
		{
			title: "For Organizations",
			links: [
				{ title: "Dental Groups", href: "/solutions/organizations/dental-groups" },
				{ title: "Individual Clinics", href: "/solutions/organizations/individual-clinics" },
			],
		},
		{
			title: "For Usecases",
			links: [
				{ title: "Spend Control", href: "/solutions/usecases/spend-control" },
				{ title: "Vendor & Price Optimization", href: "/solutions/usecases/vendor-price-optimization" },
				{ title: "Invoice Automation", href: "/solutions/usecases/invoice-ap-automation" },
				{ title: "Inventory Optimization", href: "/solutions/usecases/inventory-optimization" },
				{ title: "Procurement Analytics", href: "/solutions/usecases/analytics-intelligence" },
				{ title: "Lab Workflow Management", href: "/solutions/usecases/lab-workflow-management" },
			],
		},
		{
			title: "Resources",
			links: [
				{ title: "Blog", href: "/blogs" },
				{ title: "Case Studies", href: "/case-studies" },
				{ title: "Guides", href: "/guides" },
			],
		},
		{
			title: "Company",
			links: [
				{ title: "About Us", href: "/about" },
				{ title: "Careers", href: "/careers" },
				{ title: "Contact", href: "/contact" },
			],
		},
	],
	legal: {
		copyright: "Copyright 2026, All Rights Reserved",
		links: [
			{ title: "Privacy Policy", href: "/privacy-policy" },
			{ title: "Terms & Conditions", href: "/terms" },
		],
	},
};
