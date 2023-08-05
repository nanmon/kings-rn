import * as FileSystem from 'expo-file-system';
import { IParty } from './IParty';

const DB_FILE_URI = FileSystem.documentDirectory + 'fsdb.json'

export async function saveParty(party: IParty | null) {
	if (!party) return FileSystem.deleteAsync(DB_FILE_URI)
	return FileSystem.writeAsStringAsync(DB_FILE_URI, JSON.stringify(party))
}

export async function getParty(): Promise<IParty> {
	const fileContents = await FileSystem.readAsStringAsync(DB_FILE_URI)
	return JSON.parse(fileContents)
}