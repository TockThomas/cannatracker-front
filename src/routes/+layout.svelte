<script lang="ts">
	import '../app.css'
	import weed_colored from '$lib/assets/weed_leaf_colored.png'
</script>


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

	<nav class="fixed inset-x-0 bottom-0 bg-green-600 text-white p-4">
		<ul class="flex justify-around">
			<li><a class="hover:font-serif">Active plants</a></li>
			<li><a class="hover:text-gray-400">Friends</a></li>
			<li><a class="hover:text-gray-400">Settings</a></li>
		</ul>
	</nav>
</div>
