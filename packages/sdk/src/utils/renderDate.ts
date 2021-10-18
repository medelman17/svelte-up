export function renderDate(date: Date): string {
  if (date.getDate() !== new Date().getDate()) {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }
  return date.toLocaleTimeString()
}
