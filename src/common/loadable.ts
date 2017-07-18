import Loadable, { OptionsWithoutRender } from "react-loadable";

export default <P>(loader: () => Promise<React.ComponentType<P>>, options: Partial<OptionsWithoutRender<P>> = {}) => {
	return Loadable<P, any>({
		loader,
		loading: () => null,
		...options as any
	});
};
