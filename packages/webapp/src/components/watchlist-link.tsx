import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { AppRoutes } from "shared";
import { CheckIcon, PopcornIcon, Tooltip } from "ui-lib";
import { useAppContext } from "../app-context";

function useWatchlistUpdated(keepTimeout: number) {
	const [updated, setUpdated] = useState(false);
	const [{ watchlist }] = useAppContext();
	const countRef = useRef(watchlist.results.length);

	useEffect(() => {
		let timeout: number;
		if (countRef.current !== watchlist.results.length) {
			setUpdated(true);
			countRef.current = watchlist.results.length;
			timeout = setTimeout(() => {
				setUpdated(false);
			}, keepTimeout);
		}
		return () => {
			if (timeout !== undefined) {
				clearTimeout(timeout);
			}
		};
	}, [watchlist, watchlist.results, keepTimeout]);

	return updated;
}

export function WatchlistLink() {
	const [{ watchlist }] = useAppContext();
	const showTooltip = useWatchlistUpdated(5000);

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
