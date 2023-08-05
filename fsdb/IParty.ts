export interface IParty {
	people: string[]
	giftChain?: string[]
	restrictions: [string, string][] // [person, cannotGiftTo]
}