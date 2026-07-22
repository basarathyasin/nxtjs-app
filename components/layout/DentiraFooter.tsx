import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import {
	footerConfig,
	type FooterColumn,
	type FooterConfig,
	type FooterSocialLink,
} from "@/config/footer";
import { cn } from "@/lib/utils";

type DentiraFooterProps = {
	config?: FooterConfig;
	className?: string;
};

const footerFont =
	"[font-family:'Satoshi',var(--font-geist),Arial,sans-serif]";

export function DentiraFooter({
	config = footerConfig,
	className,
}: DentiraFooterProps) {
	const topColumns = config.columns.slice(0, 3);
	const bottomColumns = config.columns.slice(3);

	return (
		<footer
			className={cn(
				"relative isolate overflow-hidden border-t-2 border-[#f4f4f5] bg-[#18181b] text-white",
				footerFont,
				className,
			)}
		>
			<FooterGlow />

			<div className="relative z-0 mx-auto flex w-full max-w-[1920px] flex-col items-center px-6 py-14 sm:px-10 lg:min-h-[884px] lg:px-[250px] lg:pb-10 lg:pt-[90px]">
				<div className="flex w-full max-w-[1420px] flex-col items-start gap-[60px]">
					<div className="flex w-full flex-col items-start gap-[90px]">
						<div className="grid w-full gap-[60px] xl:min-h-[299px] xl:grid-cols-[421px_1fr] xl:gap-[109px]">
							<FooterBrand config={config} />

							<div className="grid w-full gap-[60px] md:grid-cols-2 xl:grid-cols-[267px_212px_267px]">
								{topColumns.map((column, index) => (
									<FooterColumnList
										key={column.title}
										column={column}
										highlightFirstLink={index === 0}
									/>
								))}
							</div>
						</div>

						<div className="grid w-full gap-[60px] md:grid-cols-2 lg:grid-cols-[190px_190px_260px_128px_128px]">
							{bottomColumns.map((column) => (
								<FooterColumnList key={column.title} column={column} />
							))}
						</div>
					</div>

					<FooterLegal config={config} />
				</div>
			</div>
		</footer>
	);
}

function FooterGlow() {
	return (
		<>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -left-[8%] -top-[23%] h-[410px] w-[520px] rounded-full bg-[#10b981]/28 blur-[95px]"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -bottom-[19%] right-[-8%] h-[430px] w-[520px] rounded-full bg-[#10b981]/30 blur-[100px]"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.035),transparent_34%)]"
			/>
		</>
	);
}

function FooterBrand({ config }: { config: FooterConfig }) {
	return (
		<div className="flex w-full max-w-[421px] flex-col justify-center gap-10 xl:min-h-[299px]">
			<div className="flex w-full flex-col items-start gap-6">
				<Link
					href={config.brand.href}
					className="inline-flex h-[38.53px] w-[221.27px] items-center gap-[16.26px]"
					aria-label={`${config.brand.name} home`}
				>
					<span className="relative block h-[38.53px] w-[43.38px] shrink-0 overflow-hidden">
						<Image
							src="/dentiralogo.png"
							alt=""
							width={164}
							height={29}
							className="absolute left-0 top-0 h-[38.53px] w-[218px] max-w-none object-contain object-left"
							priority
						/>
					</span>
					<span className="text-[38px] font-black leading-none tracking-[-0.02em] text-white">
						{config.brand.name}
					</span>
				</Link>

				<p className="w-full text-[18px] font-light leading-[23px] text-white">
					{config.brand.description}
				</p>
			</div>

			<div className="flex h-5 items-center gap-6">
				{config.socialLinks.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						aria-label={link.label}
						className="flex size-5 items-center justify-center transition-opacity hover:opacity-80"
					>
						<SocialIcon link={link} />
					</Link>
				))}
			</div>
		</div>
	);
}

function SocialIcon({ link }: { link: FooterSocialLink }) {
	if (link.icon === "facebook") {
		return <FaFacebookF aria-hidden="true" className="size-5 text-[#1877f2]" />;
	}

	if (link.icon === "instagram") {
		return <FaInstagram aria-hidden="true" className="size-5 text-[#e4405f]" />;
	}

	return <FaXTwitter aria-hidden="true" className="size-5 text-white" />;
}

function FooterColumnList({
	column,
	highlightFirstLink = false,
}: {
	column: FooterColumn;
	highlightFirstLink?: boolean;
}) {
	return (
		<nav aria-label={column.title} className="min-w-0">
			<h2 className="inline-flex flex-col items-start gap-2 text-[12px] font-bold uppercase leading-[1.2] tracking-[0.12em] text-[#e4e4e7]">
				{column.title}
				<span className="h-0 w-8 border-t-[3px] border-[#10b981]" />
			</h2>
			<ul className="mt-8 grid gap-3.5">
				{column.links.map((link, index) => (
					<li key={link.href}>
						<Link
							href={link.href}
							className={cn(
								"block text-[18px] font-normal leading-[1.7] tracking-[-0.01em] text-[#e4e4e7] transition-colors hover:text-white",
								highlightFirstLink &&
									index === 0 &&
									"font-bold text-[#10b981] hover:text-[#34d399]",
							)}
						>
							{link.title}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}

function FooterLegal({ config }: { config: FooterConfig }) {
	return (
		<div className="flex w-full flex-col gap-5 border-t border-white/10 pt-5 text-[11px] font-normal leading-none text-[#e4e4e7]/70 sm:flex-row sm:items-center sm:justify-between">
			<p>{config.legal.copyright}</p>
			<div className="flex flex-wrap items-center gap-x-[38px] gap-y-3">
				{config.legal.links.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						className="transition-colors hover:text-white"
					>
						{link.title}
					</Link>
				))}
			</div>
		</div>
	);
}

export default DentiraFooter;
