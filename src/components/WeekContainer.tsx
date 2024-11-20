import { useContext, useEffect, useState } from "react";
import getWeekdays from "../util/createWeekdays";
import { todosContext } from "../storage/TodosContext.js";
import WeekView from "./WeekView.js";

function WeekContainer() {
  const [weekDays, setWeekDays] = useState<Date[]>([]);
  const { activeDate, fetching } = useContext(todosContext);

  useEffect(() => {
    const weekdaysDates = getWeekdays(activeDate);
    setWeekDays(weekdaysDates);
  }, [activeDate]);

  return <WeekView fetching={fetching} weekDays={weekDays} />;
}

export default WeekContainer;
