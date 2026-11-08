import { StyleSheet } from "react-native";
import { Spacing } from "./spacing";

export const ImageStyling = StyleSheet.create({
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
