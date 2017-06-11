import { ActionsObservable } from "redux-observable";

import { epic, initialState, loadTheme, reducer, setTheme } from "../";

const mockTheme = {
	name: "mock",
	properties: {} as any
};

describe("Reducer", () => {
	it("should set initial state", () => {
		expect(
			reducer(undefined, {} as any)
		).toEqual(initialState);
	});

	describe("SET_THEME", () => {
		it("should set theme", () => {
			expect(
				reducer(initialState, setTheme(mockTheme)).theme
			).toEqual(mockTheme);
		});
	});
});

describe("Epic", () => {
	describe("LOAD_THEME", () => {
		it("should import and set theme", () => {
			// mock theme import
			(global as any).System = {};
			(System as any).import = async () => ({ default: mockTheme });

			const actions$ = ActionsObservable.of(loadTheme("mock"));
			return epic(actions$).toPromise()
				.then(action => {
					expect(action).toEqual(setTheme(mockTheme));
				});
		});
	});
});
