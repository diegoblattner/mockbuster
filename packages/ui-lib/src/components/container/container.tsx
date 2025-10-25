import type { ReactNode } from "react";
import "./styles.css";

type ContainerProps = Readonly<{
	children?: ReactNode;
	className?: string;
	style?: "action" | "fantasy" | "science";
}>;

export function Container({ className = "", style, children }: ContainerProps) {
	const styledClx = style ? `contaniner--styled container--${style}` : "";
	return (
		<div className={`container ${styledClx} ${className}`}>{children}</div>
	);
}
