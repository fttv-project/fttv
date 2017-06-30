declare global {
	interface System {
		import<T = any>(request: string): Promise<T>;
	}

	const System: System;

	function requestIdleCallback(cb: () => void): void;
}

export {};
