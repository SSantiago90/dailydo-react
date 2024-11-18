import InputTodo from "./InputTodo";
import HBar from "./UI/HBar";
import { useContext } from "react";
import { todosContext } from "../storage/TodosContext";
import InputPlaceholder from "./InputPlaceholder";

type DayViewProps = {
  date: Date;
};

function DayView({ date }: DayViewProps) {
  const day = date.getDate() + "." + date.getMonth();
  const dayName = date.toLocaleString("en-US", { weekday: "short" });

  const { getTodosForDay, handleChange, handleDone, handleNewTodo } =
    useContext(todosContext);
  const todos = getTodosForDay(date);
  return (
    <div style={{ maxWidth: "400px" }} className="flex flex-col rounded py-5">
      <div className="flex flex-row gap-2 justify-between relative">
        <span></span>
        <h3 className="text-4xl z-10 mb-1 font-bold text-rose-200 opacity-100 text-right pr-1 _text-handwritten drop-shadow-[-3px_3px_3px_rgba(15,23,42,1)]">
          {day}
        </h3>
        <h3 className="xl:text-6xl z-0 md:text-4xl text-2xl font-bold text-rose-700 opacity-80 text-left pl-1 _text-handwritten _text-gradient absolute bottom-0">
          {dayName}
        </h3>
      </div>
      <HBar />

      <div>
        <ul className="list-none flex flex-col">
          {todos.map((todo, index) => (
            <InputTodo
              onChange={
                index === todos.length - 1
                  ? (text) => {
                      handleChange(todo.id, text);
                      return handleNewTodo(date);
                    }
                  : (text) => handleChange(todo.id, text)
              }
              onClick={() => handleDone(todo.id)}
              key={index}
              value={todo.task}
              done={todo.done}
            />
          ))}

          {/*      <InputPlaceholder
            index={todos.length}
            onChange={(value) => handleNewTodo(value, date)}
          /> */}
        </ul>
      </div>
    </div>
  );
}

export default DayView;
