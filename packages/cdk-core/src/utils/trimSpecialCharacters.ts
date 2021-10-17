export function trimSpecialCharacters(str: string) {
  return str.replace(/^[^a-z\d]*|[^a-z\d]*$/gi, '')
}
