import type { Meta, StoryObj } from "@storybook/react-vite";
import { moviesData } from "../mock-data";
import { MovieCard } from "../movie-card";
import { Carousel } from "./carousel";

const meta = {
	component: Carousel,
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		title: "Mockbuster carousel",
		children: moviesData.map((m) => <MovieCard key={m.id} {...m} />),
	},
};

export const Empty: Story = {
	args: {
		title: "Mockbuster carousel",
		children: [],
		emptyText: "Nothing to show for now...",
	},
};
