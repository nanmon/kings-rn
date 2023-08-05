import { TouchableHighlightProps, TouchableHighlight } from 'react-native'
import { theme } from '../theme/styles'
import { Text } from './Text'

export function Button(props: TouchableHighlightProps) {
	let { children } = props
	if (typeof children === 'string') {
		children = <Text style={props.disabled && theme.button_text__disabled}>{children}</Text>
	}
	return (
		<TouchableHighlight 
			{...props} 
			style={[theme.button, props.disabled && theme.button__disabled, props.style]}
		>
			{children}
		</TouchableHighlight>
	)
}