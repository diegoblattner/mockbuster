import { useEffect } from "react";
import { useLocation } from "react-router";

export function ScrollTop() {
	const { pathname } = useLocation();

	// biome-ignore lint/correctness/useExhaustiveDependencies: scrolls to top when the page changes
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}
