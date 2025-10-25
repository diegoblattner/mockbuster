import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cta } from "../cta";
import { moviesData } from "../mock-data";
import { MovieOverview } from "./movie-overview";

const meta = {
	component: MovieOverview,
} satisfies Meta<typeof MovieOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		...moviesData[0],
		children: <Cta>Add to whatchlist</Cta>,
	},
};
