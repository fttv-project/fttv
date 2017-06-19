import "rxjs/add/observable/dom/ajax";
import "rxjs/add/observable/never";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/pairwise";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/takeUntil";
import "rxjs/add/operator/withLatestFrom";

import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";

import resizeDetector from "./resize-detector";

export const elementResize = (element: HTMLElement) => new Observable<HTMLElement>(observer => {
	resizeDetector.listenTo(element, e => observer.next(e));
	return () => resizeDetector.uninstall(element);
});

export const pausable = <T> (pauser: Observable<boolean>, source: Observable<T>): Observable<T> => {
	return pauser.switchMap(paused => paused ? Observable.never() : source);
};

export { Observable, BehaviorSubject, Subject, Subscription };
