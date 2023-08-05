import { Text as RNText, TextProps } from "react-native";
import { theme } from "../theme/styles";

export function Text(props: TextProps) {
	return <RNText {...props} style={[theme.text, props.style]}/>
}