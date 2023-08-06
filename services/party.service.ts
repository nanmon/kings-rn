
export interface IParty {
	people: string[]
	giftChain?: string[]
	restrictions: [string, string][] // [person, cannotGiftTo]
}

export class PartyService {
	static createParty(creator: string): IParty {
		const party: IParty = {
			people: [creator],
			restrictions: [],
		}
		return party
	}
	
	static addMember(party: IParty, name: string) {
		const updatedParty = {...party}
		updatedParty.people = [...party.people, name]
		return updatedParty
	}
	
	static removeMember(party: IParty, member: string) {
		const updatedParty = {...party}
		updatedParty.people = [...party.people]
		const memberIndex = party.people.indexOf(member)
		if (memberIndex === -1) return party
		updatedParty.people.splice(memberIndex, 1)
		return updatedParty
	}
	
	static renameMember(party: IParty, oldName: string, newName: string) {
		const updatedParty = {...party}
		updatedParty.people = [...party.people]
		const memberIndex = party.people.indexOf(oldName)
		if (memberIndex === -1) return party
		updatedParty.people.splice(memberIndex, 1, newName)
		return updatedParty
	}
	
	static addRestriction(party: IParty, restriction: [string, string]) {
		const updatedParty = {...party}
		updatedParty.restrictions = [...party.restrictions, restriction]
		return updatedParty
	}
	
	static shuffle(party: IParty) {
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
		return updatedParty
	}

	static getGiftee(party: IParty, member: string): string | undefined {
		const { giftChain } = party
		if (!giftChain) return undefined
		const memberIndex = giftChain.indexOf(member)
		return giftChain[(memberIndex + 1) % giftChain.length]
	}
}