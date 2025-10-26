import { Link } from "react-router";
import { AppRoutes } from "shared";
import { CheckIcon, PopcornIcon, Tooltip } from "ui-lib";
import { useAppContext } from "../hooks/app-context";
import { useWatchlistUpdated } from "../hooks/watchlist-updated";

export function WatchlistLink() {
	const [{ watchlist }] = useAppContext();
	const showTooltip = useWatchlistUpdated(3000);

	return (
		<Tooltip
			show={showTooltip}
			content={
				<div className="flex">
					<CheckIcon className="secondary" /> Updated!
				</div>
			}
		>
			<Link to={AppRoutes.Watchlist} className="flex">
				<PopcornIcon /> Watchlist ({watchlist.results.length})
			</Link>
		</Tooltip>
	);
}
