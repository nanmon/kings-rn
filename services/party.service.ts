
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
	
	static shuffle(party: IParty) {
		const rest = [...party.people]
		const giftChain = rest.splice(0, 1)
		while(rest.length > 0) {
			const index = Math.floor(Math.random() * rest.length)
			const [next] = rest.splice(index, 1)
			// restriction check
			const prev = giftChain.at(-1)!
			const restricted = PartyService.hasRestriction(party, prev, next)
			console.log({ prev, next, restricted })
			if (!restricted) {
				giftChain.push(next)
			} else {
				// unselect
				rest.push(next)
			}
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