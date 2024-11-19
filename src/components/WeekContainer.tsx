import { useContext, useEffect, useState } from "react";
import getWeekdays from "../util/createWeekdays";
import { todosContext } from "../storage/TodosContext.js";
import WeekView from "./WeekView.js";

function WeekContainer() {
  const [weekDays, setWeekDays] = useState<Date[]>([]);
  const { activeDate } = useContext(todosContext);

  useEffect(() => {
    const weekdaysDates = getWeekdays(activeDate);
    setWeekDays(weekdaysDates);
  }, [activeDate]);

  return <WeekView weekDays={weekDays} />;
}

export default WeekContainer;

// * Todo list clean up
/*   useEffect(() => {
    const getLastNotEmptyTodo = (todos: TodosType[]) => {
      const lastEmptyTodoIndex = [...todos]
        .reverse()
        .findIndex((todo) => todo.task !== "");

      return lastEmptyTodoIndex;
    };

    weeklyTodos.forEach((daylist: DaylistType) => {
      const lastNotEmptyTodoIndex = getLastNotEmptyTodo(daylist.todos);

      // add an empty element, if last element of each day is not an empty string

      
      }
     
    });
   
  }, [weeklyTodos]); */
