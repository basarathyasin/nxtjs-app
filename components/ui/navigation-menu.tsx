"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function NavigationMenu({
	className,
	children,
	viewport = true,
	viewportClassName,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
	viewport?: boolean;
	viewportClassName?: string;
}) {
	return (
		<NavigationMenuPrimitive.Root
			data-slot="navigation-menu"
			className={cn(
				"group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
				className,
			)}
			{...props}
		>
			{children}
			{viewport && <NavigationMenuViewport className={viewportClassName} />}
		</NavigationMenuPrimitive.Root>
	);
}

function NavigationMenuList({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
	return (
		<NavigationMenuPrimitive.List
			data-slot="navigation-menu-list"
			className={cn(
				"group flex flex-1 list-none items-center justify-center gap-1",
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuItem({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
	return (
		<NavigationMenuPrimitive.Item
			data-slot="navigation-menu-item"
			className={cn("relative", className)}
			{...props}
		/>
	);
}

const navigationMenuTriggerStyle =
	"group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-[#111827] transition-colors hover:bg-zinc-100 hover:text-black focus:bg-zinc-100 focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:data-[state=open]:bg-white/10";

function NavigationMenuTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
	return (
		<NavigationMenuPrimitive.Trigger
			data-slot="navigation-menu-trigger"
			className={cn(navigationMenuTriggerStyle, "group", className)}
			{...props}
		>
			{children}
			<ChevronDownIcon
				className="relative top-px ml-1 size-3 transition duration-200 group-data-[state=open]:rotate-180"
				aria-hidden="true"
			/>
		</NavigationMenuPrimitive.Trigger>
	);
}

function NavigationMenuContent({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
	return (
		<NavigationMenuPrimitive.Content
			data-slot="navigation-menu-content"
			className={cn(
				"left-0 top-0 w-full duration-[220ms] ease-out data-[motion=from-end]:z-20 data-[motion=from-end]:animate-in data-[motion=from-end]:fade-in-0 data-[motion=from-start]:z-20 data-[motion=from-start]:animate-in data-[motion=from-start]:fade-in-0 data-[motion=to-end]:pointer-events-none data-[motion=to-end]:z-10 data-[motion=to-end]:opacity-0 data-[motion=to-start]:pointer-events-none data-[motion=to-start]:z-10 data-[motion=to-start]:opacity-0 md:absolute md:w-auto",
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuLink({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
	return (
		<NavigationMenuPrimitive.Link
			data-slot="navigation-menu-link"
			className={cn(
				"block rounded-md text-sm leading-none no-underline outline-none transition-colors hover:bg-zinc-100 hover:text-black focus:bg-zinc-100 focus:text-black dark:hover:bg-white/10 dark:hover:text-white dark:focus:bg-white/10",
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuViewport({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
	return (
		<div
			className={cn(
				"absolute left-1/2 top-full flex -translate-x-1/2 justify-center",
				className,
			)}
		>
			<NavigationMenuPrimitive.Viewport
				data-slot="navigation-menu-viewport"
				className={cn(
					"origin-top-left relative h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-b-xl bg-transparent text-zinc-950 transition-[width,height] duration-300 ease-out data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 md:w-[var(--radix-navigation-menu-viewport-width)] dark:text-zinc-50",
				)}
				{...props}
			/>
		</div>
	);
}

function NavigationMenuIndicator({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
	return (
		<NavigationMenuPrimitive.Indicator
			data-slot="navigation-menu-indicator"
			className={cn(
				"top-full z-[1] flex h-3 items-end justify-center overflow-hidden transition-[width,transform] duration-300 data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in",
				className,
			)}
			{...props}
		>
			<div className="relative top-[60%] size-2 rotate-45 rounded-tl-sm bg-white shadow-md dark:bg-zinc-950" />
		</NavigationMenuPrimitive.Indicator>
	);
}

export {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuContent,
	NavigationMenuTrigger,
	NavigationMenuLink,
	NavigationMenuIndicator,
	NavigationMenuViewport,
	navigationMenuTriggerStyle,
};
