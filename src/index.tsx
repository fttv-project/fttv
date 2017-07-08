import createHistory from "history/createBrowserHistory";
import * as OfflinePluginRuntime from "offline-plugin/runtime";
import React from "react";
import { render } from "react-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import i18n from "common/i18n";
import { ReactHotLoader } from "components/react-hot-loader";
import Router from "router";
import configureStore from "store/configureStore";

import "styles/global.scss";

const history = createHistory();
const store = configureStore(history);

const mountElement = document.getElementById("mount");

const renderRoot = () => {
	render(
		<ReactHotLoader>
			<I18nextProvider i18n={i18n}>
				<Provider store={store}>
					<Router history={history} />
				</Provider>
			</I18nextProvider>
		</ReactHotLoader>,
		mountElement
	);
};

renderRoot();

OfflinePluginRuntime.install();

// HMR in development.
if ((process.env.NODE_ENV === "development") && module.hot) {
	module.hot.accept("router", () => {
		renderRoot();
		OfflinePluginRuntime.update();
	});
}
