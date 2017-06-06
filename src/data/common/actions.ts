import {REHYDRATE as reduxRehydrate} from "redux-persist/constants";

import {State, TypedAction} from "data";

export namespace CommonActionTypes {
	export const REHYDRATE = reduxRehydrate;
}

export interface RehydrateAction extends TypedAction<typeof CommonActionTypes.REHYDRATE> {
	readonly type: typeof CommonActionTypes.REHYDRATE;
	readonly payload: State;
}
