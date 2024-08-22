<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import plantImg from '$lib/assets/plant.png'
	import wateringImg from '$lib/assets/watering.png'

	export let data: PageData;
	export let plants = data.plants;
</script>

<div class="h-full flex justify-center">
	<div class="w-4/5 flex flex-col justify-between">
		<ul>
			{#each plants as { id, name, lastWatering }}
				<li>
					<form method="POST" action="?/water" use:enhance>
						<input name="plantId" bind:value={id} hidden />
						<div class="flex justify-between">
							<div class="flex">
								<img src="{plantImg}" alt="plant" class="size-16"/>
								<div class="flex-col">
									<h2>{name}</h2>
									Last watering: {lastWatering}
								</div>
							</div>
							<button>
								<img src="{wateringImg}" alt="watering" class="size-8" />
							</button>
						</div>
					</form>
				</li>
			{/each}
		</ul>
		<a href="/plants/create" class="my-6 justify-end items-end self-center">Create plant</a>
	</div>
</div>
