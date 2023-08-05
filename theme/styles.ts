import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const theme = StyleSheet.create({
	container: {
		backgroundColor: colors.background,
		color: colors.foreground,
	},
	text: {
		color: colors.foreground,
		fontFamily: 'Monocraft',
	},
	input: {
		color: colors.foreground,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: colors.foreground,
		fontFamily: 'Monocraft',
	},
	button: {
		backgroundColor: colors.background,
		color: colors.foreground,
		borderColor: colors.foreground,
		borderWidth: 1,
		padding: 8,
		height: 40,
		width: '100%',
		alignItems: 'center'
	},
	button__disabled: {
		borderColor: colors.foreground + '99',
	},
	button_text__disabled: {
		color: colors.foreground + '99',
		textDecorationLine: 'line-through'
	}
})