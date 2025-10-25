import type { ReactNode } from "react";
import "./styles.css";

type TooltipProps = Readonly<{
	className?: string;
	content: ReactNode;
	children: ReactNode;
	show?: boolean;
}>;

export function Tooltip({
	className = "",
	content,
	children,
	show,
}: TooltipProps) {
	return (
		<div className={`tooltip-container ${className}`}>
			{children}
			{show && <div className="tooltip-container__item">{content}</div>}
		</div>
	);
}
