import { type ReactNode, useCallback, useRef } from "react";
import { ChevronLeftIcon } from "../icons";
import "./styles.css";

type CarouselProps = Readonly<{
	title: string;
	children: ReactNode;
	emptyText?: ReactNode;
}>;

const SCROLL_STEP = 400;
export function Carousel({
	title,
	children,
	emptyText = "No items...",
}: CarouselProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const isEmpty = !children || (children as []).length === 0;

	const scroll = useCallback((direction: "left" | "right") => {
		if (containerRef.current) {
			const scrollAmount = direction === "left" ? -SCROLL_STEP : SCROLL_STEP;
			containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
		}
	}, []);

	return (
		<div className="carousel">
			<h3 className="carousel__header">
				<span>{title}</span>
				{!isEmpty && (
					<div className="carousel__arrows-container">
						<button
							type="button"
							aria-label="scroll backwards"
							onClick={() => scroll("left")}
							className="carousel__arrows-container__arrow"
						>
							<ChevronLeftIcon title="arrow left" />
						</button>

						<button
							type="button"
							aria-label="scroll forwards"
							onClick={() => scroll("right")}
							className="carousel__arrows-container__arrow carousel__arrows-container__arrow--forward"
						>
							<ChevronLeftIcon rotate="180" title="arrow right" />
						</button>
					</div>
				)}
			</h3>

			{/** biome-ignore lint/a11y/noNoninteractiveTabindex: scrollable elements need tabindex for a11y */}
			<div ref={containerRef} className="carousel__container" tabIndex={0}>
				{children}
			</div>
			{isEmpty && <div className="carousel__container__empty">{emptyText}</div>}
		</div>
	);
}
