import { StyleSheet, TouchableOpacity } from "react-native"
import { Text } from "./Text"

interface MemberItemProps {
	member: string
	onPress: (member: string) => void
}

const styles = StyleSheet.create({
	memberItem: {
		height: 40,
		justifyContent: 'center'
	}
})

export function MemberItem({ member, onPress }: MemberItemProps) {
	return (
		<TouchableOpacity style={styles.memberItem} onPress={() => onPress(member)}>
			<Text>{member}</Text>
		</TouchableOpacity>
	)
}