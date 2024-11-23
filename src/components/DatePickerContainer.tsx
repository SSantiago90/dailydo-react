import { useContext, useEffect, useState } from "react";
import { todosContext } from "../storage/TodosContext";
import getWeekdays from "../util/createWeekdays";
import { useTheme } from "../storage/ThemeContext";
import DatePicker from "./DatePicker";

function DatePickerContainer() {
  const [isThisWeek, setIsThisWeek] = useState(true);
  const { activeDate, setDateTo } = useContext(todosContext);
  const { themeColor } = useTheme();

  const weekDays = getWeekdays(activeDate);
  const startDay = weekDays[0];
  const endDay = weekDays[weekDays.length - 1];
  function handleDateChange(forward: boolean) {
    const direction = forward ? [7] : [-7];
    // move date by 7 days forward or backward
    const newDate = new Date(activeDate);
    newDate.setDate(newDate.getDate() + direction[0]);

    setDateTo(newDate);
  }

  function handleSetToday() {
    setDateTo(new Date());
  }

  useEffect(() => {
    const today = new Date();
    setIsThisWeek(today >= startDay && today <= endDay);
  }, [activeDate, startDay, endDay]);

  return (
    <DatePicker
      handleDateChange={handleDateChange}
      isThisWeek={isThisWeek}
      themeColor={themeColor}
      startDay={startDay}
      endDay={endDay}
      handleSetToday={handleSetToday}
    />
  );
}

export default DatePickerContainer;
