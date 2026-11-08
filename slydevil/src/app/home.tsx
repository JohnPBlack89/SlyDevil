import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { useContentPlatformStyle } from "@/styles/platforms";
import { ContainerStyles } from "@/styles/containers";
import { BottomTabInset, Spacing } from "@/styles/spacing";
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
			style={[
				ContainerStyles.scrollView,
				{ backgroundColor: theme.background },
			]}
			contentInset={insets}
			contentContainerStyle={[
				ContainerStyles.contentContainer,
				contentPlatformStyle,
			]}
		>
			<ThemedView style={ContainerStyles.container}>
				<ThemedView style={ContainerStyles.titleContainer}>
					<ThemedText type="subtitle">Sly Devil Home</ThemedText>
				</ThemedView>
			</ThemedView>
		</ScrollView>
	);
}
