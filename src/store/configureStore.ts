import { connectRouter, routerMiddleware } from "connected-react-router";
import { History } from "history";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { createEpicMiddleware } from "redux-observable";
import { autoRehydrate, persistStore } from "redux-persist";

import reducer, { State, rootEpic } from "data";

export default (history: History, initialState?: State) => {
	const rootReducer = connectRouter(history)(reducer);
	const epicMiddleware = createEpicMiddleware(rootEpic);

	const enhancers = composeWithDevTools(
		applyMiddleware(
			routerMiddleware(history),
			epicMiddleware
		),
		autoRehydrate()
	);

	const store = initialState
		? createStore<State>(rootReducer, initialState, enhancers)
		: createStore<State>(rootReducer, enhancers);

	persistStore(store, {
		keyPrefix: "fttv:",
		whitelist: ["settings", "user"]
	});

	if ((process.env.NODE_ENV === "development") && module.hot) {
		module.hot.accept("data", () => {
			store.replaceReducer(connectRouter(history)(reducer));
			epicMiddleware.replaceEpic(rootEpic);
		});
	}

	return store;
};
