import { ActionsObservable } from "redux-observable";

import { Observable } from "common/rxjs";
import { add, epic, initialState, reducer, remove } from "../";

describe("Reducer", () => {
	it("should set initial state", () => {
		expect(
			reducer(undefined, {} as any)
		).toEqual(initialState);
	});

	describe("ADD", () => {
		it("should add message", () => {
			expect(
				reducer({ messages: [] }, add("test")).messages
			).toEqual(["test"]);
		});
	});

	describe("REMOVE", () => {
		it("should remove message", () => {
			expect(
				reducer({ messages: ["test"] }, remove("test")).messages
			).toEqual([]);
		});
	});
});

describe("Epic", () => {
	describe("ADD", () => {
		it("should remove message after delay", () => {
			// instant delay
			spyOn(Observable.prototype, "delay").and.callFake(function(this: Observable<any>) {
				return this;
			});

			const actions$ = ActionsObservable.of(add("mock"));
			return epic(actions$).toPromise()
				.then(action => {
					expect(action).toEqual(remove("mock"));
				});
		});
	});
});
