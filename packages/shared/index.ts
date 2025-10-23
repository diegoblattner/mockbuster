export const serverPropsTagId = "server-props-for-hydration";
export const language = "en";

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

export type ApiListResult<T> = {
	page: number;
	results: T[];
};

export type ApiMovie = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: ApiGenreId[];
	id: string;
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

export type ApiStatus = {
	status_code: 0 | 1;
	status_message: string;
};
