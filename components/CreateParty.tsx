import { useState } from "react"
import { Button, StyleSheet, TextInput, View } from "react-native"

export interface CreatePartyProps {
	onDone: (name: string) => void
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export function CreateParty({ onDone }: CreatePartyProps) {
	const [name, setName] = useState('')

	const handleCreate = () => onDone(name)

	return (
		<View style={styles.container}>
			<TextInput value={name} onChangeText={setName}/>
			<Button title="Create" onPress={handleCreate}/>
		</View>
	)
}