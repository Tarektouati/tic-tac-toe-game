import type { LocalsObject } from 'pug';

declare module '*.pug' {
	const template: (locals?: LocalsObject) => string;
	export = template;
}

declare module '*.js' {
	const content: string;
	export default content;
}
