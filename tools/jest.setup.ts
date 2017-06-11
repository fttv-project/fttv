import { randomBytes } from "crypto";
import nock from "nock";
import "rxjs/add/operator/toPromise";

process.env.NODE_ENV = "development";

(global as any).crypto = {};
(crypto as any).subtle = {
	getRandomValues(arr: Uint32Array) {
		arr.set(randomBytes(arr.length));
	}
};

(global as any).XMLHttpRequest = require("xhr2");

afterEach(() => {
	nock.cleanAll();
});
