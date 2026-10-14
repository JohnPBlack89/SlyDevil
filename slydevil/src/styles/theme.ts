import { StyleSheet } from "react-native";

export const colors = {
	background: "#fa5252",
	text: "#17121f",
};

export const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 24,
		backgroundColor: colors.background,
	},
	heading: {
		color: colors.text,
		fontSize: 28,
		fontWeight: "bold",
	},
});

/*
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		flexDirection: "row",
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
	code: {
		textTransform: "uppercase",
	},
	stepContainer: {
		gap: Spacing.three,
		alignSelf: "stretch",
		paddingHorizontal: Spacing.three,
		paddingVertical: Spacing.four,
		borderRadius: Spacing.four,
	},
});
*/
