import { BottomTabInset, MaxContentWidth, Spacing } from "./spacing";
import { StyleSheet } from "react-native";

export const ContainerStyles = StyleSheet.create({
	scrollView: {
		flex: 1,
	},
	contentContainer: {
		flexDirection: "row",
		justifyContent: "center",
	},
	container: {
		maxWidth: MaxContentWidth,
		flexGrow: 1,
		flex: 1,
		justifyContent: "center",
		flexDirection: "row",
	},
	titleContainer: {
		gap: Spacing.three,
		alignItems: "center",
		paddingHorizontal: Spacing.four,
		paddingVertical: Spacing.six,
	},
	stepContainer: {
		gap: Spacing.three,
		alignSelf: "stretch",
		paddingHorizontal: Spacing.three,
		paddingVertical: Spacing.four,
		borderRadius: Spacing.four,
	},
	safeArea: {
		flex: 1,
		paddingHorizontal: Spacing.four,
		alignItems: "center",
		gap: Spacing.three,
		paddingBottom: BottomTabInset + Spacing.three,
		maxWidth: MaxContentWidth,
	},
	heroSection: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		paddingHorizontal: Spacing.four,
		gap: Spacing.four,
	},
	title: {
		textAlign: "center",
	},
});
