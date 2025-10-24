import type { ReactNode } from "react";
import { AppRoutes } from "shared";
import { Page } from "ui-lib";

type LayoutProps = Readonly<{
	title?: string;
	children: ReactNode;
}>;

export function Layout({ children }: LayoutProps) {
	return (
		<Page logoHref={AppRoutes.Home} logoAriaLabel={"home page"} links={null}>
			{children}
		</Page>
	);
}
