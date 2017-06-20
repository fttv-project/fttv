import { ActionsObservable } from "redux-observable";
import nock from "nock";

import { BASE_URL } from "common/twitch-api";
import { add as addError } from "data/errors";
import { LoadNextAction, epic, initialState, loadNext, reducer, setTop, unload } from "../";

const store$ = {
	dispatch: null!,
	getState() {
		return { games: { offset: 100 } } as any;
	}
};

describe("Reducer", () => {
	it("should set initial state", () => {
		expect(
			reducer(undefined, {} as any)
		).toEqual(initialState);
	});

	describe("LOAD_NEXT", () => {
		it("should set isLoading to true", () => {
			expect(
				reducer({ ...initialState, isLoading: false }, loadNext(60)).isLoading
			).toEqual(true);
		});
	});

	describe("UNLOAD", () => {
		it("should reset to initial state", () => {
			expect(
				reducer({ ...initialState, isLoading: true }, unload())
			).toEqual(initialState);
		});
	});
});

describe("Epic", () => {
	describe("LOAD_NEXT", () => {
		it("should add error if given", () => {
			nock(BASE_URL)
				.get("/games/top")
				.query(true)
				.reply(401);

			const actions$ = ActionsObservable.of(loadNext(60) as LoadNextAction);
			return epic(actions$, store$).toPromise()
				.then(action => {
					expect(action).toEqual(addError("ajax error 401"));
				});
		});

		it("should set top", () => {
			nock(BASE_URL)
				.get("/games/top")
				.query(true)
				.reply(200, { mock: true });

			const actions$ = ActionsObservable.of(loadNext(60) as LoadNextAction);
			return epic(actions$, store$).toPromise()
				.then(action => {
					expect(action).toEqual(setTop({ mock: true } as any));
				});
		});

		it("should use given limit and offset", () => {
			nock(BASE_URL)
				.get("/games/top")
				.query({ limit: 100, offset: 100 })
				.reply(200, { mock: true });

			const actions$ = ActionsObservable.of(loadNext(100) as LoadNextAction);
			return epic(actions$, store$).toPromise()
				.then(action => {
					expect(action).toEqual(setTop({ mock: true } as any));
				});
		});
	});
});
