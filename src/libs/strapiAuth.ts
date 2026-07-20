export const STRAPI_JWT_STORAGE_KEY = "strapiJwt";
export const CURRENT_USER_STORAGE_KEY = "currentUser";
export const IS_AUTHENTICATED_STORAGE_KEY = "isAuthenticated";
export const STRAPI_JWT_COOKIE_NAME = "strapi_jwt";

const STRAPI_URL =
	process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") ??
	"http://localhost:1337";

export type StrapiUser = {
	id?: number;
	username?: string;
	name?: string;
	email?: string;
};

export type StrapiAuthResponse = {
	jwt: string;
	user: StrapiUser;
};

export type AuthCredentials = {
	email: string;
	password: string;
};

export type RegisterCredentials = AuthCredentials & {
	name: string;
};

export async function loginWithStrapi({
	email,
	password,
}: AuthCredentials): Promise<StrapiAuthResponse> {
	return requestStrapiAuth("/api/auth/local", {
		identifier: email,
		password,
	});
}

export async function registerWithStrapi({
	name,
	email,
	password,
}: RegisterCredentials): Promise<StrapiAuthResponse> {
	return requestStrapiAuth("/api/auth/local/register", {
		username: name,
		email,
		password,
	});
}

export function persistJwt(jwt: string) {
	if (typeof window === "undefined") {
		return;
	}

	localStorage.setItem(STRAPI_JWT_STORAGE_KEY, jwt);
	document.cookie = `${STRAPI_JWT_COOKIE_NAME}=${encodeURIComponent(
		jwt,
	)}; path=/; max-age=${60 * 60 * 24 * 7}; sameSite=lax`;
}

export function clearJwt() {
	if (typeof window === "undefined") {
		return;
	}

	localStorage.removeItem(STRAPI_JWT_STORAGE_KEY);
	document.cookie = `${STRAPI_JWT_COOKIE_NAME}=; path=/; max-age=0; sameSite=lax`;
}

export function getStoredJwt() {
	if (typeof window === "undefined") {
		return null;
	}

	return localStorage.getItem(STRAPI_JWT_STORAGE_KEY);
}

async function requestStrapiAuth(
	path: string,
	body: Record<string, string>,
): Promise<StrapiAuthResponse> {
	const response = await fetch(`${STRAPI_URL}${path}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	const payload = await response.json().catch(() => null);

	if (!response.ok) {
		const message =
			payload?.error?.message ?? "Strapi could not authenticate this user.";

		throw new Error(message);
	}

	if (typeof payload?.jwt !== "string" || !payload.user) {
		throw new Error("Strapi returned an invalid authentication response.");
	}

	return payload as StrapiAuthResponse;
}
