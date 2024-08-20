<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import weed_colored from '$lib/assets/weed_leaf_colored.png'

	export let form: ActionData;
</script>

<div class="h-3/4 flex justify-center">
	<div class="w-3/4 flex flex-col justify-around">
		<div class="pb-16 flex items-center justify-center w-full">
			<img alt="Weed leaf" src={weed_colored} class="center size-32"/>
		</div>
		<form method="POST" action="?/register" use:enhance
		class="w-2/3 flex flex-col space-y-2 self-center">
			<p>First name</p>
			<input name="firstName" type="text" required />
			<p>Last name</p>
			<input name="lastName" type="text" required />
			<p>Username</p>
			<input name="username" type="text" required />
			<p>Email</p>
			<input name="email" type="email" required />
			<p>Password</p>
			<input name="password" type="password" required />
			<p>Confirm Password</p>
			<input name="passwordConfirm" type="password" required />
			{#if form?.invalid}
				<p class="error">Username and password is required</p>
			{/if}
			<div class="pt-8 flex justify-center justify-around">
				<button>Register</button>
				<a href="/login">Login</a>
			</div>
		</form>
	</div>
</div>