import { TouchableHighlightProps, TouchableHighlight } from 'react-native'
import { theme } from '../theme/styles'

export function Button(props: TouchableHighlightProps) {
	return <TouchableHighlight {...props} style={[theme.button, props.style]}/>
}