<script lang="ts">
	import type { Snippet } from 'svelte';
	import { contrastColor } from '$lib/utils';

	const {
		show = $bindable<boolean>(),
		title,
		color,
		onClose,
		children
	} = $props<{
		show: boolean;
		title: string;
		color: string;
		onClose: () => void;
		children: Snippet;
	}>();

	function close() {
		onClose();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') close();
	}

	// lock scrolling when modal is open
	$effect(() => {
		if (typeof document !== 'undefined') {
			document.documentElement.style.overflow = show ? 'hidden' : '';
		}
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if show}
	<div class="fixed inset-0 z-50 flex items-center justify-center">
		<div
			class="bg-opacity-50 fixed inset-0 backdrop-blur-sm"
			role="button"
			tabindex="0"
			aria-label="Close modal"
			onclick={close}
			onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && close()}
		></div>
		<div
			class="relative m-4 flex max-h-[80vh] w-[480px] max-w-[90%] flex-col overflow-hidden rounded-lg bg-white shadow-lg"
		>
			<div
				class="flex items-center p-4"
				style="background-color: {color}; color: {contrastColor(color)}"
			>
				<span class="flex-1 text-lg font-semibold">{title}</span>
				<button
					type="button"
					class="p-1 text-2xl hover:cursor-pointer hover:text-red-400"
					aria-label="Close"
					onclick={close}
					>&times;
				</button>
			</div>
			<div class="overflow-y-auto p-6 font-sans leading-relaxed text-gray-800">
				{@render children()}
			</div>
		</div>
	</div>
{/if}
