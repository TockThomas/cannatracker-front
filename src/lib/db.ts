import type { CreatePlant, CreateUser, LoginParam } from '$lib/models';

const URL = 'https://thegreenwizard.live';
//const URL = 'http://localhost:8000';

export const userLogin = async (param: LoginParam): Promise<string | null> => {
	let message = [
		['username', param.username],
		['password', param.password],
		['grant_type', 'password']
	];
	let res = await fetch(URL + '/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams(message)
	});
	let response = await res.json();
	if (Object.hasOwn(response, 'access_token')) {
		return response.access_token;
	}
	return null;
};

export const createUser = async (param: CreateUser): Promise<boolean> => {
	let message = {
		first_name: param.firstName,
		last_name: param.lastName,
		username: param.username,
		email: param.email,
		password: param.password,
	}
	let res = await fetch(URL + '/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(message),
	})
	const mabla = JSON.stringify(param);
	return res.status === 200;
}

export const verifyToken = async (token: string): Promise<boolean> => {
	if (token === '') {
		return false;
	}
	let res = await fetch(URL + '/plants', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return res.status === 200;

}

export const createPlant = async (accessToken: string, param: CreatePlant) => {
	let plant = {
		name: param.name,
		set_watering_period: param.setWateringPeriod,
		set_watering_amount: param.setWateringAmount,
		collaboration: param.collaboration,
		schedules: [],
		start_date: param.startDate
	};
	let res = await fetch(URL + '/plants', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(plant)
	});
	return await res.json();
};
