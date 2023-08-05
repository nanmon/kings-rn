import { TextInput, TextInputProps } from "react-native";
import { theme } from "../theme/styles";
import { colors } from "../theme/colors";

export function Input(props: TextInputProps) {
	return <TextInput {...props} style={[theme.input, props.style]} placeholderTextColor={props.placeholderTextColor || colors.foreground + '99'}/>
}