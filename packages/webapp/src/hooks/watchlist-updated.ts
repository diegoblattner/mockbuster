import { useEffect, useRef, useState } from "react";
import { useAppContext } from "./app-context";

export function useWatchlistUpdated(keepTimeout: number) {
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
