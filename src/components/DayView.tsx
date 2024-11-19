import InputTodo from "./InputTodo";
import HBar from "./UI/HBar";
import { useContext } from "react";
import { todosContext } from "../storage/TodosContext";
import { useTheme } from "../storage/ThemeContext";

type DayViewProps = {
  date: Date;
};

function DayView({ date }: DayViewProps) {
  const day = date.getDate() + "/" + String(Number(date.getMonth()) + 1);
  const dayName = date.toLocaleString("en-US", { weekday: "long" });
  const { themeColor } = useTheme();
  const { getTodosForDay, handleChange, handleDone, handleNewTodo } =
    useContext(todosContext);
  const todos = getTodosForDay(date);

  return (
    <div className="flex flex-col rounded py-5 w-full">
      <div className="flex flex-row gap-5 justify-end relative">
        <span></span>
        <h3 className="text-2xl z-10 mb-1 font-bold text-slate-100 opacity-100 text-right pr-1 drop-shadow-[-3px_3px_3px_rgba(15,23,42,1)]">
          {day}
        </h3>
        <h3
          className={`xl:text-5xl z-0 md:text-4xl text-2xl font-bold text-${themeColor}-700 opacity-80 text-left pl-1 _text-handwritten _text-gradient absolute bottom-2 left-2`}
        >
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
        </ul>
      </div>
    </div>
  );
}

export default DayView;
