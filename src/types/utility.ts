/**
 * Recursively extract the inner type of a `Promise`
 */
export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
