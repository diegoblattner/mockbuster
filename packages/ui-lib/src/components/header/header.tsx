import type { ReactNode } from "react";
import { Container } from "../container";
import "./styles.css";

type HeaderProps = Readonly<{
	logo: ReactNode;
	logoAriaLabel: string;
	logoHref: string;
	title: string;
	links: ReactNode;
}>;

export function Header({ logo, logoAriaLabel, logoHref, title }: HeaderProps) {
	return (
		<header className="header">
			<Container>
				<div className="header__brand">
					<a
						href={logoHref}
						aria-label={logoAriaLabel}
						className="header__brand__logo"
					>
						{logo}
					</a>
					<h1 className="header__brand__title">{title}</h1>
				</div>
				<div className="header__links"></div>
			</Container>
		</header>
	);
}
