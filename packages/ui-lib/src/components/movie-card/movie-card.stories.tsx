import type { Meta, StoryObj } from "@storybook/react-vite";
import { MovieCard } from "./movie-card";

const meta = {
	component: MovieCard,
} satisfies Meta<typeof MovieCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		title: "Movie one",
		poster_path: "/noope.jpg",
		release_date: "2025",
		adult: false,
		backdrop_path: "/noope2.jpg",
		genre_ids: [28],
		id: "1",
		original_language: "en",
		original_title: "Movie one",
		overview: "1000 words to describe",
		popularity: 50,
		video: false,
		vote_average: 45,
		vote_count: 1907,
	},
};
