import type { ApiMovieDetails, Genre } from "./movie-details";

export type { ApiMovieDetails } from "./movie-details";
export { AppRoutes } from "./routes.ts";

export const serverPropsTagId = "server-props-for-hydration";
export const language = "en";
// TODO should come from the logged user
export const accountId = 1234;

type Values<T> = T extends Record<number, infer U> ? U : never;
type Keys<T> = T extends Record<infer U, string> ? U : never;
export type ApiGenre = Values<typeof allGenres>;
export type ApiGenreId = Keys<typeof allGenres>;

const allGenres = {
	28: "Action",
	12: "Abenteuer",
	16: "Animation",
	35: "Komödie",
	80: "Krimi",
	99: "Dokumentarfilm",
	18: "Drama",
	10751: "Familie",
	14: "Fantasy",
	36: "Historie",
	27: "Horror",
	10402: "Musik",
	9648: "Mystery",
	10749: "Liebesfilm",
	878: "Science Fiction",
	10770: "TV-Film",
	53: "Thriller",
	10752: "Kriegsfilm",
	37: "Western",
} as const;

export type GenreStyle = "action" | "fantasy" | "science";
type GenreWithStyle = Genre & {
	style: GenreStyle;
};

export const homePageCategories: GenreWithStyle[] = [
	{
		id: 28,
		name: allGenres[28],
		style: "action",
	},
	{
		id: 14,
		name: allGenres[14],
		style: "fantasy",
	},
	{
		id: 878,
		name: allGenres[878],
		style: "science",
	},
];

const genreStyle: Record<number, GenreStyle> = {
	28: "action",
	14: "fantasy",
	878: "science",
};

export function getGenreLabels(
	genres: Genre[] | undefined,
	genre_ids: number[] | undefined,
) {
	let labels: string[] = [];
	if (genres) {
		labels = genres.map((g) => g.name);
	} else if (genre_ids) {
		labels = genre_ids.map((id) => allGenres[id as ApiGenreId]);
	}
	return labels.filter((g) => !!g);
}

export function getGenreStyle(
	genres: Genre[] | undefined,
	genre_ids: number[] | undefined,
): GenreStyle | undefined {
	if (genres) {
		for (const g of genres) {
			if (genreStyle[g.id]) {
				return genreStyle[g.id];
			}
		}
	} else if (genre_ids) {
		for (const id of genre_ids) {
			if (genreStyle[id]) {
				return genreStyle[id];
			}
		}
	}
	return undefined;
}

export type ApiListResult<T> = {
	page: number;
	results: T[];
};

export type ApiListResultTotal<T> = ApiListResult<T> & {
	total_pages: number;
	total_results: number;
};

export type ApiMovie = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: ApiGenreId[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

type Undefined<T> = {
	[k in keyof T]?: T[k];
};
// use the difference between types as possibly undefined
type UndefinedKeys = Undefined<ApiMovieDetails & ApiMovie>;
export type ApiMovieMain = UndefinedKeys & (ApiMovie | ApiMovieDetails);

export type ApiStatus = {
	status_code: 0 | 1;
	status_message: string;
};
