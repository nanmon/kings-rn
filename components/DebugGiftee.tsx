import { IParty, PartyService } from "../services/party.service"
import { Text } from "./Text"

interface DebugGifteeProps {
	member: string
	party: IParty
}

export function DebugGiftee({ member, party }: DebugGifteeProps) {
	if (process.env.NODE_ENV !== 'development') return null
	const giftTo = PartyService.getGiftee(party, member)
	if (!giftTo) return null
	return <Text>{"->"} {giftTo}</Text>
}