import type { CreatePlant, LoginParam } from '$lib/models';

export const userLogin = async (param: LoginParam): Promise<string | null> => {
	let message = [
		['username', param.username],
		['password', param.password],
		['grant_type', 'password']
	];
	let res = await fetch('http://localhost:8000/login', {
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

export const verifyToken = async (token: string): Promise<boolean> => {
	if (token === '') {
		return false;
	}
	let res = await fetch('http://localhost:8000/plants', {
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
	let res = await fetch('http://localhost:8000/plants', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(plant)
	});
	return await res.json();
};
