export function extractStrings(data: { [key: string]: string }[]): string[] {
  return data.flatMap(obj => Object.values(obj));
}
