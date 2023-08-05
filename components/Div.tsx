import { View, ViewProps } from "react-native";
import { theme } from "../theme/styles";

export function Div(props: ViewProps) {
	return (
		<View {...props} style={[theme.container, props.style]}/>
	)
}