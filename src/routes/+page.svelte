<script lang="ts">
	//@ts-ignore
	import { Calendar, DayGrid, List, ResourceTimeline, TimeGrid } from '@event-calendar/core';
	import Modal from '../components/Modal.svelte';
	import type { CalendarEvent, EventInfo } from '$lib/types';
	import {
		getCityColorMap,
		getUniqueCities,
		transformMobilizeEventsToCalendarEvents
	} from './index.utils';
	import { contrastColor } from '$lib/utils';

	const { data } = $props<{ data: { events: EventInfo[] } }>();

	// State
	let selectedCity = $state<string>();
	let showModal = $state(false);
	let selectedEvent = $state<CalendarEvent>();

	// Derived values
	const uniqueCities = getUniqueCities(data.events);
	const cityColorMap = getCityColorMap(uniqueCities);
	const allCalendarEvents = transformMobilizeEventsToCalendarEvents(data.events, cityColorMap);

	// Calendar events, filtered by the selected city
	const filteredCalendarEvents = $derived(() => {
		return selectedCity
			? allCalendarEvents.filter((e) => e?.extendedProps?.city === selectedCity)
			: allCalendarEvents;
	});

	// Calendar options (update 'events' on filter)
	const options = $derived({
		view: 'dayGridMonth',
		events: filteredCalendarEvents(),
		eventClick: handleEventClick,
		headerToolbar: {
			start: 'title',
			center: 'prev,next today',
			end: 'dayGridMonth,timeGridWeek,listMonth'
		},
		slotMinTime: '08:00:00',
		eventDidMount(info: { event: CalendarEvent; el: HTMLElement; view: { type: string } }) {
			const isListView = info.view.type.startsWith('list');
			if (!isListView) {
				const bg = info.event.backgroundColor || '#fff';
				info.el.style.color = contrastColor(bg);
			}
		}
	});

	// Update events in calendar options whenever filter changes
	$effect(() => {
		options.events = filteredCalendarEvents();
	});

	function handleEventClick(e: Calendar.EventClickInfo) {
		selectedEvent = e.event;
		showModal = true;
	}

	function handleLegendClick(city: string | null) {
		// Toggle: clicking selected city again clears filter
		selectedCity = city === selectedCity || city === null ? undefined : city;
	}
</script>

<!-- Legend with filter -->
<div class="mt-8 flex flex-wrap justify-center gap-3">
	<!-- "All" option -->
	<span class="font-bold">Filters:</span>
	<button
		type="button"
		class="flex items-center space-x-2 px-3 py-1 rounded border text-sm transition-colors cursor-pointer"
		class:selected={!selectedCity}
		onclick={() => handleLegendClick(null)}
		style="background: {selectedCity === null ? '#eee' : '#fff'}; font-weight: {selectedCity ===
		null
			? 'bold'
			: 'normal'};"
	>
		<span class="inline-block h-4 w-4 rounded bg-gray-300"></span>
		<span>All</span>
	</button>
	{#each uniqueCities as city}
		<button
			type="button"
			class="flex items-center space-x-2 px-3 py-1 rounded border text-sm transition-colors cursor-pointer"
			class:selected={selectedCity === city}
			onclick={() => handleLegendClick(city)}
			style="background: {selectedCity === city
				? cityColorMap[city] + '33'
				: '#fff'}; border-color: {cityColorMap[city]}; font-weight: {selectedCity === city
				? 'bold'
				: 'normal'};"
		>
			<span class="inline-block h-4 w-4 rounded" style="background-color: {cityColorMap[city]}"
			></span>
			<span>{city}</span>
		</button>
	{/each}
</div>

<!--Calendar-->
<div class="mx-auto my-8 max-w-4xl overflow-hidden rounded-sm p-1">
	<Calendar plugins={[DayGrid, List, TimeGrid]} {options} />
</div>

<!--Modal-->
<Modal
	bind:show={showModal}
	title={selectedEvent?.title || ''}
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
