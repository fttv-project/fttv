export { RehydrateAction } from "./actions";
export * from "./model";

export const changeInMap = <K, V extends object>(
	map: Map<K, V>,
	key: K,
	defaultValue: V,
	changeGenerator: (current: V) => Partial<V>
) => {
	const newMap = new Map(map);
	const currentValue = newMap.get(key) || defaultValue;
	newMap.set(key, { ...currentValue as object, ...changeGenerator(currentValue) as any });
	return newMap;
};

export const concatDedupe = <T, K> (original: T[], extra: T[], keySelector: (value: T) => K) => {
	const originalSet = new Set(original.map(keySelector));
	return [...original, ...extra.filter(v => !originalSet.has(keySelector(v)))];
};
