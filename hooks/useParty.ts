import { useEffect, useState } from "react";
import { getParty, saveParty } from "../fsdb/fsdb";
import { IParty } from "../services/party.service";

interface IPartyState {
	party: IParty | null
	loading: boolean
}

export function useParty() {
	const [state, setState] = useState<IPartyState>({ party: null, loading: true })
	const setParty = (party: IParty | null) => {
		setState({ party, loading: false })
		saveParty(party)
	}

	useEffect(() => {
		getParty().catch(() => null).then(setParty)
	}, [])


	return [state, setParty] satisfies [IPartyState, typeof setParty]
}