import * as FileSystem from 'expo-file-system';
import { IParty } from './IParty';

const DB_FILE_URI = FileSystem.documentDirectory + 'fsdb.json'
async function saveParty(party: IParty) {
	return FileSystem.writeAsStringAsync(DB_FILE_URI, JSON.stringify(party))
}

export function createParty(creator: string): IParty {
	const party: IParty = {
		people: [creator],
		restrictions: [],
	}
	saveParty(party).catch(console.log)
	return party
}

export async function getParty(): Promise<IParty> {
	const fileContents = await FileSystem.readAsStringAsync(DB_FILE_URI)
	return JSON.parse(fileContents)
}

export function addMember(party: IParty, name: string) {
	const updatedParty = {...party}
	updatedParty.people = [...party.people, name]
	saveParty(party).catch(console.log)
	return updatedParty
}

export function removeMember(party: IParty, member: string) {
	const updatedParty = {...party}
	updatedParty.people = [...party.people]
	const memberIndex = party.people.indexOf(member)
	if (memberIndex === -1) return party
	updatedParty.people.splice(memberIndex, 1)
	saveParty(updatedParty).catch(console.log)
	return updatedParty
}

export function renameMember(party: IParty, oldName: string, newName: string) {
	const updatedParty = {...party}
	updatedParty.people = [...party.people]
	const memberIndex = party.people.indexOf(oldName)
	if (memberIndex === -1) return party
	updatedParty.people.splice(memberIndex, 1, newName)
	saveParty(party).catch(console.log)
	return updatedParty
}

export function addRestriction(party: IParty, restriction: [string, string]) {
	const updatedParty = {...party}
	updatedParty.restrictions = [...party.restrictions, restriction]
	saveParty(party).catch(console.log)
	return updatedParty
}

export function shuffle(party: IParty) {
	const giftChain = []
	const rest = [...party.people]
	while(rest.length > 0) {
		const index = Math.floor(Math.random() * rest.length)
		const [selected] = rest.splice(index, 1)
		giftChain.push(selected)
	}
	const updatedParty = {
		...party,
		giftChain
	}
	saveParty(party).catch(console.log)
	return updatedParty
}