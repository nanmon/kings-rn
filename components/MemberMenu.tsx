import { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { useSyncEffect } from "../hooks/useSyncEffect";
import { Input } from "./Input";
import { Div } from "./Div";
import { Button } from "./Button";
import { IParty, PartyService } from "../services/party.service";
import { MemberItem } from "./MemberItem";
import { DeletePartyButton } from "./DeletePartyButton";

export interface MemberMenuProps {
	member?: string
	party: IParty
	onRename: (member: string, newName: string) => void
	onRestriction: (member1: string, member2: string) => void
	onRemove: (member: string) => void
	onDeleteParty: () => void
	onGetPick: (member: string) => void
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
		width: 256,
		padding: 24,
		gap: 16,
		borderRadius: 8,
	},
	restricted: {
		textDecorationLine: 'line-through'
	}
})

export function MemberMenu({ member, party, onRename, onRestriction, onRemove, onDeleteParty, onGetPick, onClose }: MemberMenuProps) {
	const isAdmin = party.people[0] === member
	const otherMembers = party.people.filter(person => person !== member)
	const isPartyStarted = party.giftChain != null
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
							// @ts-expect-error
							readOnly={isPartyStarted}
							onChangeText={setRename}
							onEndEditing={() => onRename(member, rename.trim())}
						/>
						<Div>
							{otherMembers.map((person) => (
									<MemberItem
										key={person}
										member={person} 
										restricted={PartyService.hasRestriction(party, member, person)}
										picked={PartyService.getGiftee(party, member) === person}
										onPress={() => onRestriction(member, person)}
									/>
							))}
						</Div>
						{!isPartyStarted && !isAdmin && <Button onPress={() => onRemove(member)}>Remove</Button>}
						{!isPartyStarted && isAdmin && <DeletePartyButton onDelete={onDeleteParty}/> }
						{isPartyStarted && <Button onPress={() => onGetPick(member)}>Get Pick</Button>}
					</Div>
				</TouchableWithoutFeedback>
			</View>
		</TouchableWithoutFeedback>
	)
}