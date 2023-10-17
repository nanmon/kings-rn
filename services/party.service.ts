
export interface IParty {
	people: string[]
	giftChain?: string[]
	restrictions: [string, string][] // [person, cannotGiftTo]
}

const arrayEq = (arr1: string[]) => (arr2: string[]) => arr1.every((item, index) => arr2[index] === item)

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

	static hasRestriction(party: IParty, member1: string, member2: string) {
		return party.restrictions.some(arrayEq([member1, member2]))
	}
	
	static addRestriction(party: IParty, member1: string, member2: string) {
		const updatedParty = {...party}
		updatedParty.restrictions = [...party.restrictions, [member1, member2]]
		return updatedParty
	}

	static removeRestriction(party: IParty,  member1: string, member2: string) {
		const restrictionIndex = party.restrictions.findIndex(arrayEq([member1, member2]))
		if (restrictionIndex === -1) return party
		const updatedParty = {...party}
		updatedParty.restrictions = [...party.restrictions]
		updatedParty.restrictions.splice(restrictionIndex, 1)
		return updatedParty
	}

	static toggleRestriction(party: IParty,  member1: string, member2: string) {
		if (PartyService.hasRestriction(party, member1, member2))
			return PartyService.removeRestriction(party, member1, member2)
		return PartyService.addRestriction(party, member1, member2)
	}

	static pick(party: IParty, member: string, available: string[]) {
		const unrestricted = available.filter(person => !PartyService.hasRestriction(party, member, person))
		if (unrestricted.length === 0) return null
		const index = Math.floor(Math.random() * unrestricted.length)
		return unrestricted[index]
	}
	
	static shuffle(party: IParty): IParty {
		let rest = [...party.people]
		let giftChain = rest.splice(0, 1)
		while(rest.length > 0) {
			const prev = giftChain.at(-1)!
			const next = PartyService.pick(party, prev, rest)
			if (!next) {
				// cannot complete gift chain, reset
				rest = [...party.people]
				giftChain = rest.splice(0, 1)
				continue
			}
			giftChain.push(next)
			const index = rest.indexOf(next)
			rest.splice(index, 1)
		}
		if (PartyService.hasRestriction(party, giftChain.at(-1)!, giftChain[0])) {
			// first and last are restricted, try shuffle again
			return PartyService.shuffle(party)
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