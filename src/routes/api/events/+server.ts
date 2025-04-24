// src/routes/api/events/+server.ts
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async () => {
	const res = await fetch('https://api.mobilize.us/v1/organizations/41014/events', {
		headers: {
			Authorization: `Bearer ${env.MOBILIZE_API_KEY}`,
			Accept: 'application/json'
		}
	});
	if (!res.ok) {
		return new Response(`Error fetching events: ${res.statusText}`, { status: res.status });
	}
	const data = await res.json();
	console.log(JSON.stringify(data));
	return new Response(JSON.stringify(data), { status: 200 });
};
