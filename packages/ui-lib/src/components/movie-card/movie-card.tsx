import type { ApiMovie } from "shared";
import "./styles.css";

type MovieCardProps = Readonly<
	ApiMovie & {
		onClick?: () => void;
		href?: string;
	}
>;

export function MovieCard({
	title,
	poster_path,
	release_date,
}: MovieCardProps) {
	return (
		<div className="movie-card">
			<div className="movie-card__img">
				<img
					src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
					alt={title}
				/>
			</div>
			<div className="movie-card__title">{title}</div>
			<div className="movie-card__year">
				{new Date(release_date).toLocaleDateString()}
			</div>
		</div>
	);
}
