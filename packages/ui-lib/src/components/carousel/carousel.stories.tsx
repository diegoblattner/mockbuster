import type { Meta, StoryObj } from "@storybook/react-vite";
import { Carousel } from "./carousel";

const meta = {
	component: Carousel,
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const Div = () => (
	<div
		style={{
			border: "1px solid black",
			minWidth: "200px",
			height: "250px",
			padding: "16px",
			background: "white",
		}}
	>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas distinctio
	</div>
);

export const Primary: Story = {
	args: {
		title: "Mockbuster carousel",
		children: new Array(10).fill("").map((_, i) => <Div key={i} />),
	},
};
