import * as ElementResizeDetector from "element-resize-detector";

let instance: ElementResizeDetector.Detector | undefined;
if (!instance) {
	instance = new ElementResizeDetector({ strategy: "scroll" });
}

export type Listener = ElementResizeDetector.Listener;
export default (instance as ElementResizeDetector.Detector);
