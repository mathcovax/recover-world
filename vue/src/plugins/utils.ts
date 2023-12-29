export function objectEntries<
	obj extends Record<any, any>,
>(obj: obj){
	return Object.entries(obj) as Array<{[p in keyof obj]: [p, obj[p]]}[keyof obj]>;
}
