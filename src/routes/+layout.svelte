<script lang="ts">
	import '../app.css'
	import type { LayoutData } from './$types'
	import weed_colored from '$lib/assets/weed_leaf_colored.png'

	export let data: LayoutData;
</script>

<svelte:head>
	<title>CannaTracker</title>
</svelte:head>


<div class="min-h-screen min-w-screen font-sans">
	<div class="fixed inset-x-0 top-0 bg-green-600 text-white p-4 border-b-4 border-b-green-800 py-3">
		<div class="flex space-x-4 justify-center">
			<img alt="Headtitle logo" src={weed_colored} class="size-8"/>
			<h1 class="text-2xl">CannaTracker</h1>
		</div>
	</div>

	<div class="h-screen p-4 py-16">
		<slot />
	</div>

	{#if data.loggedIn}
		<nav class="fixed inset-x-0 bottom-0 bg-green-600 text-white p-4">
			<ul class="flex justify-around">
				<li><a href="/plants" class="hover:font-serif">Active plants</a></li>
				<li><a href="/friends" class="hover:text-gray-400">Friends</a></li>
				<li><a href="/settings" class="hover:text-gray-400" disabled>Settings</a></li>
			</ul>
		</nav>
	{/if}
</div>
