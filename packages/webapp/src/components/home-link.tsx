import { Link } from "react-router";
import { AppRoutes } from "shared";
import { ChevronLeftIcon } from "ui-lib";

export function HomeLink() {
	return (
		<Link to={AppRoutes.Home}>
			<ChevronLeftIcon /> Back to home page
		</Link>
	);
}
