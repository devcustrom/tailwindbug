import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import vue from '@astrojs/vue';
import node from '@astrojs/node';

export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	image: {
		remotePatterns: [{ protocol: "https" }],
	},
	integrations: [
		vue()
	],
	output: 'static',
	adapter: node({
		mode: 'standalone'
	})
});
