import { LoginForm } from "@/components/auth/login/login-form";

type LoginPageProps = {
	searchParams: Promise<{
		redirect?: string | string[];
	}>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
	const params = await searchParams;
	const redirect = Array.isArray(params.redirect)
		? params.redirect[0]
		: params.redirect;

	return (
		<div className="w-full max-w-[380px]">
			<LoginForm redirectTo={redirect} />
		</div>
	);
}
