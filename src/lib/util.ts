import type { Cookies } from '@sveltejs/kit';


export const getAccessToken = (cookies: Cookies|undefined) => {
	if (!cookies) {
		return "";
	}
	let accessToken = cookies.get("session");
	if (!accessToken) {
		return "";
	}
	return accessToken.toString();
}