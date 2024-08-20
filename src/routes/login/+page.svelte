<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import weed_colored from '$lib/assets/weed_leaf_colored.png'

	export let form: ActionData;
</script>

<div class="h-3/4 flex justify-center">
	<div class="w-3/4 flex flex-col justify-around">
		<div class="flex items-center justify-center w-full">
			<img alt="Weed leaf" src={weed_colored} class="center size-32"/>
		</div>
		<form method="POST" action="?/login" use:enhance
		class="flex flex-col space-y-2 self-center">
			<p>Username</p>
			<input name="username" type="text" required />
			<p>Password</p>
			<input name="password" type="password" required />
			{#if form?.invalid}
				<p class="error">Username and password is required</p>
			{/if}
			<div class="pt-16 flex justify-center justify-around">
				<button>Login</button>
				<a href="/login/register">Register</a>
			</div>
		</form>
	</div>
</div>