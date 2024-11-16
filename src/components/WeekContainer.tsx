import { useContext, useEffect, useState } from "react";
import { DaylistType } from "../types/Todos.types.js";
import getWeekdays from "../util/createWeekdays.js";
import DayView from "./DayView.js";
import { todosContext } from "../storage/TodosContext.js";

function WeekContainer() {
  const [weekDays, setWeekDays] = useState<Date[]>([]);

  // fill daylist array with todos that have the same date
  useEffect(() => {
    const weekdaysDates = getWeekdays();
    setWeekDays(weekdaysDates);
  }, []);

  return (
    <>
      {weekDays.length &&
        weekDays.map((daylist: Date) => (
          <DayView date={daylist} key={daylist.toString()} />
        ))}
    </>
  );
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
