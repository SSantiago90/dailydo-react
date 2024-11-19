/**
 * Returns an array of 7 `Date` objects, representing the days of the week, 
 * starting with the first day of the week (Sunday in most locales), 
 * and ending with the last day of the week (Saturday in most locales).
 * @returns {Date[]}
 */
function getWeekdays(today: Date = new Date()): Date[] {
  
  const startOfWeek = new Date(today);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()+ 1);
  const weekdays = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(currentDate.getDate() + i);
    weekdays.push(new Date(currentDate));
  }
  return weekdays;
}

export default getWeekdays;