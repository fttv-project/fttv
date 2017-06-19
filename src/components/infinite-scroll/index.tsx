import React from "react";

import { BehaviorSubject, Observable, Subject, Subscription, elementResize, pausable } from "common/rxjs";

const wrapperStyle = { width: "100%", height: "100%", position: "relative" as "relative" };

export default class InfiniteScroll extends React.PureComponent<OwnProps, State> {
	private pauseStream: BehaviorSubject<boolean>;
	private componentDestroyed: Subject<{}>;

	private pause$: Observable<boolean>;
	private resize: Subscription | undefined;
	private scroll: Subscription | undefined;

	private child: HTMLElement | undefined;
	private wrapper: HTMLElement | undefined;

	constructor(props: OwnProps) {
		super(props);
		this.pauseStream = new BehaviorSubject(this.props.isLoading);
		this.pause$ = this.pauseStream.distinctUntilChanged();
		this.componentDestroyed = new Subject();
	}

	componentDidMount() {
		this.setupObservables(this.props);
	}

	componentWillReceiveProps(nextProps: OwnProps) {
		if (this.props.items !== nextProps.items) {
			this.pauseStream.next(false);
		}
		this.setupObservables(nextProps);
	}

	componentWillUnmount() {
		this.clearComponent();
	}

	render() {
		const { children, items, scrollElement } = this.props;
		if (!scrollElement) {
			return null;
		}

		return (
			<div ref={this.setWrapper} style={wrapperStyle}>
				{children({ items: items!, registerChild: this.setChild })}
			</div>
		);
	}

	private setupObservables = (props: OwnProps) => {
		this.setupResize();
		this.setupScroll(props);
	}

	private clearComponent = () => {
		this.componentDestroyed.next();
		this.resize = this.scroll = this.child = this.wrapper = undefined;
	}

	private setupResize = () => {
		if (this.resize || !this.child || !this.wrapper) {
			return;
		}

		const resize$ = elementResize(this.child)
			.withLatestFrom(elementResize(this.wrapper), (child, wrapper) => ({
				wrapperHeight: wrapper.offsetHeight,
				childHeight: child.scrollHeight
			}))
			.filter(InfiniteScroll.needsFill)
			.takeUntil(this.componentDestroyed);

		this.resize = pausable(this.pause$, resize$).subscribe(resizePair => {
			this.pauseStream.next(true);
			this.props.loadItems({ elementsHint: this.calculateElementsHint(resizePair) });
		});
	}

	private setupScroll = (props: OwnProps) => {
		const { scrollElement, threshold } = props;
		if (this.scroll || !scrollElement) {
			return;
		}

		const scroll$ = Observable
			.fromEvent<Event>(scrollElement, "scroll", { capture: true, passive: true })
			.map(event => {
				const { scrollTop, scrollHeight, clientHeight } = event.target as HTMLElement;
				return { scrollTop, scrollHeight, clientHeight };
			})
			.pairwise()
			.filter(scrollPair =>
				InfiniteScroll.isScrollingDown(scrollPair) &&
				InfiniteScroll.hitThreshold(scrollPair[1], threshold)
			)
			.takeUntil(this.componentDestroyed);

		this.scroll = pausable(this.pause$, scroll$).subscribe(() => {
			this.pauseStream.next(true);
			this.props.loadItems({});
		});
	}

	private setChild = (element: HTMLElement) => {
		this.child = element;
		this.setupResize();
	}

	private setWrapper = (element: HTMLElement) => {
		this.wrapper = element;
		this.setupResize();
	}

	private calculateElementsHint = ({ wrapperHeight, childHeight }: ResizePair) => {
		const { items } = this.props;
		const itemPerHeight = Math.ceil(items.length / childHeight);
		return Math.ceil(itemPerHeight * (wrapperHeight - childHeight));
	}

	private static isScrollingDown = ([oldScroll, newScroll]: [ScrollState, ScrollState]) => {
		return newScroll.scrollHeight === oldScroll.scrollHeight && newScroll.scrollTop >= oldScroll.scrollTop;
	}

	private static hitThreshold = (newScroll: ScrollState, threshold: number) => {
		return newScroll.scrollTop + newScroll.clientHeight + threshold >= newScroll.scrollHeight;
	}

	private static needsFill = (pair: ResizePair) => {
		return !!pair.childHeight && !!pair.wrapperHeight && pair.childHeight < pair.wrapperHeight;
	}
}

interface ScrollState {
	scrollTop: number;
	scrollHeight: number;
	clientHeight: number;
}

interface ResizePair {
	wrapperHeight: number;
	childHeight: number;
}

interface OwnProps {
	children: (props: { items: any[], registerChild: (element: HTMLElement) => void }) => React.ReactNode;
	items: any[];
	isLoading: boolean;
	loadItems: (props: { elementsHint?: number }) => void;
	scrollElement: HTMLElement;
	threshold: number;
}

interface State {
	wrapper: HTMLElement;
}
