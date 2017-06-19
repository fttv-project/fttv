export { RehydrateAction } from "./actions";

export const concatDedupe = <T, K> (original: T[], extra: T[], keySelector: (value: T) => K) => {
	const originalSet = new Set(original.map(keySelector));
	return [...original, ...extra.filter(v => !originalSet.has(keySelector(v)))];
};
