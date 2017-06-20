import { ActionsObservable } from "redux-observable";
import nock from "nock";

import { BASE_URL } from "common/twitch-api";
import { add as addError } from "data/errors";
import { epic, initialState, reducer, requestDetails, setAccessToken, setDetails } from "../";

const store$ = {
	dispatch: null!,
	getState() {
		return { user: { accessToken: "mock" } } as any;
	}
};
const mockDetails = {
	mock: true
} as any;

describe("Reducer", () => {
	it("should set initial state", () => {
		expect(
			reducer(undefined, {} as any)
		).toEqual(initialState);
	});

	describe("SET_ACCESS_TOKEN", () => {
		it("should set access token", () => {
			expect(
				reducer(initialState, setAccessToken("mock")).accessToken
			).toEqual("mock");
		});
	});

	describe("SET_DETAILS", () => {
		it("should set details", () => {
			expect(
				reducer(initialState, setDetails(mockDetails)).details
			).toEqual(mockDetails);
		});
	});
});

describe("Epic", () => {
	describe("SET_ACCESS_TOKEN", () => {
		it("should request details", () => {
			const actions$ = ActionsObservable.of(setAccessToken("mock"));
			return epic(actions$, store$).toPromise()
				.then(action => {
					expect(action).toEqual(requestDetails());
				});
		});
	});

	describe("REQUEST_DETAILS", () => {
		it("should add error if given", () => {
			nock(BASE_URL)
				.get("/user")
				.reply(401);

			const actions$ = ActionsObservable.of(requestDetails());
			return epic(actions$, store$).toPromise()
				.then(action => {
					expect(action).toEqual(addError("ajax error 401"));
				});
		});

		it("should set details", () => {
			nock(BASE_URL)
				.get("/user")
				.reply(200, mockDetails);

			const actions$ = ActionsObservable.of(requestDetails());
			return epic(actions$, store$).toPromise()
				.then(action => {
					expect(action).toEqual(setDetails(mockDetails));
				});
		});
	});
});
