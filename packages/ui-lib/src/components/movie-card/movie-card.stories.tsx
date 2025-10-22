import type { Meta, StoryObj } from "@storybook/react-vite";
import { MovieCard } from "./movie-card";

const meta = {
	component: MovieCard,
} satisfies Meta<typeof MovieCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		title: "Mockbuster carousel",
		img: "noope.jpg",
		year: "2025",
	},
};
