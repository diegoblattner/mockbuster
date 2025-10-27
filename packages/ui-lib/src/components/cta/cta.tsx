type PolymorphicProps<E extends React.ElementType> = React.PropsWithChildren<
	React.ComponentPropsWithoutRef<E> & {
		as?: E;
		variant?: "outline";
	}
>;

export function Cta<T extends React.ElementType = "button">({
	as,
	variant,
	...props
}: PolymorphicProps<T>) {
	const Component = as ?? "button";
	const clx = variant ? `cta--${variant}` : "";

	return <Component className={`cta ${clx}`} {...props} />;
}
