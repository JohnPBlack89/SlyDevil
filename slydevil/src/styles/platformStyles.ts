import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Spacing, BottomTabInset } from "@/styles/coloring";
import { Platform, StyleSheet, StyleProp, ViewStyle } from "react-native";

const platformStyles = StyleSheet.create({
	android: { paddingTop: 2 },
	web: {
		paddingTop: Spacing.six,
		paddingBottom: Spacing.four,
	},
});

export function useContentPlatformStyle() {
	const insets = useSafeAreaInsets();

	return Platform.select<StyleProp<ViewStyle>>({
		android: [
			platformStyles.android,
			{
				paddingTop: insets.top,
				paddingLeft: insets.left,
				paddingRight: insets.right,
				paddingBottom: insets.bottom + BottomTabInset + Spacing.three,
			},
		],
		web: platformStyles.web,
	});
}
