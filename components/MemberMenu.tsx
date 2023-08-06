import { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { useSyncEffect } from "../hooks/useSyncEffect";
import { Input } from "./Input";
import { Div } from "./Div";
import { Button } from "./Button";

export interface MemberMenuProps {
	member?: string
	isAdmin: boolean
	onRename: (member: string, newName: string) => void
	onRemove: (member: string) => void
	onDeleteParty: () => void
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
		backgroundColor: '#000d',
		justifyContent: 'center',
		alignItems: 'center'
	},
	content: {
		width: 200,
		padding: 8,
		gap: 64,
		// borderWidth: 1,
		// borderColor: colors.foreground,
		borderRadius: 8,
	}
})

export function MemberMenu({ member, isAdmin, onRename, onRemove, onDeleteParty, onClose }: MemberMenuProps) {
	const [rename, setRename] = useState('')

	useSyncEffect(() => {
		if (member) setRename(member)
	}, [member])

	if (!member) return null
	return (
		<TouchableWithoutFeedback onPress={onClose}>
			<View style={styles.backdrop}>
				<TouchableWithoutFeedback>
					<Div style={styles.content}>
						<Input 
							value={rename} 
							onChangeText={setRename} 
							onEndEditing={() => onRename(member, rename.trim())}
						/>
						{isAdmin
							? <Button onPress={() => onDeleteParty()}>Delete Party</Button>
							: <Button onPress={() => onRemove(member)}>Remove</Button>
						}
					</Div>
				</TouchableWithoutFeedback>
			</View>
		</TouchableWithoutFeedback>
	)
}