import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/**
 * SvelteKit configuration for a static GitHub Pages deployment.
 * - Uses adapter-static to output purely static files in `build/`.
 * - Sets `paths.base` to the repo name for correct URL prefixing.
 * - Prerenders all pages by default.
 */

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Enable preprocessors (e.g., SCSS, PostCSS) as needed
	preprocess: preprocess(),

	kit: {
		// Use the static adapter for a fully static build
		adapter: adapter({
			// If you need SPA-style routing (fallback to 200.html), uncomment:
			// fallback: '200.html'
		}),

		// When hosting under a repo (e.g., you.github.io/nmgrassrootsbb), set the base
		paths: {
			base: '/nmgrassrootsbb',
			assets: ''
		},

		// Prerender all routes by default (static HTML output)
		prerender: {
			default: true
		}
	}
};

export default config;
