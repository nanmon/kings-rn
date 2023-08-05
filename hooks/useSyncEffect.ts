import { useRef } from "react";

export function useSyncEffect(fn: () => void, deps: any[]) {
	const prevDeps = useRef(deps)
	const depsChanged = prevDeps.current.some((pdep, index) => pdep !== deps[index])
	if (depsChanged) fn()
	prevDeps.current = deps
}