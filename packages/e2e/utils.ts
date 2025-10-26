import type { ApiMovie } from "shared";

const url = process.env.URL ?? "http://localhost";
const port = process.env.PORT ?? 5174;

export const SITE_URL = `${url}:${port}`;

export const mockMovie: ApiMovie = {
	adult: false,
	backdrop_path: "/1leYKN0DPNffpldGnCWnbXaiWoD.jpg",
	genre_ids: [28, 53],
	id: 1305717,
	original_language: "en",
	original_title: "Hunting Grounds",
	overview:
		"Desperate to find refuge for her children, Chloe Marvino runs away from her Mafia tied husband, and finds shelter in a cabin with a recluse drifter named Jake. But as her husband's henchmen draw closer to her, it turns out that Jake is the biggest enemy of them all.",
	popularity: 250.7735,
	poster_path: "/cgZjpqRQt9sk6XMCwZ3B1NPAaoy.jpg",
	release_date: "2025-05-16",
	title: "Hunting Grounds",
	video: false,
	vote_average: 0,
	vote_count: 0,
};
