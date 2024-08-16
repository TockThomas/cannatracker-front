<script lang="ts">
	import '../app.css'
</script>


<div class="min-h-screen min-w-screen">
	<div class="fixed inset-x-0 top-0 bg-green-500 text-white p-4">
		<h1 class="text-2xl">CannaTracker</h1>
	</div>

	<div class="p-4 py-16">
		<slot />
	</div>

	<nav class="fixed inset-x-0 bottom-0 bg-green-500 text-white p-4">
		<ul class="flex justify-around">
			<li><a class="hover:text-gray-400">Active plants</a></li>
			<li><a class="hover:text-gray-400">Friends</a></li>
			<li><a class="hover:text-gray-400">Settings</a></li>
		</ul>
	</nav>
</div>
