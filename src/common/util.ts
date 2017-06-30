import resizeDetector from "./resize-detector";
import { Observable } from "./rxjs";

export const returnOf = <A, T>(_: (a: A) => T): T => null!;

export const crypto = window.crypto;
export const subtleCrypto = crypto.subtle || (crypto as any).webkitSubtle;

const alphanumericCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export const generateRandomString = (length: number): string => {
	let result = "";
	const randomValues = new Uint32Array(length);
	crypto.getRandomValues(randomValues);
	for (const value of randomValues) {
		result += alphanumericCharacters[value % alphanumericCharacters.length];
	}
	return result;
};

export const removeUndefined = (value: { [key: string]: any }) => {
	for (const key of Object.keys(value)) {
		if (value[key] && typeof value[key] === "object") {
			removeUndefined(value[key]);
		} else if (typeof value[key] === "undefined") {
			delete value[key];
		}
	}
	return value;
};

export const idleCallback = (cb: () => void) => requestIdleCallback ? requestIdleCallback(cb) : setTimeout(cb, 10);

export const elementResize = (element: HTMLElement) => new Observable<HTMLElement>(observer => {
	resizeDetector.listenTo(element, e => observer.next(e));
	return () => resizeDetector.uninstall(element);
});
