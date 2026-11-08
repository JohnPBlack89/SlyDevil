import * as Device from "expo-device";
import { Platform, StyleSheet, View, Text, ScrollView } from "react-native";
import {
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

import { AnimatedIcon } from "@/components/animated-icon";
import { HintRow } from "@/components/hint-row";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { WebBadge } from "@/components/web-badge";
import { ThemeColor } from "@/styles/coloring";
import { BottomTabInset, Spacing } from "@/styles/spacing";
import { ContainerStyles } from "@/styles/containers";
import { useContentPlatformStyle } from "@/styles/platforms";

function getDevMenuHint() {
	if (Platform.OS === "web") {
		return <ThemedText type="small">use browser devtools</ThemedText>;
	}
	if (Device.isDevice) {
		return (
			<ThemedText type="small">
				shake device or press <ThemedText type="code">m</ThemedText> in terminal
			</ThemedText>
		);
	}
	const shortcut = Platform.OS === "android" ? "cmd+m (or ctrl+m)" : "cmd+d";
	return (
		<ThemedText type="small">
			press <ThemedText type="code">{shortcut}</ThemedText>
		</ThemedText>
	);
}

export default function HomeScreen() {
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
					<ThemedText type="subtitle">Sly Devil Index</ThemedText>
				</ThemedView>
			</ThemedView>
		</ScrollView>
		/*
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            Welcome to&nbsp;Expo
          </ThemedText>
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          get started
        </ThemedText>

        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          <HintRow
            title="Try editing"
            hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
          />
          <HintRow title="Dev tools" hint={getDevMenuHint()} />
          <HintRow
            title="Fresh start"
            hint={<ThemedText type="code">npm run reset-project</ThemedText>}
          />
        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>*/
	);
}
