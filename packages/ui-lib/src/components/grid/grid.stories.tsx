import type { Meta, StoryObj } from "@storybook/react-vite";
import { moviesData } from "../mock-data";
import { MovieCard } from "../movie-card";
import { Grid } from "./grid";

const meta = {
	component: Grid,
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		title: "Mockbuster grid",
		children: moviesData.map((m) => <MovieCard key={m.id} {...m} />),
	},
};

export const Empty: Story = {
	args: {
		title: "Mockbuster grid",
		children: [],
		emptyText: "Nothing to show for now...",
	},
};
