import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import { Platform, Pressable, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ContainerStyles } from "@/styles/containers";
import { ExternalLink } from "@/components/external-link";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Collapsible } from "@/components/collapsible";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/styles/spacing";
import { useTheme } from "@/hooks/use-theme";
import { useContentPlatformStyle } from "@/styles/platforms";
import { ImageStyling } from "@/styles/images";
import { LinkButton } from "@/styles/linkButton";

export default function TabTwoScreen() {
	const safeAreaInsets = useSafeAreaInsets();
	const insets = {
		...safeAreaInsets,
		bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
	};
	const theme = useTheme();

	const contentPlatformStyle = useContentPlatformStyle();

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
					<ThemedText type="subtitle">Explore</ThemedText>
					<ThemedText style={styles.centerText} themeColor="textSecondary">
						This starter app includes example{"\n"}code to help you get started.
					</ThemedText>

					<ExternalLink href="https://docs.expo.dev" asChild>
						<Pressable style={({ pressed }) => pressed && styles.pressed}>
							<ThemedView
								type="backgroundElement"
								style={LinkButton.linkButton}
							>
								<ThemedText type="link">Expo documentation</ThemedText>
								<SymbolView
									tintColor={theme.text}
									name={{
										ios: "arrow.up.right.square",
										android: "link",
										web: "link",
									}}
									size={12}
								/>
							</ThemedView>
						</Pressable>
					</ExternalLink>
				</ThemedView>

				<ThemedView style={styles.sectionsWrapper}>
					<Collapsible title="Light and dark mode components">
						<ThemedText type="small">
							This template has light and dark mode support. The{" "}
							<ThemedText type="code">useColorScheme()</ThemedText> hook lets
							you inspect what the user&apos;s current color scheme is, and so
							you can adjust UI colors accordingly.
						</ThemedText>
						<ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
							<ThemedText type="linkPrimary">Learn more</ThemedText>
						</ExternalLink>
					</Collapsible>

					<Collapsible title="Animations">
						<ThemedText type="small">
							This template includes an example of an animated component. The{" "}
							<ThemedText type="code">
								src/components/ui/collapsible.tsx
							</ThemedText>{" "}
							component uses the powerful{" "}
							<ThemedText type="code">react-native-reanimated</ThemedText>{" "}
							library to animate opening this hint.
						</ThemedText>
					</Collapsible>
				</ThemedView>
				{Platform.OS === "web" && <WebBadge />}
			</ThemedView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	centerText: {
		textAlign: "center",
	},
	pressed: {
		opacity: 0.7,
	},
	sectionsWrapper: {
		gap: Spacing.five,
		paddingHorizontal: Spacing.four,
		paddingTop: Spacing.three,
	},
	collapsibleContent: {
		alignItems: "center",
	},
});
