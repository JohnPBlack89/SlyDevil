import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { useContentPlatformStyle } from "@/styles/platformStyles";
import { MaxContentWidth, Spacing, BottomTabInset } from "@/styles/coloring";
import { ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
	const theme = useTheme();
	const contentPlatformStyle = useContentPlatformStyle();
	const safeAreaInsets = useSafeAreaInsets();
	const insets = {
		...safeAreaInsets,
		bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
	};
	return (
		<ScrollView
			style={[styles.scrollView, { backgroundColor: theme.background }]}
			contentInset={insets}
			contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}
		>
			<ThemedView style={styles.container}>
				<ThemedText>Sly Devil</ThemedText>
			</ThemedView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
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
	},
	titleContainer: {
		gap: Spacing.three,
		alignItems: "center",
		paddingHorizontal: Spacing.four,
		paddingVertical: Spacing.six,
	},
	centerText: {
		textAlign: "center",
	},
	pressed: {
		opacity: 0.7,
	},
	linkButton: {
		flexDirection: "row",
		paddingHorizontal: Spacing.four,
		paddingVertical: Spacing.two,
		borderRadius: Spacing.five,
		justifyContent: "center",
		gap: Spacing.one,
		alignItems: "center",
	},
	sectionsWrapper: {
		gap: Spacing.five,
		paddingHorizontal: Spacing.four,
		paddingTop: Spacing.three,
	},
	collapsibleContent: {
		alignItems: "center",
	},
	imageTutorial: {
		width: "100%",
		aspectRatio: 296 / 171,
		borderRadius: Spacing.three,
		marginTop: Spacing.two,
	},
	imageReact: {
		width: 100,
		height: 100,
		alignSelf: "center",
	},
});
