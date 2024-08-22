import type { Actions, PageServerLoad } from './$types';
import type { CreatePlant } from '$lib/models';
import { createPlant, getFriends, getTemplate } from '$lib/db';
import { getAccessToken} from '$lib/util';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
	let accessToken = getAccessToken(cookies);
	let friends = await getFriends(accessToken);
	let templates = await getTemplate(accessToken);
	return {
		friends: friends,
		templates: templates,
	}
}

export const actions = {
	create: async ({ cookies, request }) => {
		let accessToken = getAccessToken(cookies);
		const data = await request.formData();
		let name = data.get('name') ?? "";
		let setWateringPeriod = data.get('setWateringPeriod') ?? "";
		let setWateringAmount = data.get('setWateringAmount') ?? "";
		let collaboratorsData = data.getAll('collaborators[]') ?? "";
		let collaborators: string[] = [];
		collaboratorsData.forEach((collaborator) => {
			collaborators.push(collaborator.toString())
		});
		let schedules = data.get('schedules') ?? [];
		let startDate = data.get('startDate') ?? "";
		const plant: CreatePlant = {
			name: name.toString(),
			setWateringPeriod: parseInt(setWateringPeriod.toString()),
			setWateringAmount: parseFloat(setWateringAmount.toString()),
			collaborators: collaborators,
			schedules: schedules.toString(),
			startDate: startDate.toString(),
		};
		await createPlant(accessToken, plant);
		redirect(307, '/plants');
	},
};