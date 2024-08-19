<script lang="ts">
	import { link } from 'svelte/transition';
	export let $auth = {
		status: '',
	}
	import Login from './login/+page.svelte'
</script>

{#if $auth.status === 'loggedOut'}
	<div class="w-full h-full flex items-center justify-around">
		<Login />
	</div>
