import "./styles.css";

type MovieCardProps = Readonly<{
	title: string;
	img: string;
	year: string;
	onClick?: () => void;
	href?: string;
}>;

export function MovieCard({ title, img, year }: MovieCardProps) {
	return (
		<div className="movie-card">
			<div className="movie-card__img">
				<img src={img} alt={title} />
			</div>
			<div className="movie-card__title">{title}</div>
			<div className="movie-card__year">{year}</div>
		</div>
	);
}
