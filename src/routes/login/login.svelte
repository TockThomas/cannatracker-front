<script lang="ts">
	let username = '';
	let password = '';

	function login() {
		username = username
		return;
	}
</script>

<div>
	<p>Username</p>
	<input bind:value={username} />
	<p>Password</p>
	<input bind:value={password} />
	<button on:click={login}>Login</button>
</div>
