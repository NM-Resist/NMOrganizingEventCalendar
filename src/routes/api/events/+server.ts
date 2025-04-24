// src/routes/api/events/+server.ts
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import type { EventInfo, MobilizeEvent } from '$lib/types';

export const GET: RequestHandler = async () => {
	// compute one week ago, in seconds
	const oneWeekAgo = Math.floor((Date.now() - 7 * 24 * 60 * 60 * 1000) / 1000);

	const res = await fetch(
		`https://api.mobilize.us/v1/organizations/${env.ORG_ID}/events?timeslot_start=gte_${oneWeekAgo}`,
		{
			headers: {
				Authorization: `Bearer ${env.MOBILIZE_API_KEY}`,
				Accept: 'application/json'
			}
		}
	);
	if (!res.ok) {
		return new Response(`Error fetching events: ${res.statusText}`, { status: res.status });
	}
	const data = await res.json();

	const cleanedData: EventInfo[] = data.data.flatMap((event: MobilizeEvent) => {
		const timeslots = event.timeslots;
		return timeslots.map<EventInfo>((t) => ({
			id: t.id,
			title: event.title,
			description: event.description,
			imageUrl: event.featured_image_url,
			startDate: new Date(t.start_date * 1000),
			endDate: new Date(t.end_date * 1000),
			venue: event.location?.venue,
			address: event.location?.address_lines.join('\n'),
			city: event.location?.locality,
			eventUrl: event.browser_url
		}));
	});

	return new Response(JSON.stringify(cleanedData), { status: 200 });
};
