import { Button, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

export interface MemberMenuProps {
	member?: string
	isAdmin: boolean
	onAction: (action: 'rename' | 'remove' | 'deleteParty', member: string, newName?: string) => void
	onClose: () => void
}

const styles = StyleSheet.create({
	backdrop: {
		position: 'absolute',
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		alignSelf: 'stretch',
		backgroundColor: '#0009',
		justifyContent: 'center',
		alignItems: 'center'
	},
	content: {
		width: 200,
		height: 300,
		backgroundColor: 'white',
		padding: 8,
		gap: 8,
	}
})

export function MemberMenu({ member, isAdmin, onAction, onClose }: MemberMenuProps) {
	if (!member) return null
	return (
		<TouchableWithoutFeedback onPress={onClose}>
			<View style={styles.backdrop}>
				<TouchableWithoutFeedback>
					<View style={styles.content}>
						<Text>{member}</Text>
						<Button title="Rename" onPress={() => onAction('rename', member)}/>
						{isAdmin
							? <Button title="Delete Party" onPress={() => onAction('deleteParty', member)}/>
							: <Button title="Remove" onPress={() => onAction('remove', member)}/>
						}
					</View>
				</TouchableWithoutFeedback>
			</View>
		</TouchableWithoutFeedback>
	)
}