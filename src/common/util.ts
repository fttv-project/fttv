export const returnOf = <A, T>(_: (a: A) => T): T => null!;

export const crypto = window.crypto;
export const subtleCrypto = crypto.subtle || (crypto as any).webkitSubtle;

const alphanumericCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export const generateRandomString = (length: number): string => {
	let result = "";
	const randomValues =  new Uint32Array(length);
	crypto.getRandomValues(randomValues);
	for (const value of randomValues) {
		result += alphanumericCharacters[value % alphanumericCharacters.length];
	}
	return result;
};
