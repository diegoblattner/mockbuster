import { use } from "react";
import { AppContext } from "../app-context";

export function useAppContext() {
	const data = use(AppContext);

	if (!data) throw new Error("useAppContext used outside of AppProvide");

	return data;
}
