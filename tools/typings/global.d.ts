declare global {
	function requestIdleCallback(cb: () => void): void;
}

export {};
