module.exports = {
	apps: [
		{
			name: 'front',
			interpreter: 'bun',
			script: './dist/server/entry.mjs',
			env_production: {
				NODE_ENV: "production"
			}
		},
	],
};
