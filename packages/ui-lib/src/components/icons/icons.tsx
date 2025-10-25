import "./styles.css";

type IconProps = Readonly<{
	className?: string;
	rotate?: "180";
	title?: string;
}>;

export const FilmIcon = ({
	className = "",
	title = "film icon",
}: IconProps) => (
	<svg
		className={`icon ${className}`}
		stroke="currentColor"
		fill="currentColor"
		strokeWidth="0"
		viewBox="0 0 512 512"
		width="32px"
		height="32px"
		xmlns="http://www.w3.org/2000/svg"
	>
		<title>{title}</title>
		<path d="M488 64h-8v20c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V64H96v20c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12V64h-8C10.7 64 0 74.7 0 88v336c0 13.3 10.7 24 24 24h8v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h320v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h8c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24zM96 372c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm272 208c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm0-168c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm112 152c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z"></path>
	</svg>
);

export function AddListIcon({
	className = "",
	title = "Add to list icon",
}: IconProps) {
	return (
		<svg
			className={`icon ${className}`}
			stroke="currentColor"
			fill="none"
			strokeWidth="2"
			viewBox="0 0 24 24"
			strokeLinecap="round"
			strokeLinejoin="round"
			height="32px"
			width="32px"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>{title}</title>
			<path d="M19 8h-14"></path>
			<path d="M5 12h9"></path>
			<path d="M11 16h-6"></path>
			<path d="M15 16h6"></path>
			<path d="M18 13v6"></path>
		</svg>
	);
}

export function PopcornIcon({
	className = "",
	title = "Popcorn icon",
}: IconProps) {
	return (
		<svg
			className={`icon ${className}`}
			stroke="currentColor"
			fill="none"
			strokeWidth="2"
			viewBox="0 0 24 24"
			strokeLinecap="round"
			strokeLinejoin="round"
			height="32px"
			width="32px"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>{title}</title>
			<path d="M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4"></path>
			<path d="M10 22 9 8"></path>
			<path d="m14 22 1-14"></path>
			<path d="M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z"></path>
		</svg>
	);
}

export function ChevronLeftIcon({
	className = "",
	rotate,
	title = "chevron left icon",
}: IconProps) {
	const clx = rotate ? `icon--${rotate}` : "";
	return (
		<svg
			className={`icon ${clx} ${className}`}
			stroke="currentColor"
			fill="none"
			strokeWidth="2"
			viewBox="0 0 24 24"
			strokeLinecap="round"
			strokeLinejoin="round"
			height="32px"
			width="32px"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>{title}</title>
			<path d="m15 18-6-6 6-6"></path>
		</svg>
	);
}

export function CheckIcon({ className = "", title = "check icon" }: IconProps) {
	return (
		<svg
			className={className}
			stroke="currentColor"
			fill="none"
			strokeWidth="2"
			viewBox="0 0 24 24"
			strokeLinecap="round"
			strokeLinejoin="round"
			height="32px"
			width="32px"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>{title}</title>
			<circle cx="12" cy="12" r="10"></circle>
			<path d="m9 12 2 2 4-4"></path>
		</svg>
	);
}
