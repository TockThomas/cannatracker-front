export type LoginParam = {
	username: string
	password: string
}

export type CreateUser = {
	firstName: string,
	lastName: string,
	username: string,
	email: string,
	password: string,
}

export type CreatePlant = {
	name: string
	setWateringPeriod?: number
	setWateringAmount?: number
	collaborators: string[]
	schedules: string
	startDate: string
}

export type Plant = {
	id: string,
	name: string,
	lastWateringInDays: number,
	lastWatering: string
	setWateringPeriod?: number,
	setWateringAmount?: number,
	growStage: GrowStage,
	wateringRecord: WateringRecordInDB[],
	startDate: Date,
	endDate: Date,
	createdDate: Date,
	updatedDate: Date,
	active: boolean,
}

export type PlantInDB = {
	id: string,
	name: string,
	set_watering_period?: number,
	set_watering_amount?: number,
	schedule: ScheduleInDB
	watering_records: WateringRecordInDB[],
	start_date: Date,
	end_date: Date,
	created_date: Date,
	updated_date: Date,
	active: boolean,
}

export type Friend = {
	id: string,
	username: string,
}

export type FertilizerInDB = {
	name: string,
	color: string,
	amount_per_liter: number,
}

export type GrowStage = {
	name: string,
	fertilizers: FertilizerInDB[]
}

export type ScheduleInDB = {
	id: string,
	name: string,
	grow_stages: GrowStage[],
}

export type WateringRecordInDB = {
	actor: string,
	created_at: Date,
}