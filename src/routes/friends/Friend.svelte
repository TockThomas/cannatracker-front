<script lang="ts">
	import { enhance } from '$app/forms';
	export let name;
</script>

<div class="flex-1 my-2">
	<form method="POST" action="?/deleteFriend" use:enhance>
		<div class="flex justify-between">
			<h2>{name}</h2>
			<input name="friendsUsername" value="{name}" hidden />
			<button>delete</button>
		</div>
	</form>
</div>