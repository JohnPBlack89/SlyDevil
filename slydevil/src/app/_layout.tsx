import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { NavigationThemes } from "@/styles/coloring";
import { RoomPreviewProvider } from "@/components/room-preview";
import { useTheme } from "@/hooks/use-theme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const theme = useTheme();
	const navigationTheme =
		NavigationThemes[colorScheme === "dark" ? "dark" : "light"];

	const baseTheme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
	return (
		<SafeAreaProvider style={{ flex: 1, backgroundColor: theme.background }}>
			<ThemeProvider value={navigationTheme}>
				<AnimatedSplashOverlay />
				<RoomPreviewProvider>
					<Stack
						initialRouteName="index"
						screenOptions={{
							headerShown: false,
							contentStyle: { backgroundColor: theme.background },
						}}
					/>
				</RoomPreviewProvider>
			</ThemeProvider>
		</SafeAreaProvider>
	);
}
