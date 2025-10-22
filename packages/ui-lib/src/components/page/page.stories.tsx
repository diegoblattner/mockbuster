import type { Meta, StoryObj } from "@storybook/react-vite";
import { Container } from "../container";
import { Page } from "./page";

const meta = {
	component: Page,
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		title: "Storybook",
		logoAriaLabel: "Home page",
		logoHref: "https://google.com",
		links: <></>,
		children: (
			<Container>
				<div style={{ paddingBlock: "var(--spacing-8)" }}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit odit
					ullam possimus porro vitae aliquid consequatur accusantium tempora ex
					ipsam, repellat illum recusandae aut omnis cupiditate deleniti!
					Aliquid, at sapiente.
				</div>
			</Container>
		),
	},
};
