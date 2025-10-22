import type { Meta, StoryObj } from "@storybook/react-vite";
import { Logo } from "../logo";
import { Header } from "./header";

const meta = {
	component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		title: "Mockbuster",
		logo: <Logo />,
		logoAriaLabel: "Home page",
		logoHref: "https://google.com",
		links: <></>,
	},
};
