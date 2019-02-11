// api action types
export const YOUTUBE_LIBRARY_LOADED = "YOUTUBE_LIBRARY_LOADED";

export const REQUEST = "REQUEST";
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";

export function createRequestTypes(base) {
	if (!base) {
		throw new Error(
			"Cannot create request type with base = '', undefined or null",
		);
	}

	return {
		REQUEST: `${base}_REQUEST`,
		SUCCESS: `${base}_SUCCESS`,
		FAILURE: `${base}_FAILURE`,
	};
}
