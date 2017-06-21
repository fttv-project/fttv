import Loadable, { OptionsWithoutRender } from "react-loadable";

export default <P = any>(loader: () => Promise<any>, options: Partial<OptionsWithoutRender<P>> = {}) => {
	return Loadable<P, any>({
		loader,
		loading: () => null,
		...options as any
	});
};
