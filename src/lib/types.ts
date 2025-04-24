export type EventInfo = {
	id: number;
	title: string;
	description: string;
	imageUrl: string;
	startDate: Date;
	endDate: Date;
	venue: string | undefined;
	address: string | undefined;
	city: string | undefined;
	eventUrl: string | undefined;
};

/* MOBILIZE API TYPES */
type EventType =
	| 'CANVASS'
	| 'PHONE_BANK'
	| 'TEXT_BANK'
	| 'MEETING'
	| 'COMMUNITY'
	| 'FUNDRAISER'
	| 'MEET_GREET'
	| 'HOUSE_PARTY'
	| 'VOTER_REG'
	| 'TRAINING'
	| 'FRIEND_TO_FRIEND_OUTREACH'
	| 'DEBATE_WATCH_PARTY'
	| 'ADVOCACY_CALL'
	| 'RALLY'
	| 'TOWN_HALL'
	| 'OFFICE_OPENING'
	| 'BARNSTORM'
	| 'SOLIDARITY_EVENT'
	| 'COMMUNITY_CANVASS'
	| 'SIGNATURE_GATHERING'
	| 'CARPOOL'
	| 'WORKSHOP'
	| 'PETITION'
	| 'AUTOMATED_PHONE_BANK'
	| 'LETTER_WRITING'
	| 'LITERATURE_DROP_OFF'
	| 'VISIBILITY_EVENT'
	| 'OTHER';

type Visibility = 'PUBLIC' | 'PRIVATE';
type AccessibilityStatus = 'ACCESSIBLE' | 'NOT_ACCESSIBLE' | 'NOT_SURE' | null;
type ApprovalStatus = 'APPROVED' | 'NEEDS_APPROVAL' | 'REJECTED' | 'NEEDS_HOST_VERIFICATION';
type RaceType =
	| 'GOVERNOR'
	| 'CONGRESSIONAL'
	| 'SENATE'
	| 'STATE_SENATE'
	| 'STATE_LEG'
	| 'SEC_STATE'
	| 'ATTY_GENERAL'
	| 'OTHER_LOCAL'
	| 'OTHER_STATEWIDE'
	| null;

type OrgType = 'CAMPAIGN' | 'STATE_PARTY' | 'COORDINATED' | 'INDEPENDENT';

export type MobilizeEvent = {
	title: string;
	description: string;
	featured_image_url: string;
	high_priority: boolean;
	sponsor: Organization;
	timeslots: Timeslot[];
	location: Location | null;
	timezone: string;
	event_type: EventType;
	browser_url: string;
	created_date: number;
	modified_date: number;
	visibility: Visibility;
	address_visibility: Visibility;
	created_by_volunteer_host: boolean;
	is_virtual: boolean;
	virtual_action_url: string | null;
	contact: Contact;
	accessibility_status: AccessibilityStatus;
	accessibility_notes: string;
	tags: Tag[];
	approval_status: ApprovalStatus;
	event_campaign: EventCampaign | null;
	instructions: string | null;
};

type Organization = {
	id: number;
	name: string;
	slug: string;
	is_coordinated: boolean;
	is_independent: boolean;
	race_type: RaceType;
	is_primary_campaign: boolean;
	state: string;
	district: string;
	candidate_name: string;
	event_feed_url: string;
	created_date: number;
	modified_date: number;
	org_type: OrgType;
};
type Timeslot = {
	id: number;
	start_date: number;
	end_date: number;
	max_attendees: number | null;
	is_full: boolean;
	instructions: string;
};
type Location = {
	venue: string;
	address_lines: [string, string]; // always exactly two values
	locality: string; // city
	region: string; // two-character state code
	country: string; // ISO-3166-1 alpha-2 (e.g. "US", "PR")
	postal_code: string;
	location: {
		latitude: number;
		longitude: number;
	} | null;
	congressional_district: string | null;
	state_leg_district: string | null;
	state_senate_district: string | null;
};
type Contact = {
	name: string;
	email_address: string;
	phone_number: string;
	owner_user_id: number;
} | null;

type Tag = {
	id: number;
	name: string;
};
type EventCampaign = {
	id: number;
	slug: string;
	event_create_page_url: string;
};
