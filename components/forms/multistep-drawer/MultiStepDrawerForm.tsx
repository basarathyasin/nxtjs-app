"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check, PanelRightOpen, Send } from "lucide-react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
	emptyLeadFormValues,
	leadFormSchema,
	type LeadFormValues,
} from "@/components/forms/multistep-drawer/schema";
import { useLeadFormStore } from "@/components/forms/multistep-drawer/store";

type Step = {
	title: string;
	description: string;
	fields: Array<keyof LeadFormValues>;
};

const steps: Step[] = [
	{
		title: "Contact",
		description: "Start with the person we should follow up with.",
		fields: ["firstName", "lastName", "email"],
	},
	{
		title: "Company",
		description: "Add the basic account details.",
		fields: ["company", "teamSize"],
	},
	{
		title: "Project",
		description: "Tell us what the team is trying to get done.",
		fields: ["goal", "budget", "timeline"],
	},
];

export function MultiStepDrawerForm() {
	const [open, setOpen] = React.useState(false);
	const [stepIndex, setStepIndex] = React.useState(0);
	const [submittedData, setSubmittedData] = React.useState<LeadFormValues | null>(
		null,
	);
	const { draft, setDraft, clearDraft } = useLeadFormStore();

	const form = useForm<LeadFormValues>({
		defaultValues: draft,
		resolver: zodResolver(leadFormSchema),
		mode: "onTouched",
	});

	const watchedValues = useWatch({ control: form.control });
	const currentStep = steps[stepIndex];
	const isLastStep = stepIndex === steps.length - 1;

	React.useEffect(() => {
		if (!open) {
			return;
		}

		const nextDraft = {
			...emptyLeadFormValues,
			...watchedValues,
		};
		const currentDraft = useLeadFormStore.getState().draft;

		if (!areLeadValuesEqual(nextDraft, currentDraft)) {
			setDraft(nextDraft);
		}
	}, [open, setDraft, watchedValues]);

	const handleOpenChange = (nextOpen: boolean) => {
		if (!nextOpen) {
			setDraft(form.getValues());
		} else {
			form.reset(useLeadFormStore.getState().draft);
		}

		setOpen(nextOpen);
	};

	const goNext = async () => {
		const isStepValid = await form.trigger(currentStep.fields, {
			shouldFocus: true,
		});

		if (isStepValid) {
			setStepIndex((current) => Math.min(current + 1, steps.length - 1));
		}
	};

	const goBack = () => {
		setStepIndex((current) => Math.max(current - 1, 0));
	};

	const handleNextClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		void goNext();
	};

	const handleBackClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		goBack();
	};

	const submitForm = (values: LeadFormValues) => {
		const trimmedValues = leadFormSchema.parse(values);

		setSubmittedData(trimmedValues);
		clearDraft();
		form.reset(emptyLeadFormValues);
		setStepIndex(0);
		setOpen(false);
	};

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		if (!isLastStep) {
			event.preventDefault();
			void goNext();
			return;
		}

		void form.handleSubmit(submitForm)(event);
	};

	return (
		<section className="min-h-[calc(100vh-5rem)] bg-[#F7F8FA] px-4 py-12 text-[#191C1D] dark:bg-[#111315] dark:text-white">
			<div className="mx-auto flex w-full max-w-5xl flex-col gap-8 lg:flex-row lg:items-start">
				<div className="flex-1 space-y-5">
					<div className="inline-flex rounded-full border border-[#D6DADD] bg-white px-3 py-1 text-sm text-[#5D666A] dark:border-white/10 dark:bg-white/5 dark:text-white/70">
						React Hook Form + Zod + Zustand
					</div>
					<div className="space-y-3">
						<h1 className="max-w-2xl text-3xl font-semibold tracking-normal md:text-5xl">
							Multi-step drawer form
						</h1>
						<p className="max-w-2xl text-base leading-7 text-[#5D666A] dark:text-white/70">
							The drawer keeps unfinished input in a Zustand draft. Close it,
							open it again, and the form is prefilled until the final submit.
						</p>
					</div>
					<Button onClick={() => setOpen(true)} className="gap-2">
						<PanelRightOpen className="size-4" />
						Open form
					</Button>
				</div>

				<div className="w-full rounded-lg border border-[#D6DADD] bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 lg:max-w-sm">
					<div className="flex items-center gap-2 text-sm font-medium">
						<Check className="size-4 text-emerald-600" />
						Last submitted data
					</div>
					{submittedData ? (
						<dl className="mt-4 grid gap-3 text-sm">
							<SummaryItem label="Name">
								{submittedData.firstName} {submittedData.lastName}
							</SummaryItem>
							<SummaryItem label="Email">{submittedData.email}</SummaryItem>
							<SummaryItem label="Company">{submittedData.company}</SummaryItem>
							<SummaryItem label="Team size">{submittedData.teamSize}</SummaryItem>
							<SummaryItem label="Budget">{formatOption(submittedData.budget)}</SummaryItem>
							<SummaryItem label="Timeline">
								{formatOption(submittedData.timeline)}
							</SummaryItem>
						</dl>
					) : (
						<p className="mt-4 text-sm leading-6 text-[#5D666A] dark:text-white/65">
							Submit the drawer form once and the final values will show here.
							Closing the drawer before submit will keep the draft ready.
						</p>
					)}
				</div>
			</div>

			<Drawer direction="right" open={open} onOpenChange={handleOpenChange}>
				<DrawerContent className="w-[min(480px,94vw)]">
					<DrawerHeader className="border-b px-5 py-5 text-left">
						<DrawerTitle>{currentStep.title}</DrawerTitle>
						<DrawerDescription>{currentStep.description}</DrawerDescription>
					</DrawerHeader>

					<div className="border-b px-5 py-4">
						<div className="grid grid-cols-3 gap-2">
							{steps.map((step, index) => (
								<div
									key={step.title}
									className={cn(
										"h-2 rounded-full bg-[#D6DADD] dark:bg-white/15",
										index <= stepIndex && "bg-black dark:bg-white",
									)}
								/>
							))}
						</div>
					</div>

					<form
						onSubmit={handleFormSubmit}
						className="flex min-h-0 flex-1 flex-col"
					>
						<div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
							{stepIndex === 0 && <ContactStep form={form} />}
							{stepIndex === 1 && <CompanyStep form={form} />}
							{stepIndex === 2 && <ProjectStep form={form} />}
						</div>

						<DrawerFooter className="border-t px-5 py-5 sm:flex-row">
							<Button
								type="button"
								variant="outline"
								onClick={handleBackClick}
								disabled={stepIndex === 0}
								className="gap-2 sm:flex-1"
							>
								<ArrowLeft className="size-4" />
								Back
							</Button>
							{isLastStep ? (
								<Button type="submit" className="gap-2 sm:flex-1">
									<Send className="size-4" />
									Submit
								</Button>
							) : (
								<Button
									type="button"
									onClick={handleNextClick}
									className="gap-2 sm:flex-1"
								>
									Next
									<ArrowRight className="size-4" />
								</Button>
							)}
						</DrawerFooter>
					</form>
				</DrawerContent>
			</Drawer>
		</section>
	);
}

function ContactStep({
	form,
}: {
	form: ReturnType<typeof useForm<LeadFormValues>>;
}) {
	return (
		<FieldGroup>
			<div className="grid gap-4 sm:grid-cols-2">
				<TextField form={form} name="firstName" label="First name" />
				<TextField form={form} name="lastName" label="Last name" />
			</div>
			<TextField form={form} name="email" label="Email" type="email" />
		</FieldGroup>
	);
}

function CompanyStep({
	form,
}: {
	form: ReturnType<typeof useForm<LeadFormValues>>;
}) {
	return (
		<FieldGroup>
			<TextField form={form} name="company" label="Company" />
			<SelectField
				form={form}
				name="teamSize"
				label="Team size"
				options={[
					{ value: "1-10", label: "1-10 people" },
					{ value: "11-50", label: "11-50 people" },
					{ value: "51-200", label: "51-200 people" },
					{ value: "201+", label: "201+ people" },
				]}
			/>
		</FieldGroup>
	);
}

function ProjectStep({
	form,
}: {
	form: ReturnType<typeof useForm<LeadFormValues>>;
}) {
	const goalError = form.formState.errors.goal;

	return (
		<FieldGroup>
			<Field data-invalid={Boolean(goalError)}>
				<FieldLabel htmlFor="goal">Project goal</FieldLabel>
				<textarea
					id="goal"
					rows={5}
					aria-invalid={Boolean(goalError)}
					className="min-h-28 w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30"
					placeholder="What problem should this help your team solve?"
					{...form.register("goal")}
				/>
				<FieldDescription>
					A short paragraph is enough for this demo.
				</FieldDescription>
				<FieldError errors={[goalError]} />
			</Field>
			<SelectField
				form={form}
				name="budget"
				label="Budget"
				options={[
					{ value: "under-5k", label: "Under $5k" },
					{ value: "5k-15k", label: "$5k-$15k" },
					{ value: "15k-50k", label: "$15k-$50k" },
					{ value: "50k-plus", label: "$50k+" },
				]}
			/>
			<SelectField
				form={form}
				name="timeline"
				label="Timeline"
				options={[
					{ value: "this-month", label: "This month" },
					{ value: "next-quarter", label: "Next quarter" },
					{ value: "exploring", label: "Still exploring" },
				]}
			/>
		</FieldGroup>
	);
}

function TextField({
	form,
	name,
	label,
	type = "text",
}: {
	form: ReturnType<typeof useForm<LeadFormValues>>;
	name: keyof LeadFormValues;
	label: string;
	type?: React.HTMLInputTypeAttribute;
}) {
	const error = form.formState.errors[name];

	return (
		<Field data-invalid={Boolean(error)}>
			<FieldLabel htmlFor={name}>{label}</FieldLabel>
			<Input
				id={name}
				type={type}
				aria-invalid={Boolean(error)}
				{...form.register(name)}
			/>
			<FieldError errors={[error]} />
		</Field>
	);
}

function SelectField({
	form,
	name,
	label,
	options,
}: {
	form: ReturnType<typeof useForm<LeadFormValues>>;
	name: keyof LeadFormValues;
	label: string;
	options: Array<{ value: string; label: string }>;
}) {
	const error = form.formState.errors[name];

	return (
		<Field data-invalid={Boolean(error)}>
			<FieldLabel>{label}</FieldLabel>
			<Controller
				control={form.control}
				name={name}
				render={({ field }) => (
					<Select value={field.value} onValueChange={field.onChange}>
						<SelectTrigger className="w-full" aria-invalid={Boolean(error)}>
							<SelectValue />
						</SelectTrigger>
						<SelectContent position="popper" align="start" className="z-[90]">
							{options.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}
			/>
			<FieldError errors={[error]} />
		</Field>
	);
}

function SummaryItem({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div className="grid gap-1 border-b border-[#E6E8EA] pb-3 last:border-b-0 last:pb-0 dark:border-white/10">
			<dt className="text-xs uppercase text-[#6D767A] dark:text-white/55">
				{label}
			</dt>
			<dd className="font-medium">{children}</dd>
		</div>
	);
}

function formatOption(value: string) {
	return value
		.split("-")
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
}

function areLeadValuesEqual(first: LeadFormValues, second: LeadFormValues) {
	return (
		first.firstName === second.firstName &&
		first.lastName === second.lastName &&
		first.email === second.email &&
		first.company === second.company &&
		first.teamSize === second.teamSize &&
		first.goal === second.goal &&
		first.budget === second.budget &&
		first.timeline === second.timeline
	);
}
