import type { ComponentProps } from "react";
import App from "webapp";

export function appRenderer(props: ComponentProps<typeof App>) {
	return <App {...props} />;
}
