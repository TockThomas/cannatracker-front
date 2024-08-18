import type { Actions, PageServerLoad } from './$types';
import type { CreatePlant } from '$lib/models';
import { createPlant } from '$lib/db';
import { getAccessToken} from '$lib/util';

export const actions = {
	create: async ({ cookies, request }) => {
		let accessToken = getAccessToken(cookies);
		const data = await request.formData();
		let name = data.get('name') ?? "";
		let setWateringPeriod = data.get('setWateringPeriod') ?? "";
		let setWateringAmount = data.get('setWateringAmount') ?? "";
		let collaboration: any[] = [];
		let startDate = new Date();
		const plant: CreatePlant = {
			name: name.toString(),
			setWateringPeriod: parseInt(setWateringPeriod.toString()),
			setWateringAmount: parseFloat(setWateringAmount.toString()),
			collaboration: collaboration,
			startDate: startDate.toISOString(),
		};
		await createPlant(accessToken, plant);
	},
};