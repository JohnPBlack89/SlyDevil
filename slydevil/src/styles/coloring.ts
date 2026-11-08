export const Colors = {
	light: {
		text: "#000000",
		background: "#fa5252",
		backgroundElement: "#881515",
		backgroundSelected: "#881515",
		textSecondary: "#60646C",
	},
	dark: {
		text: "#fa5252",
		background: "#000000",
		backgroundElement: "#212225",
		backgroundSelected: "#2E3135",
		textSecondary: "#B0B4BA",
	},
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;
