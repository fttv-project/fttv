import Loadable from "react-loadable";

export default (loader: () => Promise<any>) => {
	return Loadable<any, any>({
		loader,
		LoadingComponent: () => null
	});
};
