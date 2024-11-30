import { useContext, useEffect, useState } from "react";
import getWeekdays from "../util/createWeekdays";
import { todosContext } from "../storage/TodosContext.js";
import WeekView from "./WeekView.js";

function WeekContainer() {
  const [weekDays, setWeekDays] = useState<Date[]>([]);
  const { activeDate, errors, fetching } = useContext(todosContext);
  const [backward, setBackward] = useState(false);

  useEffect(() => {
    setBackward(activeDate < weekDays[0]);
    const weekdaysDates = getWeekdays(activeDate);
    setWeekDays(weekdaysDates);
  }, [activeDate]);

  return (
    <WeekView
      fetching={fetching}
      weekDays={weekDays}
      back={backward}
      errors={errors}
    />
  );
}

export default WeekContainer;
