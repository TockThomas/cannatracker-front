export type LoginParam = {
	username: string
	password: string
}

export type CreatePlant = {
	name: string
	setWateringPeriod?: number
	setWateringAmount?: number
	collaboration: string[]
	startDate: string
}