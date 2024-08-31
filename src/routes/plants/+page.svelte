<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import plantImg from '$lib/assets/plant.png'
	import wateringImg from '$lib/assets/watering.png'
	import type { Plant } from '$lib/models';

	export let form: ActionData;
	export let data: PageData;
	export let plants: Plant[] = data.plants;
	let selectedPlantId: string|null = null;

	function expandPlant(plantId: string) {
		selectedPlantId = selectedPlantId === plantId ? null : plantId;
	}
</script>

<div class="h-full flex justify-center">
	<div class="w-4/5 flex flex-col justify-between">
		<ul>
			{#each plants as { id, name, lastWatering, growStage }}
				<li>
					<form method="POST" action="?/water">
						<input name="plantId" bind:value={id} hidden />
						<div class="flex justify-between flex-nowrap">
							<div class="flex">
								<img src="{plantImg}" alt="plant" class="size-16"/>
								<div class="flex flex-col">
									<h2>{name}</h2>
									{#if form?.watered}
										<p>Last watering: today</p>
									{:else}
										<p>Last watering: {lastWatering}</p>
									{/if}
									<button type="button" on:click={() => expandPlant(id)}
									class="flex justify-self-start collapsible">{growStage.name}</button>
									{#if selectedPlantId === id}
										<table>
											{#each growStage.fertilizers as fertilizer}
												<tr>
													<th>
														<span on:click={expandPlant} style="--color: {fertilizer.color}" />
													</th>
													<th class="pr-4">{fertilizer.name}: </th>
													<th>{fertilizer.amount_per_liter} ml/L</th>
												</tr>
											{/each}
										</table>
									{/if}
									</div>
								</div>
							{#if lastWatering === 'today'}
								<button class="flex self-start pt-4" disabled>
									<img src="{wateringImg}" alt="watering"
											 class="w-16 h-10 flex self-start" />
								</button>
							{:else}
								<button class="flex self-start pt-4">
									<img src="{wateringImg}" alt="watering"
										class="w-16 h-10 flex self-start" />
								</button>
							{/if}
							</div>
					</form>
				</li>
			{/each}
		</ul>
		<a href="/plants/create" class="my-6 justify-end items-end self-center">Create plant</a>
	</div>
</div>

<style>
	span {
		height: 16px;
		width: 16px;
		background-color: var(--color);
		border-radius: 50%;
		display: flex;
		justify-self: center;
		margin-right: 2px;
	}
  .collapsible {
      background-color: #16a34a;
      color: white;
      cursor: pointer;
			text-wrap: nowrap;
      width: min-content;
			padding-left: 6px;
			padding-right: 6px;
      border-radius: 12px;
      text-align: left;
      outline: none;
      font-size: 15px;
  }

  /* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
  .active, .collapsible:hover {
      background-color: white;
      color: #16a34a;
  }

  /* Style the collapsible content. Note: hidden by default */
  .content {
      padding: 0 18px;
      display: none;
      overflow: hidden;
      background-color: #f1f1f1;
  }
</style>
