<script lang="ts">
	//@ts-ignore
	import { Calendar, DayGrid, List, ResourceTimeline, TimeGrid } from '@event-calendar/core';
	import Modal from '../components/Modal.svelte';
	import type { EventInfo } from '$lib/types';
	import { toZonedTime } from 'date-fns-tz';

	const timeZone = 'America/Denver';

	const { data } = $props<{ data: { events: EventInfo[] } }>();

	const calendarEvents = data.events.map((event: EventInfo) => ({
		id: String(event.id),
		start: toZonedTime(event.startDate, timeZone),
		end: toZonedTime(event.endDate, timeZone),
		title: event.title,
		editable: false,
		classNames: ['cursor-pointer'],
		extendedProps: {
			description: event.description,
			imageUrl: event.imageUrl,
			venue: event.venue,
			address: event.address,
			city: event.city,
			eventUrl: event.eventUrl
		}
	}));

	const options = $state({
		view: 'dayGridMonth',
		events: calendarEvents,
		eventClick: handleEventClick,
		headerToolbar: {
			start: 'title',
			center: 'prev,next today',
			end: 'dayGridMonth,timeGridWeek,listMonth'
		}
	});

	let showModal = $state(false);
	let selectedEvent: Calendar.Event = $state();

	function handleEventClick(e: Calendar.EventClickInfo) {
		selectedEvent = e.event;
		showModal = true;
	}
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
<div class="mx-auto my-8 max-w-4xl overflow-hidden rounded-sm">
	<Calendar plugins={[DayGrid, List, ResourceTimeline, TimeGrid]} {options} />
</div>

<Modal
	bind:show={showModal}
	title={selectedEvent?.title}
	color={selectedEvent?.backgroundColor || '#f5f5f5'}
	onClose={() => (showModal = false)}
>
	{#if selectedEvent?.extendedProps?.imageUrl}
		<img
			src={selectedEvent.extendedProps.imageUrl}
			alt={selectedEvent.title}
			class="mb-4 w-full rounded object-cover"
		/>
	{/if}

	<p>
		<span class="font-semibold">Starts:</span>
		{selectedEvent?.start?.toLocaleString()}
	</p>
	<p>
		<span class="font-semibold">Ends:</span>
		{selectedEvent?.end?.toLocaleString()}
	</p>

	{#if selectedEvent?.extendedProps?.venue || selectedEvent?.extendedProps?.address || selectedEvent?.extendedProps?.city}
		<p class="mt-2">
			<span class="font-bold">Address:</span><br />
			{#if selectedEvent?.extendedProps?.venue}
				<span class="font-semibold">{selectedEvent.extendedProps.venue}</span><br />
			{/if}
			{#if selectedEvent?.extendedProps?.address}
				{selectedEvent.extendedProps.address}<br />
			{/if}
			{#if selectedEvent?.extendedProps?.city}
				{selectedEvent.extendedProps.city}
			{/if}
		</p>
	{/if}

	<a
		href={selectedEvent?.extendedProps?.eventUrl}
		target="_blank"
		rel="noopener noreferrer"
		class="mt-4 inline-block text-blue-500 hover:underline"
	>
		More info
	</a>

	<p class="mt-4 whitespace-pre-wrap">
		{selectedEvent?.extendedProps?.description}
	</p>
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
