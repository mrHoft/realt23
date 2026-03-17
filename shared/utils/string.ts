export function padStart(str: string, targetLength: number, padString = ' ') {
  str = String(str);
  targetLength = Math.floor(targetLength);

  if (str.length >= targetLength) return str;

  padString = String(padString);
  if (padString.length === 0) padString = ' ';

  const paddingLength = targetLength - str.length;
  let padding = '';

  while (padding.length < paddingLength) {
    padding += padString;
  }

  return padding.slice(0, paddingLength) + str;
}
