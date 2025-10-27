import type { ReactNode } from "react";
import { type ApiMovieMain, getGenreLabels, getGenreStyle } from "shared";

type MovieOverviewProps = ApiMovieMain & {
	children?: ReactNode;
};

export function MovieOverview({
	title,
	release_date,
	poster_path,
	overview,
	children,
	genres,
	genre_ids,
}: MovieOverviewProps) {
	const style = getGenreStyle(genres, genre_ids);
	const clx = style ? `movie-overview__desc__title--${style}` : "";
	return (
		<div className="movie-overview">
			<img
				className="movie-overview__img"
				src={`https://image.tmdb.org/t/p/w300${poster_path}`}
				alt={`${title} cover`}
			/>
			<div className="movie-overview__desc">
				<h2 className={`movie-overview__desc__title ${clx}`}>{title}</h2>
				<div className="movie-overview__desc__date" suppressHydrationWarning>
					{new Date(release_date).toLocaleDateString()}
				</div>
				<div className="movie-overview__desc__genres" suppressHydrationWarning>
					{getGenreLabels(genres, genre_ids).join(", ")}
				</div>
				<div className="movie-overview__desc__overview">{overview}</div>
				<div className="movie-overview__desc__actions">{children}</div>
			</div>
		</div>
	);
}
