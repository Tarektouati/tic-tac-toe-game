import { defineConfig, configDefaults } from 'vitest/config';

/**
 * We can extend a common Vitest configuration
 * @see https://v0.vitest.dev/config/#configuration
 */
export default defineConfig({
	test: {
		exclude: configDefaults.exclude,
	},
});
