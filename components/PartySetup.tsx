import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { IParty } from "../fsdb/IParty";
import { addMember, removeMember, shuffle } from "../fsdb/fsdb";
import { MemberMenu, MemberMenuProps } from "./MemberMenu";

interface PartySetupProps {
	party: IParty
	onPartyChange: (party: IParty | null) => void
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export function PartySetup({ party, onPartyChange }: PartySetupProps) {
	const [newPersonInput, setNewPersonInput] = useState('')
	const [memberOptions, setMemberOptions] = useState<string | undefined>(undefined)

	const handleAddPerson = () => {
		if (!newPersonInput) return
		const updatedParty = addMember(party, newPersonInput)
		onPartyChange(updatedParty)
		setNewPersonInput('')
	}

	const handleMenuAction: MemberMenuProps["onAction"] = (action, member) => {
		if (action === 'rename') {
			
		}
		if (action === 'remove') {
			onPartyChange(removeMember(party, member))
		}
		if (action === 'deleteParty') {
			onPartyChange(null)
		}
		setMemberOptions(undefined)
	}

	const handleShuffle = () => {
		onPartyChange(shuffle(party))
	}

	const handleMemberClick = async (person: string) => {
		if (party.giftChain == null) {
			setMemberOptions(person)
		} else {
			const giftIndex = party.giftChain.indexOf(person)
			const giftTo = party.giftChain[(giftIndex + 1) % party.giftChain.length]
			const tmpUri = FileSystem.cacheDirectory + person + '.txt'
			await FileSystem.writeAsStringAsync(tmpUri, giftTo)
			Sharing.shareAsync(tmpUri)
		}
	}

	return (
		<View style={styles.container}>
			{party.giftChain == null &&
				<TextInput 
					placeholder="Write new member name" 
					value={newPersonInput} 
					onChangeText={setNewPersonInput} 
					onEndEditing={handleAddPerson}
				/>
			}
			{party.people.map((person) => (
				<TouchableOpacity key={person} onPress={() => handleMemberClick(person)}>
					<Text>{person}</Text>
				</TouchableOpacity>
			))}
			{party.giftChain == null &&
				<Button title="Shuffle" disabled={party.people.length <3} onPress={handleShuffle}/>
			}
			<MemberMenu 
				member={memberOptions} 
				isAdmin={party.people[0] === memberOptions} 
				onAction={handleMenuAction} 
				onClose={() => setMemberOptions(undefined)}
			/>
		</View>
	)
}