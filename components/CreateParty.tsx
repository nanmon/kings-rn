import { useState } from "react"
import { StyleSheet } from "react-native"
import { Div } from "./Div";
import { Input } from "./Input";
import { Button } from "./Button";
import { Text } from "./Text";
import { IParty, PartyService } from "../services/party.service";

export interface CreatePartyProps {
	onDone: (name: IParty) => void
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
		gap: 8,
  },
	input: {
		width: 230,
	},
	button: {
		width: 230,
	}
});


export function CreateParty({ onDone }: CreatePartyProps) {
	const [name, setName] = useState('')

	const handleCreate = () => onDone(PartyService.createParty(name.trim()))

	return (
		<Div style={styles.container}>
			<Input style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName}/>
			<Button style={styles.button} onPress={handleCreate} disabled={!name.trim()}>
				Create Party
			</Button>
		</Div>
	)
}