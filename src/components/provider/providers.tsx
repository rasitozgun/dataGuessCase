"use client";
import { client } from "@/graphql/graphql";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "../theme-change";

export default function Providers({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ApolloProvider client={client}>
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				enableSystem
			>
				<ModeToggle />
				{children}
			</ThemeProvider>
		</ApolloProvider>
	);
}
