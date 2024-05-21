import esbuild from 'esbuild';
console.log('Building script');
// eslint-disable-next-line @typescript-eslint/no-var-requires
esbuild.buildSync({
	entryPoints: ['src/index.ts'],
	bundle: true,
	minify: true,
	format: 'esm',
	platform: 'node',
	target: ['esnext'],
	loader: { '.html': 'text', '.svg': 'text', '.css': 'text' },
	tsconfig: 'tsconfig.build.json',
	outfile: 'dist/index.js',
});
