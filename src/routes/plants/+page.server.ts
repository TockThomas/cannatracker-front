import type { Actions, PageServerLoad } from './$types';
import type { CreatePlant, GrowStage, Plant, PlantInDB, ScheduleInDB, WateringRecordInDB } from '$lib/models';
import { addFriend, createPlant, deleteFriend, getFriends, getPlants, getTemplate, waterPlant } from '$lib/db';
import { getAccessToken} from '$lib/util';
import { redirect } from '@sveltejs/kit';


export const actions = {
	water: async ({ cookies, request }) => {
		let accessToken = getAccessToken(cookies);
		const data = await request.formData();
		let plantId = data.get('plantId') ?? "";
		await waterPlant(accessToken, plantId.toString());
		return {
			watered: true,
		};
	}
};

export const load: PageServerLoad = async ({ cookies }) => {
	let accessToken = getAccessToken(cookies);
	let plantsInDB = await getPlants(accessToken);
	let plants: Plant[] = [];
	plantsInDB.forEach(plantInDB => {
		let lastWatering;
		let lastWateringInDays;
		let wateringRecords = plantInDB.watering_records;
		let now = new Date();
		let lastDate: Date;
		let createdAt
		let week;
		let firstDay;
		let growStage: GrowStage;
		if (wateringRecords.length === 0) {
			let startDate = new Date(plantInDB.start_date)
			let year = startDate.getUTCFullYear();
			let month = startDate.getUTCMonth();
			let day = startDate.getUTCDate();
			lastDate = new Date(year, month, day);
		} else {
			let lastWateringRecord = wateringRecords[wateringRecords.length - 1];
			createdAt = new Date(lastWateringRecord.created_at);
			let year = createdAt.getUTCFullYear();
			let month = createdAt.getUTCMonth();
			let day = createdAt.getUTCDate();
			lastDate = new Date(year, month, day);
		}
		lastWateringInDays = Math.floor((now.getTime() - lastDate.getTime()) / (1000*60*60*24))
		if (lastWateringInDays === 0) {
			lastWatering = "today";
		} else if (lastWateringInDays === 1) {
			lastWatering = "yesterday";
		} else {
			lastWatering = lastWateringInDays + ' days ago';
		}
		firstDay = new Date(plantInDB.start_date);
		week = diff_weeks(new Date(), firstDay);
		let plant: Plant = {
			id: plantInDB.id,
			name: plantInDB.name,
			lastWatering: lastWatering,
			lastWateringInDays: lastWateringInDays,
			setWateringPeriod: plantInDB.set_watering_period,
			setWateringAmount: plantInDB.set_watering_amount,
			growStage: plantInDB.schedule.grow_stages[week],
			wateringRecord: wateringRecords,
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

function diff_weeks(dt2: Date, dt1: Date): number {
	// Calculate the difference in milliseconds between dt2 and dt1
	let diff =(dt2.getTime() - dt1.getTime()) / 1000;
	// Convert the difference from milliseconds to weeks by dividing it by the number of milliseconds in a week
	diff /= (60 * 60 * 24 * 7);
	// Return the absolute value of the rounded difference as the result
	return Math.abs(Math.round(diff));
}