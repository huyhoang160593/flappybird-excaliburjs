import { ImageSource, type Loadable, Loader } from "excalibur";
import background from "./resources/images/background.png";
import ground from "./resources/images/ground.png";

export const Resources = {
	images: {
    Background: new ImageSource(background),
    Ground: new ImageSource(ground),
	},
} as const satisfies ResourcesType;

export const loader = new Loader();
// load all resources in the Resources object
smartLoader(loader, Resources);

//#region Helper
type ResourcesType = {
	[x: string]: ResourcesType | Loadable<unknown>;
};

function isResourceLoadable(resource: unknown): resource is Loadable<unknown> {
	return Boolean(
		resource &&
			typeof resource === "object" &&
			"isLoaded" in resource &&
			typeof resource.isLoaded === "function",
	);
}

export function smartLoader(loader: Loader, resources: ResourcesType) {
	const remainUnloadResources: Array<ResourcesType> = [resources];
	while (true) {
		const latestResourcesObject = remainUnloadResources.pop();
		const resourceValues = Object.values(latestResourcesObject ?? {});
		for (const resource of resourceValues) {
			if (isResourceLoadable(resource)) {
				loader.addResource(resource);
			} else {
				remainUnloadResources.push(resource);
			}
		}

		if (remainUnloadResources.length === 0) {
			break;
		}
	}
}

//#endregion
