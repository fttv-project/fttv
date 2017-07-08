import { ActionsObservable } from "redux-observable";
import nock from "nock";

import { BASE_URL } from "common/twitch-api";
import { add as addError } from "data/errors";
import { LoadTopGamesAction, epic, initialState, loadTopGames, reducer, setTopGames, unloadTopGames } from "../";
import { State as GlobalState } from "../..";

const store$ = {
	dispatch: null!,
	getState(): GlobalState {
		return { categories: { topGames: { offset: 100 } } } as GlobalState;
	}
};

describe("Reducer", () => {
	it("should set initial state", () => {
		expect(
			reducer(undefined, {} as any)
		).toEqual(initialState);
	});

	describe("LOAD_TOP_GAMES", () => {
		it("should set isLoading to true", () => {
			expect(
				reducer({
					...initialState,
					topGames: {
						...initialState.topGames,
						isLoading: false
					}
				}, loadTopGames(60)).topGames.isLoading
			).toEqual(true);
		});
	});

	describe("UNLOAD_TOP_GAMES", () => {
		it("should reset to initial state", () => {
			expect(
				reducer({ ...initialState, topGames: { ...initialState.topGames, isLoading: true }}, unloadTopGames()).topGames
			).toEqual(initialState.topGames);
		});
	});
});

describe("Epic", () => {
	describe("LOAD_TOP_GAMES", () => {
		it("should add error if given", () => {
			nock(BASE_URL)
				.get("/games/top")
				.query(true)
				.reply(401);

			const actions$ = ActionsObservable.of(loadTopGames(60) as LoadTopGamesAction);
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

			const actions$ = ActionsObservable.of(loadTopGames(60) as LoadTopGamesAction);
			return epic(actions$, store$).toPromise()
				.then(action => {
					expect(action).toEqual(setTopGames({ mock: true } as any));
				});
		});

		it("should use given limit and offset", () => {
			nock(BASE_URL)
				.get("/games/top")
				.query({ limit: 100, offset: 100 })
				.reply(200, { mock: true });

			const actions$ = ActionsObservable.of(loadTopGames(100) as LoadTopGamesAction);
			return epic(actions$, store$).toPromise()
				.then(action => {
					expect(action).toEqual(setTopGames({ mock: true } as any));
				});
		});
	});
});
