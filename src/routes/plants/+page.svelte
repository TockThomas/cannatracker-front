<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div>
	<form method="POST" action="?/create" use:enhance>
		<p>name</p>
		<input name="name" type="text" required />
		<p>setWateringPeriod</p>
		<input name="setWateringPeriod" type="number" />
		<p>setWateringAmount</p>
		<input name="setWateringAmount" type="number" />
		<button>Create plant</button>
	</form>
</div>
