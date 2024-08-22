import type { Actions, PageServerLoad } from './$types';
import type { CreatePlant, Plant, PlantInDB, Schedule, WateringRecordInDB } from '$lib/models';
import { addFriend, createPlant, deleteFriend, getFriends, getPlants, getTemplate, waterPlant } from '$lib/db';
import { getAccessToken} from '$lib/util';
import { redirect } from '@sveltejs/kit';


export const actions = {
	water: async ({ cookies, request }) => {
		let accessToken = getAccessToken(cookies);
		const data = await request.formData();
		let plantId = data.get('plantId') ?? "";
		await waterPlant(accessToken, plantId.toString());
		redirect(307, '/plants');
	}
};

export const load: PageServerLoad = async ({ cookies }) => {
	let accessToken = getAccessToken(cookies);
	let plantsInDB = await getPlants(accessToken);
	let plants: Plant[] = [];
	plantsInDB.forEach(plantInDB => {
		let lastWatering;
		let lastWateringInDays;
		let wateringRecords = plantInDB.watering_record;
		let now = new Date().getTime();
		let lastDate;
		if (!wateringRecords) {
			lastDate = new Date(plantInDB.start_date).getTime();
		} else {
			let lastWateringRecord = wateringRecords[wateringRecords.length - 1];
			lastDate = lastWateringRecord.created_at.getTime();
		}
		lastWateringInDays = Math.floor((now - lastDate) / (1000*60*60*24))
		if (lastWateringInDays === 0) {
			lastWatering = "today";
		} else if (lastWateringInDays === 1) {
			lastWatering = "yesterday";
		} else {
			lastWatering = lastWateringInDays + ' days ago';
		}
		let plant: Plant = {
			id: plantInDB.id,
			name: plantInDB.name,
			lastWatering: lastWatering,
			lastWateringInDays: lastWateringInDays,
			setWateringPeriod: plantInDB.set_watering_period,
			setWateringAmount: plantInDB.set_watering_amount,
			schedule: plantInDB.schedule,
			wateringRecord: plantInDB.watering_record,
			startDate: plantInDB.start_date,
			endDate: plantInDB.end_date,
			createdDate: plantInDB.created_date,
			updatedDate: plantInDB.updated_date,
			active: plantInDB.active,
		}
		plants.push(plant);
	})
	return {
		plants: plants,
	}
}