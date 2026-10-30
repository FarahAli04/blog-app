type TimeInput = Date | string | number;

export function timeAgo(input: TimeInput, now: Date = new Date()): string {
  const date = input instanceof Date ? input : new Date(input);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (Number.isNaN(seconds)) return "";
  if (seconds < 5) return "just now";
  if (seconds < 0) return "in the future";

  const units: [number, string][] = [
    [60 * 60 * 24 * 365, "y"],
    [60 * 60 * 24 * 30, "mo"],
    [60 * 60 * 24 * 7, "w"],
    [60 * 60 * 24, "d"],
    [60 * 60, "h"],
    [60, "m"],
    [1, "s"],
  ];

  for (const [secs, label] of units) {
    if (seconds >= secs) {
      return `${Math.floor(seconds / secs)}${label}`;
    }
  }
  return "just now";
}