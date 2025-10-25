import type { Meta, StoryObj } from "@storybook/react-vite";
import { Container } from "./container";

const meta = {
	component: Container,
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores vel fugiat quidem odit sunt vero soluta eveniet dolores nulla! Earum dolorum sequi inventore dolores molestiae? Quis voluptas iusto rerum doloremque.",
	},
};

export const Action: Story = {
	args: {
		style: "action",
		children:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores vel fugiat quidem odit sunt vero soluta eveniet dolores nulla! Earum dolorum sequi inventore dolores molestiae? Quis voluptas iusto rerum doloremque.",
	},
};

export const Fantasy: Story = {
	args: {
		style: "fantasy",
		children:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores vel fugiat quidem odit sunt vero soluta eveniet dolores nulla! Earum dolorum sequi inventore dolores molestiae? Quis voluptas iusto rerum doloremque.",
	},
};

export const Science: Story = {
	args: {
		style: "science",
		children:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores vel fugiat quidem odit sunt vero soluta eveniet dolores nulla! Earum dolorum sequi inventore dolores molestiae? Quis voluptas iusto rerum doloremque.",
	},
};
