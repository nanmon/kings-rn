import { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { useSyncEffect } from "../hooks/useSyncEffect";
import { Input } from "./Input";
import { Div } from "./Div";
import { Button } from "./Button";
import { IParty } from "../services/party.service";

export interface MemberSettingsProps {
	member?: string
	party: IParty
	onRename: (member: string, newName: string) => void
	onRemove: (member: string) => void
    onDeleteParty: () => void
	onBack: () => void
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
    container: {
        width: '100%',
        height: '100%',
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

export function MemberSettings({ member, party, onRename, onRemove, onDeleteParty, onBack }: MemberSettingsProps) {
    const isAdmin = party.people[0] === member
	const [rename, setRename] = useState('')

	useSyncEffect(() => {
		if (member) setRename(member)
	}, [member])

	if (!member) return null
	return (
        <Div style={styles.container}>
            <Button onPress={onBack}>{'<'}</Button>
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
        </Div>
	)
}