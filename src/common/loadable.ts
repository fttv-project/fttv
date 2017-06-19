import Loadable, {OptionsWithoutResolve} from "react-loadable";

export default <P = any>(loader: () => Promise<any>, options: Partial<OptionsWithoutResolve<P>> = {}) => {
	return Loadable<P, any>({
		loader,
		loading: () => null,
		...options as any
	});
};
