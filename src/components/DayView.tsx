import InputTodo from "./InputTodo";
import HBar from "./UI/HBar";
import { useContext } from "react";
import { todosContext } from "../storage/TodosContext";
import { useTheme } from "../storage/ThemeContext";

type DayViewProps = {
  date: Date;
};

function DayView({ date }: DayViewProps) {
  const { themeColor } = useTheme();
  const { getTodosForDay, handleChange, handleDone } = useContext(todosContext);

  const day = date.getDate() + "/" + String(Number(date.getMonth()) + 1);
  const dayName = date.toLocaleString("en-US", { weekday: "long" });
  const todos = getTodosForDay(date);

  const isToday = date.toLocaleDateString() === new Date().toLocaleDateString();
  return (
    <div className="flex flex-col rounded py-5 w-full">
      <div className="flex flex-row gap-5 justify-end relative">
        <h3
          className={`${
            isToday ? `text-${themeColor}-500` : "text-slate-100"
          } xl:text-2xl md:text-4xl text-3xl z-10 mb-1 font-bold opacity-100 text-right pr-1 drop-shadow-[-3px_3px_3px_rgba(15,23,42,1)]`}
        >
          {day}
        </h3>
        <h3
          className={`xl:text-4xl 2xl:text-5xl  z-0 text-6xl font-bold text-${themeColor}-700 opacity-60 text-left pl-1 _text-handwritten _text-gradient absolute bottom-2 left-2`}
        >
          {dayName}
        </h3>
      </div>
      <HBar bold={isToday} />

      <div>
        <ul className="list-none flex flex-col p-1">
          {todos.map((todo) => {
            return (
              <InputTodo
                key={todo.id}
                id={todo.id}
                value={todo.task}
                done={todo.done}
                onChange={(text) => handleChange(todo.id, text)}
                onClick={() => handleDone(todo.id)}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default DayView;
