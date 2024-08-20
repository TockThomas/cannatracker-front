import type { Actions, PageServerLoad } from './$types';
import type { CreateUser, LoginParam } from '$lib/models';
import { createUser, userLogin } from '$lib/db';

export const actions = {
	register: async ({ cookies, request }) => {
		const data = await request.formData();
		const firstName = data.get('firstName');
		const lastName = data.get('lastName');
		const username = data.get('username');
		const email = data.get('email');
		const password = data.get('password');
		const passwordConfirm = data.get('passwordConfirm');
		if (firstName == null || lastName == null || username == null || email == null || password == null || passwordConfirm == null || password !== passwordConfirm) {
			return;
		}
		const user: CreateUser = {
			firstName: firstName.toString(),
			lastName: lastName.toString(),
			username: username.toString(),
			email: email.toString(),
			password: password.toString()
		};
		const success = await createUser(user);
		if (!success) {
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