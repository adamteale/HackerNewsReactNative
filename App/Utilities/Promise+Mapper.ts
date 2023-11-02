export async function mapPromise<T, U>(
  promise: Promise<T[]>,
  mapFunction: (value: T) => U,
): Promise<U[]> {
  const values = await promise;
  return values.map(mapFunction);
}
