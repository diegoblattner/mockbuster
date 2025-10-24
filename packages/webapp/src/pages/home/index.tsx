import { lazy, Suspense } from "react";

export const homePath = "/";

export const Home = lazy(() => import("./home"));

export function HomeSuspended() {
	return (
		<Suspense fallback="Loading...">
			<Home />
		</Suspense>
	);
}
