import { StyleSheet, TouchableOpacity } from "react-native"
import { Text } from "./Text"

interface MemberItemProps {
	member: string
	restricted?: boolean
	picked?: boolean
	onPress: (member: string) => void
}

const styles = StyleSheet.create({
	memberItem: {
		height: 40,
		justifyContent: 'center'
	},
	restricted: {
		opacity: 0.6,
		textDecorationLine: 'line-through'
	}
})

export function MemberItem({ member, restricted = false, picked = false, onPress }: MemberItemProps) {
	const isDev = process.env.NODE_ENV === 'development'
	return (
		<TouchableOpacity style={styles.memberItem} onPress={() => onPress(member)}>
			<Text style={restricted && styles.restricted}>{picked && isDev && '-> '}{member}</Text>
		</TouchableOpacity>
	)
}