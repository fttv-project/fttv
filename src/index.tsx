import * as OfflinePluginRuntime from "offline-plugin/runtime";
import createHistory from "history/createBrowserHistory";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { AppContainer } from "react-hot-loader";

import i18n from "common/i18n";
import configureStore from "store/configureStore";
import Router from "router";

import "styles/global.scss";

const history = createHistory();
const store = configureStore(history);

const mountElement = document.getElementById("mount");

function renderRoot() {
	render(
		<AppContainer>
			<I18nextProvider i18n={i18n}>
				<Provider store={store}>
					<Router history={history} />
				</Provider>
			</I18nextProvider>
		</AppContainer>,
		mountElement
	);
}

renderRoot();

OfflinePluginRuntime.install();

// HMR in development.
if ((process.env.NODE_ENV === "development") && module.hot) {
	module.hot.accept("router", () => {
		renderRoot();
		OfflinePluginRuntime.update();
	});
}
