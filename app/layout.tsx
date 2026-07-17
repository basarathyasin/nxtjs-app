import ApolloProvider from "@/app/providers/ApolloProvider";
import AuthProvider from "@/app/providers/AuthProvider";
import QueryProvider from "@/app/providers/QueryProvider";
import ComponentInspector from "@/components/debug/ComponentInspector";
import ThemeProvider from "@/app/providers/ThemeProvider";
import { Geist, Inter } from "next/font/google";

import "./global.css";
import { cn } from "@/lib/utils";

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist",
});

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={cn(geist.variable, inter.variable)}>
			<body className="min-h-screen">
				<ApolloProvider>
					<QueryProvider>
						<AuthProvider>
							<ThemeProvider>
								{children}
								<ComponentInspector />
							</ThemeProvider>
						</AuthProvider>
					</QueryProvider>
				</ApolloProvider>
			</body>
		</html>
	);
}
