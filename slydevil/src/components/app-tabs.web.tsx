import {
	Tabs,
	TabList,
	TabTrigger,
	TabSlot,
	TabTriggerSlotProps,
	TabListProps,
} from "expo-router/ui";
import { SymbolView } from "expo-symbols";
import { Pressable, useColorScheme, View, StyleSheet } from "react-native";
import { ContainerStyles } from "@/styles/containers";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { Colors } from "@/styles/coloring";
import { MaxContentWidth, Spacing } from "@/styles/spacing";
import { useTheme } from "@/hooks/use-theme";

export default function AppTabs() {
	const theme = useTheme();
	return (
		<Tabs style={{ flex: 1, backgroundColor: theme.background }}>
			<TabSlot style={{ flex: 1, backgroundColor: theme.background }} />
			<TabList asChild>
				<CustomTabList>
					<TabTrigger name="home" href="/" asChild>
						<TabButton>Home</TabButton>
					</TabTrigger>
					<TabTrigger name="explore" href="/explore" asChild>
						<TabButton>Explore</TabButton>
					</TabTrigger>
					<TabTrigger name="Login" href="/account-login" asChild>
						<TabButton>Login</TabButton>
					</TabTrigger>
				</CustomTabList>
			</TabList>
		</Tabs>
	);
}

export function TabButton({
	children,
	isFocused,
	...props
}: TabTriggerSlotProps) {
	return (
		<Pressable {...props} style={({ pressed }) => pressed && styles.pressed}>
			<ThemedView
				type={isFocused ? "backgroundSelected" : "backgroundElement"}
				style={styles.tabButtonView}
			>
				<ThemedText
					type="small"
					themeColor={isFocused ? "text" : "textSecondary"}
				>
					{children}
				</ThemedText>
			</ThemedView>
		</Pressable>
	);
}

export function CustomTabList(props: TabListProps) {
	const scheme = useColorScheme();
	const colors = Colors[scheme === "unspecified" ? "light" : scheme];

	return (
		<View {...props} style={ContainerStyles.tabListContainer}>
			<ThemedView
				type="backgroundElement"
				style={ContainerStyles.innerContainer}
			>
				<ThemedText type="smallBold" style={styles.brandText}>
					Sly Devil
				</ThemedText>
				{props.children}
			</ThemedView>
		</View>
	);
}

const styles = StyleSheet.create({
	brandText: {
		marginRight: "auto",
	},
	pressed: {
		opacity: 0.7,
	},
	tabButtonView: {
		paddingVertical: Spacing.one,
		paddingHorizontal: Spacing.three,
		borderRadius: Spacing.three,
	},
	externalPressable: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: Spacing.one,
		marginLeft: Spacing.three,
	},
});
