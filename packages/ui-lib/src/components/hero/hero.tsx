import type { ReactNode } from "react";
import { Container } from "../container";

type HeroProps = Readonly<{
	mainText: ReactNode;
	subtext: ReactNode;
	children: ReactNode;
}>;

export function Hero({ mainText, subtext, children }: HeroProps) {
	return (
		<section className="hero">
			<Container className="hero__container">
				<h2 className="hero__container__title">{mainText}</h2>
				<p className="hero__container__subtitle">{subtext}</p>
				{children}
			</Container>
		</section>
	);
}
