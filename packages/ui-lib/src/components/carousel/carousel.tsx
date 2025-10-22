import { type ReactNode, useCallback, useRef } from "react";
import "./styles.css";

type CarouselProps = Readonly<{
	title: string;
	children: ReactNode;
}>;

export function Carousel({ title, children }: CarouselProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	const scroll = useCallback((direction: "left" | "right") => {
		if (containerRef.current) {
			const scrollAmount = direction === "left" ? -300 : 300;
			containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
		}
	}, []);

	return (
		<div className="carousel">
			<h3 className="carousel__header">{title}</h3>

			<button
				type="button"
				aria-label="scroll backwards"
				onClick={() => scroll("left")}
				className="carousel__arrow"
			>
				‹
			</button>

			<button
				type="button"
				aria-label="scroll forwards"
				onClick={() => scroll("right")}
				className="carousel__arrow carousel__arrow--forward"
			>
				›
			</button>

			<div ref={containerRef} className="carousel__container">
				{children}
			</div>
		</div>
	);
}
