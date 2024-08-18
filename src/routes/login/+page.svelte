<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div>
	<form method="POST" action="?/login" use:enhance>
		<p>Username</p>
		<input name="username" type="text" />
		<p>Password</p>
		<input name="password" type="password" />
		<button>Login</button>
	</form>
</div>
