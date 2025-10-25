import type { ReactNode } from "react";
import "./styles.css";
import type { GenreStyle } from "shared";

type ContainerProps = Readonly<{
	children?: ReactNode;
	className?: string;
	style?: GenreStyle;
}>;

export function Container({ className = "", style, children }: ContainerProps) {
	const styledClx = style ? `contaniner--styled container--${style}` : "";
	return (
		<div className={`container ${styledClx} ${className}`}>{children}</div>
	);
}
