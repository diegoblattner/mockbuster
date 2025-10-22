import type { ReactNode } from "react";
import "./styles.css";

type ContainerProps = Readonly<{
	children?: ReactNode;
	className?: string;
}>;

export function Container({ className = "", children }: ContainerProps) {
	return <div className={`container ${className}`}>{children}</div>;
}
