import type { ReactNode } from "react";
import { AppRoutes } from "shared";
import { Page } from "ui-lib";
import { HomeLink } from "../components/home-link";
import { WatchlistLink } from "../components/watchlist-link";

type LayoutProps = Readonly<{
	title?: string;
	children: ReactNode;
	showHomeLink?: boolean;
}>;

export function Layout({ children, showHomeLink }: LayoutProps) {
	return (
		<Page
			logoHref={AppRoutes.Home}
			logoAriaLabel={"home page"}
			links={<WatchlistLink />}
			backBtn={showHomeLink ? <HomeLink /> : undefined}
		>
			{children}
		</Page>
	);
}
