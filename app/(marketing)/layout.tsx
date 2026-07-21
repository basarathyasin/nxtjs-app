import { MegaMenu } from "@/components/layout/MegaMenu";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<div className="flex min-h-screen flex-col">
			<MegaMenu />

			<main className="w-full flex-1">{children}</main>

			<Footer />
		</div>
	);
}
