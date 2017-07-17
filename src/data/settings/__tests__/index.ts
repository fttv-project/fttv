import { ActionsObservable } from "redux-observable";

import darkTheme from "styles/themes/dark";
import { epic, initialState, loadTheme, reducer, setTheme } from "../";

describe("Reducer", () => {
	it("should set initial state", () => {
		expect(
			reducer(undefined, {} as any)
		).toEqual(initialState);
	});

	describe("SET_THEME", () => {
		it("should set theme", () => {
			expect(
				reducer(initialState, setTheme(darkTheme)).theme
			).toEqual(darkTheme);
		});
	});
});

describe("Epic", () => {
	describe("LOAD_THEME", () => {
		it("should import and set theme", () => {
			const actions$ = ActionsObservable.of(loadTheme("dark"));
			return epic(actions$).toPromise()
				.then(action => {
					expect(action).toEqual(setTheme(darkTheme));
				});
		});
	});
});
