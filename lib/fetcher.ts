// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const customFetcher = <TData = any, TVariables = any>(query: string, variables?: TVariables) => async () => {
  const res = await fetch('/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(json));
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data as TData;
};