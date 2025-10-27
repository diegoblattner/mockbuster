import type { ReactNode } from "react";

type GridProps = {
	title: ReactNode;
	children?: ReactNode;
	emptyText?: ReactNode;
};

export function Grid({ title, children, emptyText }: GridProps) {
	return (
		<div className="grid">
			<h2 className="grid__title">{title}</h2>
			<div className="grid__container">{children}</div>
			{(!children || (children as []).length === 0) && (
				<div className="grid__empty">{emptyText}</div>
			)}
		</div>
	);
}
