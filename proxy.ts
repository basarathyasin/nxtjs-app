import { NextResponse, type NextRequest } from "next/server";

const STRAPI_JWT_COOKIE_NAME = "strapi_jwt";
const STRAPI_URL =
	process.env.STRAPI_URL?.replace(/\/$/, "") ?? "http://localhost:1337";

export async function proxy(request: NextRequest) {
	const jwt = request.cookies.get(STRAPI_JWT_COOKIE_NAME)?.value;

	if (jwt && (await isValidStrapiJwt(jwt))) {
		return NextResponse.next();
	}

	const loginUrl = new URL("/login", request.url);
	loginUrl.searchParams.set(
		"redirect",
		`${request.nextUrl.pathname}${request.nextUrl.search}`,
	);

	const response = NextResponse.redirect(loginUrl);
	response.cookies.delete(STRAPI_JWT_COOKIE_NAME);

	return response;
}

async function isValidStrapiJwt(jwt: string) {
	try {
		const response = await fetch(`${STRAPI_URL}/api/users/me`, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
			cache: "no-store",
		});

		return response.ok;
	} catch {
		return false;
	}
}

export const config = {
	matcher: "/dashboard/:path*",
};
