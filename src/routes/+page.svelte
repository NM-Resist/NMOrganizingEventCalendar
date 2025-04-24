<script lang="ts">
	import { Calendar, List, TimeGrid } from '@event-calendar/core';
	import Modal from '../components/Modal.svelte';

	const { data } = $props<{ data: { events: Calendar.Event[] } }>();

	const startTime = new Date();
	startTime.setHours(5, 0);
	const endTime = new Date(startTime);
	endTime.setHours(endTime.getHours() + 1);

	const options = $state({
		view: 'timeGridWeek',
		events: data.events,
		eventClick: handleEventClick
	});

	let showModal = $state(false);
	let selectedEvent: Calendar.Event = $state();

	function handleEventClick(e: Calendar.EventClickInfo) {
		selectedEvent = e.event;
		showModal = true;
	}
</script>

<div class="mx-auto my-8 max-w-4xl overflow-hidden rounded-sm">
	<Calendar plugins={[List, TimeGrid]} {options} />
</div>

<Modal
	bind:show={showModal}
	title={selectedEvent?.title}
	color={selectedEvent?.backgroundColor || '#f5f5f5'}
>
	<p><strong>{selectedEvent?.title}</strong></p>
	<p>Starts: {selectedEvent?.start?.toLocaleString()}</p>
	<p>Ends: {selectedEvent?.end?.toLocaleString()}</p>
	<p>{selectedEvent?.extendedProps?.description}</p>
</Modal>

<style>
	/* FullCalendar default styling overrides */
	/* System font */
	:global(.ec) {
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif;
	}

	/* Toolbar chunk layout */
	:global(.ec-toolbar-chunk) {
		display: flex;
		align-items: center;
	}

	:global(.ec-toolbar-title) {
		flex: 1;
		text-align: center;
		font-size: 1.25rem;
		font-weight: 600;
	}

	/* Buttons */
	:global(.ec-button) {
		background-color: #2563eb;
		color: #fff;
		border: none;
		border-radius: 4px;
		padding: 0.4rem 0.8rem;
		font-size: 0.9rem;
		transition: background-color 0.2s ease;
		margin: 0 0.2rem;
	}

	:global(.ec-button:hover) {
		background-color: #1d4ed8;
	}

	:global(.ec-button:focus) {
		outline: 2px solid #93c5fd;
	}

	/* Event items */
	:global(.ec-event) {
		border-radius: 4px;
		opacity: 0.95;
		transition: opacity 0.15s ease;
	}

	:global(.ec-event:hover) {
		opacity: 1;
	}

	/* Hour labels in time grid */
	:global(.ec-timegrid-axis-cushion) {
		font-size: 0.85rem;
		color: #555;
	}
</style>
