"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignupFormData, signupSchema } from "./schema";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import SuccessModal from "./SuccessModal";
import { useAuth } from "@/hooks/useAuth";
import { registerWithStrapi } from "@/src/libs/strapiAuth";

export function SignupForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [open, setOpen] = useState(false);
	const { startSession } = useAuth();

	const onSubmit = async (data: SignupFormData) => {
		try {
			const { jwt, user } = await registerWithStrapi(data);

			startSession(jwt, {
				name: user.name ?? user.username ?? data.name,
				email: user.email ?? data.email,
			});

			reset();
			setOpen(true);
		} catch (error) {
			console.error(error);
			setError("email", {
				type: "manual",
				message:
					error instanceof Error
						? error.message
						: "Could not create your Strapi account.",
			});
		}
	};

	return (
		<div className={cn("flex flex-col", className)} {...props}>
			<SuccessModal open={open} setOpen={setOpen} />
			<Card className="rounded-xl border-[#E2E8F0] bg-white shadow-sm dark:border-white/10 dark:bg-[#101214]">
				<CardHeader className="gap-1.5 px-5 pt-5 text-center">
					<CardTitle className="text-xl font-semibold text-[#111827] dark:text-white">
						Create your account
					</CardTitle>

					<CardDescription className="text-sm text-[#64748B] dark:text-zinc-400">
						Enter your details to get started.
					</CardDescription>
				</CardHeader>

				<CardContent className="px-5 pb-5">
					<form onSubmit={handleSubmit(onSubmit)}>
						<FieldGroup className="gap-3.5">
							<Field>
								<FieldLabel
									htmlFor="name"
									className="text-[#334155] dark:text-zinc-200"
								>
									Full Name
								</FieldLabel>

								<Input
									id="name"
									placeholder="John Doe"
									className="h-10 border-[#CBD5E1] bg-white px-3 text-[#111827] placeholder:text-[#94A3B8] dark:border-white/15 dark:bg-white/10 dark:text-white dark:placeholder:text-zinc-500"
									{...register("name")}
								/>

								{errors.name && (
									<p className="text-sm text-destructive">
										{errors.name.message}
									</p>
								)}
							</Field>

							<Field>
								<FieldLabel
									htmlFor="email"
									className="text-[#334155] dark:text-zinc-200"
								>
									Email
								</FieldLabel>

								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									className="h-10 border-[#CBD5E1] bg-white px-3 text-[#111827] placeholder:text-[#94A3B8] dark:border-white/15 dark:bg-white/10 dark:text-white dark:placeholder:text-zinc-500"
									{...register("email")}
								/>

								{errors.email && (
									<p className="text-sm text-destructive">
										{errors.email.message}
									</p>
								)}
							</Field>

							<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
								<Field>
									<FieldLabel
										htmlFor="password"
										className="text-[#334155] dark:text-zinc-200"
									>
										Password
									</FieldLabel>
									<div className="relative">
										<Input
											id="password"
											type={showPassword ? "text" : "password"}
											className="h-10 border-[#CBD5E1] bg-white px-3 pr-10 text-[#111827] dark:border-white/15 dark:bg-white/10 dark:text-white"
											{...register("password")}
										/>

										<button
											type="button"
											onClick={() => setShowPassword((current) => !current)}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-sm leading-none"
											aria-label={
												showPassword ? "Hide password" : "Show password"
											}
										>
											{showPassword ? "🙈" : "👁"}
										</button>
									</div>

									{errors.password && (
										<p className="text-sm text-destructive">
											{errors.password.message}
										</p>
									)}
								</Field>

								<Field>
									<FieldLabel
										htmlFor="confirm-password"
										className="text-[#334155] dark:text-zinc-200"
									>
										Confirm Password
									</FieldLabel>

									<div className="relative">
										<Input
											id="confirm-password"
											type={showConfirmPassword ? "text" : "password"}
											className="h-10 border-[#CBD5E1] bg-white px-3 pr-10 text-[#111827] dark:border-white/15 dark:bg-white/10 dark:text-white"
											{...register("confirmPassword")}
										/>
										<button
											type="button"
											onClick={() =>
												setShowConfirmPassword((current) => !current)
											}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-sm leading-none"
											aria-label={
												showConfirmPassword
													? "Hide confirm password"
													: "Show confirm password"
											}
										>
											{showConfirmPassword ? "🙈" : "👁"}
										</button>
									</div>

									{errors.confirmPassword && (
										<p className="text-sm text-destructive">
											{errors.confirmPassword.message}
										</p>
									)}
								</Field>
							</div>

							<FieldDescription className="text-[#64748B] dark:text-zinc-400">
								Password must be at least 8 characters long.
							</FieldDescription>

							<Button
								type="submit"
								className="h-10 w-full rounded-lg"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Creating Account..." : "Create Account"}
							</Button>

							<FieldDescription className="text-center text-[#64748B] dark:text-zinc-400">
								Already have an account?{" "}
								<Link
									href="/login"
									className="font-medium text-[#2563EB] hover:underline dark:text-sky-300"
								>
									Sign in
								</Link>
							</FieldDescription>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
