import Loadable from "react-loadable";

export default function(loader: () => Promise<any>) {
	return Loadable<any, any>({
		loader,
		LoadingComponent: () => null
	});
}
