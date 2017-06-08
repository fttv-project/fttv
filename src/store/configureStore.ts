import { applyMiddleware, createStore } from "redux";
import { autoRehydrate, persistStore } from "redux-persist";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { createEpicMiddleware } from "redux-observable";
import { History } from "history";

import reducer, { State, rootEpic } from "data";

export default (history: History, initialState?: State) => {
	const epicMiddleware = createEpicMiddleware(rootEpic);

	const enhancers = composeWithDevTools(
		applyMiddleware(
			routerMiddleware(history),
			epicMiddleware
		),
		autoRehydrate()
	);

	const store = initialState
		? createStore<State>(connectRouter(history)(reducer), initialState, enhancers)
		: createStore<State>(connectRouter(history)(reducer), enhancers);

	persistStore(store, {
		keyPrefix: "fttv:",
		whitelist: ["settings"]
	});

	if ((process.env.NODE_ENV === "development") && module.hot) {
		module.hot.accept("data", () => {
			store.replaceReducer(connectRouter(history)(reducer));
			epicMiddleware.replaceEpic(rootEpic);
		});
	}

	return store;
};
