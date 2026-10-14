// Formats ISO date strings as the mono date column in the timeline, matching
// the reference ("2022 - NOW", "2016 - 2019").
export const formatYearLabel = (
  startDate: string | Date | null | undefined,
  endDate?: string | Date | null
): string => {
  const start = startDate ? new Date(startDate).getFullYear() : '?'
  if (!endDate) return `${start} - NOW`
  const end = new Date(endDate).getFullYear()
  if (start === end) return String(start)
  return `${start} - ${end}`
}
