import { type ReactNode, useCallback, useRef } from "react";
import "./styles.css";

type CarouselProps = Readonly<{
	title: string;
	children: ReactNode;
}>;

const SCROLL_STEP = 400;
export function Carousel({ title, children }: CarouselProps) {
	const containerRef = useRef<HTMLDivElement>(null);

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
				<div className="carousel__arrows-container">
					<button
						type="button"
						aria-label="scroll backwards"
						onClick={() => scroll("left")}
						className="carousel__arrows-container__arrow"
					>
						‹
					</button>

					<button
						type="button"
						aria-label="scroll forwards"
						onClick={() => scroll("right")}
						className="carousel__arrows-container__arrow carousel__arrows-container__arrow--forward"
					>
						›
					</button>
				</div>
			</h3>

			<div ref={containerRef} className="carousel__container">
				{children}
			</div>
		</div>
	);
}
