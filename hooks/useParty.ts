import { useEffect, useState } from "react";
import { IParty } from "../fsdb/IParty";
import { getParty } from "../fsdb/fsdb";

interface IPartyState {
	party: IParty | null
	loading: boolean
}

export function useParty() {
	const [state, setState] = useState<IPartyState>({ party: null, loading: true })
	const setParty = (party: IParty | null) => setState({ party, loading: false })

	useEffect(() => {
		getParty().catch(() => null).then(setParty)
	}, [])


	return [state, setParty] satisfies [IPartyState, typeof setParty]
}