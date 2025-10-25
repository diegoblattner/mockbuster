import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./tooltip";

const meta = {
	component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Show: Story = {
	args: {
		content: "Hello there!",
		show: true,
		children: (
			<span style={{ width: "auto", paddingBlock: "var(--spacing-8)" }}>
				This is the anchor...
			</span>
		),
	},
};

export const Hide: Story = {
	args: {
		content: "Hello there!",
		show: true,
		children: (
			<div style={{ paddingBlock: "var(--spacing-8)" }}>
				This is the anchor...
			</div>
		),
	},
};
