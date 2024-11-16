function getWeekdays() {
  const today = new Date();
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