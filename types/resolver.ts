// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MutationResolver<T> = (_: any, params: T) => T;

export type DrawCardArgs = { count: number };
