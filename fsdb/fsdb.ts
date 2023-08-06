import * as FileSystem from 'expo-file-system';
import { IParty } from '../services/party.service';

const DB_FILE_URI = FileSystem.documentDirectory + 'fsdb.json'

export async function saveParty(party: IParty | null) {
	if (!party) return FileSystem.deleteAsync(DB_FILE_URI).catch(console.log)
	return FileSystem.writeAsStringAsync(DB_FILE_URI, JSON.stringify(party))
}

export async function getParty(): Promise<IParty> {
	const fileContents = await FileSystem.readAsStringAsync(DB_FILE_URI)
	return JSON.parse(fileContents)
}

export async function createTempGiftFile(member: string, giftee: string) {
	const tmpUri = FileSystem.cacheDirectory + member + '.txt'
	await FileSystem.writeAsStringAsync(tmpUri, `${giftee}`)
	return tmpUri
}