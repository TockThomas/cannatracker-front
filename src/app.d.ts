// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="svelte-adapter-azure-swa" />
import type { Friend, Plant } from '$lib/models';

declare global {
	namespace App {
		interface PageData {
			loggedIn: boolean,
			friends: Friend[],
			plants: Plant[]
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
