"use client";

import { useState, type ReactNode } from "react";

import { AuthContext, type AuthUser } from "@/app/context/AuthContext";
import {
	CURRENT_USER_STORAGE_KEY,
	IS_AUTHENTICATED_STORAGE_KEY,
	clearJwt,
	getStoredJwt,
	loginWithStrapi,
	persistJwt,
	type StrapiUser,
} from "@/src/libs/strapiAuth";

type AuthProviderProps = {
	children: ReactNode;
};

export default function AuthProvider({
	children,
}: AuthProviderProps) {
	const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
		if (typeof window === "undefined") {
			return null;
		}

		return getStoredUser();
	});

	async function login(credentials: { email: string; password: string }) {
		const { jwt, user } = await loginWithStrapi(credentials);
		const authUser = mapStrapiUser(user, credentials.email);

		startSession(jwt, authUser);

		return authUser;
	}

	function startSession(jwt: string, user: AuthUser) {
		setCurrentUser(user);
		persistJwt(jwt);
		localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
		localStorage.setItem(IS_AUTHENTICATED_STORAGE_KEY, "true");
	}

	function logout() {
		setCurrentUser(null);
		clearJwt();
		localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
		localStorage.removeItem(IS_AUTHENTICATED_STORAGE_KEY);
	}

	const isAuthenticated = currentUser !== null;

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				isAuthenticated,
				login,
				startSession,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

function mapStrapiUser(user: StrapiUser, fallbackEmail: string): AuthUser {
	const email = user.email ?? fallbackEmail;
	const name = user.name ?? user.username ?? email.split("@")[0] ?? "User";

	return {
		name,
		email,
	};
}

function getStoredUser(): AuthUser | null {
	if (!getStoredJwt()) {
		return null;
	}

	const storedUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);

	if (storedUser) {
		const parsedUser = parseAuthUser(storedUser);

		if (parsedUser) {
			return parsedUser;
		}
	}

	return null;
}

function parseAuthUser(value: string): AuthUser | null {
	try {
		const parsed = JSON.parse(value) as Partial<AuthUser> | Partial<AuthUser>[];
		const user = Array.isArray(parsed) ? parsed.at(-1) : parsed;

		if (typeof user?.name === "string" && typeof user.email === "string") {
			return {
				name: user.name,
				email: user.email,
			};
		}
	} catch {
		return null;
	}

	return null;
}
