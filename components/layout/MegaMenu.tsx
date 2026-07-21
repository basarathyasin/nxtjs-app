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
				"sticky top-0 z-50 w-full border-b border-[#d9dde3] bg-white/95 backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/95",
				className,
			)}
		>
			<div className="relative mx-auto flex h-[104px] w-full max-w-[1420px] items-center justify-between px-5 lg:px-0">
				<Link
					href={config.brand.href}
					className="flex items-center gap-3 text-[34px] font-black leading-none text-[#08211d] dark:text-white"
				>
					<BrandMark />
					<span>{config.brand.name}</span>
				</Link>

				<DesktopMenu items={config.items} />

				<div className="hidden items-center gap-4 lg:flex">
					<Button
						asChild
						variant="outline"
						className="h-10 rounded-lg border-[#ff7a1a] px-8 text-[#ff6b00] hover:bg-orange-50 hover:text-[#ff6b00] dark:border-orange-400 dark:text-orange-300 dark:hover:bg-orange-400/10"
					>
						<Link href={config.actions.signIn.href}>
							{config.actions.signIn.title}
						</Link>
					</Button>
					<Button
						asChild
						className="h-10 rounded-lg bg-[#10ad7a] px-8 text-white hover:bg-[#0d966b] dark:bg-[#10ad7a] dark:text-white dark:hover:bg-[#0d966b]"
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
			className="static hidden lg:flex"
			viewportClassName="top-[calc(100%+2px)]"
		>
			<NavigationMenuList className="gap-7">
				{items.map((item) => (
					<NavigationMenuItem key={item.title}>
						{item.panels ? (
							<>
								<NavigationMenuTrigger className="h-10 px-0 text-base font-normal hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent dark:data-[state=open]:bg-transparent">
									{item.title}
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<MegaMenuDropdown item={item} />
								</NavigationMenuContent>
							</>
						) : (
							<NavigationMenuLink asChild>
								<Link href={item.href ?? "#"} className="px-2 py-2 text-base">
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
				"grid min-h-[240px] overflow-hidden rounded-b-xl bg-white text-[#132238] shadow-[0_16px_28px_rgba(15,23,42,0.2)] dark:bg-zinc-950 dark:text-zinc-100",
				menuLayout === "wide" &&
					"h-[444px] w-[1122px] grid-cols-[308px_407px_407px]",
				menuLayout === "medium" &&
					"w-[954px] grid-cols-[268px_343px_343px]",
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
					variant={menuLayout === "wide" ? "default" : "compact"}
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
	return (
		<div
			className={cn(
				"grid overflow-hidden rounded-b-xl bg-white text-[#132238] shadow-[0_16px_28px_rgba(15,23,42,0.2)] dark:bg-zinc-950 dark:text-zinc-100",
				layout === "compact" && "w-[568px] grid-cols-[260px_308px]",
			)}
		>
			<LinkListPanel panel={panel} />
			{promo && <PromoPanel promo={promo} variant="compact" />}
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
				"border-r border-[#dfe5ec] bg-white px-[50px] py-10 dark:border-white/10 dark:bg-zinc-950",
				!hasRail && "border-r-0",
			)}
		>
			<div className="flex flex-col gap-5">
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
								"flex min-h-8 items-center justify-between rounded-md px-0 py-1 text-left text-base font-normal text-[#172336] transition-colors hover:text-[#05a779] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10ad7a]/30",
								isActive && "font-medium text-[#05a779]",
							)}
						>
							<span>{panel.title}</span>
							{isActive && (
								<ChevronRight className="size-4" aria-hidden="true" />
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
		<div className="border-r border-[#dfe5ec] bg-white px-[50px] py-10 dark:border-white/10 dark:bg-zinc-950">
			{panel.eyebrow && (
				<div className="mb-7 inline-flex border-b border-[#d9dde3] pb-3 text-xs font-semibold uppercase text-[#067d60]">
					{panel.eyebrow}
				</div>
			)}
			<div className="grid gap-5">
				{panel.items.map((link) => (
					<MegaMenuListLink key={link.href} link={link} />
				))}
			</div>
		</div>
	);
}

function LinkListPanel({ panel }: { panel: MegaMenuPanel }) {
	return (
		<div className="bg-white px-[60px] py-[52px] dark:bg-zinc-950">
			<div className="grid gap-5">
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
				className="group flex min-h-9 items-center gap-4 rounded-md p-1 text-base text-[#344256] hover:bg-zinc-50 hover:text-[#05a779] focus:bg-zinc-50 focus:text-[#05a779] dark:text-zinc-300 dark:hover:bg-white/10"
			>
				<span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-[#d9dde3] bg-white text-[#202938] transition-colors group-hover:border-[#ccefe5] group-hover:text-[#05a779] dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200">
					<Icon className="size-4" aria-hidden="true" />
				</span>
				<span className="leading-snug">{link.title}</span>
			</Link>
		</NavigationMenuLink>
	);
}

function PromoPanel({
	promo,
	variant = "default",
}: {
	promo: MegaMenuPromo;
	variant?: "default" | "compact";
}) {
	return (
		<Link
			href={promo.href}
			className={cn(
				"flex h-full items-center justify-center bg-[#e6ebf1] transition-colors hover:bg-[#dfe6ee] dark:bg-zinc-900 dark:hover:bg-zinc-800",
				variant === "compact" ? "px-2 py-7" : "px-[52px] py-0",
			)}
		>
			<div
				className={cn(
					"flex h-[274.33px] w-[289.31px] flex-col items-start gap-[20.59px] rounded-[4.11726px] border border-[#e4e4e7] bg-white p-[18.5277px] shadow-sm dark:border-white/10 dark:bg-zinc-950",
				)}
			>
				<div className="flex h-[159.69px] w-[252.26px] flex-col justify-between rounded-[4.11726px] bg-[radial-gradient(circle_at_bottom,#b9b9b9_0,#111_42%,#000_70%)] p-2 text-white">
					<div
						className={cn(
							"font-medium leading-[0.86]",
							variant === "compact" ? "text-[32px]" : "text-[34px]",
						)}
					>
						SPRING
						<br />
						RELEASE
					</div>
					<div
						className={cn(
							"font-light leading-none",
							variant === "compact" ? "text-[36px]" : "text-[38px]",
						)}
					>
						2026
					</div>
				</div>
				<div className="grid w-[252.26px] gap-[6.18px]">
					<div className="text-[24.7036px] font-medium leading-[1.2] text-[#18181b] dark:text-white">
						{promo.title}
					</div>
					<div className="text-[16.469px] leading-[1.65] text-[#3f3f46]/80 dark:text-zinc-400">
						{promo.description}
					</div>
				</div>
			</div>
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
						className="flex items-center gap-2 text-lg font-black text-[#08211d] dark:text-white"
					>
						<BrandMark className="size-7" />
						<span>{config.brand.name}</span>
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
							<div className="text-sm font-semibold text-[#101828] dark:text-zinc-100">
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
													className="rounded-md px-2 py-2 text-sm text-[#344256] hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10"
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

function BrandMark({ className }: { className?: string }) {
	return (
		<span
			className={cn(
				"relative inline-flex size-10 items-center justify-center text-[#09a77b]",
				className,
			)}
			aria-hidden="true"
		>
			<span className="absolute left-[7px] top-[7px] h-6 w-4 rotate-[-34deg] rounded-full rounded-br-sm bg-current" />
			<span className="absolute right-[7px] top-[7px] h-6 w-4 rotate-[34deg] rounded-full rounded-bl-sm bg-current" />
		</span>
	);
}
