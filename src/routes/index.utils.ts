import type { CalendarEvent, EventInfo } from '$lib/types';
import { toZonedTime } from 'date-fns-tz';
import { env } from '$env/dynamic/public';
import { contrastColor } from '$lib/utils';

// Color palette for cities
export const COLORS = [
	'#E57373',
	'#64B5F6',
	'#81C784',
	'#FFD54F',
	'#BA68C8',
	'#A1887F',
	'#4DD0E1',
	'#FFD700',
	'#FF8A65',
	'#90A4AE',
	'#AED581',
	'#FFB74D',
	'#F06292',
	'#7986CB'
];

// Return an array of unique city names, omitting undefined or empty cities
export function getUniqueCities(events: EventInfo[]): string[] {
	return Array.from(
		new Set(
			events.map((e) => e.city).filter((city): city is string => !!city && city.trim() !== '')
		)
	);
}

// Map each city to a color from the COLORS array
export function getCityColorMap(uniqueCities: string[]): Record<string, string> {
	const cityColorMap: Record<string, string> = {};
	uniqueCities.forEach((city, idx) => {
		cityColorMap[city] = COLORS[idx % COLORS.length];
	});
	return cityColorMap;
}

export const transformMobilizeEventsToCalendarEvents = (
	events: EventInfo[],
	cityColorMap: Record<string, string>
): CalendarEvent[] => {
	const timeZone = env.PUBLIC_TIME_ZONE;
	return events.map((event) => ({
		id: String(event.id),
		start: toZonedTime(event.startDate, timeZone),
		end: toZonedTime(event.endDate, timeZone),
		title: event.title,
		editable: false,
		backgroundColor: event?.city ? cityColorMap[event.city] : '#F5F5F5',
		borderColor: event?.city ? cityColorMap[event.city] : '#F5F5F5',
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
};
