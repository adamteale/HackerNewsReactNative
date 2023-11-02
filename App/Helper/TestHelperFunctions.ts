export function randomString(
  length: number = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function randomInt(min: number = 1, max: number = 10000): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomBoolean(): boolean {
  return Math.random() < 0.5;
}

export function randomDate(
  start: Date = new Date(2023, 0, 1),
  end: Date = new Date(),
): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}
