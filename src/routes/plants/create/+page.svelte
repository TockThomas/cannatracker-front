<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from '../../../../.svelte-kit/types/src/routes/friends/$types';
	import type { Friend, Schedule } from '$lib/models';

	export let data: PageData;
	let friends: Friend[] = data.friends;
	let templates: Schedule[] = data.templates;
	let collaborators: string[] = [];
	let collaboratorInput: string = '';
	let schedulesInput: string;
	function addCollaborator() {
		friends.forEach(friend => {
			if (friend.username === collaboratorInput && !collaborators.includes(collaboratorInput)) {
				collaborators = [...collaborators, collaboratorInput];
			}
		});
		collaboratorInput = '';
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
			<input type="date" name="startDate" required />
			<p>Collaborators</p>
			<ul>
				{#each collaborators as collaborator}
					<li>
						{collaborator}
					</li>
				{/each}
			</ul>
			<input type="hidden" name="collaborators[]" bind:value={collaborators} multiple hidden />
			<input bind:value={collaboratorInput} placeholder="Enter friends username" type="text" />
			<button type="button" on:click={addCollaborator}>add friend to contributors</button>
			<p>Schedules</p>
			<select bind:value={schedulesInput} name="schedules">
				{#each templates as { id, name }}
					<option value="{id}">{name}</option>
				{/each}
			</select>
			<button>Create plant</button>
		</form>
	</div>
</div>

<style>
	li {
			color: var(--fertilizer-color);
	}
</style>
