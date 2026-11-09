import { DarkTheme, DefaultTheme } from "expo-router";

export const Colors = {
	light: {
		text: "#000000",
		background: "#fa5252",
		backgroundElement: "#881515",
		backgroundSelected: "#881515",
		textSecondary: "#60646C",
		inset: "#eeeeec",
		muted: "#60605d",
		border: "#858580",
		primary: "#262626",
		onPrimary: "#ffffff",
		error: "#a52121",
	},
	dark: {
		text: "#fa5252",
		background: "#1e1e1e",
		backgroundElement: "#212225",
		backgroundSelected: "#2E3135",
		textSecondary: "#B0B4BA",
		page: "#121212",
		inset: "#292929",
		muted: "#b7b7b0",
		border: "#82827c",
		primary: "#fa5252",
		onPrimary: "#171717",
		error: "#ffaaaa",
	},
} as const;

export const NavigationThemes = {
	light: {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			background: Colors.light.background,
			card: Colors.light.background,
			text: Colors.light.text,
			primary: Colors.light.primary,
			border: Colors.light.border,
			notification: Colors.light.error,
		},
	},
	dark: {
		...DarkTheme,
		colors: {
			...DarkTheme.colors,
			background: Colors.dark.background,
			card: Colors.dark.background,
			text: Colors.dark.text,
			primary: Colors.dark.primary,
			border: Colors.dark.border,
			notification: Colors.dark.error,
		},
	},
};

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;
