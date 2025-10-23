import type { Meta, StoryObj } from "@storybook/react-vite";
import { moviesData } from "../mock-data";
import { MovieCard } from "./movie-card";

const meta = {
	component: MovieCard,
} satisfies Meta<typeof MovieCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: moviesData[0],
};
