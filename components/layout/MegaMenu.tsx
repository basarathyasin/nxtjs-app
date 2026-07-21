"use client";

import {
	BarChart3,
	BookOpen,
	Bot,
	Building2,
	ChartNoAxesCombined,
	Check,
	ChevronRight,
	ClipboardList,
	Contact,
	CreditCard,
	FileText,
	Gauge,
	Handshake,
	HeartPulse,
	Home,
	Layers3,
	Menu,
	Network,
	PackageSearch,
	Scale,
	ScanLine,
	Settings2,
	ShieldCheck,
	Sparkles,
	StickyNote,
	Users,
	X,
	type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import {
	megaMenuConfig,
	type MegaMenuConfig,
	type MegaMenuIconName,
	type MegaMenuItem,
	type MegaMenuLink,
	type MegaMenuPanel,
	type MegaMenuPromo,
} from "@/config/mega-menu";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type MegaMenuProps = {
	config?: MegaMenuConfig;
	className?: string;
};

const iconMap: Record<MegaMenuIconName, LucideIcon> = {
	barChart: BarChart3,
	bookOpen: BookOpen,
	bot: Bot,
	building: Building2,
	chartLine: ChartNoAxesCombined,
	clipboardList: ClipboardList,
	contact: Contact,
	creditCard: CreditCard,
	fileText: FileText,
	gauge: Gauge,
	handshake: Handshake,
	heartPulse: HeartPulse,
	home: Home,
	layers: Layers3,
	network: Network,
	packageSearch: PackageSearch,
	scale: Scale,
	scanLine: ScanLine,
	settings: Settings2,
	shieldCheck: ShieldCheck,
	sparkles: Sparkles,
	stickyNote: StickyNote,
	users: Users,
};

export function MegaMenu({
	config = megaMenuConfig,
	className,
}: MegaMenuProps) {
	return (
		<header
			className={cn(
				"sticky top-0 z-50 w-full border-b border-[#e4e4e7] bg-white/95 backdrop-blur-md",
				className,
			)}
		>
			<div className="relative mx-auto flex h-[111px] w-full max-w-[1420px] items-center justify-between px-5 2xl:px-0">
				<Link
					href={config.brand.href}
					className="flex items-center"
					aria-label={`${config.brand.name} home`}
				>
					<Image
						src="/dentiralogo.png"
						alt={config.brand.name}
						width={164}
						height={29}
						className="h-[29px] w-[164px] object-contain"
						priority
					/>
				</Link>

				<DesktopMenu items={config.items} />

				<div className="hidden items-center gap-[18px] lg:flex">
					<Button
						asChild
						variant="outline"
						className="h-10 rounded-xl border-[#f97316] bg-white px-8 text-[15px] font-bold leading-none text-[#f97316] shadow-[0_0_4px_rgba(0,0,0,0.08)] hover:bg-orange-50 hover:text-[#f97316]"
					>
						<Link href={config.actions.signIn.href}>
							{config.actions.signIn.title}
						</Link>
					</Button>
					<Button
						asChild
						className="h-10 rounded-xl bg-[#0cb07a] px-8 text-[15px] font-bold leading-none text-white hover:bg-[#0a9e6e]"
					>
						<Link href={config.actions.getStarted.href}>
							{config.actions.getStarted.title}
						</Link>
					</Button>
				</div>

				<MobileMenu config={config} />
			</div>
		</header>
	);
}

function DesktopMenu({ items }: { items: MegaMenuItem[] }) {
	return (
		<NavigationMenu
			className="static hidden flex-none lg:flex"
			viewportClassName="top-[calc(100%+2px)]"
		>
			<NavigationMenuList className="gap-0">
				{items.map((item) => (
					<NavigationMenuItem key={item.title}>
						{item.panels ? (
							<>
								<NavigationMenuTrigger className="h-auto gap-2 rounded-none px-[19px] py-[26px] text-base font-normal leading-[1.65] text-[#09090b] hover:bg-transparent hover:text-[#09090b] focus:bg-transparent focus:text-[#09090b] data-[state=open]:bg-transparent [&_svg]:ml-0 [&_svg]:size-3.5">
									{item.title}
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<MegaMenuDropdown item={item} />
								</NavigationMenuContent>
							</>
						) : (
							<NavigationMenuLink asChild>
								<Link
									href={item.href ?? "#"}
									className="px-[19px] py-[26px] text-base leading-[1.65] text-[#09090b] hover:bg-transparent hover:text-[#09090b]"
								>
									{item.title}
								</Link>
							</NavigationMenuLink>
						)}
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
}

function MegaMenuDropdown({ item }: { item: MegaMenuItem }) {
	const panels = item.panels ?? [];
	const [activePanelId, setActivePanelId] = React.useState(panels[0]?.id);
	const activePanel =
		panels.find((panel) => panel.id === activePanelId) ?? panels[0];
	const hasRail = panels.length > 1;
	const menuLayout = item.layout ?? (hasRail ? "medium" : "compact");

	if (!activePanel) {
		return null;
	}

	if (!hasRail) {
		return (
			<CompactMenuDropdown
				panel={activePanel}
				promo={item.promo}
				layout={menuLayout}
			/>
		);
	}

	return (
		<div
			className={cn(
				"grid min-h-[238px] overflow-hidden rounded-b-xl bg-[#e6ebf1] text-[#1a1f36] shadow-[0_10px_9px_rgba(0,0,0,0.18)]",
				menuLayout === "wide" &&
					"h-[444px] w-[1122px] grid-cols-[306px_423px_393px]",
				menuLayout === "medium" &&
					"w-[954px] grid-cols-[286px_414px_254px]",
			)}
		>
			<MenuRail
				panels={panels}
				activePanelId={activePanel.id}
				hasRail={hasRail}
				onActivePanelChange={setActivePanelId}
			/>
			<MenuPanel panel={activePanel} />
			{item.promo && (
				<PromoPanel
					promo={item.promo}
					variant={menuLayout === "wide" ? "default" : "medium"}
				/>
			)}
		</div>
	);
}

function CompactMenuDropdown({
	panel,
	promo,
	layout,
}: {
	panel: MegaMenuPanel;
	promo?: MegaMenuPromo;
	layout: MegaMenuItem["layout"];
}) {
	const compactFrameClass =
		panel.id === "company"
			? "h-[242px] w-[542px] grid-cols-[237px_52px_201px_52px]"
			: "h-[242px] w-[566px] grid-cols-[261px_52px_201px_52px]";

	return (
		<div
			className={cn(
				"grid overflow-hidden rounded-b-xl bg-[#e6ebf1] text-[#1a1f36] shadow-[0_10px_9px_rgba(0,0,0,0.18)]",
				layout === "compact" && compactFrameClass,
			)}
		>
			<LinkListPanel panel={panel} />
			<div aria-hidden="true" />
			{promo && <PromoPanel promo={promo} variant="compact" />}
			<div aria-hidden="true" />
		</div>
	);
}

function MenuRail({
	panels,
	activePanelId,
	hasRail,
	onActivePanelChange,
}: {
	panels: MegaMenuPanel[];
	activePanelId: string;
	hasRail: boolean;
	onActivePanelChange: (panelId: string) => void;
}) {
	return (
		<div
			className={cn(
				"border-r border-[#e6ebf1] bg-white px-[50px] py-10",
				!hasRail && "border-r-0",
			)}
		>
			<div className="flex flex-col items-start gap-6">
				{panels.map((panel) => {
					const isActive = panel.id === activePanelId;

					if (!hasRail) {
						return (
							<div key={panel.id} className="px-1 py-2 text-sm font-medium">
								{panel.title}
							</div>
						);
					}

					return (
						<button
							key={panel.id}
							type="button"
							onFocus={() => onActivePanelChange(panel.id)}
							onMouseEnter={() => onActivePanelChange(panel.id)}
							className={cn(
								"flex min-h-[26px] items-center gap-3 rounded-md px-0 py-0 text-left text-base font-medium leading-[1.6] text-[#1a1f36] transition-colors hover:text-[#1fa971] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1fa971]/30",
								isActive && "font-bold text-[#1fa971]",
							)}
						>
							<span className="whitespace-nowrap">{panel.title}</span>
							{isActive && (
								<ChevronRight className="size-6 shrink-0" aria-hidden="true" />
							)}
						</button>
					);
				})}
			</div>
		</div>
	);
}

function MenuPanel({ panel }: { panel: MegaMenuPanel }) {
	return (
		<div className="border-r border-[#e6ebf1] bg-white px-[50px] py-10">
			{panel.eyebrow && (
				<div className="mb-7 inline-flex border-b border-[#e4e4e7] pb-2 text-xs font-bold uppercase leading-[1.2] tracking-[0.12em] text-[#0e5f43]">
					{panel.eyebrow}
				</div>
			)}
			<div className="grid gap-0">
				{panel.items.map((link) => (
					<MegaMenuListLink key={link.href} link={link} />
				))}
			</div>
		</div>
	);
}

function LinkListPanel({ panel }: { panel: MegaMenuPanel }) {
	return (
		<div className="bg-white px-[50px] py-10">
			<div className="grid gap-0">
				{panel.items.map((link) => (
					<MegaMenuListLink key={link.href} link={link} />
				))}
			</div>
		</div>
	);
}

function MegaMenuListLink({ link }: { link: MegaMenuLink }) {
	const Icon = link.icon ? iconMap[link.icon] : Check;

	return (
		<NavigationMenuLink asChild>
			<Link
				href={link.href}
				className="group flex min-h-[54px] items-center gap-4 rounded-md p-3 text-base font-medium leading-[1.6] text-[#425466] hover:bg-zinc-50 hover:text-[#1fa971] focus:bg-zinc-50 focus:text-[#1fa971]"
			>
				<span className="flex size-[30px] shrink-0 items-center justify-center rounded-[4.286px] border border-[#e4e4e7] bg-white text-[#1a1f36] transition-colors group-hover:border-[#ccefe5] group-hover:text-[#1fa971]">
					<Icon className="size-[18px]" aria-hidden="true" />
				</span>
				<span className="whitespace-nowrap leading-snug">{link.title}</span>
			</Link>
		</NavigationMenuLink>
	);
}

function PromoPanel({
	promo,
	variant = "default",
}: {
	promo: MegaMenuPromo;
	variant?: "default" | "medium" | "compact";
}) {
	const isDefault = variant === "default";
	const isMedium = variant === "medium";

	return (
		<Link
			href={promo.href}
			aria-label={promo.title}
			className={cn(
				"flex h-full items-center justify-center transition-colors",
				isDefault && "bg-[#e6ebf1] px-[52px] py-0 hover:bg-[#dfe6ee]",
				isMedium && "bg-[#e6ebf1] px-[26.5px] py-0 hover:bg-[#dfe6ee]",
				variant === "compact" && "bg-transparent p-0",
			)}
		>
			<Image
				src="/frame.png"
				alt=""
				width={290}
				height={275}
				className={cn(
					"object-contain",
					isDefault && "h-[274px] w-[289px]",
					isMedium && "h-[199px] w-[211px]",
					variant === "compact" && "h-[191px] w-[201px]",
				)}
			/>
		</Link>
	);
}

function MobileMenu({ config }: { config: MegaMenuConfig }) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					aria-label="Open navigation menu"
					className="lg:hidden"
					size="icon-sm"
					type="button"
					variant="ghost"
				>
					<Menu className="size-5" />
				</Button>
			</SheetTrigger>
			<SheetContent
				className="w-[min(420px,92vw)] overflow-y-auto"
				showCloseButton={false}
			>
				<div className="flex items-center justify-between border-b px-5 py-4">
					<Link
						href={config.brand.href}
						className="flex items-center"
						aria-label={`${config.brand.name} home`}
					>
						<Image
							src="/dentiralogo.png"
							alt={config.brand.name}
							width={164}
							height={29}
							className="h-[24px] w-[136px] object-contain"
						/>
					</Link>
					<SheetClose asChild>
						<Button
							aria-label="Close navigation menu"
							size="icon-sm"
							variant="ghost"
						>
							<X className="size-5" />
						</Button>
					</SheetClose>
				</div>

				<nav className="grid gap-5 p-5">
					{config.items.map((item) => (
						<div key={item.title} className="grid gap-3">
							<div className="text-sm font-semibold text-[#101828]">
								{item.title}
							</div>
							{item.panels?.map((panel) => (
								<div key={panel.id} className="grid gap-2 pl-2">
									{panel.href ? (
										<SheetClose asChild>
											<Link
												href={panel.href}
												className="text-sm font-medium text-[#05a779]"
											>
												{panel.title}
											</Link>
										</SheetClose>
									) : (
										<div className="text-sm font-medium text-[#05a779]">
											{panel.title}
										</div>
									)}
									<div className="grid gap-1">
										{panel.items.map((link) => (
											<SheetClose asChild key={link.href}>
												<Link
													href={link.href}
													className="rounded-md px-2 py-2 text-sm text-[#344256] hover:bg-zinc-100"
												>
													{link.title}
												</Link>
											</SheetClose>
										))}
									</div>
								</div>
							))}
						</div>
					))}
				</nav>

				<div className="mt-auto grid gap-3 border-t p-5">
					<SheetClose asChild>
						<Button asChild variant="outline" width="full">
							<Link href={config.actions.signIn.href}>
								{config.actions.signIn.title}
							</Link>
						</Button>
					</SheetClose>
					<SheetClose asChild>
						<Button asChild width="full">
							<Link href={config.actions.getStarted.href}>
								{config.actions.getStarted.title}
							</Link>
						</Button>
					</SheetClose>
				</div>
			</SheetContent>
		</Sheet>
	);
}
