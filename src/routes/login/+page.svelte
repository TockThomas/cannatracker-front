<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<form method="POST" action="?/login" use:enhance>
	<p>Username</p>
	<input name="username" type="text" required />
	<p>Password</p>
	<input name="password" type="password" required />

	{#if form?.invalid}
		<p class="error">Username and password is required</p>
	{/if}

	<button>Login</button>
</form>
