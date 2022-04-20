export const getYearRangeBetween = (startDate: Date, endDate: Date) => {
    const startDateYear = new Date(startDate).getFullYear();

    if (endDate === null) {
        return `(since ${new Date(startDate).getFullYear()})`
    }

    const endDateYear = new Date(endDate).getFullYear();

    if (startDateYear === endDateYear) {
        return `(${startDateYear})`
    }

    return `(${new Date(startDate).getFullYear()} - ${new Date(endDate).getFullYear()})`
}