import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR, { BackendOptions } from "i18next-xhr-backend";

function loadLocale(url: string, _: any, callback: any) {
	import(`translations/${url}.json`)
		.then(locale => callback(locale, { status: 200 }))
		.catch(() => callback(null, { status: 404 }));
}

export default i18next
	.use(XHR)
	.use(LanguageDetector)
	.init({
		backend: {
			loadPath: "{{lng}}/{{ns}}",
			parse: (data: any) => data,
			ajax: loadLocale
		} as BackendOptions,
		detection: {
			caches: []
		},
		fallbackLng: "en",
		interpolation: {
			escapeValue: false
		},

		react: {
			wait: true
		}
	});
