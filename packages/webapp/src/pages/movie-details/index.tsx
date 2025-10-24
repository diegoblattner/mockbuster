import { lazy } from "react";
import { AppRoutes } from "shared";

// code splitting
export const MovieDetails = lazy(() => import("./movie-details"));

export function goToMovieDetails(movieId: number) {
	return AppRoutes.MovieDetails.replace(":id", movieId.toString());
}
