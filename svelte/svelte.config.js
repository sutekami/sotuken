import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		alias: {
			'api': 'src/lib/index.js',
		},
		adapter: adapter(),
		files: {
			hooks: {
				client: 'src/hooks/hooks.client.js',
				server: 'src/hooks/hooks.server.js',
				universal: 'src/hooks/hooks.js',
			},
		},
	}
};

export default config;
