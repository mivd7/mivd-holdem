export function shiftArrayUp<T>(arr: T[]): T[] {
  if (arr.length === 0) return [];
  return [arr[arr.length - 1], ...arr.slice(0, arr.length - 1)];
}