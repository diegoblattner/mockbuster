import { type ReactNode, useMemo } from "react";
import { Footer } from "../footer";
import { Header } from "../header";
import { Logo } from "../logo";
import "./styles.css";

type PageProps = Readonly<{
	preTitle?: string;
	title?: string;
	children: ReactNode;
	links: ReactNode;
	backBtn?: ReactNode;
	logoHref?: string;
	logoAriaLabel: string;
}>;

const fixedTitle = "Mockbuster";
export function Page({
	preTitle = fixedTitle,
	title,
	children,
	backBtn,
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
		<div className="page">
			<title>{fullTitle}</title> {/* changes the document title */}
			<Header logo={<Logo />} title={fixedTitle} {...headerProps} />
			{backBtn && <div className="page__back container">{backBtn}</div>}
			<main className="page_main">{children}</main>
			<Footer />
		</div>
	);
}
