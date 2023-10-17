import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Sharing from 'expo-sharing'
import { PartyService, IParty } from "../services/party.service";
import { MemberMenu } from "./MemberMenu";
import { Input } from "./Input";
import { MemberItem } from "./MemberItem";
import { Div } from "./Div";
import { Button } from "./Button";
import { DebugGiftee } from "./DebugGiftee";
import { createTempGiftFile } from "../fsdb/fsdb";

interface PartySetupProps {
	party: IParty
	onPartyChange: (party: IParty | null) => void
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
		gap: 8
  },
	addMemberInput: {
		width: 232,
	},
	list: {
		marginVertical: 24,
	},
	shuffle: {
		width: 200
	},
});

export function PartySetup({ party, onPartyChange }: PartySetupProps) {
	const [newPersonInput, setNewPersonInput] = useState('')
	const [memberOptions, setMemberOptions] = useState<string | undefined>(undefined)

	const handleAddPerson = () => {
		if (!newPersonInput.trim()) return
		const updatedParty = PartyService.addMember(party, newPersonInput.trim())
		onPartyChange(updatedParty)
		setNewPersonInput('')
	}

	const handleRename = (member: string, newName: string) => {
		if (!newName) return
		onPartyChange(PartyService.renameMember(party, member, newName))
		setMemberOptions(newName)
	}

	const handleRestriction = (member1: string, member2: string) => {
		if (party.giftChain != null) return
		onPartyChange(PartyService.toggleRestriction(party, member1, member2))
	}

	const handleDelete = (member: string) => {
		onPartyChange(PartyService.removeMember(party, member))
		setMemberOptions(undefined)
	}

	const handleDeleteParty = () => {
		onPartyChange(null)
	}

	const handleShuffle = () => {
		onPartyChange(PartyService.shuffle(party))
	}

	const handleMemberClick = async (person: string) => {
		setMemberOptions(person)

	}

	const handleDownloadPick = async (member: string) => {
		const giftTo = PartyService.getGiftee(party, member)!
		const tmpUri = await createTempGiftFile(member, giftTo)
		Sharing.shareAsync(tmpUri)
	}

	const handleUndoShuffle = () => {
		onPartyChange({
			...party,
			giftChain: undefined
		})
	}

	return (
		<Div style={styles.container}>
			{party.giftChain == null &&
				<Input
					style={styles.addMemberInput}
					placeholder="Write new member name" 
					value={newPersonInput} 
					onChangeText={setNewPersonInput} 
					onEndEditing={handleAddPerson}
				/>
			}
			<Div style={styles.list}>
				{party.people.map((person) => (
					<MemberItem key={person} member={person} onPress={handleMemberClick}/>
				))}
			</Div>
			{party.giftChain == null 
				? <Button 
					style={styles.shuffle} 
					disabled={party.people.length <3} 
					onPress={handleShuffle}
				>
					Shuffle
				</Button>
				: <Button style={styles.shuffle} onPress={handleUndoShuffle}>
					Undo Shuffle
				</Button>
			}
			<MemberMenu 
				member={memberOptions} 
				party={party} 
				onRename={handleRename}
				onRestriction={handleRestriction}
				onRemove={handleDelete} 
				onDeleteParty={handleDeleteParty} 
				onGetPick={handleDownloadPick}
				onClose={() => setMemberOptions(undefined)}
			/>
		</Div>
	)
}