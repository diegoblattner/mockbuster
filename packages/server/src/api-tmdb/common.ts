type ApiResult<T> = {
	error?: { message: string };
	data?: T;
};

function handleError(method: string, url: string, error: unknown): string {
	console.error(`${method} ${url}`, error);
	return `${method} ${url}`;
}

export async function fetchTmdbApi<T>(
	method: "GET" | "POST",
	apiPath: string,
	searchParams?: URLSearchParams,
	body?: Record<string, unknown>,
): Promise<ApiResult<T>> {
	const strSearch = searchParams?.toString() ?? "";
	const slash = apiPath[0] === "/" ? "" : "/";
	const url = `https://api.themoviedb.org/3${slash}${apiPath}?${strSearch}`;

	const headers: HeadersInit = {
		accept: "application/json",
		Authorization: `Bearer ${process.env.TMDB_API_TOKEN ?? ""}`,
	};
	if (method === "POST") {
		headers["content-type"] = "application/json";
	}

	const result: ApiResult<T> = {};

	try {
		const response = await fetch(url, {
			method,
			headers,
			body: body ? JSON.stringify(body) : undefined,
		});

		const parsed: T = await response.json();
		if (response.ok) {
			result.data = parsed;
		} else {
			result.error = { message: handleError(method, url, parsed) };
		}
	} catch (e) {
		result.error = { message: handleError(method, url, e) };
	}
	return result;
}
