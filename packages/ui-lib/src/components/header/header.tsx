import type { ReactNode } from "react";
import { Container } from "../container";
import "./styles.css";

type HeaderProps = Readonly<{
	logo: ReactNode;
	logoAriaLabel: string;
	logoHref?: string;
	title: string;
	links: ReactNode;
}>;

export function Header({ logo, logoAriaLabel, title, links }: HeaderProps) {
	return (
		<header className="header">
			<Container className="header__content">
				<div className="header__content__brand">
					<span
						// href={logoHref}
						title={logoAriaLabel}
						className="header__content__brand__logo"
					>
						{logo}
					</span>
					<h1 className="header__content__brand__title">{title}</h1>
				</div>
				<div className="header__content__links">{links}</div>
			</Container>
		</header>
	);
}
