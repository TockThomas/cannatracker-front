<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from '../../../../.svelte-kit/types/src/routes/friends/$types';
	import type { Friend, Schedule } from '$lib/models';

	export let data: PageData;
	let friends: Friend[] = data.friends;
	let contributors: string[] = [];
	let contributorInput: string = '';
	let schedules: Schedule[] = [];
	function addContributor() {
		friends.forEach(friend => {
			if (friend.username === contributorInput && !contributors.includes(contributorInput)) {
				contributors = [...contributors, contributorInput];
			}
		});
		contributorInput = '';
		console.log(friends);
		console.log(contributors);
	}
	function createSchedule() {
		// TODO: create schedule
	}
	function addFertilizer() {
		// TODO: add fertilizer to schedule
	}
</script>

<div class="h-full flex justify-center">
	<div class="w-4/5 flex flex-col justify-center">
		<form method="POST" action="?/create" use:enhance
		class="w-2/3 flex flex-col space-y-2 self-center">
			<p>name</p>
			<input name="name" type="text" required />
			<p>setWateringPeriod</p>
			<input name="setWateringPeriod" type="number" />
			<p>setWateringAmount</p>
			<input name="setWateringAmount" type="number" />
			<p>startTime</p>
			<input type="date" name="startTime" required />
			<p>Collaborators</p>
			<ul>
				{#each contributors as contributor}
					<li>
						{contributor}
					</li>
				{/each}
			</ul>
			<input bind:value={contributorInput} placeholder="Enter friends username" type="text" />
			<button type="button" on:click={addContributor}>add friend to contributors</button>
			<p>Schedules</p>
			<ul>
				{#each schedules as { name, fertilizers }}
					<li>
						{name}
						<ul>
							{#each fertilizers as { name, color, amountPerLiter }}
								<li style="--fertilizer-color: {color}">
									{name}: {amountPerLiter} per Liter
								</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ul>
			<button type="button" on:click={addFertilizer}>create a schedule</button>
			<button type="button" on:click={createSchedule}>create a schedule</button>
			<button>Create plant</button>
		</form>
	</div>
</div>

<style>
	li {
			color: var(--fertilizer-color);
	}
</style>
