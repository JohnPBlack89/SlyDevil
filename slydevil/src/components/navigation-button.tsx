import { Link, type Href } from "expo-router";
import { ActionButton, type ActionButtonProps } from "@/components/screen-ui";

export type NavigationButtonProps = Omit<ActionButtonProps, "onPress"> & {
	href: Href;
	replace?: boolean;
};

export function NavigationButton({
	href,
	replace = false,
	...props
}: NavigationButtonProps) {
	// Keep Pressable's style callback inside ActionButton, outside Link's slot merge.
	const button = <ActionButton {...props} accessibilityRole="link" />;
	return props.disabled ? (
		button
	) : (
		<Link href={href} replace={replace} asChild>
			{button}
		</Link>
	);
}
