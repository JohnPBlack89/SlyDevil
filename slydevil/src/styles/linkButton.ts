import { Spacing } from "./spacing";
import { StyleSheet } from "react-native";

export const LinkButton = StyleSheet.create({
	linkButton: {
		flexDirection: "row",
		paddingHorizontal: Spacing.four,
		paddingVertical: Spacing.two,
		borderRadius: Spacing.five,
		justifyContent: "center",
		gap: Spacing.one,
		alignItems: "center",
	},
});
