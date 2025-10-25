import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cta } from "./cta";

const meta = {
	component: Cta,
} satisfies Meta<typeof Cta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Button: Story = {
	args: {
		type: "button",
		children: "Test button...",
	},
};

export const Link: Story = {
	args: {
		as: "a",
		href: "https://google.com",
		target: "_blank",
		referrer: "noreferrer",
		children: "Test link...",
	},
};

export const Outline: Story = {
	args: {
		type: "button",
		children: "Test button...",
		variant: "outline",
	},
};
