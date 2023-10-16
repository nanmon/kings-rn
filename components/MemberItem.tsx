import { StyleSheet, TouchableOpacity } from "react-native"
import { Text } from "./Text"

interface MemberItemProps {
	member: string
	restricted?: boolean
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

export function MemberItem({ member, restricted = false, onPress }: MemberItemProps) {
	return (
		<TouchableOpacity style={styles.memberItem} onPress={() => onPress(member)}>
			<Text style={restricted && styles.restricted}>{member}</Text>
		</TouchableOpacity>
	)
}