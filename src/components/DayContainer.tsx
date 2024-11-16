import { useEffect, useState } from "react";
import { TodosType, DaylistType } from "../types/Todos.types.js";
import getWeekdays from "../util/createWeekdays.js";
import DayView from "./DayView.js";

type DayViewProps = {
  handleDone: (id: string) => void;
  handleChange: (id: string, text: string) => void;
  handleNewTodo: (text: string, date: Date) => void;
  todos: TodosType[];
};

function DayContainer(props: DayViewProps) {
  const [weeklyTodos, setWeeklyTodos] = useState<DaylistType[]>([]);

  const { todos } = props;

  // fill daylist array with todos that have the same date
  useEffect(() => {
    const weekdaysDates = getWeekdays();

    const todosThisWeek = weekdaysDates.map((day: Date) => {
      const todosForDay = todos.filter(
        (todo) => todo.date.toLocaleDateString() === day.toLocaleDateString()
      );

      return {
        date: day,
        todos: todosForDay,
      };
    });

    setWeeklyTodos(todosThisWeek);
  }, [todos]);

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

  return (
    <>
      {weeklyTodos.length &&
        weeklyTodos.map((daylist: DaylistType) => (
          <DayView
            key={daylist.date.toString()}
            handleChange={props.handleChange}
            handleDone={props.handleDone}
            handleNewTodo={props.handleNewTodo}
            date={daylist.date}
            todos={daylist.todos}
          />
        ))}
    </>
  );
}

export default DayContainer;
