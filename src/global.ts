export type SUG<T extends string = string> = T | (string & {});

export type OBJECT<T = any> = Record<string | number | symbol, T>;

export type EndsWith<T, U extends string> = T extends `${any}${U}` ? T : U;

export type StartsWith<T, U extends string> = T extends `${U}${any}` ? T : U;

export type Includes<T, U extends string> = T extends `${any}${U}${any}` ? T : U;

export type NestedKeyOf<O extends Record<string, unknown>> = {
	[K in Extract<keyof O, string>]: O[K] extends Array<any>
		? K
		: O[K] extends Record<string, unknown>
		? `${K}` | `${K}.${NestedKeyOf<O[K]>}`
		: K;
}[Extract<keyof O, string>];
