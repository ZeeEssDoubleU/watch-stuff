/***** START BOILERPLATE CODE: Load client library, authorize user. *****/

// // Global variables for GoogleAuth object, auth status.
// let GoogleAuth;

// /**
//  * Load the API's client and auth2 modules.
//  * Call the initClient function after the modules load.
//  */
// function handleClientLoad() {
// 	window.gapi.load("client:auth2", initClient);
// }

// function initClient() {
// 	// Initialize the window.gapi.client object, which app uses to make API requests.
// 	// Get API key and client ID from API Console.
// 	// 'scope' field specifies space-delimited list of access scopes

// 	window.gapi.client
// 		.init({
// 			clientId: "REPLACE_ME",
// 			discoveryDocs: [
// 				"https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
// 			],
// 			scope:
// 				"https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner",
// 		})
// 		.then(function() {
// 			GoogleAuth = window.gapi.auth2.getAuthInstance();

// 			// Listen for sign-in state changes.
// 			GoogleAuth.isSignedIn.listen(updateSigninStatus);

// 			// Handle initial sign-in state. (Determine if user is already signed in.)
// 			setSigninStatus();

// 			// Call handleAuthClick function when user clicks on "Authorize" button.
// 			$("#execute-request-button").click(function() {
// 				handleAuthClick(event);
// 			});
// 		});
// }

// function handleAuthClick(event) {
// 	// Sign user in after click on auth button.
// 	GoogleAuth.signIn();
// }

// function setSigninStatus() {
// 	let user = GoogleAuth.currentUser.get();
// 	isAuthorized = user.hasGrantedScopes(
// 		"https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner",
// 	);
// 	// Toggle button text and displayed statement based on current auth status.
// 	if (isAuthorized) {
// 		defineRequest();
// 	}
// }

// function updateSigninStatus(isSignedIn) {
// 	setSigninStatus();
// }

function createResource(properties) {
	let resource = {};
	let normalizedProps = properties;
	for (let p in properties) {
		let value = properties[p];
		if (p && p.substr(-2, 2) === "[]") {
			let adjustedName = p.replace("[]", "");
			if (value) {
				normalizedProps[adjustedName] = value.split(",");
			}
			delete normalizedProps[p];
		}
	}
	for (let p in normalizedProps) {
		// Leave properties that don't have values out of inserted resource.
		if (normalizedProps.hasOwnProperty(p) && normalizedProps[p]) {
			let propArray = p.split(".");
			let ref = resource;
			for (let pa = 0; pa < propArray.length; pa++) {
				let key = propArray[pa];
				if (pa === propArray.length - 1) {
					ref[key] = normalizedProps[p];
				} else {
					ref = ref[key] = ref[key] || {};
				}
			}
		}
	}
	return resource;
}

function removeEmptyParams(params) {
	for (let p in params) {
		if (!params[p] || params[p] === "undefined") {
			delete params[p];
		}
	}
	return params;
}

// function that arranges api request data into correct format
export function buildApiRequest(requestMethod, path, params, properties) {
	params = removeEmptyParams(params);
	let request;
	if (properties) {
		let resource = createResource(properties);
		request = window.gapi.client.request({
			body: resource,
			method: requestMethod,
			path: path,
			params: params,
		});
	} else {
		request = window.gapi.client.request({
			method: requestMethod,
			path: path,
			params: params,
		});
	}
	return request;
}

// function that passes 'most popular videos' data to buildApiRequest function
export const buildMostPopularVideosRequest = (
	amount = 12,
	loadDescription = false,
	nextPageToken,
) => {
	let fields =
		"nextPageToken,prevPageToken,items(contentDetails/duration,id,snippet(channelId,channelTitle,localized/title,publishedAt,thumbnails/medium,title),statistics/viewCount),pageInfo(totalResults)";
	if (loadDescription) {
		fields += ",items/snippet/description";
	}
	return buildApiRequest(
		"GET",
		"/youtube/v3/videos",
		{
			part: "snippet,statistics,contentDetails",
			chart: "mostPopular",
			maxResults: amount,
			regionCode: "US",
			pageToken: nextPageToken,
			fields,
		},
		null,
	);
};

// function that passes 'video categories' data to buildApiRequest function
export const buildVideoCategoriesRequest = () => {
	return buildApiRequest(
		"GET",
		"/youtube/v3/videoCategories",
		{
			part: "snippet",
			regionCode: "US",
		},
		null,
	);
};
