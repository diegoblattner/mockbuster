import { FilmIcon } from "../icons";

type LogoProps = Readonly<{
	title?: string;
}>;

export function Logo({ title }: LogoProps) {
	return (
		<div className="logo">
			<FilmIcon title={title} />
		</div>
	);
}
