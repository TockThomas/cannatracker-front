<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import Friend from './Friend.svelte';

	export let data: PageData;
</script>

<div class="h-4/5 flex justify-center">
	<div class="w-3/4 flex flex-col justify-between">
		<div>
			<h1 class="mb-12">Your friends</h1>
			<ul>
				{#each data.friends as { username }}
					<li>
						<Friend name="{username}" />
					</li>
				{/each}
			</ul>
		</div>
		<form method="POST" action="?/addFriend" use:enhance>
			<input name="friendsUsername" placeholder="Enter friends username" type="text" required />
			<button>add friend</button>
		</form>
	</div>
</div>
