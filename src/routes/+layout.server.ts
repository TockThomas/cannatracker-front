import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { verifyToken } from '$lib/db';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	let accessToken = cookies.get('session') ?? '';
	let verified = await verifyToken(accessToken);
	if (url.pathname === '/login' || url.pathname === '/login/register') {
		if (verified) {
			redirect(307, '/plants');
		}
		return {
			loggedIn: false,
		};
	}
	if (!verified) {
		redirect(307, '/login');
	}
	if (url.pathname === '/') {
		redirect(307, '/plants');
	}
	return {
		loggedIn: true,
	};
}