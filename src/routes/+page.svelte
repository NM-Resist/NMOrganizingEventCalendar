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
