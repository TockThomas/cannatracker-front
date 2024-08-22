import type { Actions, PageServerLoad } from './$types';
import type { CreatePlant } from '$lib/models';
import { addFriend, getFriends, deleteFriend } from '$lib/db';
import { getAccessToken} from '$lib/util';
import { redirect } from '@sveltejs/kit';

export const actions = {
	addFriend: async ({ cookies, request }) => {
		let accessToken = getAccessToken(cookies);
		const data = await request.formData();
		let friendsUsername = data.get('friendsUsername') ?? "";
		let friend = await addFriend(accessToken, friendsUsername.toString());
		/*if (!friend) {
			return;
		}*/
		redirect(307, '/friends');
	},
	deleteFriend: async ({ cookies, request }) => {
		let accessToken = getAccessToken(cookies);
		const data = await request.formData();
		let friendsUsername = data.get('friendsUsername') ?? "";
		let success = await deleteFriend(accessToken, friendsUsername.toString());
		if (!success) {
			return;
		}
		redirect(307, '/friends');
	}
};

export const load: PageServerLoad = async ({ cookies }) => {
	let accessToken = getAccessToken(cookies);
	let friends = await getFriends(accessToken);
	return {
		friends: friends,
	}
}