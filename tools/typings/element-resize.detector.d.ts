declare module "element-resize-detector" {
	namespace ElementResizeDetector {
		export interface Options {
			strategy: "scroll";
		}

		export type Listener = (element: HTMLElement) => void;

		export interface Detector {
			new(options: Options): Detector;
			listenTo(element: HTMLElement, listener: Listener): void;
			removeListener(element: HTMLElement, listener: Listener): void;
			removeAllListeners(element: HTMLElement): void;
			uninstall(element: HTMLElement): void;
		}
	}

	const ElementResizeDetector: ElementResizeDetector.Detector;
	export = ElementResizeDetector;
}
