import InputTodo from "./InputTodo";
import HBar from "./UI/HBar";
import { memo, useContext, useEffect } from "react";
import { todosContext } from "../storage/TodosContext";

type DayViewProps = {
  date: Date;
};

function DayView({ date }: DayViewProps) {
  const day = date.getDate() + "." + date.getMonth();
  const dayName = date.toLocaleString("en-US", { weekday: "short" });

  const { getTodosForDay, handleChange, handleDone } = useContext(todosContext);
  const todos = getTodosForDay(date);
  return (
    <div style={{ maxWidth: "400px" }} className="flex flex-col  rounded py-5">
      <div className="flex flex-row gap-2 justify-normal">
        <h3 className="text-4xl mb-1 font-bold text-rose-200 text-right pr-2 _text-handwritten">
          {day}
        </h3>
        <h3 className="text-4xl mb-1 font-bold text-rose-500 opacity-70 text-left pl-1 _text-handwritten">
          {dayName}
        </h3>
      </div>
      <HBar />

      <div>
        <ul className="list-none flex flex-col">
          {todos.map((todo, index) => (
            <InputTodo
              onChange={(text) => handleChange(todo.id, text)}
              onClick={() => handleDone(todo.id)}
              key={index}
              value={todo.task}
              done={todo.done}
            />
          ))}
          {/*   <InputPlaceholder
            index={todos.length}
            onChange={(text) => handleNewTodo(text, date)}
          /> */}
        </ul>
      </div>
    </div>
  );
}

export default memo(
  DayView,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.todos) === JSON.stringify(nextProps.todos)
);
