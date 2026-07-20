import { createContext } from "react";

export type AuthUser = {
	name: string;
	email: string;
};

export type AuthCredentials = {
	email: string;
	password: string;
};

export type AuthContextType = {
	currentUser: AuthUser | null;
	isAuthenticated: boolean;
	login: (credentials: AuthCredentials) => Promise<AuthUser>;
	startSession: (jwt: string, user: AuthUser) => void;
	logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
