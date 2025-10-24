import { type ReactNode, useMemo } from "react";
import { Footer } from "../footer";
import { Header } from "../header";
import { Logo } from "../logo";

type PageProps = Readonly<{
	preTitle?: string;
	title?: string;
	children: ReactNode;
	links: ReactNode;
	logoHref?: string;
	logoAriaLabel: string;
}>;

const fixedTitle = "Mockbuster";
export function Page({
	preTitle = fixedTitle,
	title,
	children,
	...headerProps
}: PageProps) {
	const fullTitle = useMemo(
		() =>
			preTitle && title
				? `${preTitle} - ${title}`
				: preTitle || title || fixedTitle,
		[preTitle, title],
	);
	return (
		<div>
			<title>{fullTitle}</title> {/* changes the document title */}
			<Header logo={<Logo />} title={fixedTitle} {...headerProps} />
			<main>{children}</main>
			<Footer />
		</div>
	);
}
