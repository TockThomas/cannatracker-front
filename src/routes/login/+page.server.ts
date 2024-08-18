import type { Actions, PageServerLoad } from './$types';
import type { LoginParam } from '$lib/models';
import { userLogin } from '$lib/db';

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');
		if (username == null || password == null) {
			return;
		}
		const userLoginParam: LoginParam = {
			username: username.toString(),
			password: password.toString()
		};
		const token = await userLogin(userLoginParam);
		if (!token) {
			return;
		}
		cookies.set("session", token, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			maxAge: 60 * 30
		});
	},
};