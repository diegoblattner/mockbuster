import { Link } from "react-router";
import { AppRoutes } from "shared";

export function HomeLink() {
	return <Link to={AppRoutes.Home}>{"‹ Back to home page"}</Link>;
}
