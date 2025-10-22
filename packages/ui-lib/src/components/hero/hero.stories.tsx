import type { Meta, StoryObj } from "@storybook/react-vite";
import { Hero } from "./hero";

const meta = {
	component: Hero,
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		mainText: (
			<>
				Find the movie you want to watch.
				<br />
				Right now!
			</>
		),
		subtext:
			"The best movies recommendation to terminate your choice paralisys!",
		children: <>No children yet...</>,
	},
};
