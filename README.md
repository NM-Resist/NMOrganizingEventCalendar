# New Mexico Grassroots Event Calendar

A Svelte 5-powered web app that displays a dynamic, interactive calendar of grassroots events in New Mexico. Browse
upcoming events, get full details in a modal dialog, and conveniently explore additional resources.

## Features

- **Interactive Calendar:** Weekly, monthly, and list views
  using [@event-calendar/core](https://event-calendar.netlify.app/)
- **Event Details Modal:** Click any event to see full details, images, links, and location in a modal
- **Timezone-Aware:** Events are displayed in the America/Denver timezone
- **TailwindCSS Styling:** Clean, responsive, and accessible interface
- **Centralized Resource Link:** Quick access to additional organizing resources

## Use Cases

- **Community Members:** Find upcoming activist and organizing events across New Mexico.
- **Organizers:** Showcase events in an easy-to-navigate public format.
- **Anyone:** Quickly get event locations, times, descriptions, and external links.

## Getting Started

### 1. Install Dependencies

``` bash
npm install
```

### 2. Start the Development Server

``` bash
npm run dev
```

Visit the printed localhost URL (default: [http://localhost:5173](http://localhost:5173)) in your browser.

## How It Works

- On load, the calendar fetches events from (see ). `/api/events``+page.server.ts`
- Events are displayed using FullCalendar’s rich views.
- Each event includes a title, date range, location, description, and optionally an image and a link.
- Clicking an event opens a modal _bulletin_ showing all of its details.
- The modal can be closed by clicking the backdrop, the top-right close button, or pressing Escape.

## Project Structure

``` 
src/
 ├── components/
 │    └── Modal.svelte     # Handles modal dialog display
 ├── routes/
 │    ├── +page.svelte     # Main bulletin board and calendar interface
 │    ├── +page.server.ts  # Fetches events for the page
 ├── lib/
 │    └── types.ts         # TypeScript types for events
 └── app.css               # Tailwind and global styles
```

## Customization

- **Adding/Editing Events:**
  Update your API or mock data served from . `/api/events`
- **Styling:**
  Tweak or extend Tailwind classes as needed in each component.
- **Resource Link:**
  Change the Linktree URL in the main page source.
- **Timezone:**
  Adjust the `timeZone` constant in if your region changes. `+page.svelte`

## Tech Stack

- [Svelte 5 (runes syntax)](https://svelte.dev/blog/runes)
- [@event-calendar/core](https://event-calendar.netlify.app/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Scripts

| Script            | Function                       |
|-------------------|--------------------------------|
| `npm run dev`     | Start local development server |
| `npm run build`   | Build for production           |
| `npm run preview` | Preview prod build locally     |
| `npm run check`   | Type-check the codebase        |

## License

MIT
**Created for grassroots organizing in New Mexico.
Fork, adapt, and support your own community!**
