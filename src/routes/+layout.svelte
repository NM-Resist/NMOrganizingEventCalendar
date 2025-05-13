<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<h1 class="my-6 text-center text-3xl font-bold">New Mexico Grassroot Events</h1>
<div class="mb-4 text-center">
	<a
		href="https://linktr.ee/nmresist"
		target="_blank"
		rel="noopener noreferrer"
		class="text-blue-500 hover:underline"
	>
		Visit our Linktree for more resources
	</a>
</div>

{@render children()}

<p
	class="mt-6 rounded border border-yellow-200 bg-yellow-50 p-2 text-center text-sm text-yellow-800"
>
	Want to add an event to the calendar? Email us at
	<a href="mailto:averytiffany22@gmail.com" class="text-yellow-900 underline hover:text-yellow-700">
		averytiffany22@gmail.com
	</a>
</p>
