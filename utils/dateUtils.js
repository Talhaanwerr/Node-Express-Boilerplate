/**
 * Calculates the number of days between two dates.
 * @param {Date|string} startDate - The start date.
 * @param {Date|string} endDate - The end date.
 * @returns {number|null} - The number of days between the dates or null if invalid.
 */
const calculateDaysBetweenDates = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start) || isNaN(end)) {
    return null;
  }

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return Math.max(0, Math.round((end - start) / millisecondsPerDay));
};

module.exports = calculateDaysBetweenDates;
